import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pokedex from "./Pokedex";
import Home from './Home';
import Navbar from './Navbar';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pokedex" element={<Pokedex />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
