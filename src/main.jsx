import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App.jsx';

// Analytics & Performance Monitoring
import { initGA, trackPageView } from './utils/analytics';
import {
  initPerformanceMonitoring,
  initErrorTracking,
  initVisibilityTracking,
  monitorMemoryUsage,
} from './utils/performance';

// Initialize analytics only in production or when specifically enabled
if (import.meta.env.PROD || import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
  // Initialize Google Analytics
  initGA();

  // Initialize performance monitoring
  initPerformanceMonitoring();
  initErrorTracking();
  initVisibilityTracking();

  // Monitor memory usage (optional)
  if (import.meta.env.VITE_ENABLE_MEMORY_MONITORING === 'true') {
    monitorMemoryUsage();
  }

  // Track initial page view
  trackPageView(window.location.pathname);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
