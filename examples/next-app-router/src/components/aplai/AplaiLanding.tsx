"use client";

import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Drawer,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { MenuRounded } from "@mui/icons-material";

import { LeadCaptureForm } from "./LeadCaptureForm";
import {
  AplaiFooter,
  AplaiLeadFormDialog,
  AplaiMobileNavDrawer,
  AplaiStickyRail,
} from "./AplaiLandingChrome";
import { HeaderThemeSwitch } from "@/components/theme/HeaderThemeSwitch";
import {
  getSectionToneSx,
  IcpTierChip,
  SectionMeta,
  Section,
  TextCard,
  VendorLockNotice,
} from "./AplaiLandingPrimitives";
import {
  CTA_SOURCES,
  trackArchitectureDrawerClose,
  trackArchitectureDrawerOpen,
  trackArchitectureNodeClick,
  trackCtaClick,
  trackFaqExpand,
  trackFooterLinkClick,
  trackFormModalClose,
  trackFormOpen,
  trackSectionView,
  trackStickyRailHide,
  trackStickyRailShow,
  type CtaSource,
} from "./analytics";
import { APLAI_ARCHITECTURE_SECTION } from "./architectureSection";
import { APLAI_COPY_PACK } from "./copyPack";
import { APLAI_CONVERSION_ARCHITECTURE } from "./conversionArchitecture";
import { APLAI_CONTENT_BLUEPRINT } from "./contentBlueprint";
import { APLAI_DEMO_ANCHOR } from "./demoAnchor";
import { APLAI_DEMO_NARRATIVE } from "./demoNarrative";
import { APLAI_FAQ_SECTION } from "./faqSection";
import { APLAI_FOOTER_SECTION } from "./footerSection";
import { APLAI_GUARANTEES_SECTION } from "./guaranteesSection";
import { APLAI_HOW_IT_WORKS_SECTION } from "./howItWorksSection";
import { APLAI_ICP_PACK } from "./icpPack";
import { APLAI_MESSAGE_MAP } from "./messageMap";
import { APLAI_MECHANISM_SECTION } from "./mechanismSection";
import { APLAI_MICROCOPY } from "./microcopy";
import { APLAI_NOT_LOW_CODE_SECTION } from "./notLowCodeSection";
import { APLAI_OUTCOMES_SECTION } from "./outcomesSection";
import { APLAI_PILOT_OFFER } from "./pilotOffer";
import { APLAI_PIPELINE_UX } from "./pipelineUx";
import { APLAI_PROBLEM_SECTION } from "./problemSection";
import { APLAI_PROOF_STRIP } from "./proofStrip";
import { APLAI_ROADMAP_SECTION } from "./roadmapSection";
import { APLAI_SCROLL_JOURNEY } from "./scrollJourney";
import { APLAI_SOCIAL_PROOF } from "./socialProof";
import { APLAI_TEMPLATES_GALLERY } from "./templatesGallery";
import { APLAI_TRUST_CONTENT_POLICY } from "./trustContentPolicy";
import { APLAI_TRUST_SHOWCASE } from "./trustShowcase";
import { APLAI_VALUE_PROP_SECTION } from "./valuePropSection";
import { APLAI_VALUE_PROPOSITION } from "./valueProposition";
import { APLAI_VISUAL_RHYTHM, type SectionTone } from "./visualRhythm";

const PAGE_BLUEPRINT_ANCHORS = APLAI_CONTENT_BLUEPRINT.anchors;
const NAV_ITEMS = PAGE_BLUEPRINT_ANCHORS.filter((item) => item.kind === "anchor");

const BLUEPRINT_SECTION_MAP = Object.fromEntries(
  APLAI_CONTENT_BLUEPRINT.sections.map((section) => [section.id, section]),
);
const VISUAL_RULE_MAP = Object.fromEntries(
  APLAI_VISUAL_RHYTHM.sectionRules.map((section) => [section.id, section]),
);
const FAQ_RETURN_POINT = APLAI_SCROLL_JOURNEY.ctaReturnPoints.find(
  (item) => item.id === "faq",
);
const IS_MODAL_PRIMARY_ROUTE =
  APLAI_CONVERSION_ARCHITECTURE.primaryRoute === "modal_with_final_fallback";
const SECTION_VIEW_IDS = [
  "social_proof",
  "trust_showcase",
  "guarantees",
  "faq",
  "roadmap",
  "final_cta",
  "footer",
] as const;

function getVisibleRatio(node: HTMLElement): number {
  const rect = node.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
  if (viewportHeight <= 0 || rect.height <= 0) return 0;

  const visibleTop = Math.max(rect.top, 0);
  const visibleBottom = Math.min(rect.bottom, viewportHeight);
  const visibleHeight = Math.max(0, visibleBottom - visibleTop);

  return visibleHeight / Math.min(rect.height, viewportHeight);
}

function getBlueprintSection(id: string) {
  return BLUEPRINT_SECTION_MAP[id];
}

function getSectionTone(id: string): SectionTone {
  return VISUAL_RULE_MAP[id]?.tone ?? "dense";
}

