export const getAppDetailMock = jest.fn();
export const AppsClient = jest.fn().mockImplementation(() => {
  return {
    getAppDetail: getAppDetailMock,
  };
});
