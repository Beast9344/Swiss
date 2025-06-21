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

export default function AdminUsersPage() {
  const { users } = useData();
  
  return (
    <div className="flex h-full flex-col">
      <div className="flex-shrink-0 p-8 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
              <h2 className="text-3xl font-bold tracking-tight font-headline">User Management</h2>
              <p className="text-muted-foreground">View all sellers and buyers on the platform.</p>
          </div>
          <Button>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
          </Button>
        </div>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto px-8 pb-8">
        <Card>
          <CardContent className="mt-6">
              <Table>
                  <TableHeader>
                  <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>User Type</TableHead>
                      <TableHead>User ID</TableHead>
                  </TableRow>
                  </TableHeader>
                  <TableBody>
                  {users.map(user => (
                      <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                          <Badge variant={user.type === 'seller' ? 'secondary' : user.type === 'buyer' ? 'outline' : 'default'}>
                            {user.type}
                          </Badge>
                      </TableCell>
                      <TableCell>{user.id}</TableCell>
                      </TableRow>
                  ))}
                  </TableBody>
              </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
