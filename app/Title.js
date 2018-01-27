import React from 'react'
import { Text } from 'react-native'

export default class Title extends React.Component {
    render() {
        const {text, styles} = this.props
        return(
            <Text style={styles.title}>{text}</Text>  
        );}
};