import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';

const RemoteSupport = lazy(() => import('supportApp/Support'));

const App = () => {
    return (
        <BrowserRouter>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flex: 1, padding: '1rem' }}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/" element={<h1>🏠 Home</h1>} />
                            <Route path="/support-tickets" element={<RemoteSupport />} />
                        </Routes>
                    </Suspense>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
