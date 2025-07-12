/* eslint-disable @typescript-eslint/class-methods-use-this -- only for ErrorBoundary*/
import React from "react";
import styled from "@emotion/styled";
import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import { Box } from "@mui/material";

import type { ErrorInfo } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * ErrorBoundary component that catches and displays errors.
 */

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // eslint-disable-next-line no-console -- Выводим ошибку в консоль
    console.error("Error:", error);
    // eslint-disable-next-line no-console -- Выводим ошибку в консоль
    console.error("Error Info:", errorInfo);
  }

  render() {
    const { state, props } = this;
    if (state.hasError) {
      return (
        <Container>
          <ErrorHeader>
            <Box>Ошибка.&nbsp;</Box>
          </ErrorHeader>
          <h3>
            <Box style={{ color: "#ff3131", display: "inline-block" }}>
              <ErrorOutlineRounded
                sx={{ verticalAlign: "middle", mb: "4px" }}
              />{" "}
              ERROR:
            </Box>{" "}
            <Box translate="no">
              [{state.error?.name}] {state.error?.message}
            </Box>
            <Box style={{ color: "#ff3131", display: "inline-block" }}>
              <ErrorOutlineRounded
                sx={{ verticalAlign: "middle", mb: "4px" }}
              />{" "}
              Stack:
            </Box>{" "}
            <Box translate="no">[{state.error?.stack}]</Box>
          </h3>
        </Container>
      );
    }

    return props.children;
  }
}

const Container = styled.div`
  margin: 0 8vw;
  @media (max-width: 768px) {
    margin: 0;
  }
`;

const ErrorHeader = styled.h1`
  margin-top: 32px;
  margin-bottom: 32px;
  font-size: 36px;
  color: #ff3131;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    text-align: left;
    justify-content: left;
    font-size: 30px;
    margin-top: 0;
    margin-bottom: 0;
  }
`;
