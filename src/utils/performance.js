import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';
import { trackEvent } from './analytics';

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  // Core Web Vitals
  onCLS(onVitalsReport);
  onINP(onVitalsReport); // INP replaces FID in web-vitals v5
  onFCP(onVitalsReport);
  onLCP(onVitalsReport);
  onTTFB(onVitalsReport);

  // Additional performance metrics
  monitorResourceTiming();
  monitorNavigationTiming();
  monitorLongTasks();
};

// Report vital metrics to analytics
const onVitalsReport = metric => {
  const { name, value, rating } = metric;

  // Send to Google Analytics
  trackEvent('web_vitals', {
    category: 'Performance',
    label: name,
    value: Math.round(value),
    metric_name: name,
    metric_value: value,
    metric_rating: rating,
  });

  // Log for development
  if (process.env.NODE_ENV === 'development') {
    console.log(`${name}: ${value} (${rating})`);
  }
};

// Monitor resource loading performance
const monitorResourceTiming = () => {
  if (!window.PerformanceObserver) return;

  const observer = new PerformanceObserver(list => {
    list.getEntries().forEach(entry => {
      // Track slow resources (>2s)
      if (entry.duration > 2000) {
        trackEvent('slow_resource', {
          category: 'Performance',
          label: entry.name,
          value: Math.round(entry.duration),
          resource_name: entry.name,
          resource_type: entry.initiatorType,
          duration: entry.duration,
        });
      }
    });
  });

  observer.observe({ entryTypes: ['resource'] });
};

// Monitor navigation timing
const monitorNavigationTiming = () => {
  if (!window.PerformanceObserver) return;

  const observer = new PerformanceObserver(list => {
    list.getEntries().forEach(entry => {
      const loadTime = entry.loadEventEnd - entry.fetchStart;

      trackEvent('navigation_timing', {
        category: 'Performance',
        label: 'page_load',
        value: Math.round(loadTime),
        dns_time: entry.domainLookupEnd - entry.domainLookupStart,
        connect_time: entry.connectEnd - entry.connectStart,
        response_time: entry.responseEnd - entry.responseStart,
        dom_load_time: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
        load_complete_time: loadTime,
      });
    });
  });

  observer.observe({ entryTypes: ['navigation'] });
};

// Monitor long tasks (>50ms)
const monitorLongTasks = () => {
  if (!window.PerformanceObserver) return;

  try {
    const observer = new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        trackEvent('long_task', {
          category: 'Performance',
          label: 'blocking_task',
          value: Math.round(entry.duration),
          task_duration: entry.duration,
          start_time: entry.startTime,
        });
      });
    });

    observer.observe({ entryTypes: ['longtask'] });
  } catch (error) {
    console.warn('Long task monitoring not supported:', error);
  }
};

// Track custom performance marks
export const markPerformance = markName => {
  if (!performance.mark) return;

  performance.mark(markName);
};

export const measurePerformance = (measureName, startMark, endMark) => {
  if (!performance.measure) return;

  try {
    performance.measure(measureName, startMark, endMark);
    const measure = performance.getEntriesByName(measureName)[0];

    trackEvent('custom_timing', {
      category: 'Performance',
      label: measureName,
      value: Math.round(measure.duration),
      timing_name: measureName,
      duration: measure.duration,
    });
  } catch (error) {
    console.warn('Performance measurement failed:', error);
  }
};

// Monitor JavaScript errors
export const initErrorTracking = () => {
  // Global error handler
  window.addEventListener('error', event => {
    trackEvent('javascript_error', {
      category: 'Error',
      label: event.message,
      error_message: event.message,
      error_filename: event.filename,
      error_line: event.lineno,
      error_column: event.colno,
      stack_trace: event.error?.stack,
    });
  });

  // Unhandled promise rejection handler
  window.addEventListener('unhandledrejection', event => {
    trackEvent('unhandled_promise_rejection', {
      category: 'Error',
      label: event.reason?.message || 'Unknown promise rejection',
      error_reason: event.reason,
    });
  });
};

// Monitor memory usage (if available)
export const monitorMemoryUsage = () => {
  if (!window.performance.memory) return;

  setInterval(() => {
    const memory = window.performance.memory;

    // Only report if memory usage is high
    const usagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;

    if (usagePercent > 80) {
      trackEvent('high_memory_usage', {
        category: 'Performance',
        label: 'memory_warning',
        value: Math.round(usagePercent),
        used_heap_size: memory.usedJSHeapSize,
        total_heap_size: memory.totalJSHeapSize,
        heap_size_limit: memory.jsHeapSizeLimit,
        usage_percent: usagePercent,
      });
    }
  }, 30000); // Check every 30 seconds
};

// Page visibility API for accurate metrics
export const initVisibilityTracking = () => {
  let visibilityStart = Date.now();

  const handleVisibilityChange = () => {
    if (document.hidden) {
      // Page became hidden
      const visibleTime = Date.now() - visibilityStart;

      trackEvent('page_visibility', {
        category: 'Engagement',
        label: 'page_hidden',
        value: Math.round(visibleTime / 1000),
        visible_time_seconds: Math.round(visibleTime / 1000),
      });
    } else {
      // Page became visible
      visibilityStart = Date.now();

      trackEvent('page_visibility', {
        category: 'Engagement',
        label: 'page_visible',
      });
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
};
