export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Mermer Premium</h3>
            <p className="text-gray-400 text-sm">
              Burimi juaj i besuar për produkte mermeri dhe guri natyror premium.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Lidhje të Shpejta</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Rreth Nesh</li>
              <li>Materiale</li>
              <li>Galeria</li>
              <li>Shërbimet</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Telefon: +(355) 68 21 63 688</li>
              <li>Email: mermerbeqaraj@gmail.com</li>
              <li>Orari: Hën-Pre 9am-6pm</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Vendndodhja</h4>
            <p className="text-sm text-gray-400">
              Rruga Nacionale Tiranë - Durrës<br />
              Vaqarr Rruga e Mermerit 123<br />
              Shqipëri
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 Mermer Premium. Të gjitha të drejtat e rezervuara.</p>
        </div>
      </div>
    </footer>
  );
}
