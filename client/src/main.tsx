import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from '@mui/material/styles';
import theme from './config/theme.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
    </BrowserRouter>
  </React.StrictMode>,
)
