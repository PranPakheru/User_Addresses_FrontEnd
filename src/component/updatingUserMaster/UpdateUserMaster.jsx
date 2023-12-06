import React, { useContext, useEffect, useState } from "react";
import "../userMaster/UserMasOprStyle.css";
import MyContext from "../../source/context/MyContext";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import SendIcon from "@mui/icons-material/Send";
import AlarmIcon from "@mui/icons-material/Send";
import { AxiosService } from "../../source/service/AxiosService";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";

const UpdateUserMaster = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState(0);
  const [newDate, setNewDate] = useState("");
  const [status, setStatus] = useState("");

  const { oneUserData, setUserMasterData } = useContext(MyContext);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const axiosService = new AxiosService();

  useEffect(() => {
    if (oneUserData) {
      setName(oneUserData.name || "");
      setPassword(oneUserData.password || "");
      setMobile(oneUserData.mobileNumber || 0);

      setStatus(oneUserData.status || "");
    }
  }, [oneUserData]);

  const handleGet = () => {
    axiosService
      .fetchAllUserMaster()
      .then((response) => {
        if (response) {
          setUserMasterData(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    navigate(`/listUserMaster`);
  };

  const handleClick = () => {
    const updatedUserMasterDto = {
      id: oneUserData.id,
      name: name,
      password: password,
      mobileNumber: parseInt(mobile),
      dateOfRegistration: newDate.toString(),
      status: status,
    };

    axiosService
      .updateOneUserMaster(updatedUserMasterDto.id, updatedUserMasterDto)
      .then((response) => {
        setMsg("User updated successfully.");
      })
      .catch((error) => {
        console.log(error);
        setMsg("Something went wrong!");
      });
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
          <h2 style={{ fontWeight: "200" }}>Edit User Master</h2>
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
                  setNewDate(formattedDate);
                }}
                value={newDate}
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
          {msg && msg.length > 0 && (
            <div id="inner-divs">
              <h2>{msg}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateUserMaster;
