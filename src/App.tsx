import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MaterialsPage from './pages/MaterialsPage';
import GalleryPage from './pages/GalleryPage';
import RoomDesignPage from './pages/RoomDesignPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/gallery/:categoryId" element={<GalleryPage />} />
          <Route path="/design" element={<RoomDesignPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
