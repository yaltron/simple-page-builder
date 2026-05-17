import { useEffect, useRef, useState } from "react";

/**
 * Premium minimal cursor — small pink dot + soft trailing ring with glow.
 * Desktop only (disabled on touch / coarse pointer devices).
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setEnabled(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      const el = e.target as HTMLElement | null;
      const interactive = !!el?.closest(
        'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]'
      );
      setHovering(interactive);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const tick = () => {
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(tick);

    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  const ringScale = hovering ? 1.7 : 1;
  const dotScale = pressed ? 0.6 : hovering ? 0.5 : 1;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: "9999px",
          border: "1.5px solid rgba(194, 24, 91, 0.55)",
          boxShadow:
            "0 0 18px rgba(194, 24, 91, 0.35), 0 0 40px rgba(194, 24, 91, 0.18)",
          pointerEvents: "none",
          zIndex: 2147483646,
          transition:
            "transform 120ms ease-out, width 220ms ease, height 220ms ease, border-color 220ms ease, box-shadow 220ms ease, opacity 220ms ease",
          transformOrigin: "center",
          mixBlendMode: "normal",
          willChange: "transform",
        }}
        data-state={hovering ? "hover" : "idle"}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "9999px",
            transform: `scale(${ringScale})`,
            transition: "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "9999px",
          background: "#C2185B",
          boxShadow: "0 0 10px rgba(194, 24, 91, 0.6)",
          pointerEvents: "none",
          zIndex: 2147483647,
          willChange: "transform",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "9999px",
            transform: `scale(${dotScale})`,
            transition: "transform 180ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>
    </>
  );
}
