// Google Analytics 4 utility functions

// Initialize GA4
export const initGA = () => {
  const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;

  if (!GA_TRACKING_ID || GA_TRACKING_ID === 'your_google_analytics_id_here') {
    console.warn('Google Analytics tracking ID not configured');
    return;
  }

  // Load GA4 script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname,
    send_page_view: true,
  });
};

// Track page views
export const trackPageView = path => {
  if (!window.gtag) return;

  window.gtag('config', import.meta.env.VITE_GA_TRACKING_ID, {
    page_path: path,
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track custom events
export const trackEvent = (eventName, parameters = {}) => {
  if (!window.gtag) return;

  window.gtag('event', eventName, {
    event_category: parameters.category || 'General',
    event_label: parameters.label || '',
    value: parameters.value || 0,
    ...parameters,
  });
};

// Track user interactions
export const trackClick = (elementName, category = 'UI') => {
  trackEvent('click', {
    category,
    label: elementName,
    event_label: elementName,
  });
};

// Track contact form submissions
export const trackContactForm = (formType = 'contact') => {
  trackEvent('form_submit', {
    category: 'Contact',
    label: formType,
    form_type: formType,
  });
};

// Track project views
export const trackProjectView = projectName => {
  trackEvent('project_view', {
    category: 'Projects',
    label: projectName,
    project_name: projectName,
  });
};

// Track technology selections
export const trackTechSelection = technology => {
  trackEvent('tech_selection', {
    category: 'Hero',
    label: technology,
    technology: technology,
  });
};

// Track resume downloads
export const trackResumeDownload = () => {
  trackEvent('file_download', {
    category: 'Resume',
    label: 'PDF Download',
    file_type: 'pdf',
  });
};

// Track social media clicks
export const trackSocialClick = platform => {
  trackEvent('social_click', {
    category: 'Social',
    label: platform,
    platform: platform,
  });
};

// Enhanced ecommerce tracking (for future use)
export const trackPurchase = transactionData => {
  if (!window.gtag) return;

  window.gtag('event', 'purchase', {
    transaction_id: transactionData.transaction_id,
    value: transactionData.value,
    currency: transactionData.currency || 'USD',
    items: transactionData.items || [],
  });
};
