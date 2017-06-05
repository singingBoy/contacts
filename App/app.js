/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    SectionList,
    ScrollView,
    TouchableOpacity,
    View
} from 'react-native';
import _ from 'lodash';
import pinyin from 'js-pinyin'
pinyin.setOptions({checkPolyphone: false, charCase: 0});

import Head from './components/head';
import FunctionList from './components/functionList';
import LetterList from './components/letterList';

var Contacts = require('react-native-contacts');

//样式
import ListStyle from './components/style';

/* 模拟数据：*/
/*手机通讯录读取数据格式 ->
[
 {
     recordID: '6b2237ee0df85980',
     company: "",
     emailAddresses: [{
         label: "work",
         email: "carl-jung@example.com",
     }],
     familyName: "Jung",
     givenName: "Carl",
     jobTitle: "",
     middleName: "",
     phoneNumbers: [{
         label: "mobile",
         number: "(555) 555-5555",
     }],
    thumbnailPath: 'content://com.android.contacts/display_photo/3',
    postalAddresses:[{
        postCode: 'Postcooode',
        city: 'City',
        neighborhood: 'neighborhood',
        street: 'Home Street',
        formattedAddress: 'Home Street\nneighborhood\nCity Postcooode',
        label: 'work'
    }]
 },
 ....
]
*/

const Row_Height = 45;

export default class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            dataSource: [],
            letterList: [],
            refreshing: true,
        };
    }

    /*构建结构数据*/
    constructorData=(datas)=>{
        const dataSource = [], letterList = [];
        //星标朋友
        const loveFriends = [{familyName:'波',givenName:'波'},{familyName:'星级',givenName:'爆炸'}];
        dataSource.push({data:loveFriends, key: '星标朋友'})
        letterList.push('⭐');

        Object.entries(datas).forEach(([key, value]) => {
            dataSource.push({data: value, key: key});
            letterList.push(key);
        });

        this.setState({
            dataSource: dataSource,
            letterList: letterList,
            refreshing: false,
        })
    };

    componentWillMount(){
        Contacts.getAll((err, contacts) => {
            if(err === 'denied'){
                // error
            } else {
                const datas = _.groupBy(contacts, (item) =>pinyin.getFullChars(item.familyName?item.familyName:item.givenName).substr(0,1).toUpperCase());
                const dataSource = this.constructorData(datas);
            }
        })
    }

    /*行key唯一辅助方法*/
    _keyExtractor = (item, index) => index;

    /*滚动到底部*/
    onScrollToEnd =()=>{
        console.log(this.refs._sectionList.scrollToEnd);
        // this.refs._sectionList.scrollToEnd({animated: true});
    };

    render() {
        return (
            <View style={{flex:1}}>
                <Head headHeight={46} changeHeadHeight={(e)=>{}} />
                <ScrollView>
                    {/*FunctionList展现标签,群聊等功能列表*/}
                    <FunctionList changeFunctionHeight = {(e)=>{}} />

                    <SectionList
                        ref='_sectionList'
                        refreshing={true}
                        sections={this.state.dataSource}
                        keyExtractor={this._keyExtractor}
                        renderSectionHeader={this._renderHeader}
                        renderItem={this._renderItem}
                        getItemLayout={(data,index)=>(
                            {length: Row_Height, offset: (Row_Height+2) * index, index}
                        )}
                    />
                </ScrollView>
                <LetterList onScrollToEnd={this.onScrollToEnd}/>
            </View>
        );
    }

    /*分组头部*/
    _renderHeader=({section})=> {
        return (
            <View style={ListStyle.listTitle}>
                <Text style={ListStyle.listTitleText}>{section.key}</Text>
            </View>
        )
    };

    /*渲染行*/
    _renderItem = ({item, index})=>{
        return (
            <TouchableOpacity>
                <View style={ListStyle.listItem}>
                    {
                        item.thumbnailPath?
                            <Image style={ListStyle.img} source={{uri: item.thumbnailPath}} /> :
                            <View style={[ListStyle.img, {backgroundColor:'#ccc'}]}/>
                    }
                    <Text>
                        {item.familyName?item.familyName:''}{ item.givenName?item.givenName:''}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        backgroundColor: '#fff',
    },
    swipeContainer: {
    },
    alphabetSidebar: {
        position: 'absolute',
        backgroundColor: 'transparent',
        top: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderCircle: {
        width: 50,
        height: 50,
        backgroundColor: '#ccc',
        borderRadius: 25,
        marginRight: 10,
        marginLeft: 5,
    },
    imgSize: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    name: {
        fontSize: 15,
    },
    cell: {
        height: 95,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
    },
});