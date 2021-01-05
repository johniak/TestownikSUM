import * as React from "react";
import { Question, QuestionComponent } from "./Question";
import "./styles.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams
} from "react-router-dom";

import { Box, Button, CssBaseline, Link } from "@material-ui/core";
import { QuestionPage, QuestionPageProxy } from "./QuestionPage";
import { AllTestsPage } from "./AllTestsPage";
import { TestConfigPage } from "./TestConfigPage";
import { AllQuestionsPage } from "./AllQuestionsPage";

export function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/tests/:testId/questions/:questionId">
            <QuestionPageProxy />
          </Route>
          <Route path="/tests/:testId/questions">
            <AllQuestionsPage />
          </Route>
          <Route path="/tests/:testId">
            <TestConfigPage />
          </Route>

          <Route path="/">
            <AllTestsPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
