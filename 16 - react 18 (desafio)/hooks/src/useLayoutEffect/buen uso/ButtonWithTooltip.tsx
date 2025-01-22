import React, { useRef, useState } from "react";
import Tooltip, { TargetRect } from "./Tooltip";

interface Props {
  tooltipContent: React.ReactNode;
  children: string;
}

const ButtonWithTooltip = ({ tooltipContent, children, ...rest }: Props) => {
  const [targetRect, setTargetRect] = useState<TargetRect | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        {...rest}
        ref={buttonRef}
        onPointerEnter={() => {
          const rect = buttonRef.current?.getBoundingClientRect();

          if (rect) {
            setTargetRect({
              left: rect.left,
              top: rect.top,
              right: rect.right,
              bottom: rect.bottom,
            });
          }
        }}
        onPointerLeave={() => {
          setTargetRect(null);
        }}
      >
        {targetRect !== null && (
          <Tooltip targetRect={targetRect}>{tooltipContent}</Tooltip>
        )}
        {children}
      </button>
    </>
  );
};

export default ButtonWithTooltip;
