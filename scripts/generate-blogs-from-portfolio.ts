/**
 * Generate a Resource (blog) in Sanity for every existing Portfolio document.
 * Run once to backfill blogs for portfolios that were saved before the webhook was set up.
 *
 * Usage:
 * 1. Ensure .env.local has NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN
 * 2. Run: npx tsx scripts/generate-blogs-from-portfolio.ts
 */

import { config } from "dotenv";
import { resolve } from "path";
import { getPortfolioProjects } from "../src/lib/sanity";
import { createOrUpdateResourceFromPortfolioId } from "../src/lib/portfolio-to-blog";

config({ path: resolve(process.cwd(), ".env.local") });

async function main() {
  const token = process.env.SANITY_API_TOKEN;
  if (!token) {
    console.error("❌ SANITY_API_TOKEN not set in .env.local. Create a write token in Sanity Dashboard → API → Tokens.");
    process.exit(1);
  }

  console.log("📚 Generating blogs from existing portfolios...\n");

  const projects = await getPortfolioProjects();
  if (projects.length === 0) {
    console.log("No portfolio documents found in Sanity.");
    process.exit(0);
  }

  let created = 0;
  let updated = 0;
  let failed = 0;

  for (const project of projects) {
    const id = project._id;
    const title = project.title || id;
    try {
      const result = await createOrUpdateResourceFromPortfolioId(id);
      if (result) {
        if (result.action === "created") {
          created++;
          console.log(`✅ Created blog: "${title}" → /resources/${result.slug}`);
        } else {
          updated++;
          console.log(`🔄 Updated blog: "${title}" → /resources/${result.slug}`);
        }
      }
      await new Promise((r) => setTimeout(r, 150));
    } catch (err) {
      failed++;
      console.error(`❌ "${title}" (${id}):`, err instanceof Error ? err.message : err);
    }
  }

  console.log("\n📊 Summary:");
  console.log(`   Created: ${created}`);
  console.log(`   Updated: ${updated}`);
  if (failed) console.log(`   Failed: ${failed}`);
  console.log("\n✨ Open Sanity Studio → Resources to see the blogs.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
