import React, { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalState";
import { PollEnums } from "../Enums/PollEnums";

export const BoolVote = ({ id, pollValue, dv }) => {
  const [vote, setVote] = useState(dv);
  const { voteMany, user } = useContext(GlobalContext);

  const voteForBool = (val) => {
    setVote(val);

    const voteBool = {
      uid: user._id,
      pollId: id,
      pollType: PollEnums.Bool,
      voted: val,
    };

    voteMany(voteBool);
  };

  return (
    <div>
      <label>{pollValue}</label>
      <input
        key={`t${id}`}
        type="radio"
        name={`radioT${id}`}
        checked={vote !== null && vote}
        onChange={() => voteForBool(true)}
      />
      <label style={{ paddingRight: "5px", paddingLeft: "3px" }}>True</label>
      <input
        key={`f${id}`}
        type="radio"
        name={`radioF${id}`}
        checked={vote !== null && !vote}
        onChange={() => voteForBool(false)}
      />
      <label style={{ paddingRight: "5px", paddingLeft: "3px" }}>False</label>
    </div>
  );
};

export const ListVote = ({ id, pollValue }) => {
  const { voteOne, user } = useContext(GlobalContext);
  const currVote = {
    uid: user._id,
    pollId: id,
    pollType: PollEnums.List,
  };

  return (
    <div>
      <button onClick={() => voteOne(currVote)}>{pollValue}</button>
    </div>
  );
};

export const DateVote = ({ id, pollValue }) => {
  const { voteOne, user } = useContext(GlobalContext);
  const currVote = {
    uid: user._id,
    pollId: id,
    pollType: PollEnums.Dates,
  };

  return (
    <div>
      <button onClick={() => voteOne(currVote)}>{pollValue}</button>
    </div>
  );
};
