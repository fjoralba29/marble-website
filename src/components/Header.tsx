import { Menu, X, Instagram, Facebook } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { name: "Home", path: "/home" },
        { name: "Materiale", path: "/materials" },
        { name: "Galeria", path: "/gallery" },
        { name: "Studio e Vizualizimit", path: "/design" },
        { name: "Kontakt", path: "/contact" },
    ];

    const isActive = (path: string) => {
        if (path === "/home") {
            return location.pathname === "/" || location.pathname === "/home";
        }
        return (
            location.pathname === path ||
            location.pathname.startsWith(path + "/")
        );
    };

    return (
        <header className='bg-white/90 backdrop-blur-md border-b border-neutral-100 sticky top-0 z-50 transition-all duration-300'>
            <div className='max-w-7xl mx-auto px-6 sm:px-8 lg:px-12'>
                <div className='flex justify-between items-center h-20'>
                    {/* BRAND LOGO AREA */}
                    <Link
                        to='/home'
                        className='flex flex-row items-center gap-3 group focus:outline-none'
                    >
                        <div className='overflow-hidden rounded-md bg-neutral-50 p-1 border border-neutral-100 transition-colors group-hover:border-neutral-200'>
                            <img
                                src='/logo2.png'
                                alt='Beqaraj Mermer Logo'
                                className='h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105'
                            />
                        </div>
                        <span className='text-base sm:text-lg font-serif font-medium tracking-[0.15em] uppercase text-neutral-900 group-hover:text-amber-600 transition-colors duration-300'>
                            Beqaraj Mermer
                        </span>
                    </Link>

                    {/* DESKTOP NAVIGATION */}
                    <div className='hidden md:flex items-center gap-8'>
                        <nav className='flex space-x-1 lg:space-x-4'>
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`relative px-4 py-2 text-xs lg:text-sm  tracking-wide transition-colors duration-300 rounded-md ${
                                        isActive(item.path)
                                            ? "text-amber-600"
                                            : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                                    }`}
                                >
                                    {item.name}
                                    {/* Premium animated underline for active route */}
                                    {isActive(item.path) && (
                                        <motion.div
                                            layoutId='activeNavLine'
                                            className='absolute bottom-0 left-4 right-4 h-[2px] bg-amber-500'
                                            transition={{
                                                type: "spring",
                                                stiffness: 380,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                </Link>
                            ))}
                        </nav>

                        {/* SOCIAL EXTERNAL CONNECTIONS */}
                        <div className='h-4 w-[1px] bg-neutral-200' />
                        <div className='flex items-center gap-4'>
                            <a
                                href='https://www.instagram.com/beqaraj_mermer__stone/'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-neutral-400 hover:text-neutral-900 transition-colors duration-300'
                                aria-label='Instagram Link'
                            >
                                <Instagram
                                    size={18}
                                    strokeWidth={1.75}
                                />
                            </a>
                            <a
                                href='https://www.facebook.com/p/Beqaraj-mermer-100063825162690/'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-neutral-400 hover:text-neutral-900 transition-colors duration-300'
                                aria-label='Facebook Link'
                            >
                                <Facebook
                                    size={18}
                                    strokeWidth={1.75}
                                />
                            </a>
                        </div>
                    </div>

                    {/* MOBILE MENU TOGGLE BUTTON */}
                    <div className='flex items-center md:hidden'>
                        <button
                            className='p-2 text-neutral-700 hover:text-neutral-900 focus:outline-none rounded-md hover:bg-neutral-50 transition-colors'
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label='Toggle Menu'
                        >
                            {mobileMenuOpen ? (
                                <X
                                    size={22}
                                    strokeWidth={1.5}
                                />
                            ) : (
                                <Menu
                                    size={22}
                                    strokeWidth={1.5}
                                />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* LUXURY SLIDE DOWN MOBILE DRAWER */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className='md:hidden bg-white border-t border-neutral-100 overflow-hidden shadow-xl absolute w-full left-0 z-40'
                    >
                        <div className='px-6 py-6 space-y-2'>
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`block w-full text-left px-4 py-3 rounded-lg text-sm  tracking-wide transition-all ${
                                        isActive(item.path)
                                            ? "text-amber-500 bg-amber-500/5 font-light"
                                            : "text-neutral-500 font-light hover:bg-neutral-50 hover:text-neutral-900"
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <div className='flex gap-6 px-4 pt-6 mt-4 border-t border-neutral-100'>
                                <a
                                    href='https://www.instagram.com/beqaraj_mermer__stone/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-neutral-500 hover:text-amber-600 transition-colors flex items-center gap-2 text-sm'
                                >
                                    <Instagram
                                        size={20}
                                        strokeWidth={1.5}
                                    />
                                    <span className='text-xs tracking-wider text-neutral-400 font-light'>
                                        Instagram
                                    </span>
                                </a>
                                <a
                                    href='https://www.facebook.com/p/Beqaraj-mermer-100063825162690/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-neutral-500 hover:text-amber-600 transition-colors flex items-center gap-2 text-sm'
                                >
                                    <Facebook
                                        size={20}
                                        strokeWidth={1.5}
                                    />
                                    <span className='text-xs tracking-wider text-neutral-400 font-light'>
                                        Facebook
                                    </span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
