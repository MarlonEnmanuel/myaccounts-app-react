import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

const AutoLoginError: React.FC = () => {
    var loginUrl = `${process.env.REACT_APP_URL}/10203040`;
    return (
        <Box sx={{ height: '100vh', width: '100%'}}>
            <Typography component="h1" fontSize={20} textAlign="center">
                Hubo un error al iniciar sesión por favor ingresa tu clave en la URL
                <br/><br/>
                <a href={loginUrl}>{loginUrl}</a>
            </Typography>
        </Box>
    );
};

export default AutoLoginError;