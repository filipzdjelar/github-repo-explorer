import { useState, useRef, ReactNode } from "react";

const Tooltip: React.FC<TooltipProps> = ({
  children,
  tooltipContent,
  position,
  behavior,
  offsetY,
  offsetX,
  minWidth,
  maxWidth,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClicked, setClick] = useState(false);

  function getPosition(pos: string) {
    switch (pos) {
      case "top":
        return {
          transform: `translateX(${offsetX}px)`,
          bottom: `calc(110% + ${offsetY}px)`,
        };
      case "bottom":
        return {
          transform: `translateX(${offsetX}px)`,
          top: `calc(110% + ${offsetY}px)`,
        };
      case "left":
        return {
          transform: `translateY(${offsetY}px) translateX(-110%)`,
          left: `-${offsetX}px`,
        };
      case "right":
        return {
          transform: `translateY(${offsetY}px) translateX(110%)`,
          right: `-${offsetX}px`,
        };
      default:
        return {
          transform: `translateX(${offsetX})`,
          bottom: `calc(110% + ${offsetY}px)`,
        };
    }
  }

  function handleClick() {
    if (!isClicked) {
      document.addEventListener("click", handleOutsideClick, false);
    } else {
      document.removeEventListener("click", handleOutsideClick, false);
    }

    setClick(!isClicked);
  }

  const handleOutsideClick = (e: any) => {
    if (containerRef?.current?.contains(e.target)) {
      return;
    }
    setClick(false);
  };

  function constructProps(behavior: string) {
    if (behavior === "hover") {
      return {
        className: `${`tooltip-container`} ${`behavior_hover`}`,
      };
    }
    if (behavior === "click") {
      return {
        ref: containerRef,
        className: `${`tooltip-container`} ${`behavior_click_${
          (isClicked && "active") || "inactive"
        }`}`,
        onClick: handleClick,
      };
    }
  }

  const behaviorProps = constructProps(behavior);

  return (
    <div {...behaviorProps}>
      <div
        id="tooltipID"
        className="tooltip"
        style={{
          ...getPosition(position),
          minWidth: minWidth || 80,
          maxWidth: maxWidth || 150,
        }}
      >
        <div
          className={`${`tooltip_content`} ${`tooltip_position_${position}`}`}
        >
          <p className="tooltip__text">{tooltipContent}</p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Tooltip;

interface TooltipProps {
  children: ReactNode;
  tooltipContent: ReactNode;
  position: "bottom" | "top" | "left" | "right";
  behavior: "hover" | "click";
  offsetY?: number;
  offsetX?: number;
  minWidth?: number;
  maxWidth?: number;
}
