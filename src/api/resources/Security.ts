import client, { setBearerToken, unsetBearerToken } from "../client";

const URL = "api/security";

const login = async (userKey:string, signal?:AbortSignal) => {
    const url = `${URL}/login`;
    const resp = await client.post<string>(url, userKey, { signal });
    setBearerToken(resp.data);
}

const logout = () => {
    unsetBearerToken();
}

const security = {
    login,
    logout,
};

export default security;