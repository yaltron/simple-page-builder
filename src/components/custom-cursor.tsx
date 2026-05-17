import { useEffect, useRef, useState } from "react";

/**
 * Premium minimal cursor — tiny pink dot with a soft glow.
 * Desktop only (disabled on touch / coarse pointer devices).
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
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

    let hovering = false;
    let pressed = false;

    const applyState = () => {
      if (!innerRef.current) return;
      const scale = pressed ? 0.85 : hovering ? 1.25 : 1;
      innerRef.current.style.transform = `scale(${scale})`;
    };

    const onMove = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
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

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 14,
        height: 14,
        pointerEvents: "none",
        zIndex: 2147483647,
        willChange: "transform",
      }}
    >
      <div
        ref={innerRef}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "9999px",
          background: "rgba(233, 30, 99, 0.7)",
          boxShadow:
            "0 0 6px rgba(233, 30, 99, 0.22), 0 0 14px rgba(233, 30, 99, 0.12)",
          transition: "transform 180ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </div>
  );
}
