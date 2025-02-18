import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import styled from "@emotion/styled";
import { ErrorOutlineRounded } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
/**
 * ErrorBoundary component that catches and displays errors.
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error,
        };
    }
    componentDidCatch(error, errorInfo) {
        // eslint-disable-next-line no-console -- Выводим ошибку в консоль
        console.error("Error:", error);
        // eslint-disable-next-line no-console -- Выводим ошибку в консоль
        console.error("Error Info:", errorInfo);
    }
    handleClearData() {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    }
    render() {
        const { state, props } = this;
        if (state.hasError) {
            return (_jsxs(Container, { children: [_jsx(ErrorHeader, { children: _jsx(Box, { children: "\u041E\u0448\u0438\u0431\u043A\u0430.\u00A0" }) }), _jsxs("h3", { children: [_jsxs(Box, { style: { color: "#ff3131", display: "inline-block" }, children: [_jsx(ErrorOutlineRounded, { sx: { verticalAlign: "middle", mb: "4px" } }), " ", "ERROR:"] }), " ", _jsxs(Box, { translate: "no", children: ["[", state.error?.name, "] ", state.error?.message] }), _jsxs(Box, { style: { color: "#ff3131", display: "inline-block" }, children: [_jsx(ErrorOutlineRounded, { sx: { verticalAlign: "middle", mb: "4px" } }), " ", "Stack:"] }), " ", _jsxs(Box, { translate: "no", children: ["[", state.error?.stack, "]"] })] })] }));
        }
        return props.children;
    }
}
const Container = styled.div `
  margin: 0 8vw;
  @media (max-width: 768px) {
    margin: 0;
  }
`;
const ErrorHeader = styled.h1 `
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
const StyledButton = styled(Button) `
  padding: 10px 30px;
  border-radius: 12px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
StyledButton.defaultProps = {
    variant: "outlined",
    size: "large",
};
export default ErrorBoundary;
