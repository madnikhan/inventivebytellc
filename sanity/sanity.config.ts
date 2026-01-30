import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

// Keep in sync with root sanity.config.ts (root is used by sanity dev/deploy from project root)
export default defineConfig({
  name: 'default',
  title: 'InventiveByte LLC CMS',
  projectId: 'ahit08r2',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
  document: {
    actions: (prev) => prev,
  },
});
