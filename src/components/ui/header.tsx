import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { auth, logout } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex flex-row gap-3">
            <img src="/src/assets/tailor-icon.svg" />
            <Link to="/" className="text-xl font-bold">
              Tailor.dev
            </Link>
          </div>
          <nav className="space-x-4">
            {auth?.access_token ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <img src="/src/assets/user-icon.svg" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='flex flex-col w-full'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to="/profile" onClick={() => {}}>
                  <DropdownMenuItem >
                    Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <Link to="/" onClick={logout}>
                  <DropdownMenuItem >
                    Sign out
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            ) : (
              <Button asChild>
                <Link to="/login">
                  Sign up
                </Link>
              </Button>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;