import { Button, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { FCWC, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API, setBearerToken } from "../api";
import { useAuthDataContext } from "../context";
import { useRequestControl } from "../shared/useRequestControl";

const AppLogin: React.FC = () => {

    const [ password, setPassword ] = useState<string>("");
    const { setAuthData } = useAuthDataContext();

    const { request, isLoading, error } = useRequestControl();
    const navigate = useNavigate();

    const initializeApp = async (signal:AbortSignal) => {
        const globalData = await API.general.getAuthData(signal);
        setAuthData(globalData);
        navigate("/");
    };

    const submiLogin = async (signal:AbortSignal) => {
        if (!password) return;

        const token = await API.security.login(password);
        sessionStorage.setItem("AuthToken", token);
        setBearerToken(token);

        await initializeApp(signal);
    };

    const handleSubmit = (ev:FormEvent) => {
        ev.preventDefault();
        request(submiLogin);
    };

    useEffect(() => {
        var token = sessionStorage.getItem("AuthToken");
        if (token == null) {
            return;
        }
        setBearerToken(token);
        request(initializeApp);
        // eslint-disable-next-line
    }, [])

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