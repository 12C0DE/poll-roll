import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { GlobalContext } from "../Context/GlobalState";
import { BoolPoll, ListPoll, DatePoll } from "../Components/PollTypes";
import { PollTypeList } from "../Components/PollTypeList";
import axios from "axios";
import { PollEnums } from "../Enums/PollEnums";
import uuid from "react-uuid";

export const EditPoll = () => {
  const { _id } = useParams();
  const { addPoll, polls, setPolls } = useContext(GlobalContext);
  const [pollTest, setPollTest] = useState([]);
  const displayPolls = null;

  // useEffect(() => {
  //   let unmounted = false;
  //   let source = axios.CancelToken.source();

  //   axios
  //     .get(`/polls/${_id}`, { cancelToken: source.token })
  //     .then((p) => {
  //       if (!unmounted) {
  //         console.log(`unmounted: ${unmounted}`);
  //         setPolls(
  //           p.data,
  //           () =>
  //             (displayPolls = polls.pollOptions.map((p) => (
  //               // generatePollComps(+p.pollType, p.pollId, p.option)
  //               <h3>{p.option}</h3>
  //             )))
  //         );
  //         setPollTest(p.data);
  //       }
  //     })
  //     .catch(function (e) {
  //       if (!unmounted) {
  //         console.log(`err unmounted: ${unmounted}`);
  //         if (axios.isCancel(e)) {
  //           console.log(`request cancelled: ${e.message}`);
  //         } else {
  //           console.log(`another err happened: ${e.message}`);
  //         }
  //       }
  //     });
  //   return function () {
  //     unmounted = true;
  //     source.cancel("cancelling in cleanup");
  //   };
  // }, [_id]);
  useEffect(() => {
    axios.get(`/polls/${_id}`).then((p) => {
      const pollArr = p.data;
      console.log("in useeffect");
      setPollTest(...pollTest, pollArr);
    });
  }, [_id]);

  // const add2Polls = (poll) => {
  //   if (+poll === PollEnums.None) {
  //     return;
  //   }

  //   const newPoll = {
  //     pollType: +poll,
  //     pollId: uuid(),
  //   };

  //   addPoll(newPoll);
  // };

  // const generatePollComps = (poll, pollID, val) => {
  //   console.log(`poll ${poll}`);

  //   switch (poll) {
  //     case PollEnums.Bool:
  //       return <BoolPoll key={`bool${pollID}`} id={pollID} optionVal={val} />;
  //     case PollEnums.List:
  //       return <ListPoll key={`list${pollID}`} id={pollID} optionVal={val} />;
  //     case PollEnums.Dates:
  //       return <DatePoll key={`date${pollID}`} id={pollID} />;
  //     default:
  //       return null;
  //   }
  // };

  // {polls.length > 0 &&
  //   polls.pollOptions.map(
  //     //(poll) => generatePollComps(+poll.pollType, poll.pollId, poll.option)
  //     (poll) => <h4>{poll.option}</h4>
  //     // console.log(poll.option)
  //   )}

  // const displayPolls = polls.pollOptions.map((p) =>
  //   generatePollComps(+p.pollType, p.pollId, p.option)
  // );

  return (
    <React.Fragment>
      <h2>Edit Poll</h2>
      <h3>{polls.pollName}</h3>
      {/* <PollTypeList add={add2Polls} /> */}
      {/* <div>{displayPolls}</div> */}
      <div>
        {pollTest.pollOptions.map(() => (
          <h4>hi</h4>
        ))}
      </div>
      <button>Delete Poll</button>
      <button>Save</button>
    </React.Fragment>
  );
};
