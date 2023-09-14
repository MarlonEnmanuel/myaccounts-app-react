import { BrowserRouter, Route, Routes } from "react-router-dom";
import { InitialDataContextProvider } from "../context";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AppLayout from "./layout/AppLayout";
import AppLogin from "./AppLogin";
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
    return (
        <Routes>
            <Route path="/login" element={<AppLogin />} />
            <Route element={<AppLayout />}>
                <Route path="/" element={<PaymentMain />} />
            </Route>
        </Routes>
    );
};

export default App;