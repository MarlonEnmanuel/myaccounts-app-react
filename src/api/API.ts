import general from "./resources/General";
import payments from "./resources/Payments";
import security from "./resources/Security";

const newAbortCtrl = () => {
    return new AbortController();
};

const API = {
    security,
    general,
    payments,
    newAbortCtrl,
};

export default API;