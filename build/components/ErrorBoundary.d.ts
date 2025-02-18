import React from "react";
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
declare class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps);
    static getDerivedStateFromError(error: Error): ErrorBoundaryState;
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    handleClearData(): void;
    render(): string | number | boolean | Iterable<React.ReactNode> | import("react/jsx-runtime").JSX.Element | null | undefined;
}
export default ErrorBoundary;
