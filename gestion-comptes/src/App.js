import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AccountList from './components/AccountList';
import AddAccount from './components/AddAccount';
import EditAccount from './components/EditAccount';

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <Link to="/">Liste des Comptes</Link> | <Link to="/add">Ajouter un Compte</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<AccountList />} />
                    <Route path="/add" element={<AddAccount />} />
                    <Route path="/edit/:id" element={<EditAccount />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
