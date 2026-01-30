import React, { useState } from 'react';
import { TrashIcon } from '@sanity/icons';
import type {
  DocumentActionDescription,
  DocumentActionConfirmDialogProps,
  DocumentActionProps,
} from 'sanity';
import { useClient } from 'sanity';
import { useRouter } from 'sanity/router';

const API_VERSION = '2024-01-01';

/**
 * Visible "Delete" document action so users don't have to open the ⋮ menu.
 * Works for Portfolio Project and Testimonial (and any other document type).
 */
export function DeleteDocumentAction(
  props: DocumentActionProps
): DocumentActionDescription | null {
  const { id, onComplete } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const client = useClient({ apiVersion: API_VERSION });
  const router = useRouter();

  const dialog: DocumentActionConfirmDialogProps | null = {
    message: 'Permanently delete this document? This cannot be undone.',
    onCancel: () => {
      setDialogOpen(false);
      onComplete();
    },
    onConfirm: async () => {
      const transaction = client.transaction();
      transaction.delete(id);
      transaction.delete(`drafts.${id}`);
      try {
        await transaction.commit();
        router.navigateUrl({ path: '/structure' });
      } catch {
        // Error is visible in the dialog; user can close and retry
      } finally {
        setDialogOpen(false);
        onComplete();
      }
    },
    type: 'confirm',
  };

  return {
    tone: 'critical',
    label: 'Delete',
    icon: TrashIcon,
    shortcut: 'Ctrl+Alt+D',
    onHandle: () => setDialogOpen(true),
    dialog: dialogOpen ? dialog : undefined,
  };
}
