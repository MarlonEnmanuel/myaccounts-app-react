import { PaymentDto } from "../../api/models/PaymentDto";
import PaymentForm from "./edit/PaymentForm";

type PaymentEditProps = {
    payment?: PaymentDto,
};

const PaymentEdit : React.FC<PaymentEditProps> = (props) => {

    return (
        <PaymentForm></PaymentForm>
    );
};

export default PaymentEdit;