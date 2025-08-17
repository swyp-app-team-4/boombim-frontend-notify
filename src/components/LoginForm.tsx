import React, { useState } from 'react';
import { api } from '../services/api';
import { auth } from '../utils/auth';
import { LoginRequest } from '../types';

interface LoginFormProps {
    onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const [formData, setFormData] = useState<LoginRequest>({
        loginId: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        // 입력 시 에러 메시지 클리어
        if (error) setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 유효성 검사
        if (!formData.loginId.trim()) {
            setError('이메일을 입력해주세요.');
            return;
        }

        if (!formData.password.trim()) {
            setError('비밀번호를 입력해주세요.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await api.login(formData);

            // 토큰 저장
            auth.setToken(response.accessToken);

            // 로그인 성공 콜백 호출
            onLoginSuccess();
        } catch (err: any) {
            setError(err.message || '로그인에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h1>🔔 붐빔 관리자</h1>
                <p>알림 관리 시스템에 로그인하세요</p>
            </div>

            <div className="form-container">
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="loginId">이메일</label>
                        <input
                            type="email"
                            id="loginId"
                            name="loginId"
                            className="form-input"
                            placeholder="admin@boombim.com"
                            value={formData.loginId}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-input"
                            placeholder="비밀번호를 입력하세요"
                            value={formData.password}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            autoComplete="current-password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="loading-spinner"></span>
                                로그인 중...
                            </>
                        ) : (
                            '로그인'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;