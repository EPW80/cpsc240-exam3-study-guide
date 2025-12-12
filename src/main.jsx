import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/custom.css";
import App from "./App";
import { AppProvider } from "./context/AppContext";
import reportWebVitals, { logMetric } from "./utils/reportWebVitals";
import { registerServiceWorker } from "./utils/registerServiceWorker";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);

// Measure and report Web Vitals performance metrics
// In development: logs to console
// In production: send to analytics (configure in reportWebVitals.js)
if (import.meta.env.DEV) {
  reportWebVitals(logMetric);
} else {
  // In production, you can send to your analytics service
  // reportWebVitals(sendToAnalytics);
  reportWebVitals(console.log);

  // Register service worker for offline support in production
  registerServiceWorker();
}
