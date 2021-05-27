import React, { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalState";
import { PollEnums } from "../Enums/PollEnums";

export const BoolVote = ({ id, pollValue }) => {
  const [isTrue, setIsTrue] = useState(null);
  const { voteMany, user } = useContext(GlobalContext);

  const voteBool = {
    uid: user._id,
    pollId: id,
    pollType: PollEnums.Bool,
    voted: isTrue,
  };

  const voteForBool = () => {
    setIsTrue(!isTrue);
    voteMany(voteBool);
  };

  return (
    <div>
      <label>{pollValue}</label>
      <input
        type="radio"
        name={`radioT${id}`}
        checked={isTrue}
        onChange={() => voteForBool()}
        // onChange={() => setIsTrue(!isTrue)}
      />
      <label style={{ paddingRight: "5px", paddingLeft: "3px" }}>True</label>
      <input
        type="radio"
        name={`radioF${id}`}
        checked={!isTrue}
        onChange={() => voteForBool()}
        // onChange={() => setIsTrue(!isTrue)}
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
