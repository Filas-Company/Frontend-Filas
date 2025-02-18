import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Fila from './components/Fila';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:restaurante" element={<Fila />} />
      </Routes>
    </Router>
  );
}

export default App;
