'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from '../../sanity/schemas';
import { DeleteDocumentAction } from '../../sanity/actions/deleteDocument';

/**
 * Sanity Studio config for the embedded /studio route.
 * Uses schema from repo (includes "Project (Volunteering)" testimonial type).
 * Use this app’s /studio URL, not inventivebytellc.sanity.studio.
 */
export default defineConfig({
  name: 'default',
  title: 'InventiveByte LLC CMS',
  projectId: 'ahit08r2',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Resources / Blog')
              .child(S.documentTypeList('resource').title('Resources')),
            S.listItem()
              .title('Portfolio')
              .child(S.documentTypeList('portfolio').title('Portfolio')),
            S.listItem()
              .title('Testimonials')
              .child(S.documentTypeList('testimonial').title('Testimonials')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev) => [DeleteDocumentAction, ...prev],
  },
});
