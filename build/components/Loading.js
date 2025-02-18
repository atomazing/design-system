import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Box, CircularProgress } from '@mui/material';
export const Loading = () => {
    const [showLoading, setShowLoading] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoading(true);
        }, 100); // Show the loading spinner after 100 milliseconds
        return () => clearTimeout(timer);
    }, []);
    return (_jsx(Container, { children: showLoading && (_jsxs(_Fragment, { children: [_jsx(CircularProgress, { "aria-label": "loading", size: 80, thickness: 4 }), _jsx("h3", { style: { opacity: 0.8 }, children: "Loading Page..." })] })) }));
};
const Container = styled(Box) `
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	text-align: center;
	gap: 8px;
`;
