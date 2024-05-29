import { View, StyleSheet } from 'react-native'
import React from 'react'
import GetLocation from '../Utils/Location'
import LocationButton from './LocationButton'
import Searchbar from './Searchbar'
import { responsiveHeight } from '../Utils/Helper'

const SearchComponent = ( { onChange } ) => {
    const getLocation = () => GetLocation.getCurrentPosition().then( ( position ) => {
        let lat = parseFloat( position.latitude ).toFixed( 2 )
        let lon = parseFloat( position.longitude ).toFixed( 2 )
        onChange( `${ lat },${ lon }` )
    } ).catch( ( error ) => {
        console.log( error )
    } )

    const onChangeSearchQuery = ( searchQuery ) => {
        searchQuery === undefined || searchQuery === '' ? onChange( "London" ) : onChange( searchQuery )
    }
    return (
        <View style={styles.containerRow}>
            <LocationButton onPress={getLocation} />
            <Searchbar onPress={onChangeSearchQuery} />
        </View>

    )
}

const styles = StyleSheet.create( {
    containerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        height: responsiveHeight( 48 ),
    },

} )

export default SearchComponent