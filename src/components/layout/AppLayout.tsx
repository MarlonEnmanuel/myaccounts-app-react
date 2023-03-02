import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container'
import { AppLoadingBar } from "./AppLoadingBar";

const AppLayout: React.FCWC = (props) => {
    return (
        <Box sx={{ height: '100vh', width: '100%', overflow: 'auto' }}>
            <AppLoadingBar />
            <AppBar position="static" component="nav">
                <Container>
                    <Toolbar disableGutters>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Mis Cuentas
                        </Typography>
                        <Button color="inherit">Logout</Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box component="main" sx={{mt: 2}}>
                <Container maxWidth="lg">
                    { props.children }
                </Container>
            </Box>
        </Box>
    );
};

export default AppLayout;