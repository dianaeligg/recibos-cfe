import React from "react";
import "./places.scss";

export default function Places() {
  return (
    <div className="places">
      <input
        type="radio"
        id="pollos"
        name="place"
        value="pollos"
        defaultChecked={true}
      />
      <label htmlFor="pollos">Pollos</label>
      <input type="radio" id="casa" name="place" value="casa" />
      <label htmlFor="casa">Casa</label>
    </div>
  );
}