function getCtaSourceSectionId(source: CtaSource): string {
  switch (source) {
    case CTA_SOURCES.header:
      return "header";
    case CTA_SOURCES.heroPrimary:
      return "hero";
    case CTA_SOURCES.stickyRailPrimary:
      return "sticky_cta_rail";
    case CTA_SOURCES.demoSection:
    case CTA_SOURCES.demoSecondaryPilot:
      return "demo";
    case CTA_SOURCES.templatesPilot:
      return "templates";
    case CTA_SOURCES.trustShowcasePilot:
      return "trust_showcase";
    case CTA_SOURCES.guaranteesPrimary:
      return "guarantees";
    case CTA_SOURCES.roadmapPrimary:
      return "roadmap";
    case CTA_SOURCES.finalCtaSidebar:
    case CTA_SOURCES.finalCtaInlineDirect:
    case CTA_SOURCES.finalCtaContactCard:
      return "final_cta";
    default:
      return "unknown";
  }
}
export function AplaiLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState<CtaSource | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isStickyRailVisible, setIsStickyRailVisible] = useState(false);
  const [selectedArchitectureNodeId, setSelectedArchitectureNodeId] = useState<string | null>(null);
  const [activeAnchorId, setActiveAnchorId] = useState<string>(NAV_ITEMS[0]?.id ?? "how_it_works");
  const [expandedFaqId, setExpandedFaqId] = useState<string | false>(
    APLAI_FAQ_SECTION.items[0]?.id ?? false,
  );
  const [activePipelineStepId, setActivePipelineStepId] = useState<string>(
    APLAI_PIPELINE_UX.steps[0]?.id ?? "scenario",
  );
  const [hasTrackedInlineFormOpen, setHasTrackedInlineFormOpen] = useState(false);
  const stickyRailVisibleRef = useRef(false);
  const activeAnchorIdRef = useRef(activeAnchorId);
  const isModalOpenRef = useRef(isModalOpen);
  const footerNavigationItems = APLAI_FOOTER_SECTION.navigationAnchors
    .map((anchorId) => NAV_ITEMS.find((item) => item.id === anchorId))
    .filter((item): item is (typeof NAV_ITEMS)[number] => Boolean(item));
  const heroBlueprint = getBlueprintSection("hero");
  const heroTone = getSectionTone("hero");
  const proofStripBlueprint = getBlueprintSection("proof_strip");
  const proofStripTone = getSectionTone("proof_strip");
  const problemBlueprint = getBlueprintSection("problem");
  const outcomesBlueprint = getBlueprintSection("outcomes");
  const mechanismBlueprint = getBlueprintSection("mechanism");
  const notLowCodeBlueprint = getBlueprintSection("not_low_code");
  const socialProofBlueprint = getBlueprintSection("social_proof");
  const roadmapBlueprint = getBlueprintSection("roadmap");
  const selectedArchitectureNode =
    APLAI_ARCHITECTURE_SECTION.nodes.find((item) => item.id === selectedArchitectureNodeId) ?? null;
  const activePipelineStep =
    APLAI_PIPELINE_UX.steps.find((item) => item.id === activePipelineStepId) ??
    APLAI_PIPELINE_UX.steps[0];
  const isMobileDialog = useMediaQuery("(max-width:600px)");
  const isWideHeader = useMediaQuery("(min-width:1360px)");

  useEffect(() => {
    activeAnchorIdRef.current = activeAnchorId;
  }, [activeAnchorId]);

  useEffect(() => {
    isModalOpenRef.current = isModalOpen;
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) return;
    trackFormOpen("modal", {
      source: modalSource ?? undefined,
      sectionId: modalSource ? getCtaSourceSectionId(modalSource) : undefined,
    });
  }, [isModalOpen, modalSource]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQuery = window.matchMedia("(min-width:1360px)");
    const handleHeaderModeChange = (event: MediaQueryListEvent) => {
      if (!event.matches) return;
      setIsMobileMenuOpen(false);
    };

    mediaQuery.addEventListener("change", handleHeaderModeChange);

    return () => mediaQuery.removeEventListener("change", handleHeaderModeChange);
  }, []);

  useEffect(() => {
    const stepIds = APLAI_PIPELINE_UX.steps.map((item) => item.id);
    if (stepIds.length <= 1) return undefined;

    const intervalId = window.setInterval(() => {
      setActivePipelineStepId((current) => {
        const currentIndex = stepIds.indexOf(current);
        const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % stepIds.length;

        return stepIds[nextIndex] ?? stepIds[0] ?? current;
      });
    }, 2400);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const sectionNodes = SECTION_VIEW_IDS.map((id) => document.getElementById(id)).filter(
      (node): node is HTMLElement => Boolean(node),
    );
    if (sectionNodes.length === 0) return undefined;

    const tracked = new Set<string>();
    const timers = new Map<string, number>();

    const startTimer = (sectionId: string) => {
      if (tracked.has(sectionId) || timers.has(sectionId)) return;

      const timerId = window.setTimeout(() => {
        tracked.add(sectionId);
        timers.delete(sectionId);
        trackSectionView(sectionId);
      }, 1000);

      timers.set(sectionId, timerId);
    };

    const clearTimer = (sectionId: string) => {
      const timerId = timers.get(sectionId);
      if (timerId === undefined) return;

      window.clearTimeout(timerId);
      timers.delete(sectionId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const sectionId = (entry.target as HTMLElement).id;
          if (!sectionId || tracked.has(sectionId)) continue;

          const rect = entry.boundingClientRect;
          const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
          const visibleTop = Math.max(rect.top, 0);
          const visibleBottom = Math.min(rect.bottom, viewportHeight);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visibilityRatio =
            viewportHeight > 0 && rect.height > 0
              ? visibleHeight / Math.min(rect.height, viewportHeight)
              : 0;

          if (entry.isIntersecting && visibilityRatio >= 0.5) {
            startTimer(sectionId);
            continue;
          }

          clearTimer(sectionId);
        }
      },
      { threshold: [0, 0.5, 1] },
    );

    sectionNodes.forEach((node) => observer.observe(node));

    return () => {
      timers.forEach((timerId) => window.clearTimeout(timerId));
      timers.clear();
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const updateStickyRail = () => {
      const heroNode = document.getElementById("hero");
      const finalCtaNode = document.getElementById("final_cta");
      const scrollTop =
        window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;

      const heroPassed = heroNode
        ? heroNode.getBoundingClientRect().bottom <= 112
        : scrollTop > 160;
      const finalCtaInRange = finalCtaNode
        ? getVisibleRatio(finalCtaNode) >= 0.24
        : false;
      const activeElement =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      const isFinalFormActive = Boolean(activeElement?.closest("#final_cta form"));
      const nextVisible =
        (heroPassed || scrollTop > 160) &&
        !finalCtaInRange &&
        !isFinalFormActive &&
        !isModalOpenRef.current;

      if (nextVisible === stickyRailVisibleRef.current) return;

      stickyRailVisibleRef.current = nextVisible;
      setIsStickyRailVisible(nextVisible);

      if (nextVisible) {
        trackStickyRailShow(activeAnchorIdRef.current || "hero");
        return;
      }

      const reason = finalCtaInRange
        ? "reached_final_cta"
        : isFinalFormActive
          ? "form_active"
          : isModalOpenRef.current
            ? "modal_open"
            : "above_hero";
      trackStickyRailHide(reason);
    };

    updateStickyRail();
    const frameId = window.requestAnimationFrame(updateStickyRail);
    const settleId = window.setTimeout(updateStickyRail, 250);
    window.addEventListener("scroll", updateStickyRail, { passive: true });
    window.addEventListener("resize", updateStickyRail);
    window.addEventListener("load", updateStickyRail);
    document.addEventListener("focusin", updateStickyRail);
    document.addEventListener("focusout", updateStickyRail);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(settleId);
      window.removeEventListener("scroll", updateStickyRail);
      window.removeEventListener("resize", updateStickyRail);
      window.removeEventListener("load", updateStickyRail);
      document.removeEventListener("focusin", updateStickyRail);
      document.removeEventListener("focusout", updateStickyRail);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateActiveAnchor = () => {
      const threshold = 160;
      let nextActive = NAV_ITEMS[0]?.id ?? "how_it_works";

      for (const item of NAV_ITEMS) {
        const element = document.getElementById(item.id);
        if (!element) continue;

        if (element.getBoundingClientRect().top <= threshold) {
          nextActive = item.id;
        }
      }

      setActiveAnchorId((current) => (current === nextActive ? current : nextActive));
    };

    updateActiveAnchor();
    window.addEventListener("scroll", updateActiveAnchor, { passive: true });
    window.addEventListener("resize", updateActiveAnchor);

    return () => {
      window.removeEventListener("scroll", updateActiveAnchor);
      window.removeEventListener("resize", updateActiveAnchor);
    };
  }, []);

  const openModalFrom = (source: CtaSource) => {
    trackCtaClick(source);
    if (stickyRailVisibleRef.current) {
      stickyRailVisibleRef.current = false;
      setIsStickyRailVisible(false);
      trackStickyRailHide("modal_open");
    }
    setModalSource(source);
    setIsModalOpen(true);
  };

  const closeModal = (reason: "x" | "esc" | "backdrop" = "x") => {
    trackFormModalClose(reason, {
      source: modalSource ?? undefined,
      sectionId: modalSource ? getCtaSourceSectionId(modalSource) : undefined,
    });
    setIsModalOpen(false);
    setModalSource(null);
  };
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navigateToSection = (id: string) => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", `#${id}`);
      setActiveAnchorId(id);
    }

    closeMobileMenu();
  };

  const scrollToPageTop = () => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    window.history.replaceState(null, "", "#top");
    setActiveAnchorId(NAV_ITEMS[0]?.id ?? "how_it_works");
    closeMobileMenu();
  };

  const openPrimaryConversionFrom = (source: CtaSource) => {
    closeMobileMenu();

    if (IS_MODAL_PRIMARY_ROUTE) {
      openModalFrom(source);
      return;
    }

    trackCtaClick(source);
    navigateToSection("final_cta");
  };

  const routeToFinalSection = (source: CtaSource) => {
    trackCtaClick(source);
    navigateToSection("final_cta");
  };

  const trackInlineFormOpen = () => {
    if (hasTrackedInlineFormOpen) return;
    setHasTrackedInlineFormOpen(true);
    trackFormOpen("inline", { sectionId: "final_cta" });
  };

  const openArchitectureNode = (nodeId: string) => {
    const node = APLAI_ARCHITECTURE_SECTION.nodes.find((item) => item.id === nodeId);
    if (!node) return;

    trackArchitectureNodeClick(node.id, node.group);
    if (!selectedArchitectureNodeId) {
      trackArchitectureDrawerOpen(node.id);
    }

    setSelectedArchitectureNodeId(node.id);
  };

  const closeArchitectureDrawer = () => {
    if (!selectedArchitectureNodeId) return;
    trackArchitectureDrawerClose(selectedArchitectureNodeId);
    setSelectedArchitectureNodeId(null);
  };

  return (
    <Box
      id="top"
      data-page-id={APLAI_CONTENT_BLUEPRINT.pageId}
      data-page-version={APLAI_CONTENT_BLUEPRINT.pageVersion}
      data-pattern-id={APLAI_CONTENT_BLUEPRINT.patternId}
      data-story-arc={APLAI_CONTENT_BLUEPRINT.storyArc}
      data-primary-artifact={APLAI_CONTENT_BLUEPRINT.primaryArtifact}
      data-blueprint-anchors={PAGE_BLUEPRINT_ANCHORS.map((item) => item.id).join(",")}
      data-mobile-layout={APLAI_CONTENT_BLUEPRINT.layoutMode.mobile}
      data-desktop-layout={APLAI_CONTENT_BLUEPRINT.layoutMode.desktop}
      data-primary-route={APLAI_CONVERSION_ARCHITECTURE.primaryRoute}
      sx={{ minHeight: "100vh", bgcolor: "background.default" }}
    >
      <Box
        component="a"
        href="#main_content"
        sx={{
          position: "absolute",
          left: 16,
          top: -48,
          px: 2,
          py: 1,
          borderRadius: 2,
          bgcolor: "background.paper",
          color: "text.primary",
          zIndex: 1300,
          textDecoration: "none",
          border: 1,
          borderColor: "divider",
          "&:focus": {
            top: 12,
          },
        }}
      >
        Перейти к содержанию
      </Box>
      <Box
        component="header"
        data-header-nav-mode={isWideHeader ? "inline" : "drawer"}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1100,
          borderBottom: 1,
          borderColor: "divider",
          backdropFilter: "blur(8px)",
          bgcolor: "background.paper",
        }}
      >
        <Container maxWidth="xl" sx={{ py: { xs: 0.875, md: 1.125 } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.75, sm: 1.25 },
              minHeight: { xs: 52, sm: 60 },
            }}
          >
            <Button
              variant="text"
              color="inherit"
              onClick={scrollToPageTop}
              sx={{
                fontWeight: 800,
                letterSpacing: "0.08em",
                minWidth: 0,
                px: 0.5,
                flexShrink: 0,
              }}
              aria-label="APLAI"
            >
              APLAI
            </Button>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Stack
                direction="row"
                spacing={0.75}
                alignItems="center"
                sx={{
                  display: isWideHeader ? "flex" : "none",
                  justifyContent: "center",
                  minWidth: 0,
                }}
              >
                {NAV_ITEMS.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeAnchorId === item.id ? "outlined" : "text"}
                    color={activeAnchorId === item.id ? "primary" : "inherit"}
                    size="small"
                    data-nav-anchor={item.id}
                    data-nav-kind={item.kind}
                    data-nav-active={activeAnchorId === item.id ? "true" : "false"}
                    onClick={() => navigateToSection(item.id)}
                    sx={{ whiteSpace: "nowrap", flexShrink: 0 }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Stack>
            </Box>

            <Stack
              direction="row"
              spacing={0.75}
              alignItems="center"
              sx={{ ml: "auto", flexShrink: 0 }}
            >
              {!isWideHeader ? (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setIsMobileMenuOpen(true)}
                  aria-label="Открыть разделы страницы"
                  startIcon={<MenuRounded fontSize="small" />}
                  sx={{
                    minWidth: { xs: 40, sm: "auto" },
                    px: { xs: 1, sm: 1.25 },
                    whiteSpace: "nowrap",
                    "& .MuiButton-startIcon": {
                      mr: { xs: 0, sm: 0.75 },
                      ml: 0,
                    },
                  }}
                >
                  <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                    Разделы
                  </Box>
                </Button>
              ) : null}
              <HeaderThemeSwitch />
              <Button
                variant="contained"
                onClick={() => openPrimaryConversionFrom(CTA_SOURCES.header)}
                size="small"
                sx={{
                  whiteSpace: "nowrap",
                  minWidth: 0,
                  px: { xs: 1.25, sm: 1.75 },
                  borderRadius: 999,
                }}
              >
                <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
                  Демо
                </Box>
                <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                  {APLAI_CONVERSION_ARCHITECTURE.primaryCta}
                </Box>
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      <Container id="main_content" maxWidth="lg" component="main" sx={{ pt: 5, pb: 8 }}>
        <Box
          id="hero"
          data-rhythm-tone={heroTone}
          sx={{
            pb: { xs: 5, md: 8 },
            ...getSectionToneSx(heroTone),
          }}
        >
          <Grid container spacing={2.5} alignItems="stretch">
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  <Chip label={APLAI_MESSAGE_MAP.hero.eyebrowPrimary} color="primary" />
                  <Chip label={APLAI_MESSAGE_MAP.hero.eyebrowSecondary} variant="outlined" />
                </Stack>
                <Typography variant="h2" component="h1">
                  {APLAI_MESSAGE_MAP.hero.heading}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {APLAI_MESSAGE_MAP.northStarPromise}
                </Typography>
                <Typography color="text.secondary">
                  {APLAI_MESSAGE_MAP.hero.summary}
                </Typography>
                <SectionMeta
                  question={heroBlueprint.question}
                  artifact={heroBlueprint.primaryArtifact}
                  tone={heroTone}
                  transition={heroBlueprint.transition}
                />
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  <Button
                    variant="contained"
                    onClick={() => openPrimaryConversionFrom(CTA_SOURCES.heroPrimary)}
                  >
                    {APLAI_CONVERSION_ARCHITECTURE.primaryCta}
                  </Button>
                  <Button
                    variant="outlined"
                    href="#demo"
                    onClick={() => trackCtaClick(CTA_SOURCES.heroDemoAnchor)}
                    >
                      {APLAI_MESSAGE_MAP.hero.secondaryCtaLabel}
                    </Button>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {APLAI_MICROCOPY.stepperHint}
                </Typography>
                <Grid container spacing={1}>
                  {APLAI_PROOF_STRIP.metrics.map((metric) => (
                    <Grid key={metric.label} size={{ xs: 12, sm: 4 }}>
                      <Card
                        elevation={0}
                        variant="outlined"
                        sx={{ height: "100%", borderRadius: 3 }}
                      >
                        <CardContent>
                          <Stack spacing={0.5}>
                            <Typography variant="h5">{metric.value}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {metric.label}
                            </Typography>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                elevation={0}
                data-hero-flow="read-only"
                data-hero-flow-active={activePipelineStep?.id ?? ""}
              >
                <CardContent>
                  <Stack spacing={1.75}>
                    <Typography variant="h6">{APLAI_PIPELINE_UX.title}</Typography>
                    <Divider />
                    <Grid container spacing={1}>
                      {APLAI_PIPELINE_UX.steps.map((step, index) => (
                        <Grid key={step.title} size={{ xs: 12, sm: 6 }}>
                          <Card
                            component="button"
                            type="button"
                            data-hero-flow-node={step.id}
                            data-pipeline-active={activePipelineStep?.id === step.id ? "true" : "false"}
                            onClick={() => setActivePipelineStepId(step.id)}
                            elevation={0}
                            variant="outlined"
                            sx={{
                              height: "100%",
                              width: "100%",
                              p: 0,
                              textAlign: "left",
                              cursor: "pointer",
                              borderRadius: 3,
                              borderColor:
                                activePipelineStep?.id === step.id ? "primary.main" : "divider",
                              bgcolor:
                                activePipelineStep?.id === step.id
                                  ? "action.hover"
                                  : "background.paper",
                            }}
                          >
                            <CardContent>
                              <Stack spacing={0.75}>
                                <Typography variant="body2" color="text.secondary">
                                  Шаг {index + 1}
                                </Typography>
                                <Typography variant="subtitle1">{step.title}</Typography>
                                <Chip label={step.time} size="small" />
                                {step.trustLayer ? (
                                  <Typography variant="caption" color="text.secondary">
                                    {step.trustLayer}
                                  </Typography>
                                ) : null}
                              </Stack>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                    <Stack spacing={0.5} data-hero-pipeline-tooltip="true">
                      <Typography variant="body2" color="text.secondary">
                        {activePipelineStep?.tooltip}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {APLAI_PIPELINE_UX.demoCaption}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {APLAI_PIPELINE_UX.skepticLine}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Box
          id="proof_strip"
          component="section"
          data-rhythm-tone={proofStripTone}
          data-section-question={proofStripBlueprint.question}
          data-section-artifact={proofStripBlueprint.primaryArtifact}
          data-section-transition={proofStripBlueprint.transition ?? ""}
          sx={{
            py: { xs: 5, md: 7 },
            scrollMarginTop: { xs: 88, md: 104 },
          }}
        >
          <Box sx={getSectionToneSx(proofStripTone)}>
            <Stack spacing={2.5}>
              <Stack spacing={0.75}>
                <Typography variant="h5" component="h2">
                  {APLAI_PROOF_STRIP.sectionTitle}
                </Typography>
                <Typography color="text.secondary">
                  {APLAI_PROOF_STRIP.sectionLead}
                </Typography>
              </Stack>
              <Grid container spacing={2}>
                {APLAI_PROOF_STRIP.metrics.map((metric) => (
                  <Grid key={metric.label} size={{ xs: 12, md: 4 }}>
                    <Card elevation={0} variant="outlined" sx={{ height: "100%", borderRadius: 3 }}>
                      <CardContent>
                        <Stack spacing={0.75}>
                          <Typography variant="h3">{metric.value}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {metric.label}
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {APLAI_PROOF_STRIP.trustBadges.map((item) => (
                  <Chip key={item} label={item} size="small" variant="outlined" />
                ))}
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Section
          id="problem"
          title={APLAI_PROBLEM_SECTION.title}
          question={problemBlueprint.question}
          artifact={problemBlueprint.primaryArtifact}
          tone={getSectionTone("problem")}
          subtitle={APLAI_PROBLEM_SECTION.lead}
          transition={problemBlueprint.transition}
        >
          <Stack spacing={2}>
            <Grid container spacing={2}>
              {APLAI_PROBLEM_SECTION.cards.map((item) => (
                <Grid key={item.title} size={{ xs: 12, md: 6 }}>
                  <Card elevation={0} variant="outlined" sx={{ height: "100%" }}>
                    <CardContent>
                      <Stack spacing={1}>
                        <Typography variant="h6">{item.title}</Typography>
                        <Typography color="text.secondary">{item.summary}</Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Card elevation={0} variant="outlined">
              <CardContent>
                <Stack spacing={1.5}>
                  <Typography variant="subtitle1">{APLAI_PROBLEM_SECTION.callout}</Typography>
                  <Button
                    variant="text"
                    onClick={() => {
                      trackCtaClick(CTA_SOURCES.problemToHow);
                      navigateToSection("how_it_works");
                    }}
                    sx={{ alignSelf: "flex-start" }}
                  >
                    {APLAI_PROBLEM_SECTION.bridgeLabel}
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Section>

        <Section
          id="outcomes"
          title={APLAI_OUTCOMES_SECTION.title}
          question={outcomesBlueprint.question}
          artifact={outcomesBlueprint.primaryArtifact}
          tone={getSectionTone("outcomes")}
          subtitle={APLAI_OUTCOMES_SECTION.lead}
          transition={outcomesBlueprint.transition}
        >
          <Stack spacing={2}>
            <Grid container spacing={2}>
              {APLAI_OUTCOMES_SECTION.cards.map((item) => (
                <Grid key={item.title} size={{ xs: 12, md: 4 }}>
                  <Card elevation={0} variant="outlined" sx={{ height: "100%" }}>
                    <CardContent>
                      <Stack spacing={1}>
                        <Typography variant="h6">{item.title}</Typography>
                        <Typography color="text.secondary">{item.summary}</Typography>
                        {item.detail && (
                          <Typography variant="body2" color="text.secondary">
                            {item.detail}
                          </Typography>
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Typography variant="body2" color="text.secondary">
              {APLAI_OUTCOMES_SECTION.supportLine}
            </Typography>
            <Button
              variant="text"
              onClick={() => {
                trackCtaClick(CTA_SOURCES.outcomesToHow);
                navigateToSection("how_it_works");
              }}
              sx={{ alignSelf: "flex-start" }}
            >
              {APLAI_OUTCOMES_SECTION.bridgeLabel}
            </Button>
          </Stack>
        </Section>

        <Section
          id="mechanism"
          title={APLAI_MECHANISM_SECTION.title}
          question={mechanismBlueprint.question}
          artifact={mechanismBlueprint.primaryArtifact}
          tone={getSectionTone("mechanism")}
          subtitle={APLAI_MECHANISM_SECTION.lead}
          transition={mechanismBlueprint.transition}
        >
          <Stack spacing={2}>
            <Grid container spacing={2}>
              {APLAI_MECHANISM_SECTION.cards.map((item) => (
                <Grid key={item.title} size={{ xs: 12, md: 4 }}>
                  <Card elevation={0} variant="outlined" sx={{ height: "100%" }}>
                    <CardContent>
                      <Stack spacing={1}>
                        <Typography variant="h6">{item.title}</Typography>
                        <Typography color="text.secondary">{item.summary}</Typography>
                        {item.detail && (
                          <Typography variant="body2" color="text.secondary">
                            {item.detail}
                          </Typography>
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Typography variant="body2" color="text.secondary">
              {APLAI_MECHANISM_SECTION.supportLine}
            </Typography>
            <Button
              variant="text"
              onClick={() => {
                trackCtaClick(CTA_SOURCES.mechanismToArchitecture);
                navigateToSection("architecture");
              }}
              sx={{ alignSelf: "flex-start" }}
            >
              {APLAI_MECHANISM_SECTION.bridgeLabel}
            </Button>
          </Stack>
        </Section>

        <Section
          id="who_its_for"
          title={APLAI_ICP_PACK.narrative.title}
          question={getBlueprintSection("who_its_for").question}
          artifact={getBlueprintSection("who_its_for").primaryArtifact}
          tone={getSectionTone("who_its_for")}
          subtitle={APLAI_ICP_PACK.narrative.subtitle}
          transition={getBlueprintSection("who_its_for").transition}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, lg: 8 }}>
              <Grid container spacing={2}>
                {APLAI_ICP_PACK.segments.map((segment) => (
                  <Grid key={segment.id} size={{ xs: 12, md: 6 }}>
                    <Card elevation={0} variant="outlined" sx={{ height: "100%" }}>
                      <CardContent>
                        <Stack spacing={1.5}>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            useFlexGap
                            flexWrap="wrap"
                          >
                            <IcpTierChip tier={segment.tier} />
                            <Chip label={segment.preferredCta} size="small" variant="outlined" />
                          </Stack>
                          <Typography variant="h6">{segment.title}</Typography>
                          <Typography color="text.secondary">{segment.scenario}</Typography>
                          <Stack spacing={0.5}>
                            {segment.focus.map((item) => (
                              <Typography key={item} variant="body2">
                                • {item}
                              </Typography>
                            ))}
                          </Stack>
                          <Typography variant="body2" color="text.secondary">
                            Триггеры: {segment.triggers.join(", ")}
                          </Typography>
                          <Typography variant="body2">{segment.objection}</Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid size={{ xs: 12, lg: 4 }}>
              <Stack spacing={2}>
                <Card elevation={0} variant="outlined">
                  <CardContent>
                    <Stack spacing={1.5}>
                      <Typography variant="h6">2-layer audience</Typography>
                      <Typography color="text.secondary">
                        {APLAI_ICP_PACK.narrative.businessLayer}
                      </Typography>
                      <Typography color="text.secondary">
                        {APLAI_ICP_PACK.narrative.technicalLayer}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
                {APLAI_ICP_PACK.qualification.map((band) => (
                  <Card key={band.label} elevation={0} variant="outlined">
                    <CardContent>
                      <Stack spacing={1}>
                        <Typography variant="h6">{band.label}</Typography>
                        {band.summary.map((item) => (
                          <Typography key={item} variant="body2" color="text.secondary">
                            • {item}
                          </Typography>
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
                <Card elevation={0} variant="outlined">
                  <CardContent>
                    <Stack spacing={1}>
                      <Typography variant="h6">Must-have сигналы</Typography>
                      {APLAI_ICP_PACK.mustHaves.map((item) => (
                        <Typography key={item} variant="body2" color="text.secondary">
                          • {item}
                        </Typography>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Section>

        <Section
          id="value_prop"
          title="Ценность APLAI"
          question={getBlueprintSection("value_prop").question}
          artifact={getBlueprintSection("value_prop").primaryArtifact}
          tone={getSectionTone("value_prop")}
          subtitle={APLAI_VALUE_PROPOSITION.northStarOutcome}
          transition={getBlueprintSection("value_prop").transition}
        >
          <Stack spacing={2}>
            <Typography variant="body2" color="text.secondary">
              {APLAI_VALUE_PROP_SECTION.positioningLine}
            </Typography>
            <Card elevation={0}>
              <CardContent>
                <Typography variant="h6">{APLAI_VALUE_PROPOSITION.oneLiner}</Typography>
              </CardContent>
            </Card>

            <Grid container spacing={2}>
              {APLAI_VALUE_PROPOSITION.pillars.map((pillar) => (
                <Grid key={pillar.id} size={{ xs: 12, md: 4 }}>
                  <Card elevation={0} variant="outlined" sx={{ height: "100%" }}>
                    <CardContent>
                      <Stack spacing={1.5}>
                        <Typography variant="h6">{pillar.title}</Typography>
                        <Typography>{pillar.promise}</Typography>
                        <Typography color="text.secondary">{pillar.outcome}</Typography>
                        <Stack spacing={0.5}>
                          {pillar.language.map((item) => (
                            <Typography key={item} variant="body2">
                              • {item}
                            </Typography>
                          ))}
                        </Stack>
                        {pillar.trustLayer && (
                          <Typography variant="body2" color="text.secondary">
                            {pillar.trustLayer}
                          </Typography>
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, lg: 6 }}>
                <Card elevation={0} variant="outlined" sx={{ height: "100%" }}>
                  <CardContent>
                    <Stack spacing={1.5}>
                      <Typography variant="h6">Proof stack</Typography>
                      {APLAI_VALUE_PROPOSITION.proofStack.map((item) => (
                        <Stack key={item.title} spacing={0.25}>
                          <Typography variant="subtitle2">{item.title}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.summary}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, lg: 6 }}>
                <Stack spacing={2}>
                  <Card elevation={0} variant="outlined">
                    <CardContent>
                      <Stack spacing={1.5}>
                        <Typography variant="h6">Risk reversal</Typography>
                        {APLAI_VALUE_PROPOSITION.riskReversal.map((item) => (
                          <Stack key={item.risk} spacing={0.25}>
                            <Typography variant="subtitle2">{item.risk}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.statement}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                  <Card elevation={0} variant="outlined">
                    <CardContent>
                      <Stack spacing={1}>
                        <Typography variant="h6">Границы применимости</Typography>
                        {APLAI_VALUE_PROPOSITION.boundaries.map((item) => (
                          <Typography key={item} variant="body2" color="text.secondary">
                            • {item}
                          </Typography>
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
            <Button
              variant="text"
              onClick={() => {
                trackCtaClick(CTA_SOURCES.valueToMechanism);
                navigateToSection("mechanism");
              }}
              sx={{ alignSelf: "flex-start" }}
            >
              {APLAI_VALUE_PROP_SECTION.bridgeLabel}
            </Button>
          </Stack>
        </Section>

        <Section
          id="how_it_works"
          title={APLAI_HOW_IT_WORKS_SECTION.title}
          question={getBlueprintSection("how_it_works").question}
          artifact={getBlueprintSection("how_it_works").primaryArtifact}
          tone={getSectionTone("how_it_works")}
          subtitle={APLAI_HOW_IT_WORKS_SECTION.lead}
          transition={getBlueprintSection("how_it_works").transition}
        >
          <Stack spacing={2}>
            <Grid container spacing={2}>
              {APLAI_HOW_IT_WORKS_SECTION.steps.map((step) => (
                <Grid key={step.id} size={{ xs: 12, md: 3 }}>
                  <Card elevation={0} variant="outlined" sx={{ height: "100%" }}>
                    <CardContent>
                      <Stack spacing={1}>
                        <Stack direction="row" spacing={1} alignItems="center" useFlexGap flexWrap="wrap">
                          <Typography variant="subtitle1">{step.title}</Typography>
                          <Chip label={step.time} size="small" />
                        </Stack>
                        <Typography color="text.secondary">{step.summary}</Typography>
                        {step.trustLayer && (
                          <Typography variant="body2" color="text.secondary">
                            {step.trustLayer}
                          </Typography>
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Typography variant="body2" color="text.secondary">
              {APLAI_HOW_IT_WORKS_SECTION.footnote}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {APLAI_MICROCOPY.stepperHint}
            </Typography>
            <Button
              variant="text"
              onClick={() => {
                trackCtaClick(CTA_SOURCES.howToDemo);
                navigateToSection("demo");
              }}
              sx={{ alignSelf: "flex-start" }}
            >
              {APLAI_HOW_IT_WORKS_SECTION.bridgeLabel}
            </Button>
          </Stack>
        </Section>

        <Section
          id="architecture"
          title={APLAI_ARCHITECTURE_SECTION.title}
          question={getBlueprintSection("architecture").question}
          artifact={getBlueprintSection("architecture").primaryArtifact}
          tone={getSectionTone("architecture")}
          subtitle={APLAI_ARCHITECTURE_SECTION.lead}
          transition={getBlueprintSection("architecture").transition}
        >
          <Stack spacing={2}>
            <Typography variant="body2" color="text.secondary">
              {APLAI_ARCHITECTURE_SECTION.helperHint}
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, lg: 8 }}>
                <Card elevation={0} variant="outlined" sx={{ height: "100%" }}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Stack spacing={0.5}>
                        <Typography variant="h6">{APLAI_ARCHITECTURE_SECTION.sceneTitle}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {APLAI_ARCHITECTURE_SECTION.sceneSummary}
                        </Typography>
                      </Stack>
                      <Card elevation={0} sx={{ bgcolor: "action.hover" }}>
                        <CardContent>
                          <Stack spacing={0.5} alignItems="flex-start">
                            <Typography variant="subtitle1">
                              {APLAI_ARCHITECTURE_SECTION.coreTitle}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {APLAI_ARCHITECTURE_SECTION.coreSubtitle}
                            </Typography>
                          </Stack>
                        </CardContent>
                      </Card>
                      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                        {APLAI_ARCHITECTURE_SECTION.zoneLabels.map((item) => (
                          <Chip key={item} label={item} size="small" variant="outlined" />
                        ))}
                      </Stack>
                      <Grid container spacing={1.5}>
                        {APLAI_ARCHITECTURE_SECTION.nodes.map((node) => (
                          <Grid key={node.id} size={{ xs: 12, sm: 6, md: 4 }}>
                            <Button
                              data-architecture-node={node.id}
                              data-architecture-optional={node.optional ? "true" : "false"}
                              fullWidth
                              variant={
                                selectedArchitectureNodeId === node.id ? "contained" : "outlined"
                              }
                              color="inherit"
                              onClick={() => openArchitectureNode(node.id)}
                              sx={{
                                justifyContent: "flex-start",
                                px: 1.5,
                                py: 1.25,
                                textTransform: "none",
                                borderRadius: 3,
                              }}
                            >
                              <Stack spacing={0.25} alignItems="flex-start">
                                <Typography variant="caption" color="text.secondary">
                                  {node.group}
                                </Typography>
                                <Stack
                                  direction="row"
                                  spacing={0.75}
                                  useFlexGap
                                  flexWrap="wrap"
                                  alignItems="center"
                                >
                                  <Typography variant="body2" align="left">
                                    {node.label}
                                  </Typography>
                                  {node.optional ? (
                                    <Chip
                                      aria-hidden
                                      label={APLAI_ARCHITECTURE_SECTION.optionalBadgeLabel}
                                      size="small"
                                      variant="outlined"
                                    />
                                  ) : null}
                                </Stack>
                              </Stack>
                            </Button>
                          </Grid>
                        ))}
                      </Grid>
                      <Typography variant="body2" color="text.secondary">
                        {APLAI_MICROCOPY.architectureHint}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, lg: 4 }}>
                <Stack spacing={2}>
                  <Card elevation={0} variant="outlined">
                    <CardContent>
                      <Stack spacing={1.5}>
                        <Typography variant="subtitle1" color="primary.main">
                          {APLAI_ARCHITECTURE_SECTION.trustLine}
                        </Typography>
                        {APLAI_ARCHITECTURE_SECTION.supportBullets.map((item) => (
                          <Typography key={item} variant="body2" color="text.secondary">
                            • {item}
                          </Typography>
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                  <VendorLockNotice />
                </Stack>
              </Grid>
            </Grid>
            <Drawer
              anchor="left"
              open={Boolean(selectedArchitectureNode)}
              onClose={closeArchitectureDrawer}
              ModalProps={{ keepMounted: true }}
              PaperProps={{
                sx: {
                  width: { xs: "100%", sm: 420 },
                  maxWidth: "100%",
                },
              }}
            >
              {selectedArchitectureNode && (
                <Box
                  data-architecture-drawer="true"
                  data-architecture-node-active={selectedArchitectureNode.id}
                  sx={{ width: "100%" }}
                >
                  <DialogTitle>{selectedArchitectureNode.label}</DialogTitle>
                  <DialogContent dividers>
                    <Stack spacing={2}>
                      <Typography variant="body2" color="text.secondary">
                        {selectedArchitectureNode.summary}
                      </Typography>
                      {selectedArchitectureNode.optional ? (
                        <Chip
                          label={APLAI_ARCHITECTURE_SECTION.optionalBadgeLabel}
                          size="small"
                          variant="outlined"
                          sx={{ alignSelf: "flex-start" }}
                        />
                      ) : null}
                      <Stack spacing={0.75}>
                        <Typography variant="caption" color="text.secondary">
                          {APLAI_ARCHITECTURE_SECTION.drawerLabels.connect}
                        </Typography>
                        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                          {selectedArchitectureNode.connect.map((item) => (
                            <Chip key={item} label={item} size="small" variant="outlined" />
                          ))}
                        </Stack>
                      </Stack>
                      <Stack spacing={0.75}>
                        <Typography variant="subtitle2">
                          {APLAI_ARCHITECTURE_SECTION.drawerLabels.why}
                        </Typography>
                        {selectedArchitectureNode.why.map((item) => (
                          <Typography key={item} variant="body2" color="text.secondary">
                            • {item}
                          </Typography>
                        ))}
                      </Stack>
                      <Stack spacing={0.75}>
                        <Typography variant="subtitle2">
                          {APLAI_ARCHITECTURE_SECTION.drawerLabels.outcome}
                        </Typography>
                        {selectedArchitectureNode.outcome.map((item) => (
                          <Typography key={item} variant="body2" color="text.secondary">
                            • {item}
                          </Typography>
                        ))}
                      </Stack>
                      <Stack spacing={0.75}>
                        <Typography variant="subtitle2">
                          {APLAI_ARCHITECTURE_SECTION.drawerLabels.fromYou}
                        </Typography>
                        {selectedArchitectureNode.fromYou.map((item) => (
                          <Typography key={item} variant="body2" color="text.secondary">
                            • {item}
                          </Typography>
                        ))}
                      </Stack>
                      <Button
                        variant="text"
                        onClick={closeArchitectureDrawer}
                        sx={{ alignSelf: "flex-start" }}
                      >
                        Закрыть
                      </Button>
                    </Stack>
                  </DialogContent>
                </Box>
              )}
            </Drawer>
          </Stack>
        </Section>

        <Section
          id="demo"
          title={APLAI_MESSAGE_MAP.demo.title}
          question={getBlueprintSection("demo").question}
          artifact={getBlueprintSection("demo").primaryArtifact}
          tone={getSectionTone("demo")}
          subtitle={APLAI_MESSAGE_MAP.demo.subtitle}
          transition={getBlueprintSection("demo").transition}
        >
          <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, lg: 5 }}>
                <Card elevation={0} variant="outlined" sx={{ height: "100%" }}>
                  <CardContent>
                    <Stack spacing={1.75}>
                      <Chip
                        label={APLAI_DEMO_ANCHOR.badge}
                        size="small"
                        sx={{ alignSelf: "flex-start" }}
                      />
                      <Stack spacing={0.75}>
                        <Typography variant="caption" color="text.secondary">
                          Якорный сценарий: {APLAI_DEMO_NARRATIVE.anchorScenario.title}
                        </Typography>
                        <Typography variant="h6">Один сценарий, который легко проверить</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {APLAI_DEMO_NARRATIVE.anchorScenario.process}
                        </Typography>
                      </Stack>
                      <Grid container spacing={1}>
                        {APLAI_DEMO_NARRATIVE.promiseCards.map((card) => (
                          <Grid key={card.label} size={{ xs: 12, sm: 6 }}>
                            <Card
                              elevation={0}
                              variant="outlined"
                              sx={{ height: "100%", borderRadius: 3 }}
                            >
                              <CardContent>
                                <Stack spacing={0.5}>
                                  <Typography variant="caption" color="text.secondary">
                                    {card.label}
                                  </Typography>
                                  <Typography variant="subtitle2">{card.value}</Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {card.detail}
                                  </Typography>
                                </Stack>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                      <Stack spacing={0.5}>
                        {APLAI_DEMO_ANCHOR.bullets.map((item) => (
                          <Typography key={item} variant="body2" color="text.secondary">
                            • {item}
                          </Typography>
                        ))}
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        {APLAI_DEMO_ANCHOR.supportLine}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, lg: 7 }}>
                <Stack spacing={2}>
                  <Card elevation={0} variant="outlined">
                    <CardContent>
                      <Stack spacing={1.5}>
                        <Typography variant="h6">{APLAI_DEMO_ANCHOR.processTitle}</Typography>
                        {APLAI_DEMO_ANCHOR.processSteps.map((step, index) => (
                          <Stack key={step.title} spacing={0.25}>
                            <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                              useFlexGap
                              flexWrap="wrap"
                            >
                              <Chip
                                label={APLAI_DEMO_NARRATIVE.stages[index + 1]?.time ?? ""}
                                size="small"
                              />
                              <Typography variant="subtitle2">{step.title}</Typography>
                            </Stack>
                            <Typography variant="body2" color="text.secondary">
                              {step.summary}
                            </Typography>
                          </Stack>
                        ))}
                        <Typography variant="caption" color="text.secondary">
                          {APLAI_MICROCOPY.templatesHint}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                  <Card elevation={0} variant="outlined">
                    <CardContent>
                      <Stack spacing={1}>
                        <Typography variant="h6">{APLAI_DEMO_ANCHOR.resultTitle}</Typography>
                        {APLAI_DEMO_ANCHOR.resultItems.map((item) => (
                          <Typography key={item} variant="body2" color="text.secondary">
                            • {item}
                          </Typography>
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
            <Card elevation={0} variant="outlined">
              <CardContent>
                <Stack spacing={1}>
                  <Typography variant="h6">Что у вас остается после демо</Typography>
                  {APLAI_DEMO_NARRATIVE.takeaways.map((item) => (
                    <Typography key={item} variant="body2" color="text.secondary">
                      • {item}
                    </Typography>
                  ))}
                </Stack>
              </CardContent>
            </Card>
            <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
              <Button
                variant="contained"
                onClick={() => openPrimaryConversionFrom(CTA_SOURCES.demoSection)}
              >
                {APLAI_CONVERSION_ARCHITECTURE.primaryCta}
              </Button>
              <Button
                variant="outlined"
                onClick={() => routeToFinalSection(CTA_SOURCES.demoSecondaryPilot)}
              >
                {APLAI_DEMO_ANCHOR.secondaryCtaLabel}
              </Button>
            </Stack>
            <Typography variant="caption" color="text.secondary">
              Если ваш сценарий отличается, используем демо как короткую калибровку перед пилотом,
              а не как жесткий шаблон.
            </Typography>
          </Stack>
        </Section>

        <Section
          id="templates"
          title={APLAI_TEMPLATES_GALLERY.title}
          question={getBlueprintSection("templates").question}
          artifact={getBlueprintSection("templates").primaryArtifact}
          tone={getSectionTone("templates")}
          subtitle={APLAI_TEMPLATES_GALLERY.subtitle}
          transition={getBlueprintSection("templates").transition}
        >
          <Stack spacing={2}>
            <Grid container spacing={2}>
              {APLAI_TEMPLATES_GALLERY.items.map((template) => (
                <Grid key={template.id} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card elevation={0} variant="outlined" sx={{ height: "100%", borderRadius: 3 }}>
                    <CardContent>
                      <Stack spacing={1.25}>
                        <Typography variant="subtitle1">{template.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {template.subtitle}
                        </Typography>
                        {template.secondaryLine && (
                          <Typography variant="caption" color="text.secondary">
                            {template.secondaryLine}
                          </Typography>
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                {APLAI_TEMPLATES_GALLERY.supportLine}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {APLAI_TRUST_CONTENT_POLICY.disclosure}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => routeToFinalSection(CTA_SOURCES.templatesPilot)}
                sx={{ alignSelf: "flex-start" }}
              >
                {APLAI_TEMPLATES_GALLERY.secondaryCtaLabel}
              </Button>
            </Stack>
          </Stack>
        </Section>

        <Section
          id="not_low_code"
          title={APLAI_NOT_LOW_CODE_SECTION.title}
          question={notLowCodeBlueprint.question}
          artifact={notLowCodeBlueprint.primaryArtifact}
          tone={getSectionTone("not_low_code")}
          subtitle={APLAI_NOT_LOW_CODE_SECTION.lead}
          transition={notLowCodeBlueprint.transition}
        >
          <Stack spacing={2}>
            <Typography variant="body2" color="text.secondary">
              {APLAI_NOT_LOW_CODE_SECTION.disclaimer}
            </Typography>
            <Grid container spacing={2}>
              {APLAI_NOT_LOW_CODE_SECTION.columns.map((column) => (
                <Grid key={column.title} size={{ xs: 12, md: 6 }}>
                  <Card elevation={0} variant="outlined" sx={{ height: "100%" }}>
                    <CardContent>
                      <Stack spacing={1.5}>
                        <Typography variant="h6">{column.title}</Typography>
                        <Typography color="text.secondary">{column.summary}</Typography>
                        <Stack spacing={0.5}>
                          {column.points.map((item) => (
                            <Typography key={item} variant="body2" color="text.secondary">
                              • {item}
                            </Typography>
                          ))}
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Card elevation={0} variant="outlined">
              <CardContent>
                <Stack spacing={1.5}>
                  <Typography variant="h6">
                    {APLAI_NOT_LOW_CODE_SECTION.whenToChooseTitle}
                  </Typography>
                  {APLAI_NOT_LOW_CODE_SECTION.whenToChoose.map((item) => (
                    <Typography key={item} variant="body2" color="text.secondary">
                      • {item}
                    </Typography>
                  ))}
                  <Button
                    variant="text"
                    onClick={() => {
                      trackCtaClick(CTA_SOURCES.notLowCodeToGuarantees);
                      navigateToSection("guarantees");
                    }}
                    sx={{ alignSelf: "flex-start" }}
                  >
                    {APLAI_NOT_LOW_CODE_SECTION.bridgeLabel}
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Section>

        {APLAI_SOCIAL_PROOF.enabled ? (
          <Section
            id="social_proof"
            title={APLAI_SOCIAL_PROOF.title}
            question={socialProofBlueprint.question}
            artifact={socialProofBlueprint.primaryArtifact}
            tone={getSectionTone("social_proof")}
            subtitle={APLAI_SOCIAL_PROOF.subtitle}
            transition={socialProofBlueprint.transition}
          >
            <Stack spacing={1.5}>
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                flexWrap="wrap"
                data-social-proof="quiet"
              >
                {APLAI_SOCIAL_PROOF.items.map((item) => (
                  <Chip key={item} label={item} size="small" variant="outlined" />
                ))}
              </Stack>
              <Button
                variant="text"
                onClick={() => {
                  trackCtaClick(CTA_SOURCES.socialToShowcase);
                  navigateToSection("trust_showcase");
                }}
                sx={{ alignSelf: "flex-start" }}
              >
                {APLAI_SOCIAL_PROOF.linkLabel}
              </Button>
            </Stack>
          </Section>
        ) : null}

        <Section
          id="trust_showcase"
          title={APLAI_TRUST_SHOWCASE.title}
          question={getBlueprintSection("trust_showcase").question}
          artifact={getBlueprintSection("trust_showcase").primaryArtifact}
          tone={getSectionTone("trust_showcase")}
          subtitle={APLAI_TRUST_SHOWCASE.lead}
          transition={getBlueprintSection("trust_showcase").transition}
        >
          <Card
            elevation={0}
            variant="outlined"
            data-trust-policy={APLAI_TRUST_CONTENT_POLICY.publicMode}
            sx={{
              borderRadius: 4,
              borderColor: "primary.light",
              bgcolor: "grey.900",
              color: "common.white",
              backgroundImage:
                "linear-gradient(135deg, rgba(15, 23, 42, 1) 0%, rgba(30, 41, 59, 0.94) 55%, rgba(25, 118, 210, 0.38) 100%)",
            }}
          >
            <CardContent>
              <Grid container spacing={2.5} alignItems="stretch">
                <Grid size={{ xs: 12, lg: 5 }}>
                  <Stack spacing={1.5}>
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                      <Chip
                        label={`Mode ${APLAI_TRUST_CONTENT_POLICY.publicMode}`}
                        size="small"
                        variant="outlined"
                        sx={{ color: "common.white", borderColor: "rgba(255,255,255,0.35)" }}
                      />
                      <Chip
                        label="Без логотипов и названий"
                        size="small"
                        variant="outlined"
                        sx={{ color: "common.white", borderColor: "rgba(255,255,255,0.35)" }}
                      />
                    </Stack>
                    <Typography variant="subtitle1">
                      Проверяемость важнее громких кейсов
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.8)" }}>
                      {APLAI_TRUST_SHOWCASE.proofLine}
                    </Typography>
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                      {APLAI_TRUST_SHOWCASE.proofLayers.map((item) => (
                        <Chip
                          key={item}
                          label={item}
                          size="small"
                          variant="outlined"
                          sx={{ color: "common.white", borderColor: "rgba(255,255,255,0.24)" }}
                        />
                      ))}
                    </Stack>
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                      {APLAI_TRUST_SHOWCASE.safeSignals.map((item) => (
                        <Chip
                          key={item}
                          label={item}
                          size="small"
                          variant="outlined"
                          sx={{ color: "common.white", borderColor: "rgba(255,255,255,0.24)" }}
                        />
                      ))}
                    </Stack>
                    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.72)" }}>
                      {APLAI_TRUST_SHOWCASE.disclosure}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, lg: 7 }}>
                  <Stack spacing={1.5}>
                    <Grid container spacing={1.5}>
                      {APLAI_TRUST_SHOWCASE.contexts.map((item) => (
                        <Grid key={item.title} size={{ xs: 12, md: 4 }}>
                          <Card
                            elevation={0}
                            variant="outlined"
                            sx={{
                              height: "100%",
                              borderRadius: 3,
                              bgcolor: "rgba(255,255,255,0.06)",
                              borderColor: "rgba(255,255,255,0.16)",
                              color: "common.white",
                            }}
                          >
                            <CardContent>
                              <Stack spacing={0.75}>
                                <Typography variant="subtitle2">{item.title}</Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ color: "rgba(255,255,255,0.78)" }}
                                >
                                  {item.summary}
                                </Typography>
                              </Stack>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                    <Button
                      variant="contained"
                      onClick={() => routeToFinalSection(CTA_SOURCES.trustShowcasePilot)}
                      sx={{ alignSelf: "flex-start" }}
                    >
                      {APLAI_TRUST_SHOWCASE.ctaLabel}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Section>

        <Section
          id="guarantees"
          title={APLAI_GUARANTEES_SECTION.title}
          question={getBlueprintSection("guarantees").question}
          artifact={getBlueprintSection("guarantees").primaryArtifact}
          tone={getSectionTone("guarantees")}
          subtitle={APLAI_GUARANTEES_SECTION.subtitle}
          transition={getBlueprintSection("guarantees").transition}
        >
          <Stack spacing={2}>
            <Grid container spacing={2}>
              {APLAI_GUARANTEES_SECTION.cards.map((item) => (
                <Grid key={item.id} size={{ xs: 12, md: 6 }}>
                  <TextCard>
                    <Stack spacing={1.25}>
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.summary}
                      </Typography>
                      {item.secondaryLine ? (
                        <Typography variant="caption" color="text.secondary">
                          {item.secondaryLine}
                        </Typography>
                      ) : null}
                    </Stack>
                  </TextCard>
                </Grid>
              ))}
            </Grid>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {APLAI_GUARANTEES_SECTION.riskSignals.map((item) => (
                <Chip key={item.id} label={item.label} size="small" variant="outlined" />
              ))}
            </Stack>
            <Stack spacing={1}>
              <Typography variant="caption" color="text.secondary">
                {APLAI_GUARANTEES_SECTION.detailsHint}
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                <Button
                  variant="outlined"
                  onClick={() => openPrimaryConversionFrom(CTA_SOURCES.guaranteesPrimary)}
                >
                  {APLAI_GUARANTEES_SECTION.primaryCtaLabel}
                </Button>
                <Button
                  variant="text"
                  onClick={() => {
                    trackCtaClick(CTA_SOURCES.guaranteesToFaq);
                    navigateToSection("faq");
                  }}
                >
                  {APLAI_GUARANTEES_SECTION.secondaryCtaLabel}
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Section>

        <Section
          id="faq"
          title={APLAI_FAQ_SECTION.title}
          question={getBlueprintSection("faq").question}
          artifact={getBlueprintSection("faq").primaryArtifact}
          tone={getSectionTone("faq")}
          subtitle={APLAI_FAQ_SECTION.subtitle}
          transition={getBlueprintSection("faq").transition}
        >
          <Stack spacing={1.25}>
            <Typography variant="body2" color="text.secondary">
              {APLAI_FAQ_SECTION.hint}
            </Typography>
            {APLAI_FAQ_SECTION.items.map((item) => (
              <Accordion
                key={item.id}
                elevation={0}
                disableGutters
                expanded={expandedFaqId === item.id}
                onChange={(_, isExpanded) => {
                  setExpandedFaqId(isExpanded ? item.id : false);
                  if (isExpanded) {
                    trackFaqExpand(item.id);
                  }
                }}
                sx={{
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 3,
                  "&::before": { display: "none" },
                }}
              >
                <AccordionSummary>
                  <Typography variant="subtitle1">{item.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={1}>
                    <Typography color="text.secondary">{item.answer}</Typography>
                    {item.detailsLabel && item.detailsTarget ? (
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => {
                          const detailsTarget = item.detailsTarget;
                          if (!detailsTarget) {
                            return;
                          }
                          trackCtaClick(CTA_SOURCES.faqDetailsLink);
                          navigateToSection(detailsTarget);
                        }}
                        sx={{ alignSelf: "flex-start", px: 0 }}
                      >
                        {item.detailsLabel}
                      </Button>
                    ) : null}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            ))}
            {FAQ_RETURN_POINT && (
              <Box sx={{ pt: 1 }}>
                <Stack spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    {FAQ_RETURN_POINT.reason}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => routeToFinalSection(CTA_SOURCES.faqReturn)}
                    sx={{ alignSelf: "flex-start" }}
                  >
                    {APLAI_CONVERSION_ARCHITECTURE.secondaryCta}
                  </Button>
                </Stack>
              </Box>
            )}
          </Stack>
        </Section>

        <Section
          id="roadmap"
          title={APLAI_ROADMAP_SECTION.title}
          question={roadmapBlueprint.question}
          artifact={roadmapBlueprint.primaryArtifact}
          tone={getSectionTone("roadmap")}
          subtitle={APLAI_ROADMAP_SECTION.lead}
          transition={roadmapBlueprint.transition}
        >
          <Stack spacing={2}>
            <Grid container spacing={2}>
              {APLAI_ROADMAP_SECTION.lanes.map((lane) => (
                <Grid key={lane.id} size={{ xs: 12, md: 4 }}>
                  <Card elevation={0} variant="outlined" sx={{ height: "100%" }}>
                    <CardContent>
                      <Stack spacing={1.25}>
                        <Typography variant="h6">{lane.title}</Typography>
                        {lane.items.map((item) => (
                          <Typography key={item} variant="body2" color="text.secondary">
                            • {item}
                          </Typography>
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                {APLAI_ROADMAP_SECTION.disclaimer}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => routeToFinalSection(CTA_SOURCES.roadmapPrimary)}
                sx={{ alignSelf: "flex-start" }}
              >
                {APLAI_CONVERSION_ARCHITECTURE.secondaryCta}
              </Button>
              <Typography variant="caption" color="text.secondary">
                {APLAI_ROADMAP_SECTION.ctaNote}
              </Typography>
            </Stack>
          </Stack>
        </Section>

        <Section
          id="final_cta"
          title={APLAI_MESSAGE_MAP.finalCta.title}
          question={getBlueprintSection("final_cta").question}
          artifact={getBlueprintSection("final_cta").primaryArtifact}
          tone={getSectionTone("final_cta")}
          subtitle={APLAI_MESSAGE_MAP.finalCta.subtitle}
          transition={getBlueprintSection("final_cta").transition}
        >
          <Stack spacing={2}>
            <Typography variant="body2" color="text.secondary">
              {APLAI_MICROCOPY.whatsNextCompact}
            </Typography>
            <Card elevation={0} variant="outlined">
              <CardContent>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, lg: 5 }}>
                    <Stack spacing={1.25}>
                      <Typography variant="h6">{APLAI_PILOT_OFFER.title}</Typography>
                      <Typography color="text.secondary">
                        {APLAI_PILOT_OFFER.promise}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6, lg: 3.5 }}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle2">Когда это имеет смысл</Typography>
                      {APLAI_PILOT_OFFER.fit.map((item) => (
                        <Typography key={item} variant="body2" color="text.secondary">
                          • {item}
                        </Typography>
                      ))}
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6, lg: 3.5 }}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle2">Когда это не подходит</Typography>
                      {APLAI_PILOT_OFFER.notFit.map((item) => (
                        <Typography key={item} variant="body2" color="text.secondary">
                          • {item}
                        </Typography>
                      ))}
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, lg: 7 }}>
                <Card elevation={0} variant="outlined" sx={{ borderRadius: 4 }}>
                  <CardContent>
                    <LeadCaptureForm
                      context="inline"
                      onFirstFieldFocus={trackInlineFormOpen}
                      onDirectContactClick={() =>
                        trackCtaClick(CTA_SOURCES.finalCtaInlineDirect)
                      }
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, lg: 5 }}>
                <Stack spacing={2}>
                  <Card elevation={0} variant="outlined">
                    <CardContent>
                      <Stack spacing={1.5}>
                        <Typography variant="h6">Что произойдет после заявки</Typography>
                        <Typography color="text.secondary">
                          Коротко согласуем контекст, проведем демо и зафиксируем, нужен ли
                          пилот и в каком объеме.
                        </Typography>
                        {APLAI_COPY_PACK.form.nextSteps.map((item, index) => (
                          <Typography key={item} variant="body2" color="text.secondary">
                            {index + 1}. {item}
                          </Typography>
                        ))}
                        <Button
                          href="mailto:hello@aplai.dev"
                          variant="text"
                          sx={{ alignSelf: "flex-start", px: 0 }}
                          onClick={() =>
                            trackCtaClick(CTA_SOURCES.finalCtaContactCard)
                          }
                        >
                          {APLAI_COPY_PACK.form.directContactLabel}
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                  <Card elevation={0} variant="outlined">
                    <CardContent>
                      <Stack spacing={1.25}>
                        <Typography variant="h6">Входит в пилот и его границы</Typography>
                        <Grid container spacing={1.5}>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Stack spacing={0.75}>
                              <Typography variant="subtitle2">
                                {APLAI_PILOT_OFFER.inScope.title}
                              </Typography>
                              {APLAI_PILOT_OFFER.inScope.items.map((item) => (
                                <Typography key={item} variant="body2" color="text.secondary">
                                  • {item}
                                </Typography>
                              ))}
                            </Stack>
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Stack spacing={0.75}>
                              <Typography variant="subtitle2">
                                {APLAI_PILOT_OFFER.outOfScope.title}
                              </Typography>
                              {APLAI_PILOT_OFFER.outOfScope.items.map((item) => (
                                <Typography key={item} variant="body2" color="text.secondary">
                                  • {item}
                                </Typography>
                              ))}
                            </Stack>
                          </Grid>
                        </Grid>
                      </Stack>
                    </CardContent>
                  </Card>
                  <Card elevation={0} variant="outlined">
                    <CardContent>
                      <Stack spacing={1.25}>
                        <Typography variant="h6">Критерии успеха и безопасность</Typography>
                        {APLAI_PILOT_OFFER.successCriteria.map((item) => (
                          <Typography key={item} variant="body2" color="text.secondary">
                            • {item}
                          </Typography>
                        ))}
                        {APLAI_PILOT_OFFER.riskReversal.map((item) => (
                          <Typography key={item} variant="body2" color="text.secondary">
                            • {item}
                          </Typography>
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                  <Card elevation={0} variant="outlined">
                    <CardContent>
                      <Stack spacing={1.25}>
                        <Typography variant="h6">Что нужно от вас</Typography>
                        {APLAI_PILOT_OFFER.requirements.minimum.map((item) => (
                          <Typography key={item} variant="body2" color="text.secondary">
                            • {item}
                          </Typography>
                        ))}
                        <Typography variant="subtitle2">Желательно</Typography>
                        {APLAI_PILOT_OFFER.requirements.optional.map((item) => (
                          <Typography key={item} variant="body2" color="text.secondary">
                            • {item}
                          </Typography>
                        ))}
                        <Typography variant="body2" color="text.secondary">
                          {APLAI_PILOT_OFFER.requirements.summary}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                  <Card elevation={0} variant="outlined">
                    <CardContent>
                      <Stack spacing={1.25}>
                        <Typography variant="h6">Почему пилот безопасен</Typography>
                        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                          <Chip label="Без vendor-lock" size="small" variant="outlined" />
                          <Chip label="Один сценарий -> один результат" size="small" variant="outlined" />
                          <Chip label="Прозрачные границы" size="small" variant="outlined" />
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                          Пилот ограничен по объему и критериям, поэтому вы заранее понимаете
                          входы, выходы и следующий шаг.
                        </Typography>
                        <Button
                          variant="outlined"
                          onClick={() => openPrimaryConversionFrom(CTA_SOURCES.finalCtaSidebar)}
                        >
                          {APLAI_CONVERSION_ARCHITECTURE.primaryCta}
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Section>
      </Container>
      <AplaiStickyRail
        visible={isStickyRailVisible}
        onPrimary={() => openPrimaryConversionFrom(CTA_SOURCES.stickyRailPrimary)}
      />

      <AplaiMobileNavDrawer
        open={isMobileMenuOpen}
        navItems={NAV_ITEMS}
        activeAnchorId={activeAnchorId}
        onClose={closeMobileMenu}
        onPrimary={() => openPrimaryConversionFrom(CTA_SOURCES.header)}
        onDemo={() => navigateToSection("demo")}
        onNavigate={navigateToSection}
      />

      <AplaiFooter
        navigationItems={footerNavigationItems}
        onNavigationClick={(id) => {
          trackFooterLinkClick(`footer_nav_${id}`, "anchor");
          navigateToSection(id);
        }}
        onContactClick={trackFooterLinkClick}
      />

      <AplaiLeadFormDialog
        open={isModalOpen}
        isMobileDialog={isMobileDialog}
        onClose={closeModal}
      />
    </Box>
  );
}
