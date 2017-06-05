import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native';

import styles from './style';

export default class LetterList extends React.Component {

    constructor(props) {
        super(props);
    }

    rightRows() {
        const datas = ['↑','⭐','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#'];
        return datas.map( (data,index) =>(
                <TouchableOpacity key={index} onPress={()=>this.props.onScrollToEnd()}>
                    <Text style={styles.rightText} key={index}>{data}</Text>
                </TouchableOpacity>
            ));
    }

    render() {
        return (
            <View style={styles.rightRows}>
                {this.rightRows()}
            </View>
        )
    }
}