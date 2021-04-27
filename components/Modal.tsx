import { createElement, FC, useCallback } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { usePortal } from "../hooks/usePortal";
import { Box } from "@material-ui/core";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;

  component?: string;
  componentProps?: any;
};

type ModalContainerProps = {
  isOpen: boolean;
};

const ModalContainer = styled(motion.div)`
  position: fixed;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: ${(props: ModalContainerProps) =>
    props.isOpen ? "auto" : "none"};
  z-index: 10;
`;

const ModalContentContainer = styled(motion.div)`
  align-items: flex-start;
  display: flex;
  height: 0;
  justify-content: center;
  z-index: 10;
`;

const ModalContentWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  box-sizing: border-box;
  padding: 2.5rem;
  height: 100vh;
  width: 100%;
`;

const OverlayContainer = styled.div`
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  position: fixed;
  transition: opacity;
  cursor: pointer;
`;

const Overlay = styled(motion.div)`
  position: absolute;
  background: #575757;
  opacity: 0.6;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

export const ModalContent = styled(Box)`
  display: flex;
  flex-direction: column;

  background: #fff;
  border-radius: 0.5rem;
  width: 28rem;
  overflow: hidden;
  max-height: 100%;
`;

export const ModalHeader = styled.div`
  border-bottom: 1px solid #e5e5e5;
  font-size: 1.1875rem;
  line-height: 1.5rem;
  font-weight: 600;
  padding: 1rem 1.5rem;
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
  overflow: auto;
`;

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;
  background: #f5f5f5;
  border-radius: 0px 0px 8px 8px;
  padding: 0 1.5rem;
  height: 3.75rem;

  > button {
    margin-left: 0.5rem;
  }
`;

export const Modal: FC<ModalProps> = (props) => {
  const { isOpen, onClose, children } = props;
  const target = usePortal("main__modal");
  const Wrapper = useCallback(
    ({ children }) =>
      createElement(
        props.component || "div",
        props.componentProps,
        children
      ),
    []
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
                {children}
              </ModalContentWrapper>
            )}
          </AnimatePresence>
        </ModalContentContainer>
      </ModalContainer>
    </Wrapper>,
    target
  );
};
