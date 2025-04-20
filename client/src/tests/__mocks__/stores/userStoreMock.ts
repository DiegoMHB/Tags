import {UserStoreType } from "../../../zustand/userStore";

//mocked state
const initialState: UserStoreType = {
     user:null,
     auth: false,
     loading: false,
     firebaseUid: "",
     loggedOut: false,
 
     signIn: jest.fn(),
     logIn:  jest.fn(),
     logInAuto:  jest.fn(),
     logOut: jest.fn(),
     setUid:  jest.fn(),
};

//mocked jest.fn that retunrs mocked state
export const appStore = jest.fn(() => initialState);

//reseting mocks
export const resetAppStoreMock = () => {
  Object.values(initialState).forEach((v) => {
    if (typeof v === "function") {
      (v as jest.Mock).mockReset();
    }
  });
};
