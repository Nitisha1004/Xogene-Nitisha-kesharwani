import React from 'react';
import { Link } from 'react-router-dom';

const App = () => (
  <div>
    <header>
      <Link to="/drugs/search">Search Drugs</Link>
    </header>
  </div>
);

export default App;
