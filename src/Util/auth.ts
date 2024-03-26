
// 로그아웃(localStorage에서 토큰 삭제)
export const logoutInLocalStorage = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("profile_image");
    localStorage.removeItem("user_id");
}