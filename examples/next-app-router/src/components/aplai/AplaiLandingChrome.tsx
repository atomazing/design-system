import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import { LeadCaptureForm } from "./LeadCaptureForm";
import { APLAI_COPY_PACK } from "./copyPack";
import { APLAI_CONVERSION_ARCHITECTURE } from "./conversionArchitecture";
import { APLAI_FOOTER_SECTION } from "./footerSection";
import { APLAI_LEAD_FORM_MODAL } from "./leadFormModal";
import { APLAI_PILOT_OFFER } from "./pilotOffer";

type LandingNavItem = {
  id: string;
  label: string;
};

type FooterContactKind = "anchor" | "policy" | "mailto" | "tel";

type AplaiStickyRailProps = {
  visible: boolean;
  onPrimary: () => void;
};

type AplaiMobileNavDrawerProps = {
  open: boolean;
  navItems: readonly LandingNavItem[];
  activeAnchorId: string;
  onClose: () => void;
  onPrimary: () => void;
  onDemo: () => void;
  onNavigate: (id: string) => void;
};

type AplaiFooterProps = {
  navigationItems: readonly LandingNavItem[];
  onNavigationClick: (id: string) => void;
  onContactClick: (id: string, kind: FooterContactKind) => void;
};

type AplaiLeadFormDialogProps = {
  open: boolean;
  isMobileDialog: boolean;
  onClose: (reason: "x" | "esc" | "backdrop") => void;
};

