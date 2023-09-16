import React from 'react';
import './App.css';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import ProductList from './features/product-list/ProductList';

function App() {
  return (
    <div className="App">
      <ProductList/>
    </div>
  );
}

export default App;