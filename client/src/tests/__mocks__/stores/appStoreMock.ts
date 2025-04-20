import { AppStoreType } from "../../../zustand/appStore";

//mocked state
const initialState: AppStoreType = {
  error: "",
  loading: false,

  selectedFile: null,
  mapRender: false,
  fotoUrl: "",

  authUserActivePost: null,
  authUserPostsList: [],
  allActivePosts: [],
  allChats: [],

  selectedUser: null,
  selectedPost: null,
  selectedChat: null,

  setMapRender: jest.fn(),
  setFotoUrl: jest.fn(),
  setSelectedFile: jest.fn(),

  deselectUser: jest.fn(),
  deselectPost: jest.fn(),
  deselectChat: jest.fn(),
  resetSelected: jest.fn(),

  setSelectedPost: jest.fn(),
  getAllPosts: jest.fn(),
  getUserById: jest.fn(),
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
