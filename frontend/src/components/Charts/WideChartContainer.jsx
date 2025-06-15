import {
  Card,
  CardActions,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
const WideChartContainer = ({
  THECHART,
  title,
  link,
  showMoreButton = true,
  avatar = null,
}) => {
  return (
    <Card
      sx={{ width: "98%", margin: 1, padding: 1, height: "93%" }}
      elevation={3}
    >
      <CardHeader
        avatar={<Avatar>{avatar ? avatar : title.charAt(0)}</Avatar>}
        title={
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        }
        sx={{ marginBottom: 0}}
      />
      <CardContent sx={{ marginTop: 0, paddingTop: 0, }}>{THECHART}</CardContent>
      {showMoreButton && (
        <CardActions>
          <Link to={link}>Learn More</Link>
        </CardActions>
      )}
    </Card>
  );
};
export default WideChartContainer;
