export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Premium Marble</h3>
            <p className="text-gray-400 text-sm">
              Your trusted source for premium marble and natural stone products.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>About Us</li>
              <li>Materials</li>
              <li>Gallery</li>
              <li>Services</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@premiummarble.com</li>
              <li>Hours: Mon-Fri 9am-6pm</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Location</h4>
            <p className="text-sm text-gray-400">
              123 Marble Street<br />
              Stone City, ST 12345<br />
              United States
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 Premium Marble. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
