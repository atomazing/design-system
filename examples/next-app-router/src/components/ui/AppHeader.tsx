"use client";

import { useEffect, useRef } from "react";
import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from "@mui/material";
import { usePathname } from "next/navigation";

import {
  starterFlowNavItems,
  type StarterNavItem,
} from "@/content/starterFlow";
import { MuiNextLink } from "@/components/ui/MuiNextLink";
import { StarterWordmark } from "@/components/ui/StarterWordmark";

type NavItem = StarterNavItem;

const isActivePath = (pathname: string, item: NavItem) => {
  const matches = item.matches ?? [item.href];

  return matches.some((match) => {
    if (match === "/") return pathname === "/";
    return pathname === match || pathname.startsWith(`${match}/`);
  });
};

export function AppHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const headerElement = headerRef.current;

    if (!headerElement) {
      return;
    }

    const rootStyle = document.documentElement.style;
    const syncHeaderHeight = () => {
      rootStyle.setProperty("--starter-header-height", `${headerElement.offsetHeight}px`);
    };

    syncHeaderHeight();

    const observer = new ResizeObserver(syncHeaderHeight);
    observer.observe(headerElement);
    window.addEventListener("resize", syncHeaderHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncHeaderHeight);
    };
  }, []);

  return (
    <Box
      component="header"
      ref={headerRef}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar + 1,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <AppBar position="static" color="transparent" elevation={0} sx={{ width: "100%" }}>
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 72, md: 76 },
              px: { xs: 1.5, md: 2.5 },
              gap: 2,
            }}
          >
            <Stack
              component={MuiNextLink}
              href="/"
              aria-label="Открыть главную страницу"
              sx={{
                minWidth: "max-content",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <StarterWordmark
                logoSize={36}
                stackProps={{ sx: { minWidth: "max-content" } }}
              />
            </Stack>

            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                overflowX: "auto",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  width: "max-content",
                  minWidth: "100%",
                  justifyContent: { xs: "flex-start", md: "flex-end" },
                }}
              >
                {starterFlowNavItems.map((item) => {
                  const active = isActivePath(pathname, item);

                  return (
                    <Button
                      key={item.href}
                      component={MuiNextLink}
                      href={item.href}
                      size="small"
                      variant={active ? "contained" : "text"}
                      color={active ? "primary" : "inherit"}
                    >
                      <Typography component="span" variant="text_sm_semibold" color="inherit">
                        {item.label}
                      </Typography>
                    </Button>
                  );
                })}
              </Stack>
            </Box>
          </Toolbar>
        </AppBar>
      </Container>
    </Box>
  );
}
