import { useQuery } from "react-query";
import { axiosRequest } from "../Services/api.service";


export const fetchWeather = ( location ) => {

    return axiosRequest( { url: 'forecast.json', params: { key: 'e8f47a0fa7e940e78ab184007242405', q: location, days: 4, hour: 14 }, method: 'GET' } );
};
export const useGetWeather = ( query ) => {
    return useQuery( [ 'weather', query ], () => { return fetchWeather( query ) }, { cacheTime: 0, retry: 0 } );
}