import React, { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import TooltipContainer from "./TooltipContainer";

export interface TargetRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface Props {
  children: React.ReactNode;
  targetRect: TargetRect | null;
}

const Tooltip = ({ children, targetRect }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) {
      const { height } = ref.current.getBoundingClientRect();
      setTooltipHeight(height);
    }
  }, []);

  let tooltipX = 0;
  let tooltipY = 0;
  if (targetRect !== null) {
    tooltipX = targetRect.left;
    tooltipY = targetRect.top - tooltipHeight;

    if (tooltipY < 0) {
      tooltipY = targetRect.bottom;
    }
  }

  return createPortal(
    <TooltipContainer x={tooltipX} y={tooltipY} contentRef={ref}>
      {children}
    </TooltipContainer>,
    document.body
  );
};

export default Tooltip;
