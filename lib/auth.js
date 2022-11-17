import axios from "axios";
import Cookie from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://localhost:1337";

//註冊新會員
export const registerUser =  (username, email, password) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/auth/local/register`, {
           username,
           email,
           password,
       })
       //註冊後回應JWT去Client
       .then((res) => {
           //設定Cookie記住Token
           Cookie.set("token", res.data.jwt, {expires: 7});
           resolve(res);
           window.location.href = "/";
       })
       .catch((err) => {
            reject(err);
            console.log(err);
       });

    });
}

//登入
export const login = async (identifier, password) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/auth/local`, {
            identifier,
            password,
        })
        //註冊後回應JWT去Client
        .then((res) => {
            //設定Cookie記住Token
            Cookie.set("token", res.data.jwt, {expires: 7});
            resolve(res);
            window.location.href = "/";
        })
        .catch((err) => {
            reject(err);
            console.log(err);
        });
    });
}