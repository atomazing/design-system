import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Typography } from "@mui/material";

import React from "react";

/**
 * Typogrphy variants
 */
const meta: Meta<typeof Typography> = {
  title: "Styles/Typography",
  component: Typography,

  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: (args) => (
    <>
      <Typography variant="display_2xl_bold">display_2xl_bold</Typography>
      <Typography variant="display_2xl_regular">display_2xl_regular</Typography>
      <Typography variant="text_md_bold">text_md_bold</Typography>
    </>
  ),
};
