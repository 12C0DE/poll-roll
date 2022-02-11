import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router";
import { GlobalContext } from "../Context/GlobalState";
import { PollEnums } from "../Enums/PollEnums";
import uuid from "react-uuid";
import axios from "axios";
import { generatePollComps } from "../functions/funcs";
import { PollTypeList } from "../Components/PollTypeList";
import { useForm } from "react-hook-form";

const CreatePoll = ({ history }) => {
  const { polls, addPollOption, clearPolls, setPolls, user } =
    useContext(GlobalContext);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset({
      titleName: "",
      txtDetails: "",
      rsvpDate: "",
    });

    clearPolls();
  }, [reset]);

  const clearPollCtrls = () => {
    reset();
    clearPolls();
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

  const submitPoll = (data) => {
    console.log("submitPoll");

    if (!polls.pollOptions.length > 0) {
      console.log("polls length = 0");
      return;
    }

    //check what kind of poll: bool, list, dates, or combo
    let pollKind = PollEnums.None;
    const pollMatch = polls.pollOptions.every(
      (p) => p.pollType === polls.pollOptions[0].pollType
    );

    pollMatch
      ? (pollKind = polls.pollOptions[0].pollType)
      : (pollKind = PollEnums.Combo);

    const newPoll = {
      pollName: data.titleName,
      details: data.txtDetails,
      rsvpDate: data.rsvpDate,
      pollOptions: polls.pollOptions,
      pollKind: pollKind,
      authId: user.authId,
    };

    axios.post("/polls/post", newPoll).then((res) => {
      reset();
      history.push(`/editPoll/${res.data._id}/${user.authId}`);
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
      <form onSubmit={handleSubmit(submitPoll)}>
        <div>
          <label>Title</label>
          <input
            name="titleName"
            type="text"
            {...register("titleName", {
              required: "Enter a title",
            })}
          />
          {errors.titleName && (
            <p style={{ color: "red" }}>{errors.titleName.message}</p>
          )}
        </div>
        <div>
          <label>Details</label>
          <textarea
            {...register("txtDetails", {
              required: "Details are required",
            })}
          />
          {errors.txtDetails && (
            <p style={{ color: "red" }}>{errors.txtDetails.message}</p>
          )}
        </div>
        <div>
          <label>RSVP by</label>
          <input
            name="rsvpDate"
            type="date"
            {...register("rsvpDate", {
              required: "Enter a valid RSVP date",
              validate: {
                setLaterDate: (value) => {
                  return (
                    new Date(value).getTime() >
                      new Date(Date.now()).getTime() ||
                    "Can't pick a date in the past"
                  );
                },
              },
            })}
          />
          {errors.rsvpDate && (
            <p style={{ color: "red" }}>{errors.rsvpDate.message}</p>
          )}
        </div>
        <PollTypeList add={add2Polls} />
        <div>
          {polls.pollOptions?.map((poll) =>
            generatePollComps(+poll.pollType, poll.pollId)
          )}
        </div>
        <div>
          <input type="submit" value="Submit" />
          <input type="button" value="Clear" onClick={() => clearPollCtrls()} />
        </div>
      </form>
    </div>
  );
};
export default withRouter(CreatePoll);
