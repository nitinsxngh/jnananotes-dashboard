import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import type { FirebaseUser } from '@/lib/firebase/users';

export interface UsersTableProps {
  rows: FirebaseUser[];
}

export function UsersTable({ rows }: UsersTableProps): React.JSX.Element {
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Last Login</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow hover key={row.uid}>
                <TableCell>{row.email ?? '-'}</TableCell>
                <TableCell>{row.createdAt ?? '-'}</TableCell>
                <TableCell>{row.lastLoginAt ?? '-'}</TableCell>
                <TableCell>
                  <Typography color={row.disabled ? 'error' : 'success'} variant="body2">
                    {row.disabled ? 'Disabled' : 'Active'}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Divider />
    </Card>
  );
}
