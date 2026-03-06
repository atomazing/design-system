---
stepsCompleted:
  - step-01-validate-prerequisites
inputDocuments:
  - examples/next-app-router/docs/decisions/bmad-next-app-router-v1.md
  - examples/next-app-router/docs/features/bmad-next-app-router-model-v1.md
  - examples/next-app-router/docs/features/bmad-next-app-router-architecture-v1.md
  - examples/next-app-router/docs/specs/aplai/v1/*.md
---

# design-system - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for design-system, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: The system shall render a complete APLAI landing experience with structured sections: Header, Hero, Proof, Problem, Outcomes, Mechanism, How-it-works, Architecture, Demo, Templates, Trust, Guarantees, FAQ, Final CTA, and Footer.
FR2: The system shall provide sticky header navigation with anchor-based section jumps for key sections.
FR3: The system shall implement a mixed CTA route where high-intent CTAs open lead capture directly and secondary CTAs navigate to proof/demo anchors.
FR4: The system shall expose a primary conversion path from Hero and Final CTA to lead capture.
FR5: The system shall provide a lead form in both inline and modal contexts.
FR6: The system shall require `contact` and `role` before allowing lead form submission.
FR7: The system shall keep non-critical form fields optional to minimize conversion friction in v1.
FR8: The system shall display explicit success and error submission states and allow retry/resubmission.
FR9: The system shall implement CTA analytics for all tracked CTA interactions via `cta_click` with source attribution.
FR10: The system shall track modal form openings via `form_open` with context.
FR11: The system shall track submission outcomes via `form_submit_success` and `form_submit_error` with context.
FR12: The system shall enforce analytics payload sanitization to prevent PII emission.
FR13: The system shall implement social proof in v1 using anonymous cases by default.
FR14: The system shall permit logo-based proof only when explicit permission exists.
FR15: The system shall include lightweight public SLA messaging in trust/final conversion content.
FR16: The system shall render the hero pipeline as exactly 4 nodes for v1.
FR17: The system shall implement demo strategy as 1 primary scenario plus 1 backup scenario.
FR18: The system shall add scenario telemetry events for selection and completion.
FR19: The system shall keep technical diagnostic routes functional (`/debug/theme`, `/showcase`, `/ssr`) during delivery.
FR20: The system shall maintain a testable mapping from specs to stories, components, tests, and metrics.

### NonFunctional Requirements

NFR1: The landing shall be usable on both mobile and desktop layouts with responsive behavior.
NFR2: Primary content and CTA hierarchy shall remain readable and scannable without zoom on mobile.
NFR3: Accessibility baseline shall be maintained (semantic structure, keyboard reachability, visible focus, usable forms).
NFR4: Analytics and instrumentation shall avoid PII leakage in payloads.
NFR5: Trust content publication shall follow risk-safe policy (anonymous-first, permission-gated logos).
NFR6: Pipeline and hero interactions shall avoid excessive complexity and remain performance-safe.
NFR7: The application shall preserve SSR-safe behavior for theme and diagnostics flows.
NFR8: Story closeout quality gates shall pass (`lint`, `build`) before completion.
NFR9: Critical conversion paths shall be covered by automated tests (form success/error, CTA flows, pipeline/demo checks).
NFR10: Documentation traceability shall be maintained between model, architecture mapping, and delivery stories.

### Additional Requirements

- Business decision gate is closed with 6 locked decisions (CTA mixed, required fields, public SLA, anonymous-first proof, 4-node pipeline, 1+1 demo).
- Delivery must follow two-slice architecture: Slice-01 (A1+A2) then Slice-02 (A3+A4).
- Architecture map must remain authoritative for `spec -> story -> component -> test -> metric`.
- Baseline technical readiness is required before feature stories (TypeScript alias/import resolution and route compilation).
- Existing event contract (`cta_click`, `form_open`, `form_submit_success`, `form_submit_error`) must remain stable.
- New demo telemetry (`scenario_select`, `scenario_complete`) is required for v1 demo strategy.
- Identified coverage gaps must be closed: required-field regression checks, pipeline node-count regression, backup scenario checks.
- Execution mode should use one active story at a time (`WIP=1`) with per-story verification gates.

### FR Coverage Map

FR1: Epic 1 - Full landing section architecture
FR2: Epic 1 - Sticky navigation and anchor movement
FR3: Epic 2 - Mixed CTA routing behavior
FR4: Epic 2 - Primary conversion path availability
FR5: Epic 2 - Inline + modal lead form contexts
FR6: Epic 2 - Required `contact + role`
FR7: Epic 2 - Low-friction optional fields
FR8: Epic 2 - Success/error/retry form states
FR9: Epic 5 - `cta_click` instrumentation
FR10: Epic 5 - `form_open` instrumentation
FR11: Epic 5 - Submit outcome instrumentation
FR12: Epic 5 - PII-safe payload enforcement
FR13: Epic 3 - Anonymous-first social proof
FR14: Epic 3 - Permission-gated logos
FR15: Epic 3 - Lightweight public SLA copy
FR16: Epic 4 - Fixed 4-node pipeline
FR17: Epic 4 - 1+1 demo strategy
FR18: Epic 4 - Scenario telemetry events
FR19: Epic 5 - Diagnostics route reliability
FR20: Epic 5 - Traceable spec-to-story-to-test-to-metric mapping

## Epic List

### Epic 1: Landing Foundation & Navigation
Users can understand APLAI's core value proposition and navigate the full landing journey clearly across key sections.
**FRs covered:** FR1, FR2

### Epic 2: Lead Capture Conversion Journey
Users can enter a mixed CTA flow and submit a qualified lead through modal/inline forms with reliable validation and clear outcomes.
**FRs covered:** FR3, FR4, FR5, FR6, FR7, FR8

### Epic 3: Trust, Proof, and Commitment
Users can evaluate trust signals (safe social proof plus SLA commitment) before conversion without legal-risky claims.
**FRs covered:** FR13, FR14, FR15

### Epic 4: Demo & Pipeline Engagement
Users can understand the 4-node pipeline and follow a primary plus backup demo path with clear next-step intent.
**FRs covered:** FR16, FR17, FR18

### Epic 5: Measurement, Privacy, and Operational Reliability
Product and engineering teams can measure conversion behavior, protect user data, and keep diagnostics/stability guardrails in place.
**FRs covered:** FR9, FR10, FR11, FR12, FR19, FR20

<!-- Repeat for each epic in epics_list (N = 1, 2, 3...) -->

## Epic {{N}}: {{epic_title_N}}

{{epic_goal_N}}

<!-- Repeat for each story (M = 1, 2, 3...) within epic N -->

### Story {{N}}.{{M}}: {{story_title_N_M}}

As a {{user_type}},
I want {{capability}},
So that {{value_benefit}}.

**Acceptance Criteria:**

<!-- for each AC on this story -->

**Given** {{precondition}}
**When** {{action}}
**Then** {{expected_outcome}}
**And** {{additional_criteria}}

<!-- End story repeat -->
