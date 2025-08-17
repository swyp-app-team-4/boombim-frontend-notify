import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import AlarmForm from './components/AlarmForm';
import { auth } from './utils/auth';
import './styles/index.css';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // 초기 로드 시 인증 상태 확인
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

    // 로딩 중일 때 표시할 스피너
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
        <div className="app">
            {isAuthenticated ? (
                <AlarmForm />
            ) : (
                <LoginForm onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
};

export default App;