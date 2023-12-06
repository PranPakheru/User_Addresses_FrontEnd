import React, { useContext, useEffect, useState } from "react";
import "./UserMasOprStyle.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SendIcon from "@mui/icons-material/Send";
import AlarmIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import { AxiosService } from "../../source/service/AxiosService";
import MyContext from "../../source/context/MyContext";

const UserMasterOperations = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState(0);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
  const { setUserMasterData } = useContext(MyContext);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const axiosService = new AxiosService();

  const handleClick = () => {
    const newUserMasterDto = {
      name: name,
      password: password,
      mobileNumber: parseInt(mobile),
      dateOfRegistration: date.toString(),
      status: status,
    };

    setLoader(true);

    axiosService
      .createTheUserMaster(newUserMasterDto)
      .then((response) => {
        setMsg(response.data);

        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
        setMsg("something went wrong!");
      });
  };

  const handleGet = () => {
    setLoader(true);
    axiosService
      .fetchAllUserMaster()
      .then((response) => {
        if (response) {
          setUserMasterData(response.data);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
    navigate(`/listUserMaster`);
  };

  return (
    <div className="master-background">
      <div id="inner-divs">
        <Button variant="outlined" endIcon={<AlarmIcon />} onClick={handleGet}>
          Get all users
        </Button>
      </div>
      <div className="inner-back">
        <div id="inner-divs">
          <h2 style={{ fontWeight: "200" }}>Add User Master</h2>
        </div>
        <div id="inner-divs">
          <TextField
            fullWidth
            label="Full Name"
            id="fullWidth"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div id="inner-divs">
          <TextField
            fullWidth
            label="Password"
            type="password"
            id="fullWidth"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div id="inner-divs">
          <TextField
            fullWidth
            label="Mobile Number"
            type="number"
            id="fullWidth"
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
          />
        </div>
        <div id="inner-divs">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Date of Registration"
                onChange={(date) => {
                  const formattedDate = date.format("YYYY-MM-DD");
                  setDate(formattedDate);
                }}
                value={date}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div id="inner-divs">
          <FormControl fullWidth>
            <InputLabel id="status">Status</InputLabel>
            <Select
              labelId="status"
              id="status"
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"single"}>Single</MenuItem>
              <MenuItem value={"married"}>Married</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div id="inner-div">
          <Button
            variant="primary"
            startIcon={<SendIcon />}
            onClick={handleClick}
          >
            Save
          </Button>
        </div>
        <div>
          {!loader && msg && msg.length > 0 ? (
            <div id="inner-divs">
              <h2>{msg}</h2>
            </div>
          ) : (
            <div id="inner-divs">
              <h2>{msg}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserMasterOperations;
