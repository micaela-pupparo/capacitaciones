import React from "react";

interface Props {
  children: React.ReactNode;
  x: number;
  y: number;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const TooltipContainer = ({ children, x, y, contentRef }: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        pointerEvents: "none",
        left: 0,
        top: 0,
        transform: `translate3d(${x}px, ${y}px, 0)`,
      }}
    >
      <div ref={contentRef} className="tooltip">
        {children}
      </div>
    </div>
  );
};

export default TooltipContainer;
