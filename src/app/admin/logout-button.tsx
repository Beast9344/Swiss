'use client';

import { useRouter } from "next/navigation";
import { useData } from "@/context/DataContext";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";

export function LogoutButton() {
    const { setCurrentUser } = useData();
    const router = useRouter();

    const handleLogout = () => {
        setCurrentUser(null);
        router.push('/');
    };
    
    return (
        <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
            <LogOut/>
            Logout
        </SidebarMenuButton>
    );
}
