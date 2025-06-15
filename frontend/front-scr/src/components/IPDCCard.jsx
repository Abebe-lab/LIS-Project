import React from "react";
//import { styled } from "@mui/material/styles";
import { Card, CardActions, CardContent, Typography, CardHeader, Avatar } from "@mui/material";
import { IPDCChartSelctor, IPDCReferVsResponse, IPDCParkByIndustry } from "./Controls/IPDCCharts";
import { Link } from "react-router-dom";

const IPDCCardV2 = ({ title, link, content, contentType, showMoreButton = true, avatar = null }) => {
  const renderContent = () => {
    switch (contentType) {
      case "image":
        return <img src={content} alt={title} style={{ width: "100%" }} height={100} />;
      case "text":
        return (
          <Typography sx={{ mb: 1.5 }} color="text.secondary" height={88}>
            {content}
          </Typography>
        );
      case "chart-eic":
        return <IPDCReferVsResponse data={content} showButton={showMoreButton} />;
      case "chart-park-by-industry":
        return <IPDCParkByIndustry data={content} showButton={showMoreButton} />;
      case "chart":
      case "chart-pie":
      case "chart-bar":
      case "chart-bar-two":
      case "special-health":
      case "user-statistics":
        return <IPDCChartSelctor contentType={contentType} data={content} showButton={showMoreButton} />;
      default:
        return <>{content}</>;
    }
  };

  return (
    <Card sx={{ minWidth: 275, margin: 1 }} height={120} elevation={3}>
      <CardHeader
        avatar={<Avatar>{avatar ? avatar : title.charAt(0)}</Avatar>}
        title={
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        }
      />
      <CardContent>{renderContent()}</CardContent>
      {showMoreButton && (
        <CardActions>
          <Link to={link}>Learn More</Link>
        </CardActions>
      )}
    </Card>
  );
};

const IPDCCard = ({ cardTitle, actionTitle, actionLink, isMenuOpen, cardImageOrContent, isImage = true }) => {
  return (
    <Card sx={{ minWidth: 275, margin: 2 }} height={100}>
      <CardContent>
        <CardHeader title={cardTitle} />
        {isImage ? (
          <img src={cardImageOrContent} alt={cardTitle + " image"} style={{ width: "100%" }} height={100} />
        ) : (
          //					<CardMedia component="img" image={cardImageOrContent} alt={cardTitle + " image"} />
          cardImageOrContent
        )}
      </CardContent>
      <CardActions>
        <Link to={actionLink}>{actionTitle}</Link>
      </CardActions>
    </Card>
  );
};
const IPDCMessageCard = ({ cardTitle, cardContent = "Card content empty", open = true }) => {

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 16, fontWeight: "bold", color: "grey" }} color="text.primary" gutterBottom>
          {cardTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {cardContent}
        </Typography>
      </CardContent>
    </Card>
  );
};

export { IPDCCard, IPDCCardV2, IPDCMessageCard };
