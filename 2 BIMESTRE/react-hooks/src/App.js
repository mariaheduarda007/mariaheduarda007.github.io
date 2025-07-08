import './styles/style.css';
import { About } from './pages/about';
import { Home } from './pages/home';
import { BrowserRouter, Routes, Route, Link } from 'react-router'
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <Link to='/pages/home'> Home |
          </Link>
          <Link to='/pages/about'> About |
          </Link>
        </nav>
        <Routes>
          <Route path='/pages/home' element={<Home/>}/>
          <Route path='/pages/about' element={<About/>}/>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

