import client from "../client";
import { InputPaymentDto } from "../models/InputPaymentDto";
import { PaymentDto } from "../models/PaymentDto";

const URL = "api/payment";

const getList = async (signal?:AbortSignal) => {
    const resp = await client.get<PaymentDto[]>(URL, { signal });
    return resp.data;
};

const create = async (data:InputPaymentDto, signal?:AbortSignal) => {
    const resp = await client.post<PaymentDto>(URL, data, { signal });
    return resp.data;
};

const update = async (data:InputPaymentDto, signal?:AbortSignal) => {
    const url = `${URL}/${data.id}`;
    const resp = await client.put<PaymentDto>(url, data, { signal });
    return resp.data;
};

const payments = {
    getList,
    create,
    update,
};

export default payments;