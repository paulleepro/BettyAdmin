import styled from "styled-components";
import { motion } from "framer-motion";

export type ModalContainerProps = {
  isOpen: boolean;
};

export const ModalContainer = styled(motion.div)`
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
