import { absoluteUrl, brandName, brandTagline, businessAddress, businessEmail, businessPhone, primaryKeywords, seoImage } from '@/lib/seo';

const loginKeywords = [
  'jewellery shop in Belagavi',
  'best jewellers in Belgaum',
  'gold jewellery shop Belagavi',
  'silver jewellery shop in Belgaum',
  'Bridal Jewellery Collections in Belagavi',
  'Custom Jewellery Designers in Belgaum',
  'best jewellery store in belgaum',
  'Mulveer Jewellers login portal',
];

export default function Head() {
  const pageUrl = absoluteUrl('/login');
  const keywords = Array.from(new Set([...primaryKeywords, ...loginKeywords])).join(', ');
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    name: brandName,
    description:
      'Mulveer Jewellers in Belagavi offers BIS hallmarked gold, silver and diamond collections along with custom bridal jewellery design services.',
    url: pageUrl,
    slogan: brandTagline,
    telephone: businessPhone,
    email: businessEmail,
    image: seoImage,
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessAddress.street,
      addressLocality: businessAddress.city,
      addressRegion: businessAddress.state,
      postalCode: businessAddress.postalCode,
      addressCountry: businessAddress.country,
    },
    areaServed: {
      '@type': 'City',
      name: 'Belagavi',
      sameAs: 'https://en.wikipedia.org/wiki/Belgaum',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 15.8497,
      longitude: 74.4977,
    },
    knowsAbout: Array.from(new Set(loginKeywords)),
    sameAs: [
      'https://www.instagram.com/mulveer_jewellers/',
      'https://api.whatsapp.com/send?phone=+919481656583',
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '10:00',
        closes: '21:00',
      },
    ],
    serviceArea: 'Belagavi and Belgaum',
    priceRange: '$$',
  };

  return (
    <>
      <title>Mulveer Jewellers Login | Belagavi Jewellery Experts</title>
      <meta
        name="description"
        content="Sign in to Mulveer Jewellers to manage bridal jewellery enquiries, Belagavi custom orders, and stay updated with the best gold and silver collections in Belgaum."
      />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Mulveer Jewellers Login | Belagavi Jewellery Experts" />
      <meta
        property="og:description"
        content="Trusted jewellery shop in Belagavi for gold, silver, bridal and custom collections. Access your Mulveer account to track designs and services."
      />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:site_name" content={brandName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Mulveer Jewellers Login | Belagavi Jewellery Experts" />
      <meta
        name="twitter:description"
        content="Belagavi's trusted jewellery store for bridal, gold, silver and custom designs. Sign in to stay connected with Mulveer Jewellers."
      />
      <meta name="twitter:image" content={seoImage} />
      <meta name="geo.region" content="IN-KA" />
      <meta name="geo.placename" content="Belagavi" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
