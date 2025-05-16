import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/navigation/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardHeader } from "@/components/navigation/DashboardHeader";
// export const MainLayout: React.FC = () => {

export const DashboardLayout: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </div>
  );
};
