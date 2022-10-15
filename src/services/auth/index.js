import instance from "../../helpers/instance";

class AuthService {
    login(data) {
        console.log("sas");
        return instance.post("/user/sign-in", data);
    }

    singUp(data) {
        return instance.post("/user/sign-up", data);
    }
}

export default new AuthService();
