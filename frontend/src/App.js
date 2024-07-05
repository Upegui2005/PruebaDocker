import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import InicioSesion from './componentes/iniciosesion';
import Registrar from './componentes/Registrar';
import Reestablecer from './componentes/reestablecer';
import Home from './componentes/Home';
import MisSeguros from './componentes/MisSeguros';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<InicioSesion />} />
          <Route path='/home' element={<Home />} />
          <Route path='/Registrar' element={<Registrar />} />
          <Route path='/Reestablecer' element={<Reestablecer />} />
          <Route path='/MisSeguros' element={<MisSeguros />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
