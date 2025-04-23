import { ChatStoreType } from "../../../zustand/chatStore";


//mocked state
const initialState: ChatStoreType = {
  loading: false,
  getChatById: jest.fn(),
  getAllChats: jest.fn(),
  createChat: jest.fn(),
  createMessage: jest.fn(),
};

//mocked jest.fn that retunrs mocked state
export const chatStore = jest.fn(() => initialState);

//reseting mocks
export const resetChatStoreMock = () => {
  Object.values(initialState).forEach((v) => {
    if (typeof v === "function") {
      (v as jest.Mock).mockReset();
    }
  });
};
