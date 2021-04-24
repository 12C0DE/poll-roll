import React, { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalState";

export const PhoneVerification = () => {
  const [codeSent, setCodeSent] = useState(false);
  const { code, phone, setCode, setPhone } = useContext(GlobalContext);

  const maxInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]$/gi, "");

    if (e.target.value.length > 6) {
      e.preventDefault();

      let veri = e.target.value.slice(0, 6);
      e.target.value = veri;
    }
  };

  const sendPhoneCode = (e) => {
    e.preventDefault();
    setCodeSent(true);
  };

  return (
    <div>
      <input
        type="tel"
        placeholder="xxx-xxx-xxxxx"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={(e) => sendPhoneCode(e)}>Send Code</button>
      {codeSent ? (
        <div>
          <input
            placeholder="xxxxxx"
            value={code}
            onInput={(e) => maxInput(e)}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
      ) : null}
    </div>
  );
};
