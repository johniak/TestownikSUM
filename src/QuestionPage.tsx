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
import styled from "styled-components";
import SettingsIcon from "@material-ui/icons/Settings";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import { getRandomInt } from "./utils";

const ButtonContainer = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  @media (max-width: 900px) {
    & {
      margin-right: 0;
      margin-top: 16px;
      flex-direction: column-reverse;
    }
  }
`;
const NextButtonContainer = styled.div`
  margin-left: 12px;
  margin-top: 0px;
  @media (max-width: 900px) {
    && {
      width: 100%;
      margin-left: 0;
      margin-bottom: 16px;
    }
  }
`;

function addQuestionInTheFuture(localStorageTest, questionId) {
  for (let i = 0; i < localStorageTest.incorrectAnswerRepeats; i++) {
    const questionsLength = localStorageTest.questionIds.length;
    let min = Math.min(5, questionsLength);
    let max = Math.min(20, questionsLength);
    if (questionsLength < 10) {
      min = Math.min(1, questionsLength);
    }
    const newIndex = getRandomInt(min, max);
    localStorageTest.questionIds.splice(newIndex, 0, questionId);
  }
}

export function QuestionPage() {
  const { questionId, testId } = useParams();
  const test = tests.find((item) => item.id === testId);
  console.log("test", test);
  console.log("test?.questions", test?.questions);
  const question = test?.questions.find((item) => item.id === questionId);
  const history = useHistory();
  const [canRepeatQuestion, setCanRepeatQuestion] = React.useState(true);
  const [selected, setSelected]: [
    number | null,
    (index: number | null) => {}
  ] = React.useState(null) as [number | null, (index: number | null) => {}];
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const localStorageTestname = `test:${testId}`;
  const localStorageTestJson = localStorage[localStorageTestname];
  let localStorageTest;
  if (localStorageTestJson) {
    localStorageTest = JSON.parse(localStorageTestJson);
  }
  const handleRepeatQuestion = () => {
    addQuestionInTheFuture(localStorageTest, questionId);
    localStorage[localStorageTestname] = JSON.stringify(localStorageTest);
    setCanRepeatQuestion(false);
  };
  const handleSelectedAnswer = (selectedAnswer: number) => {
    setSelected(selectedAnswer);
    const correctAnswer = selectedAnswer === question?.correctAnswer;
    if (correctAnswer) {
      const index = localStorageTest.questionIds.indexOf(questionId);
      localStorageTest.questionIds = localStorageTest.questionIds.filter(
        (item) => item != null
      );
      localStorageTest.questionIds.splice(index, 1);
      localStorageTest.correctAnswers++;
    } else {
      const index = localStorageTest.questionIds.indexOf(questionId);
      localStorageTest.questionIds.splice(index, 1);
      addQuestionInTheFuture(localStorageTest, questionId);
      localStorageTest.incorrectAnswers++;
    }
    localStorageTest.answers++;
    localStorage[localStorageTestname] = JSON.stringify(localStorageTest);
  };

  const hasNextQuestion = !!localStorageTest.questionIds.length;
  let nextQuestionId;
  if (hasNextQuestion) {
    nextQuestionId = localStorageTest.questionIds[0];
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
          shuffleAnswers={localStorageTest.shuffleAnswers}
          // @ts-ignore
          onSelected={handleSelectedAnswer}
          showCorrectAnsewar={selected !== null}
        />
        <ButtonContainer>
          <Button
            disabled={selected !== question.correctAnswer || !canRepeatQuestion}
            onClick={handleRepeatQuestion}
            variant="outlined"
          >
            Powtórz Pytanie w przyszłości
          </Button>
          <NextButtonContainer>
            {hasNextQuestion && (
              <Button
                disabled={selected === null || nextQuestionId === null}
                component={Link}
                fullWidth
                variant="contained"
                to={`/tests/${testId}/questions/${nextQuestionId}#${localStorageTest.answers}`}
              >
                Następne Pytanie
              </Button>
            )}
            {hasNextQuestion || (
              <Button
                disabled={selected === null}
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => {
                  localStorage.removeItem(localStorageTestname);
                  // @ts-ignore
                  history.push(`/tests/${testId}`);
                }}
              >
                Zakończ
              </Button>
            )}
          </NextButtonContainer>
        </ButtonContainer>
      </Box>
    </Box>
  );
}

export function QuestionPageProxy() {
  const { questionId, testId } = useParams();
  return (
    <QuestionPage
      key={`testId${testId}+questionId:${questionId}+${window.location.hash}`}
    />
  );
}
