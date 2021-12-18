import { Card, Typography, Box, CardContent, Badge } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import React from "react";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

class AnswerDetails extends React.Component {
  render() {
    const { text, votes, totalVotes, authedUser } = this.props;

    if (votes.includes(authedUser)) {
      return (
        <Badge
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          color="warning"
          badgeContent="Your Choice"
        >
          <Card
            style={{
              backgroundColor: "#e3fbe3",
              border: "1px solid #8fef8f",
              minWidth: 300,
              maxWidth: 300,
            }}
            variant="outlined"
          >
            {/* <CardHeader title={`Would you rather ${text}:`} /> */}
            <CardContent>
              <Typography
                style={{ fontStyle: "italic" }}
              >{`Would you rather ${text}:`}</Typography>
              <LinearProgressWithLabel
                value={(votes.length / totalVotes) * 100}
              />
              <Typography style={{ textAlign: "center" }}>
                {votes.length} out of {totalVotes} votes
              </Typography>
            </CardContent>
          </Card>
        </Badge>
      );
    } else {
      return (
        <Card variant="outlined">
          {/* <CardHeader title={`Would you rather ${text}:`} /> */}
          <CardContent>
            <Typography>{`Would you rather ${text}:`}</Typography>
            <LinearProgressWithLabel
              value={(votes.length / totalVotes) * 100}
            />
            <Typography style={{ textAlign: "center" }}>
              {votes.length} out of {totalVotes} votes
            </Typography>
          </CardContent>
        </Card>
      );
    }
  }
}

export default AnswerDetails;
