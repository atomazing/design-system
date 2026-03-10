import { Button, Typography } from "@mui/material";

import { ThemeSnapshotCard } from "@/components/theme/ThemeSnapshotCard";
import { MuiNextLink } from "@/components/ui/MuiNextLink";
import {
  StarterIntroPanel,
  StarterPageShell,
} from "@/components/ui/StarterPageShell";

export default function ThemeStatePage() {
  return (
    <StarterPageShell>
      <StarterIntroPanel
        title="Check the active theme state."
        description="Use this route to verify that local storage and runtime theme state stay aligned."
        actions={
          <>
            <Button component={MuiNextLink} href="/debug/theme" variant="text">
              <Typography component="span" variant="subtitle2">
                Change theme
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

      <ThemeSnapshotCard />
    </StarterPageShell>
  );
}
