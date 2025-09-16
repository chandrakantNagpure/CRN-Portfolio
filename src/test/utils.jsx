import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { TechProvider } from '../components/TechContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import { StatusProvider } from '../contexts/StatusContext';

// Custom render function that includes all necessary providers
export const renderWithProviders = (ui, options = {}) => {
  const { initialEntries = ['/'], ...renderOptions } = options;

  const Wrapper = ({ children }) => {
    return (
      <HelmetProvider>
        <LanguageProvider>
          <StatusProvider>
            <TechProvider>
              <BrowserRouter>{children}</BrowserRouter>
            </TechProvider>
          </StatusProvider>
        </LanguageProvider>
      </HelmetProvider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Custom render for components that don't need router
export const renderWithContexts = (ui, options = {}) => {
  const Wrapper = ({ children }) => {
    return (
      <HelmetProvider>
        <LanguageProvider>
          <StatusProvider>
            <TechProvider>{children}</TechProvider>
          </StatusProvider>
        </LanguageProvider>
      </HelmetProvider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...options });
};

// Mock framer-motion components for testing
export const mockFramerMotion = () => {
  vi.mock('framer-motion', () => ({
    motion: {
      div: ({ children, ...props }) => <div {...props}>{children}</div>,
      section: ({ children, ...props }) => <section {...props}>{children}</section>,
      h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
      h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
      h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
      p: ({ children, ...props }) => <p {...props}>{children}</p>,
      span: ({ children, ...props }) => <span {...props}>{children}</span>,
      button: ({ children, ...props }) => <button {...props}>{children}</button>,
      a: ({ children, ...props }) => <a {...props}>{children}</a>,
      img: ({ children, ...props }) => <img {...props}>{children}</img>,
      ul: ({ children, ...props }) => <ul {...props}>{children}</ul>,
      li: ({ children, ...props }) => <li {...props}>{children}</li>,
    },
    AnimatePresence: ({ children }) => children,
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: () => 0,
    useSpring: () => 0,
    useAnimation: () => ({
      start: vi.fn(),
      stop: vi.fn(),
      set: vi.fn(),
    }),
    useInView: () => [vi.fn(), true],
  }));
};

// Create mock intersection observer entry
export const createMockIntersectionObserverEntry = (isIntersecting = true) => ({
  isIntersecting,
  target: document.createElement('div'),
  intersectionRatio: isIntersecting ? 1 : 0,
  boundingClientRect: {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  },
  intersectionRect: {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  },
  rootBounds: {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  },
  time: Date.now(),
});

// Wait for all async operations to complete
export const waitForLoadingToFinish = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 0);
  });
};

// Test data factories
export const createMockProject = (overrides = {}) => ({
  id: 1,
  title: 'Test Project',
  description: 'A test project description',
  techs: ['react', 'javascript'],
  image: '/test-image.jpg',
  liveLink: 'https://example.com',
  repoLink: 'https://github.com/test/repo',
  featured: false,
  ...overrides,
});

export const createMockTechContext = (overrides = {}) => ({
  selectedTech: 'react',
  bgColor: '#61DAFB',
  techColors: {
    react: '#61DAFB',
    javascript: '#F7DF1E',
    nextjs: '#000000',
    tailwind: '#06B6D4',
  },
  updateTech: vi.fn(),
  ...overrides,
});

export const createMockLanguageContext = (overrides = {}) => ({
  language: 'en',
  setLanguage: vi.fn(),
  t: vi.fn(key => key),
  ...overrides,
});

export const createMockStatusContext = (overrides = {}) => ({
  status: 'available',
  lastUpdated: new Date().toISOString(),
  updateStatus: vi.fn(),
  statusConfig: {
    available: { color: '#10B981', icon: '🟢' },
    busy: { color: '#F59E0B', icon: '🟡' },
    away: { color: '#EF4444', icon: '🔴' },
  },
  ...overrides,
});

// Re-export everything from React Testing Library
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
