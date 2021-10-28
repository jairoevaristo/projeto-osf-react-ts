import { AxiosInstance, AxiosRequestConfig } from 'axios';
import apiMocks, { AxiosMock } from '../mocks/apiMock';

const LOADING_TIME = 1000;
const mocks: { [key: string]: Partial<AxiosMock> } = {};
function addMock({ url, method, data, status = 200 }: AxiosMock) {
  mocks[`${url}${method}`] = { status, data };
}
const isUrlMocked = (url: string) => url in mocks;
const getMockError = (config: AxiosRequestConfig) => {
  const mockError = {
    mockData: mocks[`${config.url}${config.method}`],
    config,
  };
  return new Promise<AxiosRequestConfig>((_, reject) =>
    setTimeout(() => reject(mockError), LOADING_TIME),
  );
};
const isMockError = (error: { mockData: any }) => Boolean(error.mockData);
const getMockResponse = (mockError: {
  mockData: AxiosMock;
  config: AxiosRequestConfig;
}) => {
  const { mockData, config } = mockError;
  // Handle mocked error (any non-2xx status code)
  if (mockData.status && String(mockData.status)[0] !== '2') {
    const err = new Error(mockData.message || 'mock error');
    return Promise.reject(err);
  }
  // Handle mocked success
  return Promise.resolve({
    statusText: 'OK',
    headers: {},
    config,
    isMock: true,
    ...mockData,
  });
};
export default function registrarAxiosMocks(api: AxiosInstance) {
    apiMocks.filter(mock => mock.active).forEach(mock => addMock(mock));
    api.interceptors.request.use(
      config => {
        if (isUrlMocked(`${config.url}${config.method}`)) {
            console.log(mocks);
            return getMockError(config);
          
        }
        return config;
      },
      error => Promise.reject(error),
    );
    api.interceptors.response.use(
      response => response,
      error => {
        if (isMockError(error)) {
          return getMockResponse(error);
        }
        return Promise.reject(error);
      },
    );
  }
