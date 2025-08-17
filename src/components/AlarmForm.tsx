import React, { useState } from 'react';
import { api } from '../services/api';
import { auth } from '../utils/auth';
import { SendAlarmRequest, SendAlarmResponse, AlarmType } from '../types';

const AlarmForm: React.FC = () => {
    const [formData, setFormData] = useState<SendAlarmRequest>({
        title: '',
        message: '',
        type: 'ANNOUNCEMENT',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [result, setResult] = useState<SendAlarmResponse | null>(null);

    const alarmTypeOptions = [
        { value: 'ANNOUNCEMENT', label: '📢 공지사항' },
        { value: 'EVENT', label: '🎉 이벤트' },
    ];

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        // 입력 시 메시지 클리어
        if (error) setError('');
        if (success) setSuccess('');
        if (result) setResult(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 유효성 검사
        if (!formData.title.trim()) {
            setError('알림 제목을 입력해주세요.');
            return;
        }

        if (!formData.message.trim()) {
            setError('알림 내용을 입력해주세요.');
            return;
        }

        setIsLoading(true);
        setError('');
        setSuccess('');
        setResult(null);

        try {
            const response = await api.sendAlarm(formData);

            setSuccess('알림이 성공적으로 전송되었습니다! 🎉');
            setResult(response);

            // 폼 초기화
            setFormData({
                title: '',
                message: '',
                type: 'ANNOUNCEMENT',
            });
        } catch (err: any) {
            setError(err.message || '알림 전송에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        if (window.confirm('정말 로그아웃 하시겠습니까?')) {
            auth.logout();
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h1>📱 알림 전송</h1>
                <p>사용자들에게 알림을 보내세요</p>
                <button className="logout-btn" onClick={handleLogout}>
                    로그아웃
                </button>
            </div>

            <div className="form-container">
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="success-message">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="type">알림 타입</label>
                        <select
                            id="type"
                            name="type"
                            className="form-select"
                            value={formData.type}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        >
                            {alarmTypeOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="title">알림 제목</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="form-input"
                            placeholder="예: 중요한 공지사항이 있습니다"
                            value={formData.title}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            maxLength={100}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">알림 내용</label>
                        <textarea
                            id="message"
                            name="message"
                            className="form-textarea"
                            placeholder="사용자들에게 전달할 알림 내용을 입력하세요..."
                            value={formData.message}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            maxLength={500}
                        />
                        <div style={{
                            fontSize: '12px',
                            color: '#718096',
                            textAlign: 'right',
                            marginTop: '5px'
                        }}>
                            {formData.message.length}/500
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={isLoading || !formData.title.trim() || !formData.message.trim()}
                    >
                        {isLoading ? (
                            <>
                                <span className="loading-spinner"></span>
                                전송 중...
                            </>
                        ) : (
                            '🚀 알림 전송하기'
                        )}
                    </button>
                </form>

                {result && (
                    <div className="result-card">
                        <h3>📊 전송 결과</h3>
                        <div className="result-stats">
                            <div className="stat-item">
                                <span className="stat-number">{result.successCount}</span>
                                <div className="stat-label">성공</div>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">{result.failureCount}</span>
                                <div className="stat-label">실패</div>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">{result.totalTargets}</span>
                                <div className="stat-label">총 대상</div>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">#{result.alarmId}</span>
                                <div className="stat-label">알림 ID</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AlarmForm;