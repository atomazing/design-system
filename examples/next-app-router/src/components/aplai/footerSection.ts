
type FooterAnchorId =
  | "how_it_works"
  | "architecture"
  | "demo"
  | "templates"
  | "guarantees"
  | "faq";

type FooterContactLink = {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly kind: "mailto";
};

type AplaiFooterSection = {
  readonly navigationAnchors: readonly FooterAnchorId[];
  readonly contactLinks: readonly FooterContactLink[];
  readonly legalNote: string;
  readonly copyright: string;
};

export const APLAI_FOOTER_SECTION: AplaiFooterSection = {
  navigationAnchors: [
    "how_it_works",
    "architecture",
    "demo",
    "templates",
    "guarantees",
    "faq",
  ],
  contactLinks: [
    {
      id: "footer_contact_direct",
      label: "Написать напрямую",
      href: "mailto:hello@aplai.dev",
      kind: "mailto",
    },
  ],
  legalNote: "Информация на сайте носит ознакомительный характер.",
  copyright: "© 2026 APLAI. All rights reserved.",
};
