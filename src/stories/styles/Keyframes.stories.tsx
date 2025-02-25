import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "@mui/material";

import React from "react";
import * as keyframes from "../../../build/styles/keyframes";

const getProperAnimation = (animationName: string, label: string) => {
  if (label === "pulseAnimation") {
    return keyframes.pulseAnimation("red");
  }

  if (label === "rotate") {
    return keyframes.rotate("360deg");
  }

  return animationName;
};

const animationBase = (animationName: string, label: string) => {
  return (
    <div>
      <div style={{ textAlign: "center" }}>{label}</div>
      <div
        style={{
          width: 64,
          height: 64,
          backgroundColor: "red",
          animation: `${getProperAnimation(
            animationName,
            label
          )} 2s 0.5s ease infinite`,
        }}
      ></div>
    </div>
  );
};

/**
 * Typogrphy variants
 */
const meta: Meta<typeof Typography> = {
  title: "Styles/Keyframes",

  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: (args) => (
    <div
      style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gridTemplateRows: "1fr",
        gap: 25,
        padding: 50,
      }}
    >
      {Object.keys(keyframes).map((key) => animationBase(keyframes[key], key))}
    </div>
  ),
};
