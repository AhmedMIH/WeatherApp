import { View, TextInput, Touchable, Text } from 'react-native'
import React, { useState } from 'react'
import Colors from '../Utils/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import GetLocation from '../Utils/Location'

const SearchComponent = ( { onChange } ) => {
    const [ searchQuery, setSearchQuery ] = useState()
    const getLocation = () => GetLocation.getCurrentPosition().then( ( position ) => {
        let lat = parseFloat( position.latitude ).toFixed( 2 )
        let lon = parseFloat( position.longitude ).toFixed( 2 )
        onChange( `${ lat },${ lon }` )
    } ).catch( ( error ) => {
        console.log( error )
    } )
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

            <View style={{ backgroundColor: Colors.container, borderRadius: 8, height: 60, flex: 1 }}>
                <TextInput onChangeText={setSearchQuery} value={searchQuery} style={{ flex: 1, paddingHorizontal: 16 }} />
            </View>
            <View>
                <TouchableOpacity onPress={async () => { getLocation() }} >
                    <Text>Get Location</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => { onChange( searchQuery ) }} >
                    <Text>Search</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SearchComponent