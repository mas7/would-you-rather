import {
  Box,
  Typography,
  Input,
  Divider,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleAddQuestion } from "../actions/questions";

class NewQuestion extends React.Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    toHome: false,
  };
  handleOptionOneOnChange = (e) => {
    const text = e.target.value;
    this.setState((prevState) => ({ optionOneText: text }));
  };
  handleOptionTwoOnChange = (e) => {
    const text = e.target.value;
    this.setState((prevState) => ({ optionTwoText: text }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { optionOneText, optionTwoText } = this.state;
    const { dispatch, id } = this.props;

    dispatch(handleAddQuestion(optionOneText, optionTwoText));
    this.setState(() => ({
      optionOneText: "",
      ooptionTwoText: "",
      toHome: id ? false : true,
    }));
  };

  render() {
    const { authedUser } = this.props;

    if (this.state.toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <Box mt={5}>
        <Paper
          variant="outlined"
          sx={{ p: 2, margin: "auto", minWidth: 400, flexGrow: 1 }}
        >
          <Grid container direction="column" spacing={2}>
            <Grid alignSelf="center" item>
              <Typography variant="h4">Create New Question</Typography>
              <Typography style={{ textAlign: "center" }} variant="body2">
                Would you rather ...
              </Typography>
            </Grid>
            <Grid item>
              <Divider />
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column">
                <Grid item mx={2} my={4}>
                  <Box>
                    <Input
                      value={this.state.optionOneText}
                      onChange={this.handleOptionOneOnChange}
                      placeholder="Enter option one"
                      fullWidth
                    />
                  </Box>
                </Grid>
                <Grid mx={2} my={2} item>
                  <Divider>
                    <Typography>OR</Typography>
                  </Divider>
                </Grid>
                <Grid mx={2} my={4} item>
                  <Box>
                    <Input
                      value={this.state.optionTwoText}
                      onChange={this.handleOptionTwoOnChange}
                      placeholder="Enter option two"
                      fullWidth
                    />
                  </Box>
                </Grid>
                <Grid mt={4} item>
                  <Button
                    onClick={(e) => this.handleSubmit(e, authedUser)}
                    variant="contained"
                    disabled={
                      this.state.optionOneText.length < 1 ||
                      this.state.optionTwoText.length < 1
                    }
                    disableElevation
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(NewQuestion);
