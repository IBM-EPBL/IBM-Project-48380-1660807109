// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import Background from './1.jpg';

// ==============================|| Wind mill image||============================== //

const AuthBackground = () => {
    const theme = useTheme();
    return (
        <Box sx={{ position: 'absolute', filter: 'blur(2px)', zIndex: -1, bottom: 0, height: '100%', width: '100%', overFlow: 'hidden' }}>
            <img src={Background} alt=" " srcSet="" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
        </Box>
    );
};

export default AuthBackground;
