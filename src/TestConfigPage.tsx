import * as React from "react";
import { Question, QuestionComponent } from "./Question";
import "./styles.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  useHistory,
  Link
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
import { AppBar } from "./AppBar";

const StyledPaper = styled(Paper)`
  && {
    padding: 16px;
  }
`;

const INCORECT_ANSWER_REPEATS_DEFAULT = 2;
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
export function TestConfigPage() {
  const { testId } = useParams();
  const test = tests.find((item) => item.id === testId);
  const [incorrectAnswerRepeats, setIncorrectAnswerRepeats] = useState(
    INCORECT_ANSWER_REPEATS_DEFAULT
  );
  const [questionsCount, setQuestionsCount] = useState(test.questions.length);
  const history = useHistory();
  const localStorageTestname = `test:${test.id}`;
  const localStorageTestJson = localStorage[localStorageTestname];
  let localStorageTest;
  if (localStorageTestJson) {
    localStorageTest = JSON.parse(localStorageTestJson);
  }
  const handleStart = () => {
    const questionIds = test?.questions.map((item) => item.id);
    const shuffledQuestionIds = shuffle(questionIds);
    const selectedQuestionIds = shuffledQuestionIds.slice(0, questionsCount);
    const newTest = {
      questionIds: selectedQuestionIds,
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
    // @ts-ignore
    history.push(`/tests/${test?.id}/questions/${questionId}`);
  };
  const handleContinue = () => {
    const questionIndex = Math.floor(
      Math.random() * localStorageTest.questionIds?.length
    );
    const questionId = localStorageTest.questionIds[questionIndex];
    // @ts-ignore
    history.push(`/tests/${test?.id}/questions/${questionId}`);
  };
  const marks = [];
  for (let i = 0; i < 10; i++) {
    marks.push({ value: i + 1, label: (i + 1).toString() });
  }

  return (
    <Box>
      <AppBar />
      <Box padding={4} style={{ marginTop: 60 }}>
        <StyledPaper>
          <Typography variant="h5" gutterBottom>
            {test?.title}
          </Typography>
          <Typography gutterBottom>Liczba pytań</Typography>
          <Slider
            defaultValue={test.questions.length}
            valueLabelDisplay="auto"
            step={10}
            color="secondary"
            value={questionsCount}
            // @ts-ignore
            onChange={(e, newValue) => setQuestionsCount(newValue)}
            min={Math.min(10, test.questions.length)}
            max={test.questions.length}
          />
          <Typography gutterBottom>
            Liczba powtórzeń błędnej odpowiedzi
          </Typography>
          <Slider
            defaultValue={INCORECT_ANSWER_REPEATS_DEFAULT}
            valueLabelDisplay="auto"
            step={1}
            marks={marks}
            // @ts-ignore
            onChange={(e, newValue) => setIncorrectAnswerRepeats(newValue)}
            min={1}
            value={incorrectAnswerRepeats}
            max={10}
          />
        </StyledPaper>
        <Box marginTop={2} display="flex" justifyContent="center">
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
    </Box>
  );
}
