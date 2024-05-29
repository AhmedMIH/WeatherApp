import { View, Text } from 'react-native'
import React, { useState } from 'react'
import SearchComponent from '../Components/SearchComponent'
import Colors from '../Utils/Colors'
import { useGetWeather } from '../Apis/weather'
import WeathersList from '../Components/WeathersList'


const HomeScreen = () => {
    const [ searchQuery, setSearchQuery ] = useState( 'London' )
    const { data, error } = useGetWeather( searchQuery )
    const transformWeatherData = ( data ) => {
        if ( !data || !data.forecast || !data.forecast.forecastday ) {
            return [];
        }

        return data.forecast.forecastday.map( day => {
            return {
                date: day.date,
                temp: {
                    maxtemp_c: day.day.maxtemp_c,
                    maxtemp_f: day.day.maxtemp_f,
                    mintemp_c: day.day.mintemp_c,
                    mintemp_f: day.day.mintemp_f,
                    avgtemp_c: day.day.avgtemp_c,
                    avgtemp_f: day.day.avgtemp_f
                }
            };
        } );
    };


    return (
        <View style={{ flex: 1, paddingVertical: 16, paddingHorizontal: 16, backgroundColor: Colors.white }}>
            <SearchComponent onChange={setSearchQuery} />
            <Text>{data?.location?.name}</Text>
            <WeathersList data={transformWeatherData( data )} />
        </View>
    )
}

export default HomeScreen