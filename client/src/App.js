import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./pages/main";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Main} />
    </Router>
  );
}

export default App;
