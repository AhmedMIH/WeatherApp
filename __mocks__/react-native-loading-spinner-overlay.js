// __mocks__/react-native-loading-spinner-overlay.js
import React from 'react';
import { View } from 'react-native';

const Spinner = ( { visible, ...props } ) => {
    return visible ? <View {...props} testID="loading-spinner" /> : null;
};

export default Spinner;
