import { Button, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FCWC, FormEvent, useCallback, useState } from "react";
import { useGlobalDataContext } from "../context";
import { useRequestControl } from "../shared/useRequestControl";
import { API, setBearerToken } from "../api";

const AppLogin: React.FC = () => {

    const [password, setPassword] = useState<string>("");
    const { setGlobalData } = useGlobalDataContext();

    const submitCtrl = useRequestControl();
    const navigate = useNavigate();

    const submiLogin = useCallback(async (signal:AbortSignal) => {
        if (!password) return;

        const token = await API.security.login(password);
        setBearerToken(token);

        const globalData = await API.general.getInitialData(signal);
        setGlobalData(globalData);

        navigate("/");
    }, [password, setGlobalData, navigate]);

    const handleSubmit = useCallback((ev:FormEvent) => {
        ev.preventDefault();
        submitCtrl.request(submiLogin);
    }, [submitCtrl, submiLogin]);

    if (submitCtrl.isLoading) {
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
                    {!!submitCtrl.error  && 
                        <Typography color="red">
                            Ocurrió un error <br/>
                            { submitCtrl.error.title }
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