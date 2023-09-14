import client from "../client";
import { SavePaymentDto, PaymentDto } from "../models";

const URL = "api/payment";

const getList = async (data:{}, signal?:AbortSignal) => {
    const resp = await client.get<PaymentDto[]>(URL, { data, signal });
    return resp.data;
};

const create = async (data:SavePaymentDto, signal?:AbortSignal) => {
    const resp = await client.post<PaymentDto>(URL, data, { signal });
    return resp.data;
};

const update = async (data:SavePaymentDto, signal?:AbortSignal) => {
    const url = `${URL}/${data.id}`;
    const resp = await client.put<PaymentDto>(url, data, { signal });
    return resp.data;
};

const createOrUpdate = async (data:SavePaymentDto, signal?:AbortSignal) => {
    if (data.id)
        return await update(data, signal);
    else
        return await create(data, signal);
}

export const payments = {
    getList,
    create,
    update,
    createOrUpdate,
};