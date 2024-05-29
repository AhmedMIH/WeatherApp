import { View, Text, FlatList } from 'react-native'
import React from 'react'
import WeatherListItem from './WeatherListItem'

const WeathersList = ( { data } ) => {
    return (
        <FlatList
            data={data}
            style={{ marginTop: 16 }}
            contentContainerStyle={{ gap: 16 }}
            renderItem={( { item } ) => <WeatherListItem item={item} />}
            keyExtractor={item => item.date}
        />
    )
}

export default WeathersList