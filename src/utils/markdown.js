import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

// Simple marked configuration without custom renderers for now
// This will use the default styling but should work without errors
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

// Helper function to add Tailwind classes to HTML elements
function addCustomStyling(html) {
  return html
    // Style headings with IDs and anchor links
    .replace(/<h([1-6])>([^<]+)<\/h([1-6])>/g, (match, level, text, closeLevel) => {
      const slug = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      const headingClasses = {
        1: 'text-3xl font-bold mb-6 mt-8',
        2: 'text-2xl font-semibold mb-4 mt-6',
        3: 'text-xl font-semibold mb-3 mt-5',
        4: 'text-lg font-semibold mb-3 mt-4',
        5: 'text-base font-semibold mb-2 mt-3',
        6: 'text-base font-semibold mb-2 mt-3'
      };
      
      return `<h${level} id="${slug}" class="${headingClasses[level]} group relative" style="color: inherit;">
        <a href="#${slug}" class="anchor-link absolute -left-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity" style="color: #14B8A6;" aria-label="Link to section">
          #
        </a>
        ${text}
      </h${level}>`;
    })
    // Style paragraphs
    .replace(/<p>/g, '<p class="mb-4 leading-relaxed" style="color: inherit;">')
    // Style unordered lists
    .replace(/<ul>/g, '<ul class="list-disc list-inside space-y-2 my-4 ml-4" style="color: inherit;">')
    // Style ordered lists
    .replace(/<ol>/g, '<ol class="list-decimal list-inside space-y-2 my-4 ml-4" style="color: inherit;">')
    // Style list items
    .replace(/<li>/g, '<li class="mb-1" style="color: inherit;">')
    // Style links
    .replace(/<a ([^>]*?)>([^<]+)<\/a>/g, (match, attrs, text) => {
      const href = attrs.match(/href="([^"]*)"/)?.[1] || '';
      const isExternal = href.startsWith('http') && !href.includes(window.location.hostname);
      const target = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
      const classes = 'transition-colors underline hover:opacity-80';
      return `<a ${attrs} ${target} class="${classes}" style="color: #14B8A6;">${text}</a>`;
    })
    // Style blockquotes
    .replace(/<blockquote>/g, '<blockquote class="border-l-4 pl-6 py-2 my-6 italic rounded-r-lg" style="border-color: #14B8A6; background-color: rgba(255, 255, 255, 0.1); color: inherit;">')
    // Style code blocks with copy button
    .replace(/<pre><code class="([^"]*)">([\s\S]*?)<\/code><\/pre>/g, (match, className, code) => {
      const language = className.replace('hljs language-', '') || 'text';
      return `
        <div class="code-block relative group mb-6 max-w-full">
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
          <pre class="hljs bg-gray-900 text-white p-4 rounded-b-lg overflow-x-auto max-w-full" style="white-space: pre-wrap; word-wrap: break-word;"><code class="${className}">${code}</code></pre>
        </div>
      `;
    })
    // Style images
    .replace(/<img ([^>]*?)>/g, (match, attrs) => {
      return `
        <figure class="my-8">
          <img ${attrs} class="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" loading="lazy" />
        </figure>
      `;
    });
}

// Main function to render markdown
export const renderMarkdown = markdown => {
  try {
    if (!markdown || typeof markdown !== 'string') {
      console.warn('No valid markdown content provided');
      return `<p style="color: inherit; text-align: center; padding: 20px;">No content available.</p>`;
    }
    
    const result = marked(markdown);
    if (!result) {
      return `<p style="color: inherit;">Content could not be rendered.</p>`;
    }
    
    // Apply custom styling to the rendered HTML
    const styledResult = addCustomStyling(result);
    return styledResult;
  } catch (error) {
    console.error('Markdown rendering failed:', error);
    return `<div style="color: inherit; padding: 20px; text-align: center; background: rgba(255,255,255,0.1); border-radius: 8px;">
      <h3 style="margin-bottom: 10px;">Content Rendering Error</h3>
      <p>There was an issue rendering this article's content.</p>
      <details style="margin-top: 10px; text-align: left;">
        <summary style="cursor: pointer;">Error Details</summary>
        <pre style="font-size: 12px; margin-top: 5px; padding: 10px; background: rgba(0,0,0,0.3); border-radius: 4px;">${error.message}</pre>
      </details>
    </div>`;
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
