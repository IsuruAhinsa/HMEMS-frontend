import React from 'react';
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import Logo from "../assets/imges/Logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import { Link } from "react-router-dom";
import defineAbilities from '../lib/defineAbility.js'
import { useLogout } from "../hooks/useLogout";
import { Badge } from "@/components/ui/badge"
import { useAuthContext } from "../hooks/useAuthContext";

function Header() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const abilities = defineAbilities(user);
  const canCreateUser = abilities.can('create', 'User');
 // console.log(user);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-50 flex items-center h-16 gap-4 px-4 border-b bg-background md:px-6">
      <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        {/* <a href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Package2 className="w-6 h-6" />
          <span className="sr-only">Acme Inc</span>
        </a> */}
        
        <img src={Logo} className="ml-4 w-14" />
        
        <Link to={'/'} className="transition-colors text-foreground hover:text-foreground">
          Dashboard
        </Link>
        {canCreateUser && (
            <Link to={'/create/users'} className="transition-colors text-muted-foreground hover:text-foreground">
              Add&nbsp;User
            </Link>
        )}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="w-5 h-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <a href="#" className="flex items-center gap-2 text-lg font-semibold">
              <Package2 className="w-6 h-6" />
              <span className="sr-only">Acme Inc</span>
            </a>
            <a href="#" className="hover:text-foreground">
              Dashboard
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Add&nbsp;User
            </a>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="flex-1 ml-auto sm:flex-initial">
          {/* <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div> */}
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="w-5 h-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>

          {user ? (
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                {user.email}
              </DropdownMenuItem>
              <DropdownMenuItem>
              <Badge>{user.role}</Badge>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem>
                Settings
              </DropdownMenuItem> */}
              <DropdownMenuItem onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          ) : (
            <Link to="/login" style={{ color: "black" }}>
              Login
            </Link>
          )}
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Header;
