import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import AlarmForm from './components/AlarmForm';
import IntroPage from './components/IntroPage';
import { auth } from './utils/auth';
import './styles/index.css';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkAuthStatus = () => {
            const authenticated = auth.isAuthenticated();
            setIsAuthenticated(authenticated);
            setIsLoading(false);
        };

        checkAuthStatus();
    }, []);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    if (isLoading) {
        return (
            <div className="app">
                <div className="container">
                    <div className="header">
                        <h1>🔔 붐빔 관리자</h1>
                        <p>로딩 중...</p>
                    </div>
                    <div className="form-container" style={{ textAlign: 'center', padding: '50px' }}>
                        <div className="loading-spinner" style={{ margin: '0 auto' }}></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Router>
            <Routes>
                {/* 소개 페이지 - 누구나 접근 가능 */}
                <Route path="/intro" element={<IntroPage />} />

                {/* 관리자 로그인 페이지 */}
                <Route
                    path="/admin"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/admin/dashboard" replace />
                        ) : (
                            <LoginForm onLoginSuccess={handleLoginSuccess} />
                        )
                    }
                />

                {/* 관리자 대시보드 */}
                <Route
                    path="/admin/dashboard"
                    element={
                        isAuthenticated ? (
                            <AlarmForm />
                        ) : (
                            <Navigate to="/admin" replace />
                        )
                    }
                />

                {/* 기본 경로는 소개 페이지로 리다이렉트 */}
                <Route path="/" element={<Navigate to="/intro" replace />} />

                {/* 404 처리 */}
                <Route path="*" element={<Navigate to="/intro" replace />} />
            </Routes>
        </Router>
    );
};

export default App;