import styled from "styled-components";
import { Box } from "@material-ui/core";
import { motion } from "framer-motion";

export const ModalContent = styled(Box)`
  display: flex;
  flex-direction: column;

  background: #fff;
  border-radius: 0.5rem;
  width: 28rem;
  overflow: hidden;
  max-height: 100%;
`;

export const ModalContentContainer = styled(motion.div)`
  align-items: flex-start;
  display: flex;
  height: 0;
  justify-content: center;
  z-index: 10;
`;

export const ModalContentWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  box-sizing: border-box;
  padding: 2.5rem;
  height: 100vh;
  width: 100%;
`;
