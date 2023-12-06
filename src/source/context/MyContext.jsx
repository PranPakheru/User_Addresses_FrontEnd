import { createContext, useState } from "react";

const MyContext = createContext({
  user: {},
});

export const MyContextProvider = ({ children }) => {
  const [userMasterData, setUserMasterData] = useState({});
  const [editId, setEditId] = useState();
  const [oneUserData, setOneUserData] = useState(null);
  const [addId, setAddId] = useState();
  const [userName, setUserName] = useState("");
  const [userAddresses, setUserAddresses] = useState({});

  return (
    <MyContext.Provider
      value={{
        userMasterData,
        setUserMasterData,
        editId,
        setEditId,
        oneUserData,
        setOneUserData,
        addId,
        setAddId,
        userName,
        setUserName,
        userAddresses,
        setUserAddresses,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
