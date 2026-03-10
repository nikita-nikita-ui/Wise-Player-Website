import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WisePlayerHome from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import Navbar from './components/Navbar';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<WisePlayerHome />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />

      </Routes>
    </Router>
  );
}
export default App;