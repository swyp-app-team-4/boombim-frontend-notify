import axios, { AxiosResponse } from "axios";
import { LoginRequest, LoginResponse, SendAlarmRequest, SendAlarmResponse, ApiError } from '../types';
import { auth } from '../utils/auth';

// API 기본 URL 설정 (환경에 따라 변경)
const BASE_URL = 'https://api.boombim.p-e.kr' //http://api.boombim.p-e.kr'; // 또는 개발환경: 'http://localhost:8080'

// axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터 - 토큰 자동 추가
apiClient.interceptors.request.use(
    (config) => {
        const token = auth.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 - 에러 처리
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // 토큰이 유효하지 않은 경우 로그아웃
            auth.logout();
        }
        return Promise.reject(error);
    }
);

export const api = {
    // 관리자 로그인
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        try {
            const response: AxiosResponse<LoginResponse> = await apiClient.post(
                '/api/admin/login',
                credentials
            );
            return response.data;
        } catch (error: any) {
            if (error.response?.data) {
                const apiError: ApiError = error.response.data;
                throw new Error(apiError.message || '로그인에 실패했습니다.');
            }
            throw new Error('네트워크 오류가 발생했습니다.');
        }
    },

    // 알림 전송
    sendAlarm: async (alarmData: SendAlarmRequest): Promise<SendAlarmResponse> => {
        try {
            const response: AxiosResponse<SendAlarmResponse> = await apiClient.post(
                '/api/alarm/send',
                alarmData
            );
            return response.data;
        } catch (error: any) {
            if (error.response?.data) {
                const apiError: ApiError = error.response.data;
                throw new Error(apiError.message || '알림 전송에 실패했습니다.');
            }
            throw new Error('네트워크 오류가 발생했습니다.');
        }
    },
};