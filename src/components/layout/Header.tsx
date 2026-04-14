import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import logo from '@/assets/logo-raad-van-kerken.png';

const navItems = [
  { label: 'Home', path: '/' },
  { 
    label: 'Activiteiten', 
    path: '/activiteiten',
    children: [
      { label: 'Overzicht', path: '/activiteiten' },
      { label: 'Agenda', path: '/agenda' },
    ],
  },
  { label: 'Kerken', path: '/kerken' },
  { label: 'Nieuws', path: '/nieuws' },
  { label: 'Over ons', path: '/over' },
  { label: 'Contact', path: '/contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container-page">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="Raad van Kerken Woerden" 
              className="h-10 sm:h-12 w-auto"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-foreground leading-tight">Geloof & Cultuur</p>
              <p className="text-xs text-muted-foreground">Woerden</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/aanmelden" className="ml-2">
              <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Activiteit aanmelden
              </Button>
            </Link>
            
            {/* Auth buttons */}
            {user ? (
              <div className="flex items-center gap-2 ml-2">
                {isAdmin && (
                  <Link to="/beheer">
                    <Button size="sm" variant="ghost" className="text-muted-foreground">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </Link>
                )}
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={handleSignOut}
                  className="text-muted-foreground"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Link to="/auth" className="ml-2">
                <Button size="sm" variant="ghost" className="text-muted-foreground">
                  <LogIn className="w-4 h-4 mr-1" />
                  <span className="hidden lg:inline">Inloggen</span>
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Menu sluiten' : 'Menu openen'}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link 
                to="/aanmelden" 
                onClick={() => setIsMenuOpen(false)}
                className="mt-2"
              >
                <Button className="w-full" variant="outline">
                  Activiteit aanmelden
                </Button>
              </Link>
              
              {/* Mobile auth */}
              {user ? (
                <div className="flex gap-2 mt-2">
                  {isAdmin && (
                    <Link to="/beheer" onClick={() => setIsMenuOpen(false)} className="flex-1">
                      <Button variant="secondary" className="w-full">
                        <Settings className="w-4 h-4 mr-2" />
                        Beheer
                      </Button>
                    </Link>
                  )}
                  <Button 
                    variant="ghost" 
                    onClick={handleSignOut}
                    className="flex-1"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Uitloggen
                  </Button>
                </div>
              ) : (
                <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="mt-2">
                  <Button variant="secondary" className="w-full">
                    <LogIn className="w-4 h-4 mr-2" />
                    Inloggen
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
