import React from 'react';
import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom';
import Sidebar from './pages/Sidebar.js';
import Dashboard from "./pages/menu/Dashboard.js";
import Portfolio from './pages/menu/Portfolio.js';
import Transaction from './pages/menu/Transaction.js';
import Admin from "./pages/menu/Admin.js";
import TokenBuySell from "./pages/tokenBuySell/TokenBuySell.js";
import TokenBuySellConfirm from "./pages/tokenBuySell/TokenBuySellConfirm.js";
import './App.css';

function App() {

    return (
        <div className="app">
            <Router>
                <Sidebar />
                <Routes>
                    <Route path="/"            element={<Navigate replace to="/dashboard" />} />
                    <Route path="/dashboard"   element={<Dashboard/>} />
                    <Route path="/portfolio"   element={<Portfolio/>} />
                    <Route path="/transaction" element={<Transaction/>} />
                    <Route path="/admin"       element={<Admin/>} />
                    <Route path="/token-buy-sell"   element={<TokenBuySell/>} />
                    <Route path="/token-buy-sell-confirm"   element={<TokenBuySellConfirm/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
