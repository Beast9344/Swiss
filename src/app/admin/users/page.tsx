"use client";

import { useData } from "@/context/DataContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Card, CardContent } from '@/components/ui/card';
import { exportToCsv } from "@/lib/utils";

export default function AdminUsersPage() {
  const { users } = useData();

  const handleExport = () => {
    // Exclude password from the export for security
    const exportableData = users.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        type: u.type,
        purchasedTickets: u.purchasedTickets?.length ?? 0
    }));
    exportToCsv('users.csv', exportableData);
  };
  
  return (
    <div className="p-8 space-y-4">
      <div className="flex items-center justify-end">
        <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
        </Button>
      </div>
      
      <Card>
        <CardContent className="mt-6">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Password</TableHead>
                    <TableHead>User Type</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Tickets Bought</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {users.map(user => (
                    <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.password}</TableCell>
                    <TableCell>
                        <Badge variant={user.type === 'seller' ? 'secondary' : user.type === 'buyer' ? 'outline' : 'default'}>
                          {user.type}
                        </Badge>
                    </TableCell>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.purchasedTickets?.length ?? 0}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
