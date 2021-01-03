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

const StyledPaper = styled(Paper)`
  && {
    padding: 16px;
  }
`;

const INCORECT_ANSWER_REPEATS_DEFAULT = 2;

export function AllTestsPage() {
  const test = tests[0];
  return (
    <Box>
      <AppBar />
      <Box padding={4}>
        <Grid container spacing={6}>
          <Grid item xs={4}>
            <Card>
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
                  variant="outlined"
                  color="primary"
                >
                  Otwórz
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
