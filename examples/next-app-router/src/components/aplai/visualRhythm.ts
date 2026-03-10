
export type SectionTone = "dense" | "pause" | "showcase";

type SectionVisualRule = {
  readonly id: string;
  readonly tone: SectionTone;
};

type AplaiVisualRhythm = {
  readonly northStarFeel: string;
  readonly cardRule: string;
  readonly sectionRules: readonly SectionVisualRule[];
};

export const APLAI_VISUAL_RHYTHM: AplaiVisualRhythm = {
  northStarFeel:
    "Современный, инженерно-зрелый, но понятный бизнесу: структурно, измеримо и без перегруза.",
  cardRule:
    "Карточки короткие, с воздухом внутри и равной визуальной силой без табличной плотности.",
  sectionRules: [
    { id: "hero", tone: "dense" },
    { id: "proof_strip", tone: "pause" },
    { id: "problem", tone: "dense" },
    { id: "outcomes", tone: "pause" },
    { id: "mechanism", tone: "dense" },
    { id: "who_its_for", tone: "dense" },
    { id: "value_prop", tone: "showcase" },
    { id: "how_it_works", tone: "dense" },
    { id: "architecture", tone: "dense" },
    { id: "demo", tone: "dense" },
    { id: "templates", tone: "pause" },
    { id: "not_low_code", tone: "pause" },
    { id: "social_proof", tone: "pause" },
    { id: "trust_showcase", tone: "showcase" },
    { id: "guarantees", tone: "pause" },
    { id: "faq", tone: "dense" },
    { id: "roadmap", tone: "pause" },
    { id: "final_cta", tone: "dense" },
  ],
};
