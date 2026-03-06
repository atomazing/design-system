import { Paper, Stack, Typography } from "@mui/material";

type LandingEditorialPanelProps = {
  title: string;
  lines: string[];
  sx?: Record<string, unknown>;
};

const toSupportParagraph = (lines: string[]) =>
  lines
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return "";
      return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
    })
    .filter(Boolean)
    .join(" ");

export function LandingEditorialPanel({ title, lines, sx }: LandingEditorialPanelProps) {
  const supportParagraph = toSupportParagraph(lines);

  return (
    <Paper
      sx={{
        p: { xs: 2.5, md: 3.5 },
        display: "flex",
        ...sx,
      }}
    >
      <Stack spacing={2.25} sx={{ minHeight: { lg: 220 }, justifyContent: "center" }}>
        <Typography variant="header_sm_semibold" sx={{ maxWidth: 420, textWrap: "balance" }}>
          {title}
        </Typography>

        <Typography
          variant="text_md_regular"
          color="text.secondary"
          sx={{ maxWidth: 420, lineHeight: 1.7 }}
        >
          {supportParagraph}
        </Typography>
      </Stack>
    </Paper>
  );
}
