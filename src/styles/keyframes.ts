import { keyframes } from "@emotion/react";

/**
 * Fade in from the left with slight movement on the X-axis.
 */
export const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

/**
 * Simple fade in animation (opacity only).
 */
export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

/**
 * Slide in from the left side of the screen.
 */
export const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

/**
 * Slide in from the bottom of the screen.
 */
export const slideInBottom = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

/**
 * Scale from 0 to full size.
 */
export const scale = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

/**
 * Creates a pulsating animation using scale and box-shadow.
 * Simulates a glowing effect.
 *
 * @param clr - The base color for the shadow in hex format.
 * @param shadowBlur - The maximum spread of the shadow during the pulse (default: 12).
 * @returns Emotion keyframes animation.
 */
export const pulseAnimation = (clr: string, shadowBlur = 12) => keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 ${clr}b2;
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 ${shadowBlur}px ${clr}00;
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 ${clr}00;
  }
`;

/**
 * Creates a glowing pulse animation using drop-shadow.
 * Used in progress or highlight elements.
 *
 * @param clr - The glow color in hex.
 * @returns Emotion keyframes animation.
 */
export const progressPulse = (clr: string) => keyframes`
  0% {
    filter: none;
  }
  50% {
    filter: drop-shadow(0 0 10px ${clr}78);
  }
  100% {
    filter: none;
  }
`;

/**
 * A bounce-scale animation used during logout transition.
 */
export const logoutAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(0.9) translateX(-2px);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

/**
 * Subtle bounce animation used for install app prompts.
 */
export const installAppAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(2px);
  }
  70% {
    transform: translateY(-2px);
  }
  100% {
    transform: translateY(0);
  }
`;
