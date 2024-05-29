import LinearGradient from 'react-native-linear-gradient'
import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getFontSize, responsiveHeight, responsiveWidth } from '../Utils/Helper'
import Colors from '../Utils/Colors'
import DetailsItem from '../Components/DetailsItem'

const DetailsScreen = ( { route } ) => {
    console.log( route.params.item )
    const item = route.params.item
    return (
        <LinearGradient colors={[ Colors.gradient, Colors.gradient2 ]} style={styles.container}>
            <Image style={styles.icon} source={{ uri: 'https:' + item.icon.source }} />
            <View style={styles.detailsContainer}>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.temp}>{item.temp.avgtemp_c}°</Text>
                <Text style={styles.desc}>{item.icon.text}</Text>
                <View style={styles.space} />
                <DetailsItem title="Wind" value={item.temp.avgvis_km + " km/h"} />
                <DetailsItem title="Humidity" value={item.temp.avghumidity + "%"} />
                <View style={styles.space} />
                <DetailsItem title="Sunrise" value={item.astro.sunrise} />
                <DetailsItem title="Sunset" value={item.astro.sunset} />
                <DetailsItem title="Moonrise" value={item.astro.moonrise} />
                <DetailsItem title="Moonset" value={item.astro.moonset} />
            </View>
        </LinearGradient>
    )
}


const styles = StyleSheet.create( {
    container: {
        flex: 1,
        paddingVertical: responsiveHeight( 32 ),
        paddingHorizontal: responsiveWidth( 16 ),
        alignItems: 'center',
    },
    icon: {
        width: responsiveWidth( 300 ),
        resizeMode: 'contain',
        height: responsiveHeight( 300 ),
    },
    detailsContainer: {
        backgroundColor: "#887abe30",
        borderRadius: 20,
        width: responsiveWidth( 300 ),
        alignItems: 'center',
        paddingVertical: responsiveHeight( 16 ),
        borderWidth: 1,
        borderColor: "#FFFFFF40"
    },
    date: {
        color: Colors.white,
        fontSize: getFontSize( 18 ),
    },
    temp: {
        color: Colors.white,
        fontSize: getFontSize( 80 ),
    },
    desc: {
        color: Colors.white,
        fontSize: getFontSize( 24 ),
    },


    space: {
        height: responsiveHeight( 16 ),
    }

} )
export default DetailsScreen