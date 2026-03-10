
type AnalyticsEventName =
  | "section_view"
  | "footer_link_click"
  | "sticky_rail_show"
  | "sticky_rail_hide"
  | "faq_expand"
  | "cta_click"
  | "form_open"
  | "form_modal_close"
  | "form_submit_success"
  | "form_submit_error"
  | "architecture_node_click"
  | "drawer_open"
  | "drawer_close";

type AnalyticsConsentState = "unknown" | "granted" | "denied";
export type FormAnalyticsContext = "modal" | "inline";
type AnalyticsPayloadValue = string | number | boolean | undefined;
type AnalyticsPayload = Record<string, AnalyticsPayloadValue>;
type DataLayerEvent = Record<string, string | number | boolean>;

export const CTA_SOURCES = {
  header: "header",
  heroPrimary: "hero_primary",
  heroDemoAnchor: "hero_demo_anchor",
  demoSection: "demo_section",
  demoToFinalAnchor: "demo_to_final_anchor",
  demoSecondaryPilot: "demo_secondary_pilot",
  templatesPilot: "templates_pilot",
  trustShowcasePilot: "trust_showcase_pilot",
  socialToShowcase: "social_to_showcase",
  faqDetailsLink: "faq_details_link",
  guaranteesPrimary: "guarantees_primary",
  guaranteesToFaq: "guarantees_to_faq",
  notLowCodeToGuarantees: "not_low_code_to_guarantees",
  problemToHow: "problem_to_how",
  outcomesToHow: "outcomes_to_how",
  mechanismToArchitecture: "mechanism_to_architecture",
  howToDemo: "how_to_demo",
  valueToMechanism: "value_to_mechanism",
  faqReturn: "faq_return",
  stickyRailPrimary: "sticky_rail_primary",
  roadmapPrimary: "roadmap_primary",
  finalCtaSidebar: "final_cta_sidebar",
  finalCtaInlineDirect: "final_cta_inline_direct",
  finalCtaContactCard: "final_cta_contact_card",
} as const;

export type CtaSource = (typeof CTA_SOURCES)[keyof typeof CTA_SOURCES];
type FormSubmitErrorReason = "submit_failed";

const ANALYTICS_SURFACE = "aplai_landing";
const CONSENT_STORAGE_KEY = "aplai_analytics_consent";
const PII_KEYS = new Set(["contact", "email", "phone", "company", "task"]);
const PRECONSENT_EVENTS = new Set<AnalyticsEventName>(["cta_click", "form_open"]);
const EVENT_ALLOWED_KEYS: Record<AnalyticsEventName, Set<string>> = {
  section_view: new Set(["section_id", "page_id", "page_version"]),
  footer_link_click: new Set([
    "link_id",
    "link_type",
    "section_id",
    "page_id",
    "page_version",
  ]),
  sticky_rail_show: new Set([
    "section_id",
    "source_section_id",
    "page_id",
    "page_version",
  ]),
  sticky_rail_hide: new Set(["section_id", "reason", "page_id", "page_version"]),
  faq_expand: new Set(["faq_id", "section_id", "page_id", "page_version"]),
  cta_click: new Set(["source"]),
  form_open: new Set(["context", "source", "section_id", "page_id", "page_version"]),
  form_modal_close: new Set(["reason", "source", "section_id", "page_id", "page_version"]),
  form_submit_success: new Set(["context"]),
  form_submit_error: new Set(["context", "reason"]),
  architecture_node_click: new Set([
    "node_id",
    "node_group",
    "section_id",
    "page_id",
    "page_version",
  ]),
  drawer_open: new Set(["node_id", "section_id", "page_id", "page_version"]),
  drawer_close: new Set(["node_id", "section_id", "page_id", "page_version"]),
};

const isSafeValue = (
  value: AnalyticsPayloadValue,
): value is string | number | boolean =>
  typeof value === "string" ||
  typeof value === "number" ||
  typeof value === "boolean";

const toConsentState = (value: string | null): AnalyticsConsentState => {
  if (value === "granted" || value === "denied") return value;
  return "unknown";
};

export function getAnalyticsConsentState(): AnalyticsConsentState {
  if (typeof window === "undefined") return "unknown";

  try {
    return toConsentState(window.localStorage.getItem(CONSENT_STORAGE_KEY));
  } catch {
    return "unknown";
  }
}

export function setAnalyticsConsentState(state: Exclude<AnalyticsConsentState, "unknown">) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, state);
  } catch {
    // Ignore storage failures. Tracking logic remains resilient.
  }
}

const isEventAllowedForConsent = (name: AnalyticsEventName, consent: AnalyticsConsentState) => {
  if (consent === "granted") return true;
  if (consent === "unknown") return PRECONSENT_EVENTS.has(name);
  return false;
};

function sanitizePayload(name: AnalyticsEventName, payload: AnalyticsPayload): AnalyticsPayload {
  const sanitized: AnalyticsPayload = {};
  const allowedKeys = EVENT_ALLOWED_KEYS[name];

  for (const [key, value] of Object.entries(payload)) {
    if (!allowedKeys.has(key)) continue;
    if (PII_KEYS.has(key.toLowerCase())) continue;
    if (!isSafeValue(value)) continue;
    sanitized[key] = value;
  }

  return sanitized;
}

export function trackEvent(name: AnalyticsEventName, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;
  const consentState = getAnalyticsConsentState();

  if (!isEventAllowedForConsent(name, consentState)) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[analytics:block]", { event: name, consent_state: consentState });
    }
    return;
  }

  const event: DataLayerEvent = {
    event: name,
    surface: ANALYTICS_SURFACE,
    consent_state: consentState,
    ...sanitizePayload(name, payload),
  };

  const windowWithDataLayer = window as Window & {
    dataLayer?: Array<DataLayerEvent>;
  };

  if (!Array.isArray(windowWithDataLayer.dataLayer)) {
    windowWithDataLayer.dataLayer = [];
  }
  windowWithDataLayer.dataLayer.push(event);

  if (process.env.NODE_ENV !== "production") {
    console.info("[analytics]", event);
  }
}

export function trackCtaClick(source: CtaSource) {
  trackEvent("cta_click", { source });
}

export function trackSectionView(sectionId: string) {
  trackEvent("section_view", {
    section_id: sectionId,
    page_id: "aplai-landing",
    page_version: "v1",
  });
}

export function trackFaqExpand(faqId: string) {
  trackEvent("faq_expand", {
    faq_id: faqId,
    section_id: "faq",
    page_id: "aplai-landing",
    page_version: "v1",
  });
}

export function trackFooterLinkClick(linkId: string, linkType: "anchor" | "policy" | "mailto" | "tel") {
  trackEvent("footer_link_click", {
    link_id: linkId,
    link_type: linkType,
    section_id: "footer",
    page_id: "aplai-landing",
    page_version: "v1",
  });
}

export function trackStickyRailShow(sourceSectionId: string) {
  trackEvent("sticky_rail_show", {
    section_id: "sticky_cta_rail",
    source_section_id: sourceSectionId,
    page_id: "aplai-landing",
    page_version: "v1",
  });
}

export function trackStickyRailHide(reason: "reached_final_cta" | "modal_open" | "form_active" | "above_hero") {
  trackEvent("sticky_rail_hide", {
    section_id: "sticky_cta_rail",
    reason,
    page_id: "aplai-landing",
    page_version: "v1",
  });
}

export function trackFormOpen(
  context: FormAnalyticsContext,
  options: { source?: CtaSource; sectionId?: string } = {},
) {
  trackEvent("form_open", {
    context,
    source: options.source,
    section_id: options.sectionId,
    page_id: "aplai-landing",
    page_version: "v1",
  });
}

export function trackFormModalClose(
  reason: "x" | "esc" | "backdrop",
  options: { source?: CtaSource; sectionId?: string } = {},
) {
  trackEvent("form_modal_close", {
    reason,
    source: options.source,
    section_id: options.sectionId,
    page_id: "aplai-landing",
    page_version: "v1",
  });
}

export function trackFormSubmitSuccess(context: FormAnalyticsContext) {
  trackEvent("form_submit_success", { context });
}

export function trackFormSubmitError(
  context: FormAnalyticsContext,
  reason: FormSubmitErrorReason = "submit_failed",
) {
  trackEvent("form_submit_error", { context, reason });
}

export function trackArchitectureNodeClick(nodeId: string, nodeGroup: string) {
  trackEvent("architecture_node_click", {
    node_id: nodeId,
    node_group: nodeGroup,
    section_id: "architecture",
    page_id: "aplai-landing",
    page_version: "v1",
  });
}

export function trackArchitectureDrawerOpen(nodeId: string) {
  trackEvent("drawer_open", {
    node_id: nodeId,
    section_id: "architecture",
    page_id: "aplai-landing",
    page_version: "v1",
  });
}

export function trackArchitectureDrawerClose(nodeId: string) {
  trackEvent("drawer_close", {
    node_id: nodeId,
    section_id: "architecture",
    page_id: "aplai-landing",
    page_version: "v1",
  });
}
