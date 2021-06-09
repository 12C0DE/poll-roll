import React from "react";
import { dateSplit } from "../functions/funcs";

export const TopSectionLbls = ({ pollname, details, rsvp }) => {
  const rsvpDate = dateSplit(new Date(rsvp).toLocaleDateString());

  return (
    <React.Fragment>
      <h2>{pollname}</h2>
      <div>
        <p>{details}</p>
      </div>
      <div>
        <label>RSVP by</label>
        <h3>{rsvpDate}</h3>
      </div>
    </React.Fragment>
  );
};
