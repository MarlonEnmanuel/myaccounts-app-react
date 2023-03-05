import { BrowserRouter, Route, Routes } from "react-router-dom";
import { InitialDataContextProvider, useInitialDataContext } from "../context/InitialDataContext";
import AppLayout from "./layout/AppLayout"
import AutoLogin from "./login/AutoLogin";
import AutoLoginError from "./login/AutoLoginError";
import PaymentMain from "./payments/PaymentMain";

const App: React.FC = () => {
    return (
        <BrowserRouter basename="/">
            <InitialDataContextProvider>
                <AppRoutes />
            </InitialDataContextProvider>
        </BrowserRouter>
    );
};

const AppRoutes: React.FC = () => {
    const { initialData } = useInitialDataContext();
    return (
        <AppLayout>
            <Routes>
                <Route path="/:userKey" element={<AutoLogin />} />
                <Route path="/" element={initialData.user.id ? <PaymentMain /> : <AutoLoginError />} />
            </Routes>
        </AppLayout>
    );
};

export default App;