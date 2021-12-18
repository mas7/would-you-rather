import React from "react";
import { connect } from "react-redux";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

class Nav extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(setAuthedUser(null));
  };

  render() {
    const { user } = this.props;

    return (
      <div>
        <Box>
          <AppBar position="static">
            <Toolbar>
              <Box sx={{ flex: 1 }}>
                <Button>
                  <NavLink
                    to="/"
                    exact
                    style={{ color: "white", textDecoration: "none" }}
                    activeClassName="active"
                  >
                    Home
                  </NavLink>
                </Button>
                <Button>
                  <NavLink
                    to="/add"
                    exact
                    style={{ color: "white", textDecoration: "none" }}
                    activeClassName="active"
                  >
                    New Question
                  </NavLink>
                </Button>
                <Button>
                  <NavLink
                    to="/leaderboard"
                    exact
                    style={{ color: "white", textDecoration: "none" }}
                    activeClassName="active"
                  >
                    Leaderboard
                  </NavLink>
                </Button>
              </Box>
              {user !== null && user !== undefined && (
                <Box sx={{ display: { md: "flex" } }}>
                  <Box
                    pr={4}
                    alignItems="center"
                    sx={{ display: { md: "flex" } }}
                  >
                    <Avatar alt={user.name} src={user.avatarURL} />
                    <Typography pl={2}>Welcome, {user.name}</Typography>
                  </Box>
                  <Button onClick={(e) => this.handleSubmit(e)} color="inherit">
                    <Link
                      to="/"
                      style={{
                        color: "white",
                        textDecoration: "none",
                      }}
                    >
                      Logout
                    </Link>
                  </Button>
                </Box>
              )}
            </Toolbar>
          </AppBar>
        </Box>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    user: users[authedUser],
  };
}

export default connect(mapStateToProps)(Nav);
