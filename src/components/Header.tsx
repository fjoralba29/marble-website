import { Menu, X, Instagram, Facebook } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Materiale', path: '/materials' },
    { name: 'Galeria', path: '/gallery' },
    { name: 'Dizajni i Dhomës', path: '/design' },
    { name: 'Kontakt', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/home') {
      return location.pathname === '/' || location.pathname === '/home';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/home"
            className="text-2xl font-bold text-gray-900 cursor-pointer flex flex-row items-center"
          >
            <img
              src={"/logo2.png"}
              alt={"Logo"}
              className=" h-12 object-cover hover:scale-105 transition-transform duration-300" />

            Beqaraj Mermer
          </Link>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${
                    isActive(item.path)
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-700 hover:text-orange-600'
                  } px-3 py-2 text-sm font-medium transition-colors`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`${
                  isActive(item.path)
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-gray-700'
                } block w-full text-left px-4 py-2 rounded-md hover:bg-gray-50`}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex gap-4 px-4 pt-4 border-t">
              <a
                href="https://www.instagram.com/beqaraj_mermer__stone/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-orange-600 transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.facebook.com/p/Beqaraj-mermer-100063825162690/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-orange-600 transition-colors"
              >
                <Facebook size={24} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
