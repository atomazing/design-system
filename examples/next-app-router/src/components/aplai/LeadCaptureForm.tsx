"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";

import {
  trackFormSubmitError,
  trackFormSubmitSuccess,
  type FormAnalyticsContext,
} from "./analytics";
import { APLAI_COPY_PACK } from "./copyPack";
import { APLAI_MICROCOPY } from "./microcopy";

type LeadCaptureContext = FormAnalyticsContext;
type SubmitState = "idle" | "submitting" | "success" | "error";

type LeadCaptureFormProps = {
  context: LeadCaptureContext;
  onSuccess?: () => void;
  onReturnToPage?: () => void;
  onFirstFieldFocus?: () => void;
  onDirectContactClick?: () => void;
  showNextCard?: boolean;
  submitFullWidth?: boolean;
  stickyActions?: boolean;
};

type LeadFormValues = {
  company: string;
  role: string;
  contact: string;
  task: string;
};

type LeadFormErrors = Partial<Record<keyof LeadFormValues, string>>;

const INITIAL_VALUES: LeadFormValues = {
  company: "",
  role: "",
  contact: "",
  task: "",
};

const ROLE_OPTIONS = [
  { id: "cto", label: "CTO / Head of Engineering" },
  { id: "product", label: "Product Manager / Product Owner" },
  { id: "delivery", label: "Delivery / Engineering Manager" },
  { id: "security", label: "Security / Compliance" },
  { id: "sponsor", label: "Business Sponsor" },
  { id: "other", label: "Другое" },
];

const trimText = (value: string) => value.trim();
const PHONE_PATTERN = /^[+\d()\s-]{7,}$/;

const isLikelyPhone = (value: string) => /\d{5,}/.test(value);
const isLikelyEmail = (value: string) => value.includes("@");

async function submitLead(values: LeadFormValues): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 650));

  if (trimText(values.contact).toLowerCase().includes("error")) {
    throw new Error("Lead submit simulation error");
  }
}

