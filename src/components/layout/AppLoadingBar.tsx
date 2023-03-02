import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useApiRequestCounter } from "./useApiRequestCounter";

export const AppLoadingBar = () => {

    const requestCount = useApiRequestCounter();
    
    return (
        <Box sx={{ width: '100%', position: 'fixed', top: '0', left: '0' }}>
            {requestCount > 0 &&
                <LinearProgress />
            }
        </Box>
    );
};