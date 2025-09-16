import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

// Configure marked with syntax highlighting
marked.setOptions({
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch (err) {
        console.warn('Syntax highlighting failed:', err);
      }
    }
    return hljs.highlightAuto(code).value;
  },
  langPrefix: 'hljs language-',
  breaks: true,
  gfm: true,
});

// Custom renderer for better styling
const renderer = new marked.Renderer();

// Custom heading renderer with anchor links
renderer.heading = function (text, level) {
  const slug = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `
    <h${level} id="${slug}" class="heading-${level} group relative">
      <a href="#${slug}" class="anchor-link absolute -left-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity text-teal-500 hover:text-teal-600" aria-label="Link to section">
        #
      </a>
      ${text}
    </h${level}>
  `;
};

// Custom code block renderer
renderer.code = function (code, lang) {
  const language = lang || 'text';
  const highlighted = hljs.highlight(code, {
    language: hljs.getLanguage(language) ? language : 'text',
  }).value;

  return `
    <div class="code-block relative group mb-6">
      <div class="flex justify-between items-center bg-gray-800 text-white px-4 py-2 text-sm rounded-t-lg">
        <span class="text-gray-300">${language}</span>
        <button 
          onclick="navigator.clipboard.writeText(\`${code.replace(/`/g, '\\`')}\`).then(() => {
            const btn = this;
            const original = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => btn.textContent = original, 2000);
          })"
          class="copy-btn text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          Copy
        </button>
      </div>
      <pre class="hljs bg-gray-900 text-white p-4 rounded-b-lg overflow-x-auto"><code class="language-${language}">${highlighted}</code></pre>
    </div>
  `;
};

// Custom blockquote renderer
renderer.blockquote = function (quote) {
  return `
    <blockquote class="border-l-4 border-teal-500 pl-6 py-2 my-6 italic text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-r-lg">
      ${quote}
    </blockquote>
  `;
};

// Custom link renderer with external link handling
renderer.link = function (href, title, text) {
  const isExternal = href.startsWith('http') && !href.includes(window.location.hostname);
  const target = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
  const titleAttr = title ? `title="${title}"` : '';
  const classes =
    'text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors underline';

  return `<a href="${href}" ${target} ${titleAttr} class="${classes}">${text}</a>`;
};

// Custom list renderer
renderer.list = function (body, ordered) {
  const tag = ordered ? 'ol' : 'ul';
  const classes = ordered
    ? 'list-decimal list-inside space-y-2 my-4 ml-4'
    : 'list-disc list-inside space-y-2 my-4 ml-4';

  return `<${tag} class="${classes}">${body}</${tag}>`;
};

// Custom paragraph renderer
renderer.paragraph = function (text) {
  return `<p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">${text}</p>`;
};

// Custom image renderer with responsive styling
renderer.image = function (href, title, text) {
  const titleAttr = title ? `title="${title}"` : '';
  return `
    <figure class="my-8">
      <img 
        src="${href}" 
        alt="${text}" 
        ${titleAttr}
        class="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        loading="lazy"
      />
      ${title ? `<figcaption class="text-center text-sm text-gray-600 dark:text-gray-400 mt-2 italic">${title}</figcaption>` : ''}
    </figure>
  `;
};

marked.use({ renderer });

// Main function to render markdown
export const renderMarkdown = markdown => {
  try {
    return marked(markdown);
  } catch (error) {
    console.error('Markdown rendering failed:', error);
    return `<p class="text-red-500">Error rendering content</p>`;
  }
};

// Function to extract reading time from content
export const calculateReadingTime = content => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Function to extract excerpt from markdown content
export const extractExcerpt = (content, maxLength = 160) => {
  // Remove markdown syntax and get plain text
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/\n/g, ' ')
    .trim();

  return plainText.length > maxLength ? plainText.substring(0, maxLength) + '...' : plainText;
};

// Function to generate table of contents
export const generateTableOfContents = content => {
  const headings = [];
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    headings.push({ level, text, slug });
  }

  return headings;
};
