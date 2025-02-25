import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { DialogBtn } from "../../components/DialogBtn";
import React from "react";

/**
 * Style extention for <a href="https://mui.com/material-ui/react-button/?srsltid=AfmBOoq83YtZurrURk0MRw2QYK4CcBilzv_FcYdpG-BeJ-DnicDUQbUu" terget="_blanks">@mui/button</a>.
 *  Used in dialog scenarious
 */
const meta: Meta<typeof DialogBtn> = {
  title: "Components/DialogBtn",
  component: DialogBtn,

  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          width: 250,
          height: 200,
          border: "1px solid black",
          padding: 24,
        }}
      >
        Some dialog content here
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            height: "100%",
          }}
        >
          <Story />
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    variant: {
      options: ["text", "contained", "outlined"],
      defaultValue: "contained",
      description: "Mui button variants",
      control: {
        type: "select",
      },
    },
    children: {
      description: "Content of a button",
    },
  },
  args: {},
} satisfies Meta<typeof DialogBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Contained: Story = {
  args: {
    variant: "contained",
    children: "Button",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: "Button",
  },
};
