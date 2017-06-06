/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry, Text, Image, SectionList, ScrollView, TouchableOpacity, Linking, View} from 'react-native';
import TreeView from './index'

const treeData = [{
    text: '宇阳数码科技',
    data: [
        {
            text: '行业应用部',
            data:[
                {text:'林海雁'},
                {text:'甘扬星'},
                {text:'钱伟斌'},
            ]
        },
        {
            text: '研发部',
            data:[
                {text:'朱经理'},
                {text:'贵明'},
                {text:'乐佳'},
            ]
        },
        {
            text: '行政部',
            data:[
                {text:'王姐'},
                {text:'娟姐'},
                {text:'郝姐'},
            ]
        }
    ]
}];

export default class Tree extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex:1}}>
                <TreeView data={treeData} />
            </View>
        );
    }
}