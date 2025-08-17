// 로그인 관련 타입
export interface LoginRequest {
    loginId: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

// 알림 관련 타입
export type AlarmType = 'ANNOUNCEMENT' | 'EVENT';

export interface SendAlarmRequest {
    title: string;
    message: string;
    type: AlarmType;
}

export interface SendAlarmResponse {
    alarmId: number;
    status: string;
    successCount: number;
    failureCount: number;
    totalTargets: number;
    completedAt: string | null;
}

// API 에러 타입
export interface ApiError {
    status: number;
    code: number;
    message: string;
    time: string;
}