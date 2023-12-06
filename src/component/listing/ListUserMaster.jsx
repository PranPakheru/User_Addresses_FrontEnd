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
import EditIcon from "@mui/icons-material/Edit";
import { AxiosService } from "../../source/service/AxiosService";
import { useNavigate } from "react-router-dom";
import AlarmIcon from "@mui/icons-material/Send";

const ListUserMaster = () => {
  const axiosService = new AxiosService();
  const {
    userMasterData,
    setEditId,
    setOneUserData,
    setUserMasterData,
    setUserName,
    setUserAddresses,
  } = useContext(MyContext);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const backPage = () => {
    navigate(`/UserMasterOperations`);
  };

  const handleDelete = (id) => {
    setLoader(true);

    axiosService
      .deleteUserMaster(id)
      .then((response) => {
        if (response) {
          alert("User Master deleted seccessfully.");

          setLoader(false);
        }
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };

  const handleEdit = (id) => {
    setEditId(id);

    setLoader(true);
    axiosService
      .fetchOneUserMaster(id)
      .then((response) => {
        if (response) {
          setOneUserData(response.data);
          setLoader(false);
          navigate(`/UpdateUserMaster`);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };

  const handleAdd = (id) => {
    setAddId(id);
    navigate(`/addUserAddress`);
  };

  useEffect(() => {
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
  }, [userMasterData]);

  const handleAllAddresses = (id, name) => {
    setAddId(id);
    setUserName(name);
    axiosService
      .fetchUserMasAddresses(id)
      .then((response) => {
        setUserAddresses(response.data);
        navigate(`/getAllAddresses`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                <TableCell align="right">Password</TableCell>
                <TableCell align="right">Mobile Number</TableCell>
                <TableCell align="right">Date of Registration</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Action</TableCell>
                <TableCell align="right">Add address</TableCell>
                <TableCell align="right">Get all addresses</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loader ? (
                <h2>wait</h2>
              ) : (
                <>
                  {!loader &&
                    userMasterData &&
                    userMasterData.length > 0 &&
                    userMasterData.map((data) => (
                      <TableRow
                        key={data.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {data.name}
                        </TableCell>
                        <TableCell align="right">{data.password}</TableCell>
                        <TableCell align="right">{data.mobileNumber}</TableCell>
                        <TableCell align="right">
                          {data.dateOfRegistration}
                        </TableCell>
                        <TableCell align="right">{data.status}</TableCell>
                        <TableCell align="right">
                          <div>
                            <IconButton
                              aria-label="delete"
                              onClick={() => handleDelete(data.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              onClick={() => handleEdit(data.id)}
                            >
                              <EditIcon />
                            </IconButton>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleAdd(data.id)}
                          >
                            Add
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() =>
                              handleAllAddresses(data.id, data.name)
                            }
                          >
                            Get
                          </Button>
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

export default ListUserMaster;
