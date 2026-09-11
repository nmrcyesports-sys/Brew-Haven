/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { About } from './pages/About';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { Reservation } from './pages/Reservation';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { Account } from './pages/Account';
import { Events } from './pages/Events';
import { ProductDetail } from './pages/ProductDetail';
import { Admin } from './pages/Admin';
import { Kitchen } from './pages/Kitchen';
import { TableOrder } from './pages/TableOrder';

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/table/:tableId" element={<TableOrder />} />
          <Route path="*" element={<div className="p-20 text-center font-serif text-3xl">Page Not Found</div>} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
