// __mocks__/react-native-linear-gradient.js
import React from 'react';
import { View } from 'react-native';

const LinearGradient = ( { children, ...props } ) => {
    return <View {...props}>{children}</View>;
};

export default LinearGradient;
