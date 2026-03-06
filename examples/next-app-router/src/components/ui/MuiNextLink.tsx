"use client";

import NextLink from "next/link";
import { forwardRef } from "react";

import type { ComponentPropsWithoutRef } from "react";

export type MuiNextLinkProps = ComponentPropsWithoutRef<typeof NextLink>;

export const MuiNextLink = forwardRef<HTMLAnchorElement, MuiNextLinkProps>(
  function MuiNextLink(props, ref) {
    return <NextLink ref={ref} {...props} />;
  },
);

MuiNextLink.displayName = "MuiNextLink";
