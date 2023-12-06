import axiosConfig from "../config/AxiosConfig";

export class AxiosService {
  //below 5 methods are for user master
  //to create a user master.
  async createTheUserMaster(userMasterDto) {
    const message = await axiosConfig.post(`userMas/createUserMaster`, {
      ...userMasterDto,
    });
    return message;
  }

  //to read all the user masters
  async fetchAllUserMaster() {
    const listUserMas = await axiosConfig.get(`userMas/getAllUserMasters`);
    return listUserMas;
  }

  //to read one user master by it's id.
  async fetchOneUserMaster(id) {
    const oneUserMas = await axiosConfig.get(`userMas/getOneUserMaster/${id}`);
    return oneUserMas;
  }

  //to update one user master by it's id and the userMasterDto data.
  async updateOneUserMaster(id, userMasterDto) {
    const updatedUserMas = await axiosConfig.put(`userMas/updateUser/${id}`, {
      ...userMasterDto,
    });
    return updatedUserMas;
  }

  //to delete the user master by it's id.
  async deleteUserMaster(id) {
    const deleteUserMas = await axiosConfig.delete(
      `userMas/deleteUserMaster/${id}`
    );
    return deleteUserMas;
  }

  //below 3 methods are for user address
  //to create user master address by user master's id.
  async createUserMasAddress(id, userAddress) {
    const message = await axiosConfig.post(`userAdd/addUserAddress/${id}`, {
      ...userAddress,
    });
    return message;
  }

  //to read all the addresses of user master by user master's id.
  async fetchUserMasAddresses(id) {
    const listUMAdd = await axiosConfig.get(`userAdd/getUserAddressById/${id}`);
    return listUMAdd;
  }

  //to delete one user address by address id.
  async deleteOneAddress(id) {
    const message = await axiosConfig.delete(`userAdd/deleteAddressById/${id}`);
    return message;
  }
}
