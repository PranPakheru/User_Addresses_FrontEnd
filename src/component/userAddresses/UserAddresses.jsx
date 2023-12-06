import React, { useContext, useState } from "react";
import "./UserAddStyle.css";
import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { AxiosService } from "../../source/service/AxiosService";
import MyContext from "../../source/context/MyContext";
import AlarmIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";

const UserAddresses = () => {
  const axiosService = new AxiosService();
  const { addId } = useContext(MyContext);
  const [address, setAddress] = useState("");
  const [msg, setMsg] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const backPage = () => {
    navigate(`/UserMasterOperations`);
  };

  const handleClick = () => {
    const userAddress = {
      fullAddress: address,
    };
    setLoader(true);
    axiosService
      .createUserMasAddress(addId, userAddress)
      .then((response) => {
        setMsg("Address saved successfully.");
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setMsg("Something went wrong!");
        setLoader(false);
      });
  };

  return (
    <div className="master-background">
      <div id="inner-div">
        <Button variant="outlined" endIcon={<AlarmIcon />} onClick={backPage}>
          Back to first page
        </Button>
      </div>
      <div className="inner-bag">
        <TextField
          id="filled-multiline-static"
          label="Multiline"
          multiline
          rows={10}
          defaultValue="Default Value"
          variant="filled"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />

        <div id="inner-divs">
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

export default UserAddresses;
