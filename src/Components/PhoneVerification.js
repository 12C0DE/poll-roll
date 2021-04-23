import React, { useState } from "react";

export const PhoneVerification = () => {
  const [codeSent, setCodeSent] = useState(false);

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
      <input type="tel" placeholder="xxx-xxx-xxxxx" />
      <button onClick={(e) => sendPhoneCode(e)}>Send Code</button>
      {codeSent ? (
        <div>
          <input placeholder="xxxxxx" onInput={(e) => maxInput(e)} />
          <button>Verify</button>
        </div>
      ) : null}
    </div>
  );
};
