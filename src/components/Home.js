import { Box, Tabs, Tab, Typography } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import Question from "./Question";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

class Home extends React.Component {
  state = {
    value: 0,
  };

  render() {
    const { value } = this.state;
    const { user, questionIds } = this.props;

    const handleChange = (event, newValue) => {
      this.setState((prevState) => ({
        value: newValue,
      }));
    };

    const unAnsweredCount =
      questionIds.length - Object.keys(user.answers).length;

    const answeredCount = Object.keys(user.answers).length;

    return (
      <Box
        my={5}
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            style={{ minWidth: 500 }}
            variant="fullWidth"
          >
            <Tab label={`Unanswered Questions (${unAnsweredCount})`} id={0} />
            <Tab label={`Answered Questions (${answeredCount})`} id={1} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {unAnsweredCount > 0 ? (
            questionIds.map(
              (id) =>
                user.answers[id] === undefined && (
                  <Box my={4} key={id}>
                    <Question id={id} />
                  </Box>
                )
            )
          ) : (
            <Typography style={{ fontStyle: "italic" }}>
              No unanswered questions
            </Typography>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {answeredCount > 0 ? (
            questionIds.map(
              (id) =>
                user.answers[id] !== undefined && (
                  <Box my={4} key={id}>
                    <Question id={id} />
                  </Box>
                )
            )
          ) : (
            <Typography style={{ fontStyle: "italic" }}>
              No answered questions
            </Typography>
          )}
        </TabPanel>
      </Box>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  const user = users[authedUser];
  return {
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
    user,
  };
}

export default connect(mapStateToProps)(Home);
