import { Mail, MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";

export default function ContactPage() {
    return (
        <div className='min-h-screen bg-[#faf9f6] text-stone-900 antialiased'>
            {/* HERO - MIDNIGHT PLUM AESTHETIC */}
            <div className='relative bg-[#1a111e] text-white py-24 border-b border-stone-800 overflow-hidden'>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,38,68,0.6),transparent)]' />
                <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
                    <span className='text-xs uppercase tracking-[0.3em] text-amber-500 font-semibold inline-block mb-3'>
                        Na Kontaktoni
                    </span>
                    <h1 className='text-4xl md:text-6xl font-light tracking-tight font-serif mb-4'>
                        Le të Flasim për{" "}
                        <span className='italic text-stone-300'>Projektin</span>{" "}
                        Tuaj
                    </h1>
                    <p className='text-md md:text-lg text-stone-400 max-w-xl mx-auto font-light leading-relaxed tracking-wide'>
                        Lidhuni me ekipin tonë të ekspertëve për të kthyer idetë
                        tuaja në një realitet prej guri natyror.
                    </p>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
                {/* SUBTITLE */}
                <div className='text-center mb-16'>
                    <span className='text-xs uppercase tracking-[0.25em] text-stone-400 font-semibold block mb-2'>
                        Lokacioni & Detajet
                    </span>
                    <h2 className='text-2xl md:text-4xl font-light tracking-tight font-serif text-stone-900 mb-4'>
                        Ku mund të na gjeni?
                    </h2>
                    <div className='h-[1px] bg-stone-300 w-12 mx-auto' />
                </div>

                {/* INFO GRID */}
                <div className='bg-white border border-stone-200/60 p-8 md:p-12 mb-16 shadow-sm rounded-none'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
                        {/* ADRESA */}
                        <div className='flex items-start gap-4'>
                            <div className='bg-amber-500/10 p-3 text-amber-600 flex-shrink-0 rounded-none'>
                                <MapPin size={22} />
                            </div>
                            <div>
                                <h4 className='text-xs uppercase tracking-widest font-mono text-stone-400 mb-2'>
                                    Adresa
                                </h4>
                                <p className='text-stone-800 font-light text-sm leading-relaxed tracking-wide'>
                                    Rruga Nacionale Tiranë - Durrës
                                    <br />
                                    Vaqarr, Shqipëri
                                </p>
                            </div>
                        </div>

                        {/* TELEFONI */}
                        <div className='flex items-start gap-4'>
                            <div className='bg-amber-500/10 p-3 text-amber-600 flex-shrink-0 rounded-none'>
                                <Phone size={22} />
                            </div>
                            <div>
                                <h4 className='text-xs uppercase tracking-widest font-mono text-stone-400 mb-2'>
                                    Telefoni
                                </h4>
                                <a
                                    href='tel:+355682163688'
                                    className='text-stone-800 hover:text-amber-500 font-light text-sm tracking-wide transition-colors'
                                >
                                    +(355) 68 21 63 688
                                </a>
                            </div>
                        </div>

                        {/* EMAIL */}
                        <div className='flex items-start gap-4'>
                            <div className='bg-amber-500/10 p-3 text-amber-600 flex-shrink-0 rounded-none'>
                                <Mail size={22} />
                            </div>
                            <div>
                                <h4 className='text-xs uppercase tracking-widest font-mono text-stone-400 mb-2'>
                                    Email
                                </h4>
                                <a
                                    href='mailto:mermerbeqaraj@gmail.com'
                                    className='text-stone-800 hover:text-amber-500 font-light text-sm tracking-wide transition-colors break-all'
                                >
                                    mermerbeqaraj@gmail.com
                                </a>
                            </div>
                        </div>

                        {/* ORARI */}
                        <div className='flex items-start gap-4'>
                            <div className='bg-amber-500/10 p-3 text-amber-600 flex-shrink-0 rounded-none'>
                                <Clock size={22} />
                            </div>
                            <div>
                                <h4 className='text-xs uppercase tracking-widest font-mono text-stone-400 mb-2'>
                                    Orari i Punës
                                </h4>
                                <div className='text-stone-800 font-light text-xs space-y-1 tracking-wide'>
                                    <p>Hënë - Premte: 09:00 - 18:00</p>
                                    <p>Shtunë: 10:00 - 16:00</p>
                                    <p className='text-stone-400 italic'>
                                        Diel: Mbyllur
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SOCIAL CHANNELS */}
                    <div className='mt-12 pt-8 border-t border-stone-100 flex flex-col items-center justify-center'>
                        <h4 className='text-xs uppercase tracking-[0.2em] font-mono text-stone-400 mb-4 text-center'>
                            Na Ndiqni në Sociale
                        </h4>
                        <div className='flex gap-4'>
                            <a
                                href='https://www.instagram.com/beqaraj_mermer__stone/'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='p-3 bg-stone-50 border border-stone-200/60 text-stone-600 hover:text-amber-500 hover:border-amber-500/40 transition-all duration-300'
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href='https://www.facebook.com/p/Beqaraj-mermer-100063825162690/'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='p-3 bg-stone-50 border border-stone-200/60 text-stone-600 hover:text-amber-500 hover:border-amber-500/40 transition-all duration-300'
                            >
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* BRAND PHILOSOPHY & WHY US GRID */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16'>
                    <div className='bg-[#1a111e] text-white p-8 md:p-10 flex flex-col justify-center border border-stone-800 relative overflow-hidden rounded-none'>
                        <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,38,68,0.4),transparent)]' />
                        <h3 className='text-xl md:text-2xl font-serif font-light tracking-wide mb-4 text-amber-400 relative z-10'>
                            Vizitoni Showroom-in Tonë
                        </h3>
                        <p className='text-stone-400 font-light text-sm leading-relaxed tracking-wide relative z-10'>
                            Ejani të prekni nga afër cilësinë dhe teksturën e
                            përzgjedhjeve tona më ekskluzive. Planifikoni një
                            takim me konsulentët tanë të dizajnit për të marrë
                            këshilla të personalizuara mbi arkitekturën e
                            hapësirës suaj.
                        </p>
                    </div>

                    <div className='bg-white border border-stone-200/60 p-8 md:p-10 flex flex-col justify-center rounded-none'>
                        <h3 className='text-xl md:text-2xl font-serif font-light tracking-wide mb-6 text-stone-900'>
                            Pse Të Na Zgjidhni?
                        </h3>
                        <ul className='space-y-4 text-stone-600 font-light text-sm tracking-wide'>
                            <li className='flex items-center gap-3'>
                                <span className='text-amber-500 font-serif text-md'>
                                    —
                                </span>
                                <span>
                                    Ekspertizë mbi 20-vjeçare në industrinë e
                                    mermerit
                                </span>
                            </li>
                            <li className='flex items-center gap-3'>
                                <span className='text-amber-500 font-serif text-md'>
                                    —
                                </span>
                                <span>
                                    Koleksion i gjerë dhe i kuruar i materialeve
                                    premium
                                </span>
                            </li>
                            <li className='flex items-center gap-3'>
                                <span className='text-amber-500 font-serif text-md'>
                                    —
                                </span>
                                <span>
                                    Konsulencë profesionale dhe projektim i
                                    detajuar
                                </span>
                            </li>
                            <li className='flex items-center gap-3'>
                                <span className='text-amber-500 font-serif text-md'>
                                    —
                                </span>
                                <span>
                                    Instalim i garantuar nga specialistë të
                                    certifikuar
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* INTERACTIVE MAP CONTAINER */}
                <div className='bg-white border border-stone-200/60 p-2 shadow-sm rounded-none overflow-hidden'>
                    <div className='h-[450px] bg-stone-100 filter grayscale contrast-[1.05] brightness-[0.98] hover:grayscale-0 transition-all duration-700 ease-out'>
                        <iframe
                            src='https://maps.google.com/maps?q=Beqaraj%20memer%20granite&hl=en&z=17&output=embed'
                            width='100%'
                            height='100%'
                            style={{ border: 0 }}
                            loading='lazy'
                            referrerPolicy='no-referrer-when-downgrade'
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}
