import { MapStoreType } from "../../../zustand/mapStore";

//mocked state
const initialState: MapStoreType = {
  coordinates: [0, 0],
  loading: false,
  getCoords: jest.fn(),
};

//mocked jest.fn that retunrs mocked state
export const mapStore = jest.fn(() => initialState);

//reseting mocks
export const resetMapStoreMock = () => {
  Object.values(initialState).forEach((v) => {
    if (typeof v === "function") {
      (v as jest.Mock).mockReset();
    }
  });
};
