import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <h3 id="main-tag">Welcome to the Information Project</h3>
      <div className="two-elements">
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => navigate(`/UserMasterOperations`)}
        >
          Let's get started...
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
