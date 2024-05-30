// useGetWeather.test.js
import { renderHook,act } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';
import { axiosRequest } from '../src/Services/api.service';
import { useGetWeather, fetchWeather } from '../src/Apis/weather';

// Mock the axiosRequest function
jest.mock('../src/Services/api.service', () => ({
  axiosRequest: jest.fn(),
}));

// Create a query client
const queryClient = new QueryClient();

describe('useGetWeather', () => {
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return weather data on success', async () => {
    const mockData = {
      location: { name: 'London' },
      forecast: { forecastday: [] },
    };

    axiosRequest.mockResolvedValueOnce({ data: mockData });

    const { result, waitFor } = renderHook(() => useGetWeather('London'), {
      wrapper,
    });

    await act(async () => {
      await waitFor(() => result.current.isSuccess);
    });


    expect(result.current.data.data).toEqual(mockData);
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('should return loading state initially', () => {
    axiosRequest.mockResolvedValueOnce({ data: {} });

    const { result } = renderHook(() => useGetWeather('London'), {
      wrapper,
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('should return error state on failure', async () => {
    axiosRequest.mockRejectedValueOnce(new Error('Network error'));

    const { result, waitFor } = renderHook(() => useGetWeather('London'), {
      wrapper,
    });

    await act(async () => {
      await waitFor(() => result.current.isError);
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });
});
