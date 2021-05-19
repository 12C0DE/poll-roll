import React, { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalState";
import { PollEnums } from "../Enums/PollEnums";

export const BoolVote = ({ id, pollValue }) => {
  const [isTrue, setIsTrue] = useState(null);

  return (
    <div>
      <label>{pollValue}</label>
      <input
        type="radio"
        name={`radioT${id}`}
        checked={isTrue}
        onChange={() => setIsTrue(!isTrue)}
      />
      <label style={{ paddingRight: "5px", paddingLeft: "3px" }}>True</label>
      <input
        type="radio"
        name={`radioF${id}`}
        checked={!isTrue}
        onChange={() => setIsTrue(!isTrue)}
      />
      <label style={{ paddingRight: "5px", paddingLeft: "3px" }}>False</label>
    </div>
  );
};

export const ListVote = ({ id, pollValue }) => {
  const { voteList, user } = useContext(GlobalContext);
  const currVote = {
    uid: user._id,
    pollId: id,
    pollType: PollEnums.List,
  };

  return (
    <div>
      <button onClick={() => voteList(currVote)}>{pollValue}</button>
    </div>
  );
};

export const DateVote = ({ id, pollValue }) => {
  return (
    <div>
      <button>{pollValue}</button>
    </div>
  );
};
