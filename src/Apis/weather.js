import { useQuery } from "react-query";
import Config from "react-native-config";
import { axiosRequest } from "../Services/api.service";


export const fetchWeather = ( location ) => {

    return axiosRequest( { url: 'forecast.json', params: { key: Config.API_KEY, q: location, days: 4, hour: 14 }, method: 'GET' } );
};
export const useGetWeather = ( query ) => {
    return useQuery( [ 'weather', query ], () => { return fetchWeather( query ) }, { cacheTime: 0, retry: 0 } );
}