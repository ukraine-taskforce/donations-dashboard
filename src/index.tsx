import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { muiTheme } from "./styles/theme";

import "./index.css";
import "./others/contexts/i18n";
import reportWebVitals from "./reportWebVitals";
import { DictionaryContextProvider } from "./others/contexts/dictionary-context";
import { SidebarContextProvider } from "./others/contexts/sidebar-context";
import { queryClient } from "./others/contexts/api";
import { Donations } from "./pages/donations";
import { NotFound } from "./pages/notFound";
import { FilterContextProvider } from "./others/contexts/filter";

const Providers: React.FunctionComponent = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <MuiThemeProvider theme={muiTheme}>
      <DictionaryContextProvider>
        <SidebarContextProvider>
          <FilterContextProvider>{children}</FilterContextProvider>
        </SidebarContextProvider>
      </DictionaryContextProvider>
    </MuiThemeProvider>
  </QueryClientProvider>
);

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Donations />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
