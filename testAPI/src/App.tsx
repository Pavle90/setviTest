import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import CreateItem from './pages/CreateItem';
import ItemDetails from './pages/ItemDetails';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/create' element={<CreateItem/>} />
        <Route path='/details/:id' element={<ItemDetails/>} />
      </Routes>
    </Router>
  );
};

export default App;
