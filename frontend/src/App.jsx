import React from 'react';
import { BrowserRouter as Router, Route ,Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductList from './pages/Products';
import ProductDetail from './pages/ProductDetail';
/*import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

import Register from './pages/Register';*/

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path='/products' element={<ProductList/>}/>
            <Route path='/product/id/:id' element={<ProductDetail/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;