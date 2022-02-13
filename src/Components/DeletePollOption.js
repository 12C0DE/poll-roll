import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

export const DeletePollOption = ({ id }) => {
  const { delPollOption } = useContext(GlobalContext);

  return (
    <button onClick={() => delPollOption(id)}>
      <DeleteForeverRoundedIcon
        style={{ color: "#a4a7a4" }}
        fontSize="medium"
      />
    </button>
  );
};
