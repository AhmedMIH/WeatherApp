import React, { useState } from 'react'
import { Text, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Spinner from 'react-native-loading-spinner-overlay'
import SearchComponent from '../Components/SearchComponent'
import WeathersList from '../Components/WeathersList'
import { useGetWeather } from '../Apis/weather'
import { responsiveHeight, responsiveWidth } from '../Utils/Helper'
import Colors from '../Utils/Colors'


const HomeScreen = () => {
    const [ searchQuery, setSearchQuery ] = useState( 'London' )
    const { data, isError, isLoading } = useGetWeather( searchQuery )


    const transformWeatherData = ( data ) => {
        if ( !data || !data.forecast || !data.forecast.forecastday ) {
            return [];
        }

        return data.forecast.forecastday.map( item => {
            return {
                date: item.date,
                temp: {
                    maxtemp_c: item.day.maxtemp_c,
                    mintemp_c: item.day.mintemp_c,
                    avgtemp_c: item.day.avgtemp_c,
                    avgvis_km: item.day.avgvis_km,
                    avghumidity: item.day.avghumidity,
                },
                icon: { text: item.day.condition.text, source: item.day.condition.icon },
                astro: {
                    sunrise: item.astro.sunrise,
                    sunset: item.astro.sunset,
                    moonrise: item.astro.moonrise,
                    moonset: item.astro.moonset
                }
            };
        } );
    };


    return (
        <LinearGradient colors={[ Colors.gradient, Colors.gradient2 ]} style={styles.container}>
            <Spinner visible={isLoading} />
            <SearchComponent searchQuery={searchQuery} onChange={setSearchQuery} />
            {isError ? <Text style={styles.errorText}>Something went wrong Please Enter Valid City Or Zip Code</Text> :
                <>
                    <Text style={styles.cityName}>{data?.location?.name}</Text>
                    <WeathersList data={transformWeatherData( data )} />
                </>
            }
        </LinearGradient>
    )
}


const styles = StyleSheet.create( {
    container: {
        flex: 1,
        paddingVertical: responsiveHeight( 16 ),
        paddingHorizontal: responsiveWidth( 16 )
    },
    cityName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        color: Colors.white
    },
    errorText: {
        flex: 1,
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        color: Colors.white,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
} )
export default HomeScreen