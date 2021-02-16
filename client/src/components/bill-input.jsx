import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import "./bill-input.scss";

export default function BillInput() {
  const [isAutomaticChecked, setIsAutomaticChecked] = useState(false);
  const [textValue, setTextValue] = useState("");

  const queryClient = useQueryClient();

  const { isLoading, mutate: saveRecord } = useMutation(async (value) => {
    console.log({ value });
    const response = await fetch("/api/bill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ info: value }),
    });
    return response.json();
  });

  const handleTextChange = ({ target: { value } }) => {
    value = value.replace(/\s/g, "");
    console.log({ value }, value.length);
    if (value.length > 29 && isAutomaticChecked) {
      console.log("saving");
      saveRecord(value);
      // setTextValue("");
    } else if (value.length > 30 && !isAutomaticChecked) {
    } else {
      setTextValue(value);
    }
  };

  const handleSubmit = () => {
    saveRecord(textValue, { onSuccess: () => queryClient.invalidateQueries() });
  };
  return (
    <>
      <div>
        <input
          className="billInput"
          id="bill-input"
          name="bill-input"
          onChange={handleTextChange}
          type="text"
          value={textValue}
        />
      </div>
      <input
        defaultChecked={isAutomaticChecked}
        id="bill-input-automatic"
        name="bill-input-automatic"
        onChange={() => setIsAutomaticChecked(!isAutomaticChecked)}
        type="checkbox"
      />
      <label htmlFor="bill-input-automatic">Automático</label>
      <div>
        {isAutomaticChecked || (
          <input
            className="createBillButton"
            disabled={isLoading}
            type="button"
            value={isLoading ? "Agregando" : "Agrega recibo"}
            onClick={handleSubmit}
          />
        )}
      </div>
    </>
  );
}
