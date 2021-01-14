import * as React from "react";
import { Question, QuestionComponent } from "./Question";
import "./styles.css";
import {
  BrowserRouter as Router,
  Route,
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
  FormHelperText,
  Switch,
  FormControlLabel
} from "@material-ui/core";
import styled from "styled-components";
import { tests } from "./tests";
import { useState } from "react";
import { AppBar } from "./AppBar";
import { shuffle } from "./utils";

const StyledPaper = styled(Paper)`
  && {
    padding: 16px;
  }
`;

const INCORECT_ANSWER_REPEATS_DEFAULT = 2;

export function TestConfigPage() {
  const { testId } = useParams();
  const test = tests.find((item) => item.id === testId);
  const [incorrectAnswerRepeats, setIncorrectAnswerRepeats] = useState(
    INCORECT_ANSWER_REPEATS_DEFAULT
  );
  const [questionsRange, setQuestionsRange] = useState([
    0,
    test.questions.length
  ]);
  const [questionsCount, setQuestionsCount] = useState(test.questions.length);
  const [shuffleAnswers, setShuffleAnswers] = useState(false);
  const history = useHistory();
  const localStorageTestname = `test:${test.id}`;
  const localStorageTestJson = localStorage[localStorageTestname];
  let localStorageTest;
  if (localStorageTestJson) {
    localStorageTest = JSON.parse(localStorageTestJson);
  }
  const handleStart = () => {
    let questionIds = test?.questions.map((item) => item.id);
    questionIds = questionIds.slice(questionsRange[0], questionsRange[1]);
    const shuffledQuestionIds = shuffle(questionIds);
    const selectedQuestionIds = shuffledQuestionIds.slice(0, questionsCount);
    const newTest = {
      questionIds: selectedQuestionIds,
      incorrectAnswerRepeats,
      shuffleAnswers,
      correctAnswers: 0,
      incorrectAnswers: 0,
      answers: 0
    };
    localStorage[localStorageTestname] = JSON.stringify(newTest);
    const questionId = newTest.questionIds[0];
    // @ts-ignore
    history.push(`/tests/${test?.id}/questions/${questionId}`);
  };
  const handleContinue = () => {
    const questionId = localStorageTest.questionIds[0];
    // @ts-ignore
    history.push(`/tests/${test?.id}/questions/${questionId}`);
  };
  const marks = [];
  for (let i = 0; i < 11; i++) {
    marks.push({ value: i, label: i.toString() });
  }
  const repeatsHelper = incorrectAnswerRepeats
    ? `(Po udzieleniu błędnej odpowiedzi na pytanie pojawi się ono jeszcze
  ${incorrectAnswerRepeats} razy w trakcie rozwiązywania testu)`
    : `(Po udzieleniu błędnej odpowiedzi na pytanie nie pojawi się ono więcej w trakcie rozwiązywania testu)`;

  return (
    <Box>
      <AppBar />
      <Box padding={4} style={{ marginTop: 60 }}>
        <StyledPaper>
          <Typography variant="h5" gutterBottom>
            {test?.title}
          </Typography>
          <Typography gutterBottom>Zakres pytań</Typography>
          <Slider
            defaultValue={test.questions.length}
            valueLabelDisplay="auto"
            step={10}
            value={questionsRange}
            onChange={(e, newValue) => {
              const length = newValue[1] - newValue[0];
              if (length >= 10) {
                // @ts-ignore
                setQuestionsRange(newValue);
              }

              if (
                length < questionsCount ||
                questionsCount === questionsRange[1] - questionsRange[0]
              ) {
                // @ts-ignore
                setQuestionsCount(length);
              }
            }}
            min={Math.min(0, test.questions.length)}
            max={test.questions.length}
          />
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
            max={questionsRange[1] - questionsRange[0]}
          />
          <Typography gutterBottom>
            Liczba powtórzeń pytania z błędną odpowiedzią
          </Typography>
          <Typography gutterBottom style={{ fontSize: 12 }}>
            {repeatsHelper}
          </Typography>
          <Slider
            defaultValue={INCORECT_ANSWER_REPEATS_DEFAULT}
            valueLabelDisplay="auto"
            step={1}
            marks={marks}
            // @ts-ignore
            onChange={(e, newValue) => setIncorrectAnswerRepeats(newValue)}
            min={0}
            value={incorrectAnswerRepeats}
            max={10}
          />
          <FormControlLabel
            control={
              <Switch
                checked={shuffleAnswers}
                onChange={(event) => {
                  setShuffleAnswers(event.target.checked);
                }}
              />
            }
            label="Losowa kolejność odpowiedzi"
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
