import { Alert, CircularProgress, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { CanceledError } from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/API";
import { useInitialDataContext } from "../../context/InitialDataContext";
import { FetchStatus } from "../../shared/FetchStatus";
import { useSignalEffect } from "../../shared/useSignalEffect";

const useLogin = (userKey:string) => {
    
    const [status, setStatus] = useState<FetchStatus>(FetchStatus.initial);
    const { loadInititalData } = useInitialDataContext();

    const login = async (signal:AbortSignal) => {
        setStatus(FetchStatus.loading);
        try {
            await API.security.login(userKey!, signal);
            await loadInititalData(signal);
            setStatus(FetchStatus.success);
        } catch(ex) {
            if (ex instanceof CanceledError) return;
            console.log("Error en login", ex);
            setStatus(FetchStatus.error);
        }
    };

    useSignalEffect(signal => {
        login(signal);
    }, [userKey]);

    return status;
};

const AutoLogin: React.FC = () => {

    const { userKey } = useParams();
    const navigate = useNavigate();

    const loginStatus = useLogin(userKey ?? "");

    if (loginStatus === FetchStatus.success)
        navigate("/");

    return (
        <Box>
            <Typography component="h1" sx={{mt: 5}} align="center">
                Iniciando sesión {userKey} ...
            </Typography>
            <Box mt={5} textAlign="center">
                {loginStatus === FetchStatus.loading &&
                    <CircularProgress />
                }
                {loginStatus === FetchStatus.error &&
                    <Alert severity="error">No se pudo iniciar sesión</Alert>
                }
            </Box>
        </Box>
    );
};

export default AutoLogin;