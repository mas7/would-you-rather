import {
  Avatar,
  Typography,
  Divider,
  Button,
  Grid,
  Paper,
  ButtonBase,
} from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import ViewPoll from "./ViewPoll";

class Question extends React.Component {
  state = {
    toPoll: false,
  };

  toPollView = (e, id) => {
    e.preventDefault();
    // TODO: Redirect to poll view
    this.setState(() => ({ toPoll: true }));
  };

  render() {
    const { authorUser, question } = this.props;
    const id = question.id;
    if (this.state.toPoll) {
      return <Redirect to={`/questions/${id}`} component={ViewPoll} />;
    }

    return (
      <Paper
        variant="outlined"
        sx={{ p: 2, margin: "auto", maxWidth: 500, flexGrow: 1 }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Avatar
                sx={{ width: 128, height: 128 }}
                alt={`Avatar of ${authorUser.name}`}
                src={authorUser.avatarURL}
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
                  {`${authorUser.name} asks:`}
                </Typography>

                <Typography gutterBottom>
                  Would you rather {question.optionOne.text} Or{" "}
                  {question.optionTwo.text}
                </Typography>
                <Button
                  variant="outlined"
                  fullWidth
                  style={{ marginTop: "10px" }}
                  onClick={(e) => this.toPollView(e, question.id)}
                >
                  View Poll
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  const authorUser = users[question.author];
  return {
    authedUser,
    authorUser,
    question,
  };
}

export default connect(mapStateToProps)(Question);
