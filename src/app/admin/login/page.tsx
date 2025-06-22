"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function AdminLoginPage() {
    const router = useRouter();
    const { users, setCurrentUser } = useData();
    const [error, setError] = useState('');

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const user = users.find(u => u.email === email && u.password === password);

        if (user && user.type === 'admin') {
            setCurrentUser(user);
            router.push('/admin');
        } else {
            setError('Invalid credentials or not an admin account.');
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            <div className="mb-8">
                <Logo />
            </div>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="font-headline">Admin Login</CardTitle>
                    <CardDescription>
                        Enter your admin credentials to access the dashboard.
                    </CardDescription>
                </CardHeader>
                <form id="login-form" onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Authentication Failed</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="admin@example.com" required defaultValue="admin@seatswap.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required defaultValue="admin"/>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" form="login-form" className="w-full">
                            Login
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
