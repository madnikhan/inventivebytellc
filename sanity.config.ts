import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'default',
  title: 'InventiveByte LLC CMS',
  // Hardcode project ID - Sanity Studio runs in browser, can't access .env.local directly
  projectId: 'ahit08r2',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    structureTool(),
    visionTool(), // Adds GROQ query interface
  ],
  schema: {
    types: schemaTypes,
  },
});
