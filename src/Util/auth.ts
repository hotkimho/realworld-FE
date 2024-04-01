
// 로그아웃(localStorage에서 토큰 삭제)
export const logoutInLocalStorage = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("profile_image");
    localStorage.removeItem("user_id");
}


export const checkTokenExpiration = (token: string): boolean => {
    const payload = JSON.parse(window.atob(token.split('.')[1]));
    const now = new Date().getTime() / 1000; // 현재 시간을 초 단위로 변환
    if (payload.exp < now) {
        return true; // 토큰이 만료된 경우
    }
    return false; // 토큰이 유효한 경우
};
