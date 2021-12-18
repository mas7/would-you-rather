import { Box } from "@mui/system";
import React from "react";
import { connect } from "react-redux";
import LeaderBoardItem from "./LeaderBoardItem";

class Leaderboard extends React.Component {
  render() {
    const { usersIds } = this.props;
    return (
      <Box mt={2}>
        {usersIds.map((id) => {
          return (
            <Box key={id} m={2}>
              <LeaderBoardItem id={id} />
            </Box>
          );
        })}
      </Box>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    usersIds: Object.keys(users).sort((a, b) => {
      const userA =
        users[a].questions.length + Object.keys(users[a].answers).length;
      const userB =
        users[b].questions.length + Object.keys(users[b].answers).length;
      return userB - userA;
    }),
  };
}

export default connect(mapStateToProps)(Leaderboard);
