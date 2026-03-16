'use client';

import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Tooltip from '@mui/material/Tooltip';
import { ArrowClockwiseIcon } from '@phosphor-icons/react/dist/ssr/ArrowClockwise';

type SnackbarState =
  | { open: false; severity?: never; message?: never }
  | { open: true; severity: 'success' | 'error'; message: string };

export function SyncExamsToFirestoreButton(): React.JSX.Element {
  const [loading, setLoading] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState<SnackbarState>({ open: false });

  const handleClose = React.useCallback(() => {
    setSnackbar({ open: false });
  }, []);

  const handleSync = React.useCallback(async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await fetch('/api/sync-exams-to-firestore', { method: 'POST' });
      const payload: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          payload && typeof payload === 'object' && 'error' in payload && typeof payload.error === 'string'
            ? payload.error
            : 'Sync failed';
        setSnackbar({ open: true, severity: 'error', message });
        return;
      }

      const message =
        payload && typeof payload === 'object' && 'message' in payload && typeof payload.message === 'string'
          ? payload.message
          : 'Synced to Firestore';
      setSnackbar({ open: true, severity: 'success', message });
    } catch (error) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: error instanceof Error ? error.message : 'Sync failed',
      });
    } finally {
      setLoading(false);
    }
  }, [loading]);

  return (
    <React.Fragment>
      <Tooltip title="Sync exams config to Firestore">
        <span>
          <Button
            color="inherit"
            disabled={loading}
            onClick={handleSync}
            size="small"
            startIcon={
              loading ? (
                <CircularProgress color="inherit" size={16} thickness={5} />
              ) : (
                <ArrowClockwiseIcon fontSize="var(--icon-fontSize-md)" />
              )
            }
            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
          >
            Sync exams
          </Button>
        </span>
      </Tooltip>
      <Snackbar
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        autoHideDuration={5000}
        onClose={handleClose}
        open={snackbar.open}
      >
        {snackbar.open ? (
          <Alert onClose={handleClose} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        ) : (
          <span />
        )}
      </Snackbar>
    </React.Fragment>
  );
}
