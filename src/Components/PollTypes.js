import React, { useContext, useRef } from "react";
import { DeletePoll } from "../Components/DeletePoll";
import { GlobalContext } from "../Context/GlobalState";
import { PollEnums } from "../Enums/PollEnums";

export const BoolPoll = ({ id }) => {
  const { updatePoll } = useContext(GlobalContext);

  const updatingPoll = (e) => {
    if (e.target.value.length > 0) {
      const updatedPoll = {
        pollType: PollEnums.Bool,
        pollId: id,
        question: e.target.value,
      };

      updatePoll(updatedPoll);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="question"
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
      <DeletePoll id={id} />
    </div>
  );
};

export const ListPoll = ({ id }) => {
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
      <input type="text" onBlur={(e) => updatingPoll(e)} />
      <DeletePoll id={id} />
    </div>
  );
};

export const DatePoll = ({ id }) => {
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
      <input type="date" ref={startRef} onChangeCapture={updatingPoll} />
      <label>End Date</label>
      <input type="date" ref={endRef} onChangeCapture={updatingPoll} />
      <DeletePoll id={id} />
    </div>
  );
};