export function AplaiStickyRail({ visible, onPrimary }: AplaiStickyRailProps) {
  if (!visible) return null;

  return (
    <Box
      data-sticky-rail="true"
      sx={{
        position: "fixed",
        left: { xs: 12, md: "auto" },
        right: { xs: 12, md: 24 },
        bottom: { xs: "calc(env(safe-area-inset-bottom, 0px) + 12px)", md: 24 },
        zIndex: 1200,
      }}
    >
      <Card elevation={3} sx={{ borderRadius: 999 }}>
        <CardContent sx={{ py: 1.25, px: 1.5, "&:last-child": { pb: 1.25 } }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            alignItems={{ xs: "stretch", sm: "center" }}
          >
            <Chip label="Демо 10-15 минут" size="small" color="primary" variant="outlined" />
            <Button variant="contained" size="small" onClick={onPrimary}>
              {APLAI_CONVERSION_ARCHITECTURE.primaryCta}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export function AplaiMobileNavDrawer({
  open,
  navItems,
  activeAnchorId,
  onClose,
  onPrimary,
  onDemo,
  onNavigate,
}: AplaiMobileNavDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      PaperProps={{
        sx: {
          width: { xs: "min(100vw, 100%)", sm: 360 },
        },
      }}
    >
      <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack spacing={0.5}>
              <Typography variant="h6">Разделы</Typography>
              <Typography variant="body2" color="text.secondary">
                Быстрые переходы к ключевым доказательствам и CTA.
              </Typography>
            </Stack>
            <Button variant="text" size="small" onClick={onClose}>
              Закрыть
            </Button>
          </Stack>
          <Stack spacing={1}>
            <Button variant="contained" fullWidth onClick={onPrimary}>
              {APLAI_CONVERSION_ARCHITECTURE.primaryCta}
            </Button>
            <Button variant="outlined" fullWidth onClick={onDemo}>
              Перейти к демо
            </Button>
          </Stack>
          <Divider />
          <List disablePadding>
            {navItems.map((item) => (
              <ListItemButton
                key={item.id}
                onClick={() => onNavigate(item.id)}
                selected={activeAnchorId === item.id}
                sx={{ borderRadius: 2 }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: activeAnchorId === item.id ? 700 : 500,
                  }}
                />
              </ListItemButton>
            ))}
          </List>
          <Typography variant="body2" color="text.secondary">
            Primary CTA остается рядом, поэтому можно быстро перейти к нужному разделу и сразу
            вернуться к действию.
          </Typography>
        </Stack>
      </Box>
    </Drawer>
  );
}

export function AplaiFooter({
  navigationItems,
  onNavigationClick,
  onContactClick,
}: AplaiFooterProps) {
  return (
    <Box
      id="footer"
      component="footer"
      sx={{ borderTop: 1, borderColor: "divider", py: 4, bgcolor: "background.paper" }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2.5}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={1}>
                <Typography variant="body2">{APLAI_COPY_PACK.footer.summary}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {APLAI_COPY_PACK.footer.legal}
                </Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Stack spacing={1}>
                <Typography variant="subtitle2" color="text.secondary">
                  Навигация
                </Typography>
                <Stack alignItems="flex-start" spacing={0.5}>
                  {navigationItems.map((item) => (
                    <Button
                      key={item.id}
                      variant="text"
                      sx={{ px: 0 }}
                      onClick={() => onNavigationClick(item.id)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </Stack>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Stack spacing={1}>
                <Typography variant="subtitle2" color="text.secondary">
                  Контакты
                </Typography>
                <Stack alignItems="flex-start" spacing={0.5}>
                  {APLAI_FOOTER_SECTION.contactLinks.map((item) => (
                    <Button
                      key={item.id}
                      href={item.href}
                      variant="text"
                      sx={{ px: 0 }}
                      onClick={() => onContactClick(item.id, item.kind)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          <Divider />
          <Stack spacing={0.5}>
            <Typography variant="caption" color="text.secondary">
              {APLAI_FOOTER_SECTION.copyright}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {APLAI_FOOTER_SECTION.legalNote}
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export function AplaiLeadFormDialog({
  open,
  isMobileDialog,
  onClose,
}: AplaiLeadFormDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={(_, reason) => onClose(reason === "backdropClick" ? "backdrop" : "esc")}
      fullWidth
      maxWidth="md"
      fullScreen={isMobileDialog}
      aria-label={APLAI_LEAD_FORM_MODAL.title}
      aria-describedby="lead-form-modal-lead"
      PaperProps={{
        sx: {
          borderRadius: isMobileDialog ? 0 : 4,
        },
      }}
    >
      <DialogTitle
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}
      >
        <Stack spacing={0.75}>
          <Typography id="lead-form-modal-heading" component="span" variant="h5">
            {APLAI_LEAD_FORM_MODAL.title}
          </Typography>
          <Chip
            component="span"
            label={APLAI_LEAD_FORM_MODAL.riskBadgeLabel}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ alignSelf: "flex-start" }}
          />
        </Stack>
        <IconButton
          aria-label={APLAI_LEAD_FORM_MODAL.closeLabel}
          onClick={() => onClose("x")}
          edge="end"
        >
          x
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2.5} alignItems="start" data-modal-pattern={APLAI_LEAD_FORM_MODAL.patternId}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={2}>
              <Typography id="lead-form-modal-lead" color="text.secondary">
                {APLAI_LEAD_FORM_MODAL.lead}
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                <Chip label="10-15 минут" size="small" variant="outlined" />
                <Chip label="Один сценарий" size="small" variant="outlined" />
                <Chip label="План пилота" size="small" variant="outlined" />
              </Stack>
              <Card elevation={0} variant="outlined">
                <CardContent>
                  <Stack spacing={1}>
                    <Typography variant="subtitle1">{APLAI_COPY_PACK.form.nextTitle}</Typography>
                    {APLAI_COPY_PACK.form.nextSteps.map((item, index) => (
                      <Typography key={item} variant="body2" color="text.secondary">
                        {index + 1}. {item}
                      </Typography>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
              <Card elevation={0} variant="outlined">
                <CardContent>
                  <Stack spacing={1}>
                    <Typography variant="subtitle1">Когда это особенно полезно</Typography>
                    {APLAI_PILOT_OFFER.fit.slice(0, 2).map((item) => (
                      <Typography key={item} variant="body2" color="text.secondary">
                        • {item}
                      </Typography>
                    ))}
                    <Button
                      href="mailto:hello@aplai.dev"
                      variant="text"
                      sx={{ alignSelf: "flex-start", px: 0 }}
                    >
                      {APLAI_COPY_PACK.form.directContactLabel}
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <LeadCaptureForm
              context="modal"
              onSuccess={() => undefined}
              onReturnToPage={() => onClose("x")}
              showNextCard={false}
              submitFullWidth
              stickyActions
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
