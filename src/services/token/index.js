class TokenService {
    getLocalAccessToken() {
        return localStorage.getItem("token");
    }

    removeLocalAccessToken() {
        return localStorage.removeItem("token");
    }

    setLocalAccessToken(token) {
        return localStorage.setItem("token", token);
    }
}

export default new TokenService();
