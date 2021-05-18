import React, { useContext, useRef } from "react";
import { DeletePollOption } from "../Components/DeletePollOption";
import { GlobalContext } from "../Context/GlobalState";
import { PollEnums } from "../Enums/PollEnums";

export const BoolPoll = ({ id, pollValue }) => {
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
        key={`bi${id}`}
        placeholder="question"
        defaultValue={pollValue}
        onBlur={(e) => updatingPoll(e)}
      />
      <input
        type="radio"
        name={`radioT${id}`}
        disabled={true}
      />
      <label style={{ paddingRight: "5px", paddingLeft: "3px" }}>True</label>
      <input
        type="radio"
        name={`radioF${id}`}
        disabled={true}
      />
      <label style={{ paddingRight: "5px", paddingLeft: "3px" }}>False</label>
      <DeletePollOption id={id} />
    </div>
  );
};

export const ListPoll = ({ id, pollValue }) => {
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
      <label>Option</label>
      <input
        id={`li${id}`}
        type="text"
        defaultValue={pollValue}
        onBlur={(e) => updatingPoll(e)}
      />
      <DeletePollOption key={`del${id}`} id={id} />
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
      <DeletePollOption id={id} />
    </div>
  );
};
