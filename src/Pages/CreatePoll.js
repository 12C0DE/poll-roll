import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router";
import { GlobalContext } from "../Context/GlobalState";
import { PollEnums } from "../Enums/PollEnums";
import uuid from "react-uuid";
import axios from "axios";
import { generatePollComps } from "../functions/funcs";
import { PollTypeList } from "../Components/PollTypeList";
import { useForm } from "react-hook-form";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

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
    <div className="flex flex-col">
      <div>
        <h1 className="text-3xl font-bold text-center py-8">Create a Poll</h1>
      </div>
      <Container maxWidth="lg">
        <div className="flex w-full place-content-center">
          <form
            onSubmit={handleSubmit(submitPoll)}
            className="w-3/4 place-self-start"
          >
            <Stack spacing={2}>
              <TextField
                name="titleName"
                variant="outlined"
                label="Title"
                error={errors.titleName}
                helperText={errors.titleName && errors.titleName.message}
                {...register("titleName", {
                  required: "Enter a title",
                })}
              />
              <TextField
                id="outlined-multiline-static"
                label="Details"
                className="mt-8"
                error={errors.txtDetails}
                helperText={errors.txtDetails && errors.txtDetails.message}
                multiline
                rows={4}
                {...register("txtDetails", {
                  required: "Details are required",
                })}
              />
              <div className="flex flex-row space-x-4 place-content-center">
                <TextField
                  id="rsvpDate"
                  label="Vote by"
                  type="date"
                  sx={{ width: 220 }}
                  error={errors.rsvpDate}
                  helperText={errors.rsvpDate && errors.rsvpDate.message}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                <PollTypeList add={add2Polls} />
              </div>
            </Stack>

            <div>
              {polls.pollOptions?.map((poll) =>
                generatePollComps(+poll.pollType, poll.pollId)
              )}
            </div>
            <div className="flex flex-row space-x-6 my-8 place-content-center">
              <Button variant="contained" type="submit">
                Submit
              </Button>
              <Button type="button" onClick={() => clearPollCtrls()}>
                Clear
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};
export default withRouter(CreatePoll);
