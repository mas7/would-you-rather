import {
  Avatar,
  ButtonBase,
  Divider,
  Grid,
  Paper,
  Typography,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import React from "react";
import { connect } from "react-redux";

class LeaderBoardItem extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <Paper
        variant="outlined"
        sx={{ p: 2, margin: "auto", minWidth: 500, flexGrow: 1 }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Avatar
                sx={{ width: 128, height: 128 }}
                alt={`Avatar of ${user.name}`}
                src={user.avatarURL}
              />
            </ButtonBase>
          </Grid>
          <Grid item>
            <Divider orientation="vertical" />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid
                item
                xs
                container
                direction="column"
                justifyContent="space-around"
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                >
                  {user.name}
                </Typography>
                <Typography gutterBottom>
                  Answered Questions: {Object.keys(user.answers).length}
                </Typography>
                <Divider />
                <Typography gutterBottom>
                  Created Questions: {user.questions.length}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Divider
                style={{ marginLeft: "1rem", marginRight: "1rem" }}
                orientation="vertical"
              />
            </Grid>
            <Grid item>
              <Card>
                <CardHeader
                  title="Score"
                  style={{ backgroundColor: "#ebebeb" }}
                />
                <CardContent>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Typography
                      style={{
                        backgroundColor: "#2196f3",
                        width: 50,
                        height: 50,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "100%",
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    >
                      {Object.keys(user.answers).length + user.questions.length}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

function mapStateToProps({ users }, { id }) {
  const user = users[id];
  return {
    user,
  };
}

export default connect(mapStateToProps)(LeaderBoardItem);
