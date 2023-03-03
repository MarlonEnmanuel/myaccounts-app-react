import AppLayout from "./layout/AppLayout"
import PaymentMain from "./payments/PaymentMain";

const App: React.FC = () => {
    return (
        <AppLayout>
            Mi primer componente con layout
            <PaymentMain />
        </AppLayout>
    );
};

export default App;