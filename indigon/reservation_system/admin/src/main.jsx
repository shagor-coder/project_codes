import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { gcTime: 3600 * 10, refetchOnMount: true },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
