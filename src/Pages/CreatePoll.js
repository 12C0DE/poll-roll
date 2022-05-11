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
import InputAdornment from "@mui/material/InputAdornment";
import { generateSlug } from "random-word-slugs";
import { IconButton } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Tooltip from "@mui/material/Tooltip";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { Controller } from "react-hook-form";

const CreatePoll = ({ history }) => {
  const { polls, addPollOption, clearPolls, setPolls, user } =
    useContext(GlobalContext);
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

  useEffect(() => {
    reset({
      titleName: "",
      txtDetails: "",
      keyPhrase: "",
      rsvpDate: "",
    });

    clearPolls();
  }, [reset]);

  const clearPollCtrls = () => {
    setValue("rsvpDate", null);
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

  const submitPoll = async (data) => {
    console.log("submitPoll");
    let isUnique = null;

    if (!polls.pollOptions.length > 0) {
      console.log("polls length = 0");
      return;
    }

    //check if key phrase is available
    await axios
      .get(
        `https://pollroll-api.herokuapp.com/polls/keyphrase/${data.keyPhrase}`
      )
      .then((res) => {
        isUnique = res.data.isUnique;
      });

    if (isUnique === null) {
      return;
    } else if (!isUnique) {
      alert("Key Phrase is already in use. Change your Key Phrase.");
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
      keyPhrase: data.keyPhrase,
      rsvpDate: data.rsvpDate,
      pollOptions: polls.pollOptions,
      pollKind: pollKind,
      authId: user.authId,
    };

    axios
      .post("https://pollroll-api.herokuapp.com/polls/post", newPoll)
      .then((res) => {
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
      <Container maxWidth="lg" style={{ minWidth: 250 }}>
        <div className="flex w-full place-content-center">
          <form
            onSubmit={handleSubmit(submitPoll)}
            className="place-self-start w-full md:w-3/4"
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
              <TextField
                name="keyphrase"
                variant="outlined"
                label="Key Phrase"
                error={errors.keyPhrase}
                helperText={errors.keyPhrase && errors.keyPhrase.message}
                {...register("keyPhrase", {
                  required:
                    "Key Phrase is required. Allows users to search for Poll.",
                })}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Generate random key phrase" arrow>
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setValue(
                              "keyPhrase",
                              generateSlug(3, { format: "lower" })
                            )
                          }
                          edge="end"
                        >
                          <AutorenewIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
              <div className="flex flex-row place-content-center flex-wrap space-x-4 space-y-4 mb-4 md:mb-0 md:items-baseline">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Controller
                    name="rsvpDate"
                    control={control}
                    defaultValue={null}
                    render={({
                      field: { onChange, value },
                      fieldState: { error, invalid },
                    }) => (
                      <DatePicker
                        label="Vote by:"
                        value={getValues("rsvpDate")}
                        // required={true}
                        id="rsvpDate"
                        disablePast
                        {...register("rsvpDate", {
                          required: "Enter a valid RSVP date",
                        })}
                        onChange={(newValue) => {
                          setValue("rsvpDate", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            error={errors.rsvpDate}
                            className="w-full md:w-1/3"
                            helperText={
                              errors.rsvpDate && errors.rsvpDate.message
                            }
                            InputLabelProps={{
                              shrink: true,
                            }}
                            {...params}
                          />
                        )}
                      />
                    )}
                  />
                </LocalizationProvider>

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
