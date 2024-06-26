import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Auth from './components/Auth';
import CalorieTracker from './components/CalorieTracker';
import UserSettings from './components/UserSettings';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="/tracker" element={<CalorieTracker />} />
                    <Route path="/settings" element={<UserSettings />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;