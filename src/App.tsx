import * as React from "react";
import { Question, QuestionComponent } from "./Question";
import "./styles.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams
} from "react-router-dom";

import questions from "../data/gineksy.json";
import { Box, Button, CssBaseline, Link } from "@material-ui/core";
import { QuestionPage } from "./QuestionPage";

export function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/question/:questionId">
            <QuestionPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
