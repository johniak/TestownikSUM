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
  Button,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from "@material-ui/core";
import { tests } from "./tests";
import SettingsIcon from "@material-ui/icons/Settings";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";

export function QuestionPage() {
  const { questionId, testId } = useParams();
  const test = tests.find((item) => item.id === testId);
  const question = test?.questions.find((item) => item.id === questionId);
  const history = useHistory();
  // @ts-ignore
  const [selected, setSelected]: [
    number,
    (index: number) => {}
  ] = React.useState(null);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const localStorageTestname = `test:${testId}`;
  const localStorageTestJson = localStorage[localStorageTestname];
  let localStorageTest;
  if (localStorageTestJson) {
    localStorageTest = JSON.parse(localStorageTestJson);
  }
  const handleSelectedAnswer = (selectedAnswer: number) => {
    setSelected(selectedAnswer);
    const correctAnswer = selectedAnswer === question?.correctAnswer;
    if (correctAnswer) {
      const index = localStorageTest.questionIds.indexOf(questionId);
      localStorageTest.questionIds = localStorageTest.questionIds.filter(
        (item) => item != null
      );
      console.log("localStorageTest.questionIds", localStorageTest.questionIds);
      localStorageTest.questionIds.splice(index, 1);
      localStorageTest.answers++;
      localStorageTest.correctAnswers++;
    } else {
      const index = localStorageTest.questionIds.indexOf(questionId);
      localStorageTest.questionIds.splice(index, 1);
      for (let i = 0; i < localStorageTest.incorrectAnswerRepeats; i++) {
        localStorageTest.questionIds.push(questionId);
      }
      localStorageTest.answers++;
      localStorageTest.incorrectAnswers++;
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
  if (nextQuestionId === null) {
    debugger;
  }
  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar style={{ backgroundColor: "#555" }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Box display="flex" alignItems="center">
              <IconButton
                component={Link}
                to={`/tests/${testId}`}
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <SettingsIcon />
              </IconButton>
              <Typography variant="h6">{test.title}</Typography>
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
            <Box display="flex" alignItems="center">
              <QuestionAnswerIcon />
              <Typography variant="h6">
                {localStorageTest.questionIds.length}
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box padding={4} style={{ marginTop: 60 }}>
        <QuestionComponent
          question={question as Question}
          selected={selected}
          // @ts-ignore
          onSelected={handleSelectedAnswer}
          showCorrectAnsewar={selected !== null}
        />
        <Box marginTop={2} display="flex" justifyContent="center">
          {hasNextQuestion && (
            <Button
              disabled={selected === null || nextQuestionId === null}
              component={Link}
              variant="contained"
              to={`/tests/${testId}/questions/${nextQuestionId}`}
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
                // @ts-ignore
                history.push(`/tests/${testId}`);
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

export function QuestionPageProxy() {
  const { questionId, testId } = useParams();
  return <QuestionPage key={`testId${testId}+questionId:${questionId}`} />;
}
