import { Building2, Home, Plus, Users, Menu, Moon, Sun } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';

const navItems = [
  { label: 'Dashboard', href: '/', icon: Home },
  { label: 'Tenants', href: '/tenants', icon: Users },
  { label: 'Add Tenant', href: '/add', icon: Plus },
];

export const AppHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }

    const savedTheme = window.localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-gray-800 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/80">
      <div className="app-container flex h-14 items-center justify-between sm:h-16">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3 sm:h-9 sm:w-9">
            <Building2 className="h-4 w-4 text-white sm:h-5 sm:w-5" />
          </div>
          <span className="text-xl font-bold leading-none text-gray-950 transition-colors group-hover:text-blue-700 sm:text-2xl dark:text-gray-50 dark:group-hover:text-blue-300">
            TenantPro
          </span>
        </Link>

        <div className="hidden items-center gap-2 sm:flex">
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`group relative flex items-center gap-2 overflow-hidden rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-950 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="group relative size-9 overflow-hidden"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme}
          >
            <Sun className="absolute h-4 w-4 scale-100 rotate-0 opacity-100 transition-all duration-300 group-hover:scale-110 dark:scale-75 dark:-rotate-90 dark:opacity-0" />
            <Moon className="absolute h-4 w-4 scale-75 rotate-90 opacity-0 transition-all duration-300 group-hover:scale-110 dark:scale-100 dark:rotate-0 dark:opacity-100" />
          </Button>
        </div>

        <div className="flex items-center gap-1 sm:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="group relative overflow-hidden"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme}
          >
            <Sun className="absolute h-4 w-4 scale-100 rotate-0 opacity-100 transition-all duration-300 group-hover:scale-110 dark:scale-75 dark:-rotate-90 dark:opacity-0" />
            <Moon className="absolute h-4 w-4 scale-75 rotate-90 opacity-0 transition-all duration-300 group-hover:scale-110 dark:scale-100 dark:rotate-0 dark:opacity-100" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsMenuOpen(false);
              navigate('/add');
            }}
            aria-label="Add tenant"
          >
            <Plus className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white sm:hidden dark:border-gray-800 dark:bg-gray-950">
          <nav className="app-container grid gap-1 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-950 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
