import { createElement, FC, useCallback, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { usePortal } from "../../hooks/usePortal";
import { Overlay, OverlayContainer } from "./Overlay";
import { ModalContentContainer, ModalContentWrapper } from "./ModalContent";
import { ModalContainer } from "./ModalContainer";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;

  component?: string;
  componentProps?: any;
};

export const Modal: FC<ModalProps> = (props) => {
  const { isOpen, onClose, children } = props;
  const target = usePortal("portal__modal");
  const memoizedChildren = useMemo(() => children, [isOpen, children]);
  const Wrapper = useCallback(
    ({ children }) =>
      createElement(props.component || "div", props.componentProps, children),
    [isOpen]
  );

  if (!target) {
    return null;
  }

  return createPortal(
    <Wrapper>
      <ModalContainer isOpen={isOpen}>
        <AnimatePresence>
          {isOpen && (
            <OverlayContainer aria-hidden="true" onClick={onClose}>
              <Overlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </OverlayContainer>
          )}
        </AnimatePresence>
        <ModalContentContainer>
          <AnimatePresence>
            {isOpen && (
              <ModalContentWrapper
                initial={{ opacity: 0, translateY: 32, scale: 0.95 }}
                animate={{ opacity: 1, translateY: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                {memoizedChildren}
              </ModalContentWrapper>
            )}
          </AnimatePresence>
        </ModalContentContainer>
      </ModalContainer>
    </Wrapper>,
    target
  );
};
