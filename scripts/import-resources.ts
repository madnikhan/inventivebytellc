/**
 * Import resource/blog posts from src/data/resources.ts into Sanity CMS
 *
 * Usage:
 * 1. Add a write token in .env.local as SANITY_API_TOKEN
 * 2. Run: npx tsx scripts/import-resources.ts
 */

import { createClient } from '@sanity/client';
import { config } from 'dotenv';
import { resolve } from 'path';
import { staticResources } from '../src/data/resources';

config({ path: resolve(process.cwd(), '.env.local') });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ahit08r2';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error('❌ Error: SANITY_API_TOKEN not found in .env.local');
  console.error('Create a write token in Sanity Dashboard → API → Tokens');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  token,
  apiVersion: '2024-01-01',
});

async function importResources() {
  console.log('🚀 Importing resources into Sanity...\n');
  console.log(`Project: ${projectId}`);
  console.log(`Dataset: ${dataset}\n`);

  let imported = 0;
  let skipped = 0;
  let errors = 0;

  for (const resource of staticResources) {
    try {
      const existing = await client.fetch(
        `*[_type == "resource" && slug.current == $slug][0]`,
        { slug: resource.slug }
      );

      if (existing) {
        console.log(`⏭️  Skipping "${resource.title}" – already exists`);
        skipped++;
        continue;
      }

      // Convert YYYY-MM-DD to ISO datetime for publishedAt
      const publishedAt = resource.date
        ? new Date(resource.date + 'T12:00:00.000Z').toISOString()
        : new Date().toISOString();

      const doc = {
        _type: 'resource',
        title: resource.title,
        slug: {
          _type: 'slug',
          current: resource.slug,
        },
        excerpt: resource.excerpt || '',
        category: resource.category || undefined,
        publishedAt,
        body: resource.body || '',
      };

      const result = await client.create(doc);
      console.log(`✅ Imported "${resource.title}" (ID: ${result._id})`);
      imported++;

      await new Promise((r) => setTimeout(r, 100));
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error importing "${resource.title}":`, msg);
      errors++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   ✅ Imported: ${imported}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   ❌ Errors: ${errors}`);
  console.log('\n✨ Open Sanity Studio to see Resources / Blog.');
}

importResources()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('\n💥 Fatal error:', err);
    process.exit(1);
  });
