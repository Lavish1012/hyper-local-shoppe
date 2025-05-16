
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Calendar, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader = ({ title }: DashboardHeaderProps) => {
  return (
    <div className="bg-white border-b px-4 py-3 flex justify-between items-center">
      <div className="flex items-center">
        <SidebarTrigger className="mr-4" />
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input placeholder="Search orders, products..." className="pl-9" />
        </div>
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          May 16, 2025
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
