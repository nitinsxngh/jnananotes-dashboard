'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type LoginEvent = {
  id: string;
  email: string;
  timestamp: string;
};

const LOGIN_EVENTS_KEY = 'jnana-login-events';

export default function LoginHistoryClient(): React.JSX.Element {
  const [events, setEvents] = React.useState<LoginEvent[]>([]);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(LOGIN_EVENTS_KEY);
      const parsed = raw ? (JSON.parse(raw) as LoginEvent[]) : [];
      setEvents(parsed);
    } catch {
      setEvents([]);
    }
  }, []);

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4">Login History</Typography>
        <Typography color="text.secondary" variant="body2">
          Recent login activity with timestamps.
        </Typography>
      </Stack>
      <Card>
        <CardHeader title="Latest Logins" />
        <CardContent>
          {events.length > 0 ? (
            <List disablePadding>
              {events.map((event) => (
                <ListItem key={event.id} sx={{ px: 0 }}>
                  <ListItemText
                    primary={event.email}
                    secondary={new Date(event.timestamp).toLocaleString()}
                    primaryTypographyProps={{ variant: 'body2' }}
                    secondaryTypographyProps={{ variant: 'caption' }}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Box sx={{ py: 2 }}>
              <Typography color="text.secondary" variant="body2">
                No login records yet.
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Stack>
  );
}
