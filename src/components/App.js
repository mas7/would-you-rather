import React, { Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Nav from "./Nav";
import LoginForm from "./LoginForm";
import { Grid } from "@mui/material";
import Home from "./Home";
import ViewPoll from "./ViewPoll";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser, users } = this.props;

    return (
      <BrowserRouter>
        <div>
          <LoadingBar />
          {Object.keys(users).length > 0 && (
            <>
              <Nav />
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Grid item>
                  <Switch>
                    {authedUser === null ? (
                      <LoginForm />
                    ) : (
                      <>
                        <Route path="/" exact component={Home} />
                        <Route
                          path="/questions/:question_id"
                          component={ViewPoll}
                        />
                        <Route path="/add" component={NewQuestion} />
                        <Route path="/leaderboard" component={Leaderboard} />
                      </>
                    )}
                  </Switch>
                </Grid>
              </Grid>
            </>
          )}
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(App);
