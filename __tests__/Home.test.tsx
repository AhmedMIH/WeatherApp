// HomeScreen.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../src/Screens/HomeScreen';
 import Colors from '../src/Utils/Colors';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useGetWeather } from '../src/Apis/weather';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('../src/Apis/weather');


const queryClient = new QueryClient();
const mockWeatherData = {
  location: {
    name: 'Cairo'
  },
  forecast: {
    forecastday: [
      {
        date: '2024-05-26',
        day: {
          maxtemp_c: 35.8,
          mintemp_c: 21.6,
          avgtemp_c: 29.3,
          avgvis_km: 10,
          avghumidity: 26,
          condition: {
            text: 'Sunny',
            icon: '//cdn.weatherapi.com/weather/64x64/day/113.png'
          }
        },
        astro: {
          sunrise: '04:56 AM',
          sunset: '06:48 PM',
          moonrise: '09:58 PM',
          moonset: '06:58 AM'
        }
      }
    ]
  }
};


describe('HomeScreen', () => {
  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
            <HomeScreen />
        </NavigationContainer>
      </QueryClientProvider>
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    useGetWeather.mockReturnValue({
      data: mockWeatherData,
      isError: false,
      isLoading: false,
    });

    const { getByText } = renderComponent();
    await waitFor(() => expect(getByText('Cairo')).toBeTruthy());
  });

  it('shows loading spinner while fetching data', () => {
    useGetWeather.mockReturnValue({
      data: null,
      isError: false,
      isLoading: true,
    });

    const { getByTestId } = renderComponent();
    expect(getByTestId('loading-spinner')).toBeTruthy();
  });

  it('shows error message on error', async () => {
    useGetWeather.mockReturnValue({
      data: null,
      isError: true,
      isLoading: false,
    });

    const { getByText } = renderComponent();
    await waitFor(() => expect(getByText('Something went wrong Please Enter Valid City Or Zip Code')).toBeTruthy());
  });

  it('updates search query', () => {
    useGetWeather.mockReturnValue({
      data: mockWeatherData,
      isError: false,
      isLoading: false,
    });

    const { getByPlaceholderText } = renderComponent();
    const searchInput = getByPlaceholderText('Enter a city or zip code');
    fireEvent.changeText(searchInput, 'New York');
    expect(searchInput.props.value).toBe('New York');
  });

  it('renders weather data correctly', async () => {
    useGetWeather.mockReturnValue({
      data: mockWeatherData,
      isError: false,
      isLoading: false,
    });

    const { getByText } = renderComponent();
    await waitFor(() => expect(getByText('Sunny')).toBeTruthy());
    await waitFor(() => expect(getByText('Cairo')).toBeTruthy());
    await waitFor(() => expect(getByText('2024-05-26')).toBeTruthy());
    await waitFor(() => expect(getByText('29.3°')).toBeTruthy());
  });
});