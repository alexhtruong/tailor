import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
// import { useAuth } from '@/hooks/use-auth';
// import { ThemeToggle } from '@/components/theme-toggle';
import { googleLogout } from '@react-oauth/google';


//TODO: currently implementing the user authentication
// adding databases and authentication logic, so the ultimate goal is to have this component working

export function Header() {
  const location = useLocation();

  const logOut = (setProfile: React.Dispatch<React.SetStateAction<any>>) => {
    googleLogout();
    setProfile(null);
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          Tailor.ai
        </Link>
        <nav className="space-x-4">
          <Link to="/" className={location.pathname === '/' ? 'font-bold' : ''}>
            Home
          </Link>
          {false ? (
            <>
              <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'font-bold' : ''}>
                Dashboard
              </Link>
              <Button variant="ghost" onClick={() => logOut()} />
              <Button variant="ghost">
                Sign Out
              </Button>
            </>
          ) : (
            <Link to="/login" className={location.pathname === '/login' ? 'font-bold' : ''}>
              Login
            </Link>
          )}
          {/* <ThemeToggle /> */}
        </nav>
      </div>
    </header>
  );
}

export default Header;