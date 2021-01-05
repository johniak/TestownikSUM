import * as React from "react";
import { Question, QuestionComponent } from "./Question";
import "./styles.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  Link,
  useHistory
} from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Slider,
  Button,
  FormHelperText,
  CardActions,
  CardContent,
  Card,
  Grid,
  Toolbar
} from "@material-ui/core";
import styled from "styled-components";
import { tests } from "./tests";
import { useState } from "react";
import AccessibleForwardIcon from "@material-ui/icons/AccessibleForward";
import { AppBar } from "./AppBar";

const StyledCard = styled(Card)`
  && {
    margin-right: 16px;
    margin-top: 0;
  }
  @media (max-width: 900px) {
    && {
      width: 100%;
      margin-right: 0;
      margin-top: 16px;
    }
  }
`;

const INCORECT_ANSWER_REPEATS_DEFAULT = 2;

export function AllTestsPage() {
  return (
    <Box>
      <AppBar />
      <Box
        padding={4}
        style={{ marginTop: 60 }}
        display="flex"
        flexWrap="wrap"
        flexDirection="row"
      >
        {tests.map((test) => {
          return (
            <StyledCard>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {test.title}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  to={`/tests/${test.id}`}
                  size="small"
                  variant="contained"
                  color="primary"
                >
                  Otwórz
                </Button>
                <Button
                  component={Link}
                  to={`/tests/${test.id}/questions`}
                  size="small"
                  variant="outlined"
                  color="primary"
                >
                  Pytania do druku
                </Button>
              </CardActions>
            </StyledCard>
          );
        })}
      </Box>
    </Box>
  );
}
