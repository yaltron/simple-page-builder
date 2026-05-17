import { useEffect, useRef, useState } from "react";

/**
 * Premium minimal cursor — tiny pink dot + soft trailing ring.
 * Desktop only (disabled on touch / coarse pointer devices).
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const ringInnerRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

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
    let hovering = false;
    let pressed = false;

    const applyState = () => {
      if (ringInnerRef.current) {
        ringInnerRef.current.style.transform = `scale(${
          pressed ? 0.85 : hovering ? 1.35 : 1
        })`;
        ringInnerRef.current.style.opacity = hovering ? "1" : "0.75";
      }
      if (dotRef.current) {
        const child = dotRef.current.firstElementChild as HTMLElement | null;
        if (child) child.style.transform = `scale(${pressed ? 0.7 : 1})`;
      }
    };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        // Position via top/left to avoid translate rounding offsets
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }

      const el = e.target as HTMLElement | null;
      const next = !!el?.closest(
        'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]'
      );
      if (next !== hovering) {
        hovering = next;
        applyState();
      }
    };

    const onDown = () => {
      pressed = true;
      applyState();
    };
    const onUp = () => {
      pressed = false;
      applyState();
    };

    const tick = () => {
      ring.x += (target.x - ring.x) * 0.22;
      ring.y += (target.y - ring.y) * 0.22;
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.x}px`;
        ringRef.current.style.top = `${ring.y}px`;
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

  const baseWrap: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    transform: "translate(-50%, -50%)",
    willChange: "left, top",
  };

  return (
    <>
      {/* Trailing ring */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          ...baseWrap,
          width: 20,
          height: 20,
          zIndex: 2147483646,
        }}
      >
        <div
          ref={ringInnerRef}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "9999px",
            border: "1px solid rgba(194, 24, 91, 0.45)",
            boxShadow: "0 0 6px rgba(194, 24, 91, 0.18)",
            opacity: 0.75,
            transition:
              "transform 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease",
          }}
        />
      </div>

      {/* Precise dot */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          ...baseWrap,
          width: 5,
          height: 5,
          zIndex: 2147483647,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "9999px",
            background: "#C2185B",
            boxShadow: "0 0 4px rgba(194, 24, 91, 0.35)",
            transition: "transform 160ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>
    </>
  );
}
