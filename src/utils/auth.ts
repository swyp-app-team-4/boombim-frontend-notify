const TOKEN_KEY = 'admin_access_token';

export const auth = {
    // 토큰 저장
    setToken: (token: string): void => {
        localStorage.setItem(TOKEN_KEY, token);
    },

    // 토큰 가져오기
    getToken: (): string | null => {
        return localStorage.getItem(TOKEN_KEY);
    },

    // 토큰 삭제
    removeToken: (): void => {
        localStorage.removeItem(TOKEN_KEY);
    },

    // 로그인 상태 확인
    isAuthenticated: (): boolean => {
        const token = auth.getToken();
        return token !== null && token.length > 0;
    },

    // 로그아웃
    logout: (): void => {
        auth.removeToken();
        window.location.href = '/';
    }
};