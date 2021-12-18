import {
  Container,
  Box,
  Card,
  CardContent,
  Button,
  CardActions,
  CardHeader,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from "@mui/material";

import React from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

class LoginForm extends React.Component {
  state = {
    selectedUser: "",
  };

  handleOnChange = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({ selectedUser: e.target.value }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const id = this.state.selectedUser;
    this.props.dispatch(setAuthedUser(id));
  };

  render() {
    const { users } = this.props;

    return (
      <Container fixed>
        <Box mt={5}>
          <Card variant="outlined" sx={{ maxWidth: 600 }}>
            <Box p={2}>
              <CardHeader
                style={{ textAlign: "center" }}
                title="Welcome To Would You Rather App"
                subheader="Press sign in to continue"
              />
              <Divider />
              <CardContent>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select User
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.state.selectedUser}
                    label="Select User"
                    onChange={(e) => this.handleOnChange(e)}
                  >
                    <MenuItem disabled value={""}>
                      Select User
                    </MenuItem>
                    {users.map((userId) => {
                      return (
                        <MenuItem key={userId} value={userId}>
                          {userId}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </CardContent>
              <CardActions>
                <Button
                  disabled={this.state.selectedUser === ""}
                  variant="contained"
                  disableElevation
                  fullWidth
                  onClick={(e) => this.handleSubmit(e)}
                >
                  Sign In
                </Button>
              </CardActions>
            </Box>
          </Card>
        </Box>
      </Container>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.keys(users),
  };
}

export default connect(mapStateToProps)(LoginForm);
