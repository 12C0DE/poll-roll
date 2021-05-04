import React, { useContext, useRef } from "react";
import { DeletePoll } from "../Components/DeletePoll";
import { DeletePollOption } from "../Components/DeletePollOption";
import { GlobalContext } from "../Context/GlobalState";
import { PollEnums } from "../Enums/PollEnums";

export const BoolPoll = ({ id, pollValue, isPollOption }) => {
  const { updatePoll } = useContext(GlobalContext);

  const updatingPoll = (e) => {
    if (e.target.value.length > 0) {
      const updatedPoll = {
        pollType: PollEnums.Bool,
        pollId: id,
        option: e.target.value,
      };

      updatePoll(updatedPoll);
    }
  };

  return (
    <div>
      <input
        type="text"
        id={`bi${id}`}
        placeholder="question"
        defaultValue={pollValue}
        onBlur={(e) => updatingPoll(e)}
      />
      <input
        type="radio"
        name={`radioT${id}`}
        disabled={true}
        // checked={isTrue}
        // onChange={() => setIsTrue(!isTrue)}
      />
      <label style={{ paddingRight: "5px", paddingLeft: "3px" }}>True</label>
      <input
        type="radio"
        name={`radioF${id}`}
        disabled={true}
        // checked={!isTrue}
        // onChange={() => setIsTrue(!isTrue)}
      />
      <label style={{ paddingRight: "5px", paddingLeft: "3px" }}>False</label>
      {isPollOption ? <DeletePollOption id={id} /> : <DeletePoll id={id} />}
    </div>
  );
};

export const ListPoll = ({ id, pollValue, isPollOption }) => {
  const { updatePoll } = useContext(GlobalContext);
  const updatingPoll = (e) => {
    if (e.target.value.length > 0) {
      const updatedPoll = {
        pollType: PollEnums.List,
        pollId: id,
        option: e.target.value,
      };

      updatePoll(updatedPoll);
    }
  };

  return (
    <div>
      <label>Add Option</label>
      <input
        id={`li${id}`}
        type="text"
        defaultValue={pollValue}
        onBlur={(e) => updatingPoll(e)}
      />
      {isPollOption ? <DeletePollOption id={id} /> : <DeletePoll id={id} />}
    </div>
  );
};

export const DatePoll = ({ id, isPollOption }) => {
  const { updatePoll } = useContext(GlobalContext);
  const startRef = useRef();
  const endRef = useRef();

  const updatingPoll = (e) => {
    if (e.target.value.length > 0) {
      const updatedPoll = {
        pollType: PollEnums.Dates,
        pollId: id,
        startDate: startRef.current.value,
        endDate: endRef.current.value,
      };

      updatePoll(updatedPoll);
    }
  };

  return (
    <div>
      <label>Start Date</label>
      <input
        type="date"
        id={`sd${id}`}
        ref={startRef}
        onChangeCapture={updatingPoll}
      />
      <label>End Date</label>
      <input
        type="date"
        id={`ed${id}`}
        ref={endRef}
        onChangeCapture={updatingPoll}
      />
      {isPollOption ? <DeletePollOption id={id} /> : <DeletePoll id={id} />}
    </div>
  );
};
