import { Button, Divider, Paper, Stack, Typography } from "@mui/material";

import { MuiNextLink } from "@/components/ui/MuiNextLink";
import {
  StarterIntroPanel,
  StarterPageShell,
} from "@/components/ui/StarterPageShell";
import { exampleThemes } from "@/theme/exampleThemes";

export default function PresetsPage() {
  return (
    <StarterPageShell>
      <StarterIntroPanel
        title="Preset pack"
        description="The starter keeps preset selection explicit in one app-owned theme module."
        actions={
          <>
            <Button component={MuiNextLink} href="/debug/theme" variant="text">
              <Typography component="span" variant="subtitle2">
                Open theme controls
              </Typography>
            </Button>
            <Button component={MuiNextLink} href="/" variant="text">
              <Typography component="span" variant="subtitle2">
                Back home
              </Typography>
            </Button>
          </>
        }
      />

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack divider={<Divider flexItem />} spacing={2}>
          {exampleThemes.map((preset: (typeof exampleThemes)[number]) => (
            <Stack key={preset.id} spacing={0.5}>
              <Typography variant="h6">{preset.label}</Typography>
              <Typography variant="body2" color="text.secondary">
                {preset.id}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Paper>
    </StarterPageShell>
  );
}
