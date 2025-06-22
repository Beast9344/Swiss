'use client';

import { useRouter } from "next/navigation";
import { useData, ActionType } from "@/context/DataContext";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";

export function LogoutButton() {
    const { dispatch } = useData();
    const router = useRouter();

    const handleLogout = () => {
        dispatch({ type: ActionType.SET_CURRENT_USER, payload: null });
        router.push('/');
    };
    
    return (
        <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
            <LogOut/>
            Logout
        </SidebarMenuButton>
    );
}
