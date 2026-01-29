/**
 * Import portfolio projects from src/data/portfolio.ts to Sanity CMS
 * 
 * Usage:
 * 1. Make sure you have a write token in .env.local as SANITY_API_TOKEN
 * 2. Run: npx tsx scripts/import-portfolio.ts
 */

import { createClient } from '@sanity/client';
import { config } from 'dotenv';
import { resolve } from 'path';
import { portfolioProjects } from '../src/data/portfolio';

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ahit08r2';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error('❌ Error: SANITY_API_TOKEN not found in .env.local');
  console.error('Please create a write token in Sanity Dashboard → API → Tokens');
  process.exit(1);
}

// Create Sanity client with write permissions
const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  token,
  apiVersion: '2024-01-01',
});

async function importPortfolio() {
  console.log('🚀 Starting portfolio import...\n');
  console.log(`Project: ${projectId}`);
  console.log(`Dataset: ${dataset}\n`);

  let imported = 0;
  let skipped = 0;
  let errors = 0;

  for (const project of portfolioProjects) {
    try {
      // Check if project already exists
      const existing = await client.fetch(
        `*[_type == "portfolio" && slug.current == $slug][0]`,
        { slug: project.id }
      );

      if (existing) {
        console.log(`⏭️  Skipping "${project.title}" - already exists`);
        skipped++;
        continue;
      }

      // Create the document
      const doc = {
        _type: 'portfolio',
        title: project.title,
        slug: {
          _type: 'slug',
          current: project.id,
        },
        description: project.description,
        longDescription: project.longDescription || '',
        websiteLink: project.websiteLink || undefined,
        githubLink: project.githubLink || undefined,
        techStack: project.techStack || [],
        category: project.category || [],
        date: project.date || '',
        featured: project.featured || false,
        video: project.video || undefined,
        // Note: Images need to be uploaded manually via Sanity Studio
        // The image paths in portfolio.ts are local SVG files
        images: [], // Empty array - upload images manually
      };

      const result = await client.create(doc);
      console.log(`✅ Imported "${project.title}" (ID: ${result._id})`);
      imported++;

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error: any) {
      console.error(`❌ Error importing "${project.title}":`, error.message);
      errors++;
    }
  }

  console.log('\n📊 Import Summary:');
  console.log(`   ✅ Imported: ${imported}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   ❌ Errors: ${errors}`);
  console.log(`\n📝 Next Steps:`);
  console.log(`   1. Open Sanity Studio: npm run sanity:dev`);
  console.log(`   2. Go to Portfolio Project section`);
  console.log(`   3. Upload images for each project manually`);
  console.log(`   4. Images are currently pointing to: /brands/*.svg`);
}

// Run the import
importPortfolio()
  .then(() => {
    console.log('\n✨ Import completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Fatal error:', error);
    process.exit(1);
  });
