import React, { useContext, useEffect, useState } from "react";
import "./ListUserMasStyle.css";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import MyContext from "../../source/context/MyContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { AxiosService } from "../../source/service/AxiosService";
import { useNavigate } from "react-router-dom";

import AlarmIcon from "@mui/icons-material/Send";

const ListAllUserAddresses = () => {
  const { userName, addId, userAddresses, setUserAddresses } =
    useContext(MyContext);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const axiosService = new AxiosService();

  const backPage = () => {
    navigate(`/UserMasterOperations`);
  };

  const handleDelete = (id) => {
    setLoader(true);

    axiosService
      .deleteOneAddress(id)
      .then((response) => {
        alert("addresses deleted successfully.");
        setLoader(false);
      })
      .catch((error) => {
        alert("something went wrong!");
        setLoader(false);
      });
  };

  useEffect(() => {
    axiosService
      .fetchUserMasAddresses(addId)
      .then((response) => {
        setUserAddresses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userAddresses]);

  return (
    <div className="master-bag">
      <div id="inner-div">
        <Button variant="outlined" endIcon={<AlarmIcon />} onClick={backPage}>
          Back to first page
        </Button>
      </div>

      <div className="list-data">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Addresses</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loader ? (
                <h2>wait</h2>
              ) : (
                <>
                  {!loader &&
                    userAddresses &&
                    userAddresses.length > 0 &&
                    userAddresses.map((data) => (
                      <TableRow
                        key={data.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {userName}
                        </TableCell>
                        <TableCell align="right">{data.fullAddress}</TableCell>
                        <TableCell align="right">
                          <div>
                            <IconButton
                              aria-label="delete"
                              onClick={() => handleDelete(data.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ListAllUserAddresses;
