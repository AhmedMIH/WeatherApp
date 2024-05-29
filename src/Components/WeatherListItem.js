import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors'

const WeatherListItem = ( { item } ) => {
    return (
        <View style={{ paddingHorizontal: 16, paddingVertical: 16, backgroundColor: Colors.container, borderRadius: 8 }}>
            <Text>{item.date}</Text>
            <Text>{item.temp.avgtemp_c}</Text>
            <Text>{item.temp.avgtemp_f}</Text>
        </View>
    )
}

export default WeatherListItem