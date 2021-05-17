import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router";
import { GlobalContext } from "../Context/GlobalState";
import { PollEnums } from "../Enums/PollEnums";
import uuid from "react-uuid";
import axios from "axios";
import { generatePollComps } from "../functions/funcs";
import { PollTypeList } from "../Components/PollTypeList";

const CreatePoll = ({ history }) => {
  const [rsvpDate, setRsvpDate] = useState("");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [selPoll, setSelPoll] = useState(PollEnums.None);
  const { polls, addPollOption, clearPolls, setPolls, user } =
    useContext(GlobalContext);

  const clearInputs = () => {
    console.log("clear inputs");
    setName("");
    setDetails("");
    setRsvpDate("");
    clearPolls();
    setSelPoll(PollEnums.None);
  };

  const add2Polls = async (poll) => {
    if (+poll === PollEnums.None) {
      return;
    }

    const newPoll = {
      pollType: +poll,
      pollId: uuid(),
    };

    await addPollOption(newPoll);
  };

  const submitPoll = (e) => {
    e.preventDefault();

    if (!polls.length > 0) {
      return;
    }

    const newPoll = {
      pollName: name,
      details: details,
      rsvpDate: rsvpDate,
      pollOptions: polls.pollOptions,
      authId: user.authId,
    };

    axios.post("/polls/post", newPoll).then((res) => {
      clearInputs();
      history.push(`/editPoll/${res.data._id}`);
    });
  };

  useEffect(() => {
    //create new poll on page load
    const newPoll = {
      pollOptions: [],
    };

    setPolls(newPoll);
  }, []);

  return (
    <div>
      <h2>Create a Poll</h2>
      <div>
        <label>Title</label>
        <input
          type="text"
          required={true}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Details</label>
        <textarea
          onChange={(e) => setDetails(e.target.value)}
          value={details}
        />
      </div>
      <div>
        <label>RSVP by</label>
        <input
          type="date"
          required={true}
          onChange={(e) => setRsvpDate(e.target.value)}
          value={rsvpDate}
        />
      </div>
      <PollTypeList add={add2Polls} />
      <div>
        {polls.pollOptions?.map((poll) =>
          generatePollComps(+poll.pollType, poll.pollId)
        )}
      </div>
      <div>
        <input type="button" value="Submit" onClick={(e) => submitPoll(e)} />
        <input type="button" value="Clear" onClick={() => clearInputs()} />
      </div>
    </div>
  );
};
export default withRouter(CreatePoll);
