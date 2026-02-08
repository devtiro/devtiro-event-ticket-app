import { useAuth } from "react-oidc-context";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useRoles } from "@/hooks/use-roles";
import { Link } from "react-router";

const NavBar: React.FC = () => {
  const { user, signoutRedirect } = useAuth();
  const { isOrganizer } = useRoles();

  return (
    <div className="bg-gray-950 border-b border-gray-800 text-white">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-10 md:gap-20 items-center">
            <h1 className="text-xl font-bold">Event Ticket Platform</h1>
            <div className="text-gray-300 flex gap-8">
              {isOrganizer && <Link to="/dashboard/events">Events</Link>}
              <Link to="/dashboard/tickets">Tickets</Link>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gray-700">
                  {user?.profile?.preferred_username?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-gray-900 border-gray-700 text-white"
              align="end"
            >
              <DropdownMenuLabel className="font-normal">
                <p className="text-sm font-medium">
                  {user?.profile?.preferred_username}
                </p>
                <p className="text-sm text-gray-400">{user?.profile?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="hover:bg-gray-800"
                onClick={() => signoutRedirect()}
              >
                <LogOut />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
