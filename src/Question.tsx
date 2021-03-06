import { Box, Paper, Typography } from "@material-ui/core";
import styled from "styled-components";
import * as React from "react";
import { shuffle } from "./utils";

export interface Question {
  title: string;
  answers: string[];
  question: string;
  correctAnswer: number;
  id: string;
}

const AnswearButton = styled.div`
  margin-bottom: 12px;
  border-radius: 4px;
  text-align: left;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background-color: ${({ state }) => {
    switch (state) {
      case "CORRECT":
        return "#009688";
      case "INCORRECT":
        return "#f44336";
      default:
        return "#ececec";
    }
  }};
  color: ${({ state }) => (state !== "DEFAULT" ? "#fff" : "#333")};
  &:hover {
    background-color: ${({ state }) => {
      switch (state) {
        case "CORRECT":
          return "#20b6a8";
        case "INCORRECT":
          return "#ff6356";
        default:
          return "#bcbcbc";
      }
    }};
  }
`;
const QuestionPaper = styled(Paper)``;

export interface QuestionComponentPropTypes {
  question: Question;
  selected: number;
  onSelected: (index: number) => {};
  shuffleAnswers: boolean;
}

export function QuestionComponent({
  question,
  selected,
  onSelected,
  shuffleAnswers = true
}: QuestionComponentPropTypes) {
  const letters = ["A", "B", "C", "D", "E"];
  let [answerOrder] = React.useState(() => {
    const range = [...Array(question.answers.length).keys()];
    if (shuffleAnswers) {
      return shuffle(range);
    }
    return range;
  });
  return (
    <QuestionPaper elevation={3} correct={selected === question.correctAnswer}>
      <Box padding={2}>
        <Box textAlign="left" paddingBottom={2}>
          <Typography
            variant="h6"
            component="h6"
            style={{ whiteSpace: "pre-line" }}
          >
            {question.question}
          </Typography>
        </Box>
        {answerOrder.map((index, letterIndex) => {
          const item = question.answers[index];
          let state = "DEFAULT";
          if (selected !== null && index === question.correctAnswer) {
            state = "CORRECT";
          } else if (selected !== null && selected === index) {
            state = "INCORRECT";
          }
          return (
            <AnswearButton
              state={state}
              onClick={() => selected != null || onSelected(index)}
              key={`answer:${index}:${question.id}`}
            >
              <Typography>
                {letters[letterIndex]}) {item}
              </Typography>
            </AnswearButton>
          );
        })}
      </Box>
    </QuestionPaper>
  );
}
