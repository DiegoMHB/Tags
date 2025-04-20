import { render, screen } from "@testing-library/react";
import Landing from "../pages/Landing";


jest.mock("../zustand/appStore", () => ({
  appStore: () => ({
    allActivePosts: null,
    setMapRender: jest.fn(),
    getAllPosts: jest.fn(),
  }),
}));

jest.mock("../zustand/mapStore", () => ({
  mapStore: () => ({
    getCoords: jest.fn(),
  }),
}));

jest.mock("../zustand/userStore", () => ({
  userStore: () => ({
    logInAuto: jest.fn(),
    loggedOut: false,
  }),
}));

describe("Landing", () => {
  it("renderiza los tres botones correctamente", () => {
    render(<Landing />);

    expect(screen.getByText(/check around/i)).toBeInTheDocument();
    expect(screen.getByText(/log in/i)).toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });
});
