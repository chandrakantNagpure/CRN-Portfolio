import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * SEO component for managing page metadata
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.canonical - Canonical URL
 * @param {string} props.ogImage - Open Graph image URL
 * @param {string} props.ogType - Open Graph type (default: 'website')
 * @param {Array} props.keywords - Array of keywords
 * @param {string} props.twitterCard - Twitter card type (default: 'summary_large_image')
 */
function SEO({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  keywords = [],
  twitterCard = 'summary_large_image',
}) {
  const { currentLanguage, availableLanguages } = useLanguage();

  const baseUrl = 'https://chandrakantnagpure.com';
  const defaultTitle = 'Chandrakant Nagpure - Frontend Developer & WordPress Expert';
  const defaultDescription =
    'Chandrakant Nagpure, a skilled React and WordPress developer, offers expertise in building modern, SEO-friendly web applications.';
  const defaultOgImage = `${baseUrl}/assets/og-image.jpg`;

  const pageTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;
  const pageOgImage = ogImage || defaultOgImage;

  // Generate hreflang tags for different languages
  const hreflangLinks = availableLanguages.map(lang => ({
    rel: 'alternate',
    hreflang: lang.code,
    href: `${baseUrl}${canonical || ''}?lang=${lang.code}`,
  }));

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={currentLanguage} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={pageCanonical} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageOgImage} />
      <meta property="og:url" content={pageCanonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Chandrakant Nagpure Portfolio" />
      <meta
        property="og:locale"
        content={currentLanguage === 'en' ? 'en_US' : currentLanguage === 'es' ? 'es_ES' : 'fr_FR'}
      />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageOgImage} />
      <meta name="twitter:creator" content="@chandrakantNP" />
      <meta name="twitter:site" content="@chandrakantNP" />

      {/* Hreflang Tags */}
      {hreflangLinks.map(link => (
        <link key={link.hreflang} {...link} />
      ))}

      {/* Additional SEO Tags */}
      <meta name="author" content="Chandrakant Nagpure" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

      {/* Structured Data for Person/Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Chandrakant Nagpure',
          jobTitle: 'Frontend Developer & WordPress Expert',
          description: pageDescription,
          url: baseUrl,
          image: pageOgImage,
          sameAs: [
            'https://github.com/chandrakantNagpure',
            'https://www.linkedin.com/in/chandrakant-nagpure-04419b135',
            'https://twitter.com/chandrakantNP',
          ],
          knowsAbout: [
            'React',
            'Next.js',
            'WordPress',
            'JavaScript',
            'PHP',
            'Tailwind CSS',
            'UI/UX Design',
            'Frontend Development',
          ],
          workLocation: {
            '@type': 'Place',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Nagpur',
              addressRegion: 'Maharashtra',
              addressCountry: 'India',
            },
          },
        })}
      </script>
    </Helmet>
  );
}

export default SEO;
