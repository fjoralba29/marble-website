import { Mail, MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react';

export default function ContactPage() {

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Na Kontaktoni
          </h1>
          <p className="text-xl text-gray-300">
            Lidhuni me ekipin tonë të ekspertëve të mermerit
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold mb-6">Kontaktoni Me Ne</h2>
            <p className="text-gray-600 mb-8">
              Keni pyetje rreth produkteve tona të mermerit ose keni nevojë për ndihmë me projektin tuaj?
              Na kontaktoni përmes telefonit, email-it ose vizitoni showroom-in tonë.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <MapPin className="text-orange-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Adresa</h3>
                  <p className="text-gray-600">
                    Rruga Nacionale Tiranë - Durrës<br />
                    Vaqarr
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Phone className="text-orange-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Telefoni</h3>
                  <p className="text-gray-600">
                    +(355) 68 21 63 688<br />
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Mail className="text-orange-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-gray-600">
                    mermerbeqaraj@gmail.com<br />
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Clock className="text-orange-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Orari i Punës</h3>
                  <p className="text-gray-600">
                    E Hënë - E Premte: 9:00 AM - 6:00 PM<br />
                    E Shtunë: 10:00 AM - 4:00 PM<br />
                    E Diel: Mbyllur
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4">Na Ndiqni</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/beqaraj_mermer__stone/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-100 p-3 rounded-lg hover:bg-orange-200 transition-colors"
                >
                  <Instagram className="text-orange-600" size={28} />
                </a>
                <a
                  href="https://www.facebook.com/p/Beqaraj-mermer-100063825162690/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-100 p-3 rounded-lg hover:bg-orange-200 transition-colors"
                >
                  <Facebook className="text-orange-600" size={28} />
                </a>
              </div>
            </div>

            <div className="mt-8 p-6 bg-orange-50 rounded-lg border border-orange-100">
              <h3 className="font-semibold text-lg mb-2">Vizitoni Showroom-in Tonë</h3>
              <p className="text-gray-700 text-sm">
                Shihni koleksionin tonë të gjerë personalisht. Planifikoni një takim me konsulentët tanë të dizajnit
                për të eksploruar materialet, për të marrë këshilla nga ekspertët dhe për të diskutuar nevojat tuaja të projektit.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-96 bg-gray-200">
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
    </div>
  );
}
