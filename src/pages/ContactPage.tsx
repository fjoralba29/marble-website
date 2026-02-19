import { Mail, MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Na Kontaktoni
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
            Lidhuni me ekipin tonë të ekspertëve të mermerit
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Ku mund të na gjeni?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Jemi këtu për t'ju përgjigjur çdo pyetjeje dhe për t'ju ndihmuar të gjeni zgjidhjen perfekte për projektin tuaj
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg flex-shrink-0">
                <MapPin className="text-white" size={28} />
              </div>
              <div>
                <h4 className="font-bold mb-2 text-gray-900">Adresa</h4>
                <p className="text-gray-700 leading-relaxed">
                  Rruga Nacionale Tiranë - Durrës<br />
                  Vaqarr, Shqipëri
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg flex-shrink-0">
                <Phone className="text-white" size={28} />
              </div>
              <div>
                <h4 className="font-bold mb-2 text-gray-900">Telefoni</h4>
                <a href="tel:+355682163688" className="text-gray-700 hover:text-orange-600 transition-colors">
                  +(355) 68 21 63 688
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg flex-shrink-0">
                <Mail className="text-white" size={28} />
              </div>
              <div>
                <h4 className="font-bold mb-2 text-gray-900">Email</h4>
                <a href="mailto:mermerbeqaraj@gmail.com" className="text-gray-700 hover:text-orange-600 transition-colors break-all">
                  mermerbeqaraj@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg flex-shrink-0">
                <Clock className="text-white" size={28} />
              </div>
              <div>
                <h4 className="font-bold mb-2 text-gray-900">Orari i Punës</h4>
                <div className="text-gray-700 space-y-1">
                  <p>E Hënë - E Premte: 9:00 AM - 6:00 PM</p>
                  <p>E Shtunë: 10:00 AM - 4:00 PM</p>
                  <p className="text-gray-500">E Diel: Mbyllur</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h4 className="font-bold text-lg mb-4 text-gray-900 text-center">Na Ndiqni</h4>
            <div className="flex gap-4 justify-center">
              <a
                href="https://www.instagram.com/beqaraj_mermer__stone/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl hover:from-orange-100 hover:to-orange-200 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <Instagram className="text-orange-600" size={32} />
              </a>
              <a
                href="https://www.facebook.com/p/Beqaraj-mermer-100063825162690/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl hover:from-orange-100 hover:to-orange-200 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <Facebook className="text-orange-600" size={32} />
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow-lg p-8 border border-orange-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Vizitoni Showroom-in Tonë</h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Shihni koleksionin tonë të gjerë personalisht. Planifikoni një takim me konsulentët tanë të dizajnit
              për të eksploruar materialet, për të marrë këshilla nga ekspertët dhe për të diskutuar nevojat tuaja të projektit.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/beqaraj_mermer__stone/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-4 rounded-xl hover:bg-orange-200 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <Instagram className="text-orange-600" size={32} />
              </a>
              <a
                href="https://www.facebook.com/p/Beqaraj-mermer-100063825162690/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-4 rounded-xl hover:bg-orange-200 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <Facebook className="text-orange-600" size={32} />
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-8 border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Pse Të Na Zgjidhni?</h3>
            <ul className="space-y-3 text-gray-700 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold text-xl">✓</span>
                <span>Ekspertizë mbi 20 vjeçare në industrinë e mermerit</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold text-xl">✓</span>
                <span>Koleksion i gjerë materialesh premium</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold text-xl">✓</span>
                <span>Konsulencë profesionale falas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 font-bold text-xl">✓</span>
                <span>Instalim i garantuar nga specialistë</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-[500px] bg-gray-200">
            <iframe
              src="https://maps.google.com/maps?q=41.3072713,19.7425352&hl=en&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
