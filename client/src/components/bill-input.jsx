import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function BillInput() {
  const [isAutomaticChecked, setIsAutomaticChecked] = useState(false);
  const [textValue, setTextValue] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation(async (data) => {
    console.log({ data });
    const response = await fetch("/api/bill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ info: "01 977850700064 210129 000000232 1" }),
    });
    return response.json();
  });

  const handleTextChange = ({ target: { value } }) => {
    if (value.length > 10 && isAutomaticChecked) {
      setTextValue("");
    } else if (value.length > 10 && !isAutomaticChecked) {
    } else {
      setTextValue(value);
    }
  };

  const handleSubmit = () => {
    mutation.mutate(
      { id: "value" },
      { onSuccess: () => queryClient.invalidateQueries() }
    );
  };
  return (
    <>
      <pre>{JSON.stringify(mutation.data, null, 2)} </pre>
      <input
        type="text"
        id="bill-input"
        name="bill-input"
        onChange={handleTextChange}
        value={textValue}
      />
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
          <input type="button" value="Agrega recibo" onClick={handleSubmit} />
        )}
      </div>
    </>
  );
}
