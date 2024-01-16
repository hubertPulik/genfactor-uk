//basic
// import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { UserProvider } from './controllers/UserContext';
import { CartProvider } from './controllers/Cart';
import { AuthProvider } from './controllers/useAuth.jsx';
// import { useAuth } from './controllers/useAuth.jsx';

import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Produkty from './routes/user/Produkty';
import DesignSystem from './routes/user/DesignSystem';
import Product from './routes/user/Produkt';
import Koszyk from './routes/user/StronaKoszyka';
import Logowanie from './routes/user/Logowanie';
import Rejestracja from './routes/user/Rejestracja';
import MojeKonto from './routes/user/MojeKonto';
import Order from './routes/user/Zamowienie';
import Success from './routes/user/Success';
import AdminArea from './routes/admin/AdminArea';
import HomePage from './routes/user/HomePage';
import Termografia from './routes/user/Termografia';


function App() {

  // const authUser = useAuth()

  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
        <AuthProvider>
        <CartProvider>
          <Header />
          {/* <Modal isModal={isModal}>
            <Mobilemenu handleModal={handleModal}/>
          </Modal> */}
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/shop' element={<Produkty />} />
            <Route path='/design-system' element={<DesignSystem />} />
            <Route path='/koszyk' element={<Koszyk />} />
            <Route path='/produkt/:id' element={<Product />} />
            <Route path='/login' element={<Logowanie />} />
            <Route path='/rejestracja' element={<Rejestracja />} />
            <Route path='/moje-konto' element={<MojeKonto />} />
            <Route path='/zamowienie' element={<Order />} />
            <Route path='/zamowienie-przyjete' element={<Success />} />
            <Route path='/administration-area' element={<AdminArea />} />
            <Route path='/thermography' element={<Termografia />} />
          </Routes>
          <Footer />
        </CartProvider>
        </AuthProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
