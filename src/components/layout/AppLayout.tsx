import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container'

type Layoutprops = {
    children: React.ReactNode,
};

const AppLayout: React.FC<Layoutprops> = (props) => 
{
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" component="nav">
                <Container maxWidth="lg">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Mis Cuentas
                        </Typography>
                        <Button color="inherit">Logout</Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box component="main" sx={{height: '100vh', width: '100%'}}>
                { props.children }
            </Box>
        </Box>
    );
};

export default AppLayout;