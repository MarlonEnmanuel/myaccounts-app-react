import { Button, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { FCWC, FormEvent, useState } from "react";
import { useGlobalDataContext } from "../context";
import { useApiSubmit } from "../shared/useApiRequest";


const AppLogin: React.FC = () => {

    const navigate = useNavigate();
    const [ password, setPassword ] = useState<string>("");
    const { isLoading, error, submit } = useApiSubmit(API.security.login, true);
    const { loadGlobalData } = useGlobalDataContext();

    const handleSubmit = async function(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault();

        if(!password) return;
        if (isLoading) return;

        try {
            await submit(password);
            await loadGlobalData();
            navigate("/");
        } catch {}
    };

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
                            Ocurrió un error
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