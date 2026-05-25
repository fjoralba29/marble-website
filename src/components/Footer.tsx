import {
    Instagram,
    Facebook,
    MapPin,
    Phone,
    Mail,
    Clock,
    ShieldAlert,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='bg-[#0B0B0A] text-neutral-100 border-t border-neutral-900 mt-auto font-sans tracking-wide'>
            <div className='max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16'>
                    {/* COLUMN 1 - BRAND STATEMENT (4 COLS) */}
                    <div className='lg:col-span-4 flex flex-col space-y-5'>
                        <h3 className='text-lg font-serif font-medium tracking-[0.15em] uppercase text-white'>
                            Beqaraj Mermer
                        </h3>
                        <p className='text-neutral-400 text-sm font-light leading-relaxed max-w-sm'>
                            Ekspertë në përpunimin dhe montimin e mermerit,
                            granatit dhe gurit natyror premium për projekte
                            rezidenciale dhe komerciale elite.
                        </p>
                        <div className='flex gap-4 pt-2'>
                            <a
                                href='https://www.instagram.com/beqaraj_mermer__stone/'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='inline-flex items-center justify-center w-9 h-9 bg-neutral-900 hover:bg-amber-500 text-neutral-400 hover:text-neutral-950 rounded-md transition-all duration-300'
                                aria-label='Na ndiqni në Instagram'
                            >
                                <Instagram
                                    size={18}
                                    strokeWidth={1.5}
                                />
                            </a>
                            <a
                                href='https://www.facebook.com/p/Beqaraj-mermer-100063825162690/'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='inline-flex items-center justify-center w-9 h-9 bg-neutral-900 hover:bg-amber-500 text-neutral-400 hover:text-neutral-950 rounded-md transition-all duration-300'
                                aria-label='Na ndiqni në Facebook'
                            >
                                <Facebook
                                    size={18}
                                    strokeWidth={1.5}
                                />
                            </a>
                        </div>
                    </div>

                    {/* COLUMN 2 - LINK STRUCTURES (2 COLS) */}
                    <div className='lg:col-span-2 flex flex-col space-y-4'>
                        <h4 className='text-xs font-semibold tracking-[0.2em] uppercase text-amber-500'>
                            Lidhje të Shpejta
                        </h4>
                        <ul className='space-y-3 text-sm font-light text-neutral-400'>
                            <li>
                                <Link
                                    to='/home'
                                    className='hover:text-white hover:translate-x-0.5 inline-block transition-all duration-200'
                                >
                                    Kreu
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/materials'
                                    className='hover:text-white hover:translate-x-0.5 inline-block transition-all duration-200'
                                >
                                    Materiale Live
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/gallery'
                                    className='hover:text-white hover:translate-x-0.5 inline-block transition-all duration-200'
                                >
                                    Galeria e Projekteve
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/design'
                                    className='hover:text-white hover:translate-x-0.5 inline-block transition-all duration-200'
                                >
                                    Studio e Dizajnit
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/contact'
                                    className='hover:text-white hover:translate-x-0.5 inline-block transition-all duration-200'
                                >
                                    Kontakt
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* COLUMN 3 - CONTACT DETAILS (3 COLS) */}
                    <div className='lg:col-span-3 flex flex-col space-y-4'>
                        <h4 className='text-xs font-semibold tracking-[0.2em] uppercase text-amber-500'>
                            Asistenca & Info
                        </h4>
                        <ul className='space-y-3.5 text-sm font-light text-neutral-400'>
                            <li className='flex items-start gap-3'>
                                <Phone
                                    size={16}
                                    className='text-neutral-500 mt-0.5 shrink-0'
                                    strokeWidth={1.5}
                                />
                                <a
                                    href='tel:+355682163688'
                                    className='hover:text-white transition-colors'
                                >
                                    +(355) 68 21 63 688
                                </a>
                            </li>
                            <li className='flex items-start gap-3'>
                                <Mail
                                    size={16}
                                    className='text-neutral-500 mt-0.5 shrink-0'
                                    strokeWidth={1.5}
                                />
                                <a
                                    href='mailto:mermerbeqaraj@gmail.com'
                                    className='hover:text-white transition-colors break-all'
                                >
                                    mermerbeqaraj@gmail.com
                                </a>
                            </li>
                            <li className='flex items-start gap-3'>
                                <Clock
                                    size={16}
                                    className='text-neutral-500 mt-0.5 shrink-0'
                                    strokeWidth={1.5}
                                />
                                <span>
                                    Hënë - Premte:
                                    <br />
                                    <span className='text-neutral-200'>
                                        08:00 - 17:00
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* COLUMN 4 - SHOWROOM GPS (3 COLS) */}
                    <div className='lg:col-span-3 flex flex-col space-y-4'>
                        <h4 className='text-xs font-semibold tracking-[0.2em] uppercase text-amber-500'>
                            Showroom & Fabrika
                        </h4>
                        <div className='flex items-start gap-3 text-sm font-light text-neutral-400 leading-relaxed'>
                            <MapPin
                                size={16}
                                className='text-neutral-500 mt-1 shrink-0'
                                strokeWidth={1.5}
                            />
                            <p>
                                Rruga Nacionale Tiranë - Durrës
                                <br />
                                Vaqarr, Tiranë
                                <br />
                                Shqipëri
                            </p>
                        </div>
                        <a
                            href='https://www.google.com/maps?cid=2209283724268389667&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&source=embed'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='mt-2 text-xs font-medium text-white hover:text-amber-400 inline-flex items-center gap-1 transition-colors group'
                        >
                            Hap në Google Maps{" "}
                            <span className='group-hover:translate-x-0.5 transition-transform'>
                                →
                            </span>
                        </a>
                    </div>
                </div>

                {/* SUBFOOTER BASELINE */}
                <div className='border-t border-neutral-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-neutral-500'>
                    <p>
                        &copy; {currentYear} Beqaraj Mermer. Të gjitha të
                        drejtat e rezervuara.
                    </p>
                    <div className='flex gap-6'>
                        <span className='hover:text-neutral-400 cursor-pointer transition-colors'>
                            Politika e Privatësisë
                        </span>
                        <span className='hover:text-neutral-400 cursor-pointer transition-colors'>
                            Kushtet e Shërbimit
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
