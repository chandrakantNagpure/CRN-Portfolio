// Blog posts data - In a real app, this would come from a CMS or API
export const blogPosts = [
  {
    id: 1,
    title: 'Building Modern React Applications with Vite and Tailwind CSS',
    slug: 'modern-react-vite-tailwind',
    excerpt:
      "Learn how to create lightning-fast React applications using Vite's blazing-fast build tool combined with the utility-first approach of Tailwind CSS.",
    content: `
# Building Modern React Applications with Vite and Tailwind CSS

In today's fast-paced web development world, developer experience and performance are paramount. Two tools that have revolutionized how we build React applications are **Vite** and **Tailwind CSS**.

## Why Vite?

Vite (French for "quick") is a build tool that provides:

- ⚡ Lightning-fast hot module replacement (HMR)
- 📦 Optimized production builds
- 🔧 Zero-config TypeScript support
- 🎯 Framework-agnostic architecture

### Setting Up Your Project

\`\`\`bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
\`\`\`

## Integrating Tailwind CSS

Tailwind CSS brings utility-first styling that's both powerful and maintainable:

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

### Configuration

Update your \`tailwind.config.js\`:

\`\`\`javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
\`\`\`

## Best Practices

1. **Component Structure**: Keep components small and focused
2. **Custom Utilities**: Create custom Tailwind utilities for repeated patterns
3. **Performance**: Use dynamic imports for better code splitting

### Example Component

\`\`\`jsx
import { useState } from 'react'

function Card({ title, children }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {title}
        </h3>
        <div className={isExpanded ? 'block' : 'line-clamp-3'}>
          {children}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </div>
  )
}
\`\`\`

## Conclusion

The combination of Vite and Tailwind CSS creates a powerful development environment that prioritizes both developer experience and performance. Give it a try in your next project!
    `,
    author: 'Chandrakant Nagpure',
    date: '2024-03-15',
    readTime: '5 min read',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Frontend'],
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    featured: true,
    published: true,
    seo: {
      title: 'Building Modern React Apps with Vite and Tailwind CSS | Developer Guide',
      description:
        "Complete guide to creating high-performance React applications using Vite's fast build tool and Tailwind CSS utility-first framework.",
      keywords: ['React', 'Vite', 'Tailwind CSS', 'Frontend Development', 'JavaScript'],
    },
  },
  {
    id: 2,
    title: 'The Art of Component Design: Creating Reusable UI Elements',
    slug: 'component-design-reusable-ui',
    excerpt:
      'Dive deep into component design principles and learn how to create truly reusable UI components that scale with your application.',
    content: `
# The Art of Component Design: Creating Reusable UI Elements

Creating reusable components is both an art and a science. It requires balancing flexibility with simplicity, performance with features.

## Design Principles

### 1. Single Responsibility Principle

Each component should have one clear purpose:

\`\`\`jsx
// Good: Focused component
function Button({ children, variant, onClick, disabled }) {
  return (
    <button
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

// Avoid: Component doing too much
function ButtonWithModalAndForm() {
  // Too many responsibilities
}
\`\`\`

### 2. Composition over Inheritance

Build complex UIs by composing simple components:

\`\`\`jsx
function Card({ children, className }) {
  return (
    <div className={\`card \${className}\`}>
      {children}
    </div>
  )
}

function CardHeader({ children }) {
  return <div className="card-header">{children}</div>
}

function CardBody({ children }) {
  return <div className="card-body">{children}</div>
}

// Usage
<Card>
  <CardHeader>
    <h2>Title</h2>
  </CardHeader>
  <CardBody>
    <p>Content goes here</p>
  </CardBody>
</Card>
\`\`\`

## Advanced Patterns

### Compound Components

\`\`\`jsx
function Tabs({ children, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">
        {children}
      </div>
    </TabsContext.Provider>
  )
}

Tabs.List = function TabsList({ children }) {
  return <div className="tab-list">{children}</div>
}

Tabs.Tab = function Tab({ children, index }) {
  const { activeTab, setActiveTab } = useContext(TabsContext)
  return (
    <button
      className={\`tab \${activeTab === index ? 'active' : ''}\`}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  )
}
\`\`\`

## Testing Your Components

Always test your reusable components:

\`\`\`jsx
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

test('renders button with correct text', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button')).toHaveTextContent('Click me')
})

test('calls onClick when clicked', () => {
  const handleClick = jest.fn()
  render(<Button onClick={handleClick}>Click me</Button>)
  fireEvent.click(screen.getByRole('button'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})
\`\`\`

## Conclusion

Well-designed components are the foundation of maintainable React applications. Focus on clarity, composition, and testing to create components that stand the test of time.
    `,
    author: 'Chandrakant Nagpure',
    date: '2024-03-10',
    readTime: '8 min read',
    tags: ['React', 'Component Design', 'UI/UX', 'Best Practices'],
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=400&fit=crop',
    featured: true,
    published: true,
    seo: {
      title: 'Component Design Guide: Creating Reusable UI Elements | React Tutorial',
      description:
        'Learn component design principles and patterns for creating scalable, reusable UI components in React applications.',
      keywords: ['React Components', 'UI Design', 'Component Architecture', 'Frontend Development'],
    },
  },
  {
    id: 3,
    title: 'Optimizing Web Performance: Core Web Vitals and Beyond',
    slug: 'web-performance-optimization-guide',
    excerpt:
      'Master web performance optimization techniques and learn how to improve your Core Web Vitals scores for better user experience and SEO.',
    content: `
# Optimizing Web Performance: Core Web Vitals and Beyond

Web performance directly impacts user experience, SEO rankings, and business metrics. Let's explore how to optimize your applications for peak performance.

## Understanding Core Web Vitals

Core Web Vitals are three key metrics that Google uses to measure user experience:

### 1. Largest Contentful Paint (LCP)
- **Target**: < 2.5 seconds
- **Measures**: Loading performance
- **How to improve**:
  - Optimize images with modern formats (WebP, AVIF)
  - Use CDN for static assets
  - Implement lazy loading

### 2. Interaction to Next Paint (INP)
- **Target**: < 200 milliseconds  
- **Measures**: Interactivity (replaces FID in Core Web Vitals)
- **How to improve**:
  - Minimize JavaScript execution
  - Code splitting and lazy loading
  - Web Workers for heavy computations

### 3. Cumulative Layout Shift (CLS)
- **Target**: < 0.1
- **Measures**: Visual stability
- **How to improve**:
  - Reserve space for images and ads
  - Avoid inserting content above existing content
  - Use CSS transforms instead of layout-triggering properties

## Practical Optimization Techniques

### Image Optimization

\`\`\`jsx
// Modern image component with optimization
function OptimizedImage({ src, alt, width, height, ...props }) {
  return (
    <picture>
      <source srcSet={\`\${src}.avif\`} type="image/avif" />
      <source srcSet={\`\${src}.webp\`} type="image/webp" />
      <img
        src={\`\${src}.jpg\`}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </picture>
  )
}
\`\`\`

### Code Splitting

\`\`\`jsx
import { lazy, Suspense } from 'react'

// Lazy load heavy components
const Dashboard = lazy(() => import('./Dashboard'))
const Analytics = lazy(() => import('./Analytics'))

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/dashboard" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Dashboard />
            </Suspense>
          } 
        />
        <Route 
          path="/analytics" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Analytics />
            </Suspense>
          } 
        />
      </Routes>
    </Router>
  )
}
\`\`\`

### Performance Monitoring

\`\`\`javascript
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals'

function sendToAnalytics(metric) {
  // Send to your analytics service
  gtag('event', metric.name, {
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    event_category: 'Web Vitals',
    event_label: metric.id,
    non_interaction: true,
  })
}

onCLS(sendToAnalytics)
onINP(sendToAnalytics) // INP replaces FID in web-vitals v5
onFCP(sendToAnalytics)
onLCP(sendToAnalytics)
onTTFB(sendToAnalytics)
\`\`\`

## Tools for Performance Analysis

1. **Lighthouse**: Built into Chrome DevTools
2. **WebPageTest**: Comprehensive performance testing
3. **Google PageSpeed Insights**: Real-world performance data
4. **Bundle Analyzer**: Analyze JavaScript bundle size

## Performance Budget

Set performance budgets to maintain standards:

\`\`\`json
{
  "budget": [
    {
      "path": "/**",
      "timings": [
        { "metric": "interactive", "budget": 3000 },
        { "metric": "first-contentful-paint", "budget": 1500 }
      ],
      "resourceSizes": [
        { "resourceType": "script", "budget": 250 },
        { "resourceType": "total", "budget": 500 }
      ]
    }
  ]
}
\`\`\`

## Conclusion

Performance optimization is an ongoing process. Regular monitoring, performance budgets, and user-focused metrics will help you maintain excellent user experiences.

Remember: **Fast sites lead to better user engagement, higher conversion rates, and improved SEO rankings.**
    `,
    author: 'Chandrakant Nagpure',
    date: '2024-03-05',
    readTime: '12 min read',
    tags: ['Performance', 'Core Web Vitals', 'SEO', 'Optimization'],
    category: 'Performance',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    featured: false,
    published: true,
    seo: {
      title: 'Web Performance Optimization Guide: Core Web Vitals & More | 2024',
      description:
        'Complete guide to optimizing web performance, improving Core Web Vitals scores, and enhancing user experience for better SEO rankings.',
      keywords: ['Web Performance', 'Core Web Vitals', 'SEO Optimization', 'User Experience'],
    },
  },
];

// Helper functions
export const getFeaturedPosts = () => blogPosts.filter(post => post.featured && post.published);

export const getPostsByCategory = category =>
  blogPosts.filter(post => post.category === category && post.published);

export const getPostBySlug = slug => blogPosts.find(post => post.slug === slug && post.published);

export const getAllTags = () => {
  const tags = new Set();
  blogPosts.forEach(post => {
    if (post.published) {
      post.tags.forEach(tag => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
};

export const getPostsByTag = tag =>
  blogPosts.filter(
    post => post.published && post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  );

export const getRelatedPosts = (currentPost, limit = 3) => {
  return blogPosts
    .filter(
      post =>
        post.published &&
        post.id !== currentPost.id &&
        (post.category === currentPost.category ||
          post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
};
