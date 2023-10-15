import { Button, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FCWC, FormEvent, useCallback, useEffect, useState } from "react";
import { useGlobalDataContext } from "../context";
import { useRequestControl } from "../shared/useRequestControl";
import { API, setBearerToken } from "../api";

const AppLogin: React.FC = () => {

    const [password, setPassword] = useState<string>("");
    const { setGlobalData } = useGlobalDataContext();

    const { request, isLoading, error } = useRequestControl();
    const navigate = useNavigate();

    const initializeApp = useCallback(async (signal:AbortSignal) => {
        const globalData = await API.general.getInitialData(signal);
        setGlobalData(globalData);
        navigate("/");
    }, [setGlobalData, navigate]);

    const submiLogin = useCallback(async (signal:AbortSignal) => {
        if (!password) return;

        const token = await API.security.login(password);
        sessionStorage.setItem("AuthToken", token);
        setBearerToken(token);

        await initializeApp(signal);
    }, [password, initializeApp]);

    const handleSubmit = useCallback((ev:FormEvent) => {
        ev.preventDefault();
        request(submiLogin);
    }, [request, submiLogin]);

    useEffect(() => {
        var token = sessionStorage.getItem("AuthToken");
        if (token == null) {
            return;
        }
        setBearerToken(token);
        
        request(initializeApp);
    }, [request, initializeApp])

    if (isLoading) {
        return (
            <LoginContainer>
                <CircularProgress />
            </LoginContainer>
        );
    }

    return (
        <LoginContainer>
            <Grid
                container
                rowSpacing={2}
                component="form" 
                autoComplete="off"
                onSubmit={handleSubmit}
                sx={{maxWidth: '300px'}}
            >
                <Grid item xs={12}>
                    <TextField
                        required 
                        label="DNI" 
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                        fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        fullWidth
                        size="large"
                        type="submit"
                    >
                        Ingresar
                    </Button>
                </Grid>
                <Grid item xs={12} textAlign="center">
                    {!!error  && 
                        <Typography color="red">
                            Ocurrió un error <br/>
                            { error.title }
                        </Typography>
                    }
                </Grid>
            </Grid>
        </LoginContainer>
    );
};

const LoginContainer:FCWC = ({children}) => {
    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ height: '100vh' }}
        >
            <Grid item>
                { children }
            </Grid>
        </Grid>
    );
}

export default AppLogin;