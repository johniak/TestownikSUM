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

export function QuestionPage() {
  const { questionId } = useParams();
  const question = questions.find((item) => item.id === questionId);
  const [selected, setSelected]: [
    number,
    (index: number) => {}
  ] = React.useState(null);
  return (
    <Box padding={4}>
      <QuestionComponent
        question={question as Question}
        selected={selected}
        onSelected={setSelected}
        showCorrectAnsewar={selected !== undefined}
      />
      <Box marginTop={2} display="flex" justifyContent="center">
        <Button variant="contained" color="secondary">
          Previous
        </Button>
        <Box display="flex" marginLeft={2}>
          <Button component="a" variant="contained" href={questions}>
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
