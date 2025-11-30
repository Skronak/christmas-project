import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import {createTheme, ThemeProvider} from "@mui/material";

const alwaysLight = createTheme({
    palette: {
        mode: 'light', // ← TOUJOURS light
    },
});

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={alwaysLight}>
        <App />
        </ThemeProvider>
    </React.StrictMode>
)
