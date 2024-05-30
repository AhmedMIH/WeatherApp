import axios from "axios";
import Config from "react-native-config";
import { debugLog } from "../Utils/Helper";

const apiClient = axios.create( {
    baseURL: Config.BASE_API_URL,
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
        debugLog( error );
        throw new Error( error );
    };
    return apiClient
        ( options )
        .then( handleSuccess )
        .catch( handleError );
}