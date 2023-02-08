import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

const Copyright = (props: any) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
          {'Copyright © '}
          <Link to="#">
            tickerhero.app
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      ); 
}

export default Copyright