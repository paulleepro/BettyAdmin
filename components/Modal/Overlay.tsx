import styled from "styled-components";
import { motion } from "framer-motion";

export const Overlay = styled(motion.div)`
  position: absolute;
  background: #575757;
  opacity: 0.6;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

export const OverlayContainer = styled.div`
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  position: fixed;
  transition: opacity;
  cursor: pointer;
`;
