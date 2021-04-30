import { FC, useMemo } from "react";
import { createPortal } from "react-dom";

import { usePortal } from "../hooks/usePortal";

export type PortalProps = {
  position: {
    left?: number | string;
    right?: number | string;
    top?: number | string;
    bottom?: number | string;
  };
  isOpen: boolean;
  onClose: () => void;
};

export const Popover: FC<PortalProps> = (props) => {
  const { isOpen, position, children } = props;
  const target = usePortal("portal__popover");
  const memoizedChildren = useMemo(() => children, [isOpen, children]);

  if (!target) return null;

  return createPortal(
    <div style={{ position: "fixed", ...position, zIndex: 10 }}>
      {memoizedChildren}
    </div>,
    target
  );
};
