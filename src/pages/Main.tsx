import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import Banks from "../components/Banks";
import { Button, Box } from "@material-ui/core";

const Main: React.FC<{}> = () => {
  return (
    <Layout>
      <Box mb={5}>
        <Button variant="contained" color="primary">
          <Link
            to="calculator"
            style={{ textDecoration: "none", color: "white" }}
          >
            Calculator
          </Link>
        </Button>
      </Box>
      <Banks />
    </Layout>
  );
};

export default Main;
