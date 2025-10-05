import {
  generatePageSchemas,
  generateTarotReadingSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo/schema-markup';

interface SchemaMarkupProps {
  type: 'tarot-reading' | 'numerology' | 'general';
  data?: {
    readingType?: string;
    price?: string;
    breadcrumbs?: Array<{ name: string; url: string }>;
  };
}

export function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  const schemas = generatePageSchemas(type, data);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}

interface TarotReadingSchemaProps {
  readingType: string;
  price?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export function TarotReadingSchema({
  readingType,
  price,
  breadcrumbs,
}: TarotReadingSchemaProps) {
  const schemas = [];

  // Add tarot reading schema
  schemas.push(generateTarotReadingSchema(readingType, price));

  // Add breadcrumb schema if provided
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(generateBreadcrumbSchema(breadcrumbs));
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = generateBreadcrumbSchema(items);

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
