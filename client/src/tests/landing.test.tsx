
process.env.VITE_PORT = "4000";
process.env.VITE_FIREBASE_API = "mock-firebase-api";
jest.mock("../assets/firebase/firebase", () => ({}));

const mockStore = {
  allActivePosts: [],
  getAllPosts: jest.fn(),
};

jest.mock("../zustand/appStore", () => ({
  appStore: jest.fn(() => mockStore),
}));

jest.mock("../zustand/mapStore", () => ({
  mapStore: jest.fn(() => ({
    getCoords: jest.fn(),
  })),
}));

jest.mock("../zustand/userStore", () => ({
  userStore: jest.fn(() => ({
    logInAuto: jest.fn(),
    loggedOut: true,
  })),
}));

import Landing from "../pages/Landing";
import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";

beforeEach(() => {
  Object.defineProperty(global.navigator, "geolocation", {
    value: {
      getCurrentPosition: jest.fn().mockImplementation((success) =>
        success({
          coords: {
            latitude:0,
            longitude:0,
          },
        })
      ),
    },
    writable: true,
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Landing", () => {
  it("It shows 3 different buttons", () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );
    expect(screen.getByText("Check Around")).toBeInTheDocument();
    expect(screen.getByText("Log In")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("It calls getAllPosts if allActivePosts is empty", async () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(mockStore.getAllPosts).toHaveBeenCalled();
    });
  });
});
