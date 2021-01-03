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
  Button,
  CssBaseline,
  Link,
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from "@material-ui/core";
import { tests } from "./tests";
import SettingsIcon from "@material-ui/icons/Settings";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

export function QuestionPage() {
  const { questionId, testId } = useParams();
  const question = tests
    .find((item) => item.id === testId)
    ?.questions.find((item) => item.id === questionId);
  const [selected, setSelected]: [
    number,
    (index: number) => {}
  ] = React.useState(null);
  const localStorageTestname = `test:${testId}`;
  const localStorageTestJson = localStorage[localStorageTestname];
  let localStorageTest;
  if (localStorageTestJson) {
    localStorageTest = JSON.parse(localStorageTestJson);
  }
  const handleSelectedAnswer = (selectedAnswer: number) => {
    setSelected(selectedAnswer);
    const correctAnswer = selectedAnswer === question?.correctAnswear;
    if (correctAnswer) {
      const index = localStorageTest.questionIds.indexOf(questionId);
      localStorageTest.questionIds.splice(index, 1);
      localStorageTest.answers++;
      localStorageTest.correctAnswers++;
    } else {
      const index = localStorageTest.questionIds.indexOf(questionId);
      localStorageTest.questionIds.splice(index, 1);
      for (let i = 0; i < localStorageTest.incorrectAnswerRepeats; i++) {
        localStorageTest.questionIds.push(questionId);
        localStorageTest.answers++;
      }
    }
    localStorage[localStorageTestname] = JSON.stringify(localStorageTest);
  };

  const nextQuestionIndex = Math.floor(
    Math.random() * localStorageTest.questionIds?.length
  );
  const hasNextQuestion = !!localStorageTest.questionIds.length;
  let nextQuestionId;
  if (hasNextQuestion) {
    nextQuestionId = localStorageTest.questionIds[nextQuestionIndex];
  }
  return (
    <Box>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "#555" }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Box display="flex" alignItems="center">
              <IconButton
                component="a"
                href={`/tests/${testId}`}
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <SettingsIcon />
              </IconButton>
              <Typography variant="h6">Gineksy</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Box display="flex" alignItems="center">
                <CheckIcon style={{ color: "#81c784" }} />
                <Typography variant="h6" style={{ color: "#81c784" }}>
                  {localStorageTest.correctAnswers}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" marginLeft={2}>
                <CloseIcon style={{ color: "#e57373" }} />
                <Typography variant="h6" style={{ color: "#e57373" }}>
                  {localStorageTest.incorrectAnswers}
                </Typography>
              </Box>
            </Box>
            <Box marginLeft={1}>
              <Typography variant="h6">
                Pozostało pytań:&nbsp;
                {localStorageTest.questionIds.length}
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box padding={4}>
        <QuestionComponent
          question={question as Question}
          selected={selected}
          onSelected={handleSelectedAnswer}
          showCorrectAnsewar={selected !== undefined}
        />
        <Box marginTop={2} display="flex" justifyContent="center">
          {hasNextQuestion && (
            <Button
              disabled={selected === null}
              component="a"
              variant="contained"
              href={`/tests/${testId}/questions/${nextQuestionId}`}
            >
              Następne Pytanie
            </Button>
          )}
          {hasNextQuestion || (
            <Button
              disabled={selected === null}
              variant="contained"
              color="secondary"
              onClick={() => {
                localStorage.removeItem(localStorageTestname);
                window.location = `/tests/${testId}`;
              }}
            >
              Zakończ
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
