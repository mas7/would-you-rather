import React from "react";
import { connect } from "react-redux";
import {
  Avatar,
  Typography,
  Button,
  Grid,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Divider,
} from "@mui/material";
import AnswerDetails from "./AnswerDetails";
import { handleQuestionAnswer } from "../actions/questions";

class ViewPoll extends React.Component {
  state = {
    checkedOption: null,
  };

  answerQuestion(e, qid) {
    e.preventDefault();
    const answer = this.state.checkedOption;
    const info = {
      authedUser: this.props.authedUser,
      qid,
      answer,
    };
    this.props.dispatch(handleQuestionAnswer(info));
  }

  handleChange = (e) => {
    e.preventDefault();
    const text = e.target.value;
    this.setState((prevState) => ({
      checkedOption: text,
    }));
  };

  render() {
    const { question, author, isResult, authedUser, isNotFound } = this.props;

    if (isNotFound) {
      return (
        <Box textAlign="center" mt="50%">
          <Typography style={{ fontWeight: "bold" }} variant="h1">
            404
          </Typography>
          <Typography variant="h3">Sorry, poll not found.</Typography>
        </Box>
      );
    } else {
      return (
        <Box mt={5}>
          {isResult ? (
            <>
              <Paper
                variant="outlined"
                sx={{ p: 2, margin: "auto", maxWidth: 500, flexGrow: 1 }}
              >
                <Grid container spacing={2}>
                  <Grid style={{ alignSelf: "center" }} item>
                    <div>
                      <Avatar
                        sx={{ width: 128, height: 128 }}
                        alt={`Avatar of ${author.name}`}
                        src={author.avatarURL}
                      />
                    </div>
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
                          {`Asked by ${author.name}:`}
                        </Typography>
                        <Divider />

                        <Typography
                          mt={2}
                          variant="h6"
                          style={{ fontWeight: "bold" }}
                          gutterBottom
                        >
                          Results:
                        </Typography>
                        <Box m={1}>
                          <AnswerDetails
                            authedUser={authedUser}
                            text={question.optionOne.text}
                            votes={question.optionOne.votes}
                            totalVotes={
                              question.optionOne.votes.length +
                              question.optionTwo.votes.length
                            }
                          />
                        </Box>
                        <Box m={1}>
                          <AnswerDetails
                            authedUser={authedUser}
                            text={question.optionTwo.text}
                            votes={question.optionTwo.votes}
                            totalVotes={
                              question.optionOne.votes.length +
                              question.optionTwo.votes.length
                            }
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </>
          ) : (
            <>
              <Paper
                variant="outlined"
                sx={{ p: 2, margin: "auto", minWidth: 500, flexGrow: 1 }}
              >
                <Grid container spacing={2}>
                  <Grid style={{ alignSelf: "center" }} item>
                    <div>
                      <Avatar
                        sx={{ width: 128, height: 128 }}
                        alt={`Avatar of ${author.name}`}
                        src={author.avatarURL}
                      />
                    </div>
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
                          {`${author.name} asks:`}
                        </Typography>
                        <Divider />

                        <Typography
                          mt={2}
                          variant="h6"
                          style={{ fontWeight: "bold" }}
                          gutterBottom
                        >
                          Would you rather...
                        </Typography>
                        <Box m={1}>
                          <FormControl component="fieldset">
                            <RadioGroup
                              aria-label="question"
                              name="radio-buttons-group"
                              onChange={(e) => this.handleChange(e)}
                            >
                              <FormControlLabel
                                value="optionOne"
                                control={<Radio />}
                                label={question.optionOne.text}
                              />
                              <FormControlLabel
                                value="optionTwo"
                                control={<Radio />}
                                label={question.optionTwo.text}
                              />
                            </RadioGroup>
                          </FormControl>
                        </Box>
                        <Button
                          variant="outlined"
                          fullWidth
                          disabled={this.state.checkedOption == null}
                          onClick={(e) => this.answerQuestion(e, question.id)}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </>
          )}
        </Box>
      );
    }
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const id = props.match.params.question_id;
  const question = questions[id];
  if (question) {
    const author = users[question.author];
    const isResult =
      question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser);
    return {
      authedUser,
      question,
      author,
      isResult,
    };
  } else {
    return {
      isNotFound: true,
    };
  }
}

export default connect(mapStateToProps)(ViewPoll);
