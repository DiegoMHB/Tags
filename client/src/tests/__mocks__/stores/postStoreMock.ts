import { PostStoreType } from "../../../zustand/postStore";


//mocked state
const initialState: PostStoreType = {
  loading: false,
  getPostById: jest.fn(),
  createActivePost: jest.fn(),
  getUserPosts: jest.fn(),
  deletePost: jest.fn(),
  closeActivePost: jest.fn(),
  editActivePost: jest.fn(),
};

//mocked jest.fn that retunrs mocked state
export const postStore = jest.fn(() => initialState);

//reseting mocks
export const resetPostStoreMock = () => {
  Object.values(initialState).forEach((v) => {
    if (typeof v === "function") {
      (v as jest.Mock).mockReset();
    }
  });
};
