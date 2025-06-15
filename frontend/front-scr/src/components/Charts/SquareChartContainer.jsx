import { Card, CardActions, CardContent, Typography, CardHeader, Avatar, Paper,Box } from "@mui/material";
import { Link } from "react-router-dom";
const SquareChartContainer = ({THECHART, title, link, showMoreButton = false, avatar = null }) => {
    return (
      <Paper sx={{ minWidth: 275, margin: 1 }}>
        <Card  sx={{height: 250}} height={120} elevation={3}>
          <CardHeader
            avatar={<Avatar>{avatar ? avatar : title.charAt(0)}</Avatar>}
            title={
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
            }
          />
          <CardContent >{ THECHART }</CardContent>
          {showMoreButton && (
            <CardActions>
              <Link to={link}>Learn More</Link>
            </CardActions>
          )}
        </Card>
        </Paper>
      );
}
export default SquareChartContainer ;