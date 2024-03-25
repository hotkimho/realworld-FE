
// 로그아웃(localStorage에서 토큰 삭제)
export const logoutInLocalStorage = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("profile_image");
}