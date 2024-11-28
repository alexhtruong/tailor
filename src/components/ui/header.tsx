import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';


//TODO: currently implementing the user authentication
// adding databases and authentication logic, so the ultimate goal is to have this component working
export function Header() {
  const location = useLocation();
  const { auth, logout } = useAuth();

  

  // TODO: figure out user authentication and how to maintain it, for now this will be an error

  return (
    <>
      <header className="fixed top-0 left-0 right-0 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            Tailor.ai
          </Link>
          {(location.pathname === '/tailor') && (
            <div className="absolute left-1/2 transform -translate-x-1/2 font-bold text-2xl">
            Analyze
            </div>
          )}
          <nav className="space-x-4">
            {auth?.access_token ? (
              <>
                <Link to="/tailor" className={location.pathname === '/tailor' ? 'font-bold' : ''}>
                  Tailor
                </Link>
                <Button variant="ghost" onClick={() => logout()}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => logout()}>
                    Sign Out
                </Button>
                <Link to="/login" className="font-bold">
                  Join us
                </Link>
              </>
              
            )}
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;