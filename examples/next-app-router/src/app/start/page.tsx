"use client";

import { useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import { MuiNextLink } from "@/components/ui/MuiNextLink";
import {
  StarterIntroPanel,
  StarterPageShell,
} from "@/components/ui/StarterPageShell";

export default function StartPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <StarterPageShell maxWidth="sm">
      <StarterIntroPanel
        title="Redirecting to the landing."
        description="The starter home route lives on `/`, so `/start` forwards you there."
        actions={
          <Button component={MuiNextLink} href="/" variant="contained">
            <Typography component="span" variant="subtitle2">
              Open home
            </Typography>
          </Button>
        }
      />
    </StarterPageShell>
  );
}