export function LeadCaptureForm({
  context,
  onSuccess,
  onReturnToPage,
  onFirstFieldFocus,
  onDirectContactClick,
  showNextCard = true,
  submitFullWidth = false,
  stickyActions = false,
}: LeadCaptureFormProps) {
  const [values, setValues] = useState<LeadFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [hasTrackedFocus, setHasTrackedFocus] = useState(false);

  const isSubmitting = submitState === "submitting";
  const isSuccess = submitState === "success";
  const isError = submitState === "error";
  const shouldUseFullWidthSubmit = submitFullWidth || context === "modal";
  const shouldUseStickyActions = stickyActions && context === "modal";

  const handleFieldChange =
    (field: keyof LeadFormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
      if (submitState !== "idle") setSubmitState("idle");
    };

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    const nextRole = event.target.value ?? "";
    setValues((prev) => ({ ...prev, role: nextRole }));
    setErrors((prev) => ({ ...prev, role: undefined }));
    if (submitState !== "idle") setSubmitState("idle");
  };

  const validate = () => {
    const nextErrors: LeadFormErrors = {};
    const contact = trimText(values.contact);
    if (!contact) {
      nextErrors.contact = APLAI_MICROCOPY.validation.contactRequired;
    } else if (isLikelyEmail(contact)) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(contact)) {
        nextErrors.contact = APLAI_MICROCOPY.validation.contactEmail;
      }
    } else if (isLikelyPhone(contact) && !PHONE_PATTERN.test(contact)) {
      nextErrors.contact = APLAI_MICROCOPY.validation.contactPhone;
    }

    if (!trimText(values.role)) {
      nextErrors.role = APLAI_MICROCOPY.validation.roleRequired;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const resetForm = () => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setSubmitState("idle");
  };

  const trackFirstFieldIntent = () => {
    if (hasTrackedFocus) return;
    setHasTrackedFocus(true);
    onFirstFieldFocus?.();
  };

  const handleDirectContactClick = () => {
    onDirectContactClick?.();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitState("submitting");

    try {
      await submitLead(values);
      setSubmitState("success");
      trackFormSubmitSuccess(context);
      onSuccess?.();
    } catch {
      setSubmitState("error");
      trackFormSubmitError(context);
    }
  };

  return (
    <Stack spacing={2}>
      {showNextCard ? (
        <Card elevation={0}>
          <CardContent>
            <Stack spacing={1}>
              <Typography variant="subtitle1">{APLAI_COPY_PACK.form.nextTitle}</Typography>
              <Typography variant="body2" color="text.secondary">
                {APLAI_COPY_PACK.form.nextSteps
                  .map((item, index) => `${index + 1}) ${item}`)
                  .join(". ")}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      ) : null}

      {isSuccess ? (
        <Stack spacing={2}>
          <Alert severity="success" variant="outlined">
            {APLAI_COPY_PACK.form.success}
          </Alert>
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
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            <Chip label="10-15 минут демо" size="small" variant="outlined" />
            <Chip label="Без vendor-lock" size="small" variant="outlined" />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            {onReturnToPage ? (
              <Button variant="text" onClick={onReturnToPage}>
                Вернуться на страницу
              </Button>
            ) : null}
            <Button variant="outlined" onClick={resetForm}>
              {APLAI_COPY_PACK.form.retryLabel}
            </Button>
            <Button
              href="mailto:hello@aplai.dev"
              variant="text"
              onClick={handleDirectContactClick}
            >
              {APLAI_COPY_PACK.form.directContactLabel}
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
        >
          <Stack spacing={2}>
            <Typography variant="body2" color="text.secondary">
              {APLAI_MICROCOPY.form.requiredFieldsHint}
            </Typography>
            {isError && (
              <Alert severity="error" variant="outlined">
                {APLAI_COPY_PACK.form.error}
              </Alert>
            )}

            <TextField
              label="Компания"
              value={values.company}
              onChange={handleFieldChange("company")}
              onFocus={trackFirstFieldIntent}
              placeholder={APLAI_MICROCOPY.form.companyPlaceholder}
              helperText={APLAI_MICROCOPY.form.companyHelper}
              fullWidth
              size="small"
            />

            <FormControl fullWidth size="small" error={Boolean(errors.role)}>
              <InputLabel id={`lead-role-label-${context}`}>Роль</InputLabel>
              <Select
                labelId={`lead-role-label-${context}`}
                label="Роль"
                value={values.role}
                onChange={handleRoleChange}
                onFocus={trackFirstFieldIntent}
                onOpen={trackFirstFieldIntent}
                required
                inputProps={{ "aria-label": "Роль" }}
                displayEmpty
                renderValue={(selected) =>
                  selected ? (
                    ROLE_OPTIONS.find((role) => role.id === selected)?.label ?? selected
                  ) : (
                    <Typography color="text.secondary">
                      {APLAI_MICROCOPY.form.rolePlaceholder}
                    </Typography>
                  )
                }
              >
                {ROLE_OPTIONS.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
            </FormControl>

            <TextField
              label="Контакт"
              value={values.contact}
              onChange={handleFieldChange("contact")}
              onFocus={trackFirstFieldIntent}
              placeholder={APLAI_MICROCOPY.form.contactPlaceholder}
              error={Boolean(errors.contact)}
              helperText={errors.contact ?? APLAI_MICROCOPY.form.contactHelper}
              fullWidth
              size="small"
              required
            />

            <TextField
              label="Коротко о задаче"
              value={values.task}
              onChange={handleFieldChange("task")}
              onFocus={trackFirstFieldIntent}
              placeholder={APLAI_MICROCOPY.form.taskPlaceholder}
              error={Boolean(errors.task)}
              helperText={errors.task ?? APLAI_MICROCOPY.form.taskHelper}
              fullWidth
              size="small"
              multiline
              minRows={3}
            />

            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              <Chip label="10-15 минут демо" size="small" variant="outlined" />
              <Chip label="Без vendor-lock" size="small" variant="outlined" />
            </Stack>

            <Typography variant="body2" color="text.secondary">
              {APLAI_MICROCOPY.privacyLine}
            </Typography>

            <Box
              sx={
                shouldUseStickyActions
                  ? {
                      position: "sticky",
                      bottom: 0,
                      py: 1,
                      mt: 1,
                      bgcolor: "background.paper",
                      borderTop: 1,
                      borderColor: "divider",
                    }
                  : undefined
              }
            >
              <Stack
                direction={shouldUseFullWidthSubmit ? "column" : { xs: "column", sm: "row" }}
                spacing={1}
                alignItems={shouldUseFullWidthSubmit ? "stretch" : { xs: "stretch", sm: "center" }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  fullWidth={shouldUseFullWidthSubmit}
                >
                  {isSubmitting ? "Отправляем..." : APLAI_COPY_PACK.form.submitLabel}
                </Button>
                <Button
                  href="mailto:hello@aplai.dev"
                  variant="text"
                  onClick={handleDirectContactClick}
                >
                  {APLAI_COPY_PACK.form.directContactLabel}
                </Button>
              </Stack>
            </Box>
            {isSubmitting && (
              <Typography variant="caption" color="text.secondary">
                {APLAI_MICROCOPY.form.loadingNote}
              </Typography>
            )}
          </Stack>
        </Box>
      )}
    </Stack>
  );
}
