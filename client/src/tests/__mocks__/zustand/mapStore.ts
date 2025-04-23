export const mapStore = jest.fn(() => ({
    coordinates: [0, 0],
    loading: false,
    getCoords: jest.fn(),
  }));
  
  export const resetMapStoreMock = () => {
    const mockMapStore = mapStore();
    if (mockMapStore.getCoords && typeof mockMapStore.getCoords === "function") {
      mockMapStore.getCoords.mockReset();  // Reset the function
    }
  };