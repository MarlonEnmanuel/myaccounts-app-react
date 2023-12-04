import client from "../client";
import { AuthDataDto } from "../models";

const URL = "api/general";

const getAuthData = async (signal?:AbortSignal) => {
    const url = `${URL}/initial`;
    const resp = await client.get<AuthDataDto>(url, { signal });
    return resp.data;
};

export const general = {
    getAuthData,
};