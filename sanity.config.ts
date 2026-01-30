import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';
import { DeleteDocumentAction } from './sanity/actions/deleteDocument';

export default defineConfig({
  name: 'default',
  title: 'InventiveByte LLC CMS',
  projectId: 'ahit08r2',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    // Add a visible "Delete" button (plus keep all default actions in the ⋮ menu)
    actions: (prev) => [DeleteDocumentAction, ...prev],
  },
});
