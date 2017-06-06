import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import styles from './style';

export default class FunctionList extends React.Component {
    static propTypes = {
        onShowModal: React.PropTypes.func
    };

    render() {
        return (
            <View style={styles.function} onLayout={(e)=>{}}>

                <TouchableOpacity onPress={()=>this.props.onShowModal()}>
                    <View style={styles.listItem}>
                        <Image style={styles.img} source={require('../img/z7.png')}/>
                        <Text>新的朋友</Text>
                    </View>
                    <View style={styles.line}></View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.listItem}>
                        <Image style={styles.img} source={require('../img/z8.png')}/>
                        <Text>群聊</Text>
                    </View>
                    <View style={styles.line}></View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.listItem}>
                        <Image style={styles.img} source={require('../img/z9.png')}/>
                        <Text>标签</Text>
                    </View>
                    <View style={styles.line}></View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.listItem}>
                        <Image style={styles.img} source={require('../img/z10.png')}/>
                        <Text>公众号</Text>
                    </View>
                    <View style={styles.line}></View>
                </TouchableOpacity>
            </View>
        )
    }
}
