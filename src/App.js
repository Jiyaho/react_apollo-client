import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import UseQuery from './pages/UseQuery';
import UseSuspense from './pages/UseSuspense';
import UseMutation from './pages/UseMutation';
import UseLazyQuery from './pages/UseLazyQuery';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/query" element={<UseQuery />} />
          <Route path="/lazy-query" element={<UseLazyQuery />} />
          <Route path="/suspense" element={<UseSuspense />} />
          <Route path="/mutation" element={<UseMutation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
