// simulated functions:
export const mockGetCoords = jest.fn()
export const mockGetAllPosts = jest.fn()
export const mockSetMapRender = jest.fn()
export const mockLogInAuto = jest.fn()


//simulated stores:
export const mockAppStore = {
    allActivePosts: null,
    getAllPosts: mockGetAllPosts,
    setMapRender: mockSetMapRender,
};


//Zustand modules mocks:
jest.mock("../../zustand/appStore", () => ({
    appStore: mockAppStore
}))