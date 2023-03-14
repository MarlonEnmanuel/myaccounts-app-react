import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { InitialDataContextProvider, useInitialDataContext } from "../context/InitialDataContext";
import AppLayout from "./layout/AppLayout"
import AutoLogin from "./login/AutoLogin";
import AutoLoginError from "./login/AutoLoginError";
import PaymentMain from "./payments/PaymentMain";
import 'dayjs/locale/es-mx';

const App: React.FC = () => {
    return (
        <BrowserRouter basename="/">
            <InitialDataContextProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-mx">
                    <AppRoutes />
                </LocalizationProvider>
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