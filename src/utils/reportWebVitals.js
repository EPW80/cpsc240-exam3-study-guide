/**
 * Web Vitals Performance Monitoring
 *
 * Measures and reports Core Web Vitals metrics:
 * - LCP (Largest Contentful Paint) - Loading performance
 * - INP (Interaction to Next Paint) - Interactivity
 * - CLS (Cumulative Layout Shift) - Visual stability
 * - FCP (First Contentful Paint) - Initial render
 * - TTFB (Time to First Byte) - Server response time
 *
 * @param {Function} onPerfEntry - Callback to receive metric data
 */
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      onCLS(onPerfEntry);
      onFCP(onPerfEntry);
      onLCP(onPerfEntry);
      onTTFB(onPerfEntry);
      onINP(onPerfEntry);
    });
  }
};

/**
 * Log performance metrics to console (development)
 * @param {Object} metric - Web Vitals metric object
 */
export const logMetric = (metric) => {
  const { name, value, rating, delta } = metric;

  // Color code based on rating
  const colors = {
    good: "\x1b[32m", // Green
    "needs-improvement": "\x1b[33m", // Yellow
    poor: "\x1b[31m", // Red
    reset: "\x1b[0m",
  };

  const color = colors[rating] || colors.reset;
  console.log(
    `${color}[Web Vitals] ${name}: ${Math.round(value)}ms (${rating})${colors.reset}`,
    `\nDelta: ${Math.round(delta)}ms`
  );
};

/**
 * Send metrics to analytics (production)
 * Replace with your analytics endpoint
 * @param {Object} metric - Web Vitals metric object
 */
export const sendToAnalytics = (metric) => {
  const { name, value, rating, id } = metric;

  // Example: Send to Google Analytics
  if (typeof gtag !== "undefined") {
    gtag("event", name, {
      event_category: "Web Vitals",
      event_label: id,
      value: Math.round(value),
      rating: rating,
      non_interaction: true,
    });
  }

  // Example: Send to custom analytics endpoint
  // fetch('/api/analytics', {
  //   method: 'POST',
  //   body: JSON.stringify({ name, value, rating, id }),
  //   headers: { 'Content-Type': 'application/json' }
  // });
};

/**
 * Performance budget thresholds (in milliseconds)
 */
export const performanceBudgets = {
  LCP: {
    good: 2500,
    needsImprovement: 4000,
  },
  CLS: {
    good: 0.1,
    needsImprovement: 0.25,
  },
  FCP: {
    good: 1800,
    needsImprovement: 3000,
  },
  TTFB: {
    good: 800,
    needsImprovement: 1800,
  },
  INP: {
    good: 200,
    needsImprovement: 500,
  },
};

/**
 * Check if metric meets performance budget
 * @param {Object} metric - Web Vitals metric object
 * @returns {boolean}
 */
export const meetsPerformanceBudget = (metric) => {
  const budget = performanceBudgets[metric.name];
  if (!budget) return true;

  return metric.value <= budget.good;
};

export default reportWebVitals;
