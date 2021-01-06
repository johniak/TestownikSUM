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
import styled from "styled-components";

const List = styled.ul`
  list-style: none;
  padding: 0px 20px;
`;

const ListItem = styled.li`
  padding: 10px 0px;
  font-weight: ${({ correct }) => (correct ? "900" : "400")};
`;

function PrintableQuestion({ question }: { question: Question }) {
  const letters = ["A", "B", "C", "D", "E"];
  return (
    <Box>
      <Typography variant="h6" style={{ textAlign: "center" }}>
        {question.title}
      </Typography>
      <Box style={{ whiteSpace: "pre-line" }}>{question.question}</Box>

      <List>
        {question.answers.map((item, index) => (
          <ListItem
            key={`aswerprintable${question.id}:${index}`}
            correct={index === question.correctAnswer}
          >
            <strong>{letters[index]})</strong> {item}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export function AllQuestionsPage() {
  const { testId } = useParams();
  const test = tests.find((item) => item.id === testId);
  return (
    <Box padding={4}>
      {test.questions.map((item) => (
        <PrintableQuestion
          key={`questionprintable${testId}:${item.id}`}
          question={item as Question}
        />
      ))}
    </Box>
  );
}
