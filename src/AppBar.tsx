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
  Toolbar,
  AppBar as MaterialAppBar
} from "@material-ui/core";
import styled from "styled-components";
import { tests } from "./tests";
import { useState } from "react";
import AccessibleForwardIcon from "@material-ui/icons/AccessibleForward";

export function AppBar() {
  return (
    <MaterialAppBar position="static">
      <Toolbar style={{ backgroundColor: "#555" }}>
        <Typography variant="h6" style={{ color: "#e57373" }}>
          <Button component={Link} to="/" style={{ color: "#fff" }}>
            <AccessibleForwardIcon /> TESTOWNIK SIUM
          </Button>
        </Typography>
      </Toolbar>
    </MaterialAppBar>
  );
}
