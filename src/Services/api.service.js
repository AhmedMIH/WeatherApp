import axios from "axios";
import Config from "react-native-config";

const apiClient = axios.create( {
    baseURL: "http://api.weatherapi.com/v1/",
    headers: {
        "Content-type": "application/json"
    }
} );

apiClient.interceptors.request.use( config => {
    return config
} );

export const axiosRequest = async options => {
    const handleSuccess = response => {
        return response.data;
    };
    const handleError = error => {
        console.log( error );
        throw new Error( error );
    };
    return apiClient
        ( options )
        .then( handleSuccess )
        .catch( handleError );
}