import * as React from "react";
import { Question, QuestionComponent } from "./Question";
import "./styles.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams
} from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Slider,
  Button,
  FormHelperText
} from "@material-ui/core";
import styled from "styled-components";
import { tests } from "./tests";
import { useState } from "react";

const StyledPaper = styled(Paper)`
  && {
    padding: 16px;
  }
`;

const INCORECT_ANSWER_REPEATS_DEFAULT = 2;

export function TestConfigPage() {
  const { questionId, testId } = useParams();
  const test = tests.find((item) => item.id === testId);
  const [incorrectAnswerRepeats, setIncorrectAnswerRepeats] = useState(
    INCORECT_ANSWER_REPEATS_DEFAULT
  );
  const localStorageTestname = `test:${test.id}`;
  const handleReset = () => {
    setIncorrectAnswerRepeats(INCORECT_ANSWER_REPEATS_DEFAULT);
  };
  const localStorageTestJson = localStorage[localStorageTestname];
  let localStorageTest;
  if (localStorageTestJson) {
    localStorageTest = JSON.parse(localStorageTestJson);
  }
  const handleStart = () => {
    const newTest = {
      questionIds: test?.questions.map((item) => item.id),
      incorrectAnswerRepeats,
      correctAnswers: 0,
      incorrectAnswers: 0,
      answers: 0
    };
    localStorage[localStorageTestname] = JSON.stringify(newTest);
    const questionIndex = Math.floor(
      Math.random() * newTest.questionIds?.length
    );
    const questionId = newTest.questionIds[questionIndex];
    window.location = `/tests/${test?.id}/questions/${questionId}`;
  };
  const handleContinue = () => {
    const questionIndex = Math.floor(
      Math.random() * localStorageTest.questionIds?.length
    );
    const questionId = localStorageTest.questionIds[questionIndex];
    window.location = `/tests/${test?.id}/questions/${questionId}`;
  };
  const marks = [];
  for (let i = 0; i < 10; i++) {
    marks.push({ value: i + 1, label: (i + 1).toString() });
  }

  return (
    <Box padding={4}>
      <StyledPaper>
        <Typography variant="h5" gutterBottom>
          {test?.title}
        </Typography>
        <Typography gutterBottom>
          Liczba Powtórzeń błędnej odpowiedzi
        </Typography>
        <Slider
          defaultValue={INCORECT_ANSWER_REPEATS_DEFAULT}
          valueLabelDisplay="auto"
          step={1}
          marks={marks}
          onChange={(e, newValue) => setIncorrectAnswerRepeats(newValue)}
          min={1}
          value={incorrectAnswerRepeats}
          max={10}
        />
      </StyledPaper>
      <Box marginTop={2} display="flex" justifyContent="center">
        <Button variant="contained" color="secondary" onClick={handleReset}>
          Reset
        </Button>
        {localStorageTest && (
          <Box display="flex" marginLeft={2}>
            <Button variant="contained" onClick={handleContinue}>
              Kontynuuj naukę
            </Button>
          </Box>
        )}

        <Box display="flex" marginLeft={2}>
          <Button color="primary" variant="contained" onClick={handleStart}>
            Start
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
