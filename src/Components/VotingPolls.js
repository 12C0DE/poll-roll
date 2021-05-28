import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/GlobalState";
import { PollEnums } from "../Enums/PollEnums";

export const BoolVote = ({ id, pollValue, voteVal }) => {
  const [vote, setVote] = useState(voteVal);
  const { voteMany, user } = useContext(GlobalContext);

  useEffect(() => {

  }, []);

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
        type="radio"
        name={`radioT${id}`}
        // defaultChecked={false}
        checked={vote !== null && vote}
        onChange={() => voteForBool(true)}
      />
      <label style={{ paddingRight: "5px", paddingLeft: "3px" }}>True</label>
      <input
        type="radio"
        name={`radioF${id}`}
        // defaultChecked={false}
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
