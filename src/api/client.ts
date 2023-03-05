import axios from "axios";

const client = axios.create({
    baseURL: process.env.REACT_APP_MYACCOUNTS_API_URL,
    timeout: process.env.REACT_APP_MYACCOUNTS_API_TIMEOUT,
});

export const setBearerToken = (token:string) => {
    client.defaults.headers["Authorization"] = `Bearer ${token}`;
}

export const unsetBearerToken = () => {
    if (client.defaults.headers["Authorization"])
        delete client.defaults.headers["Authorization"];
}

export default client;