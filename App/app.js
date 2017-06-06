/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry, Text, Image, SectionList, ScrollView, TouchableOpacity, Linking, View} from 'react-native';
import { Toast, Modal, Button, List, InputItem } from 'antd-mobile';
import _ from 'lodash';
import pinyin from 'js-pinyin'
pinyin.setOptions({checkPolyphone: false, charCase: 0});
const Contacts = require('react-native-contacts');
import Swipeable from 'react-native-swipeable';

//自定义组件
import Head from './components/head';
import FunctionList from './components/functionList';
import LetterList from './components/letterList';

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

const Row_Height = 65;

export default class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            dataSource: [],
            letterList: [],
            refreshing: true,
            visible: false,
            name: '',
            phone: '',
            email: '',
        };
    }

    /*构建结构数据*/
    constructorData=(datas)=>{
        let dataSource = [], letterList = [];
        //星标朋友
        const loveFriends = [{familyName:'波',givenName:'波'},{familyName:'星级',givenName:'爆炸'}];
        dataSource.push({data:loveFriends, key: '星标朋友'})
        letterList.push('⭐');

        const arr = [];
        Object.entries(datas).forEach(([key, value]) => {
            arr.push({data: value, key: key});
            letterList.push(key);
        });
        arr.sort( (a,b)=>  a.key.charCodeAt() - b.key.charCodeAt() );
        dataSource = dataSource.concat(arr);

        this.setState({
            dataSource: dataSource,
            letterList: letterList,
            refreshing: false,
        })
    };

    getContact =()=>{
        Contacts.getAll((err, contacts) => {
            if(err === 'denied'){
                // error
                Toast.fail('获取通讯录失败!',2);
            } else {
                const datas = _.groupBy(contacts, (item) =>pinyin.getFullChars(item.familyName?item.familyName:item.givenName).substr(0,1).toUpperCase());
                const dataSource = this.constructorData(datas);
            }
        })
    };

    componentWillMount(){
        this.getContact();
    }

    /*行key唯一辅助方法*/
    _keyExtractor = (item, index) => index;

    /*滚动到底部*/
    onScrollToEnd =()=>{
        console.log(this.refs._sectionList.scrollToEnd);
        // this.refs._sectionList.scrollToEnd({animated: true});
    };

    /*打电话，发短信*/
    _doSomething = (data, type='tel')=>{
        if(data.phoneNumbers.length > 0){
            const url = `${type}:${data.phoneNumbers[0].number}`;
            Linking.canOpenURL(url).then(supported => {
                if (!supported) Toast.info('错误电话格式!',2);
                else return Linking.openURL(url);
            }).catch(err =>{
                Toast.info('操作失败!',2)
            });
        }else{
            Toast.info('没有电话号码!',2)
        }
    };

    onShowModal =()=>{
        this.setState({
            visible: true,
        })
    };

    onCloseModal =()=>{
        this.setState({
            visible: false,
        })
    };

    onHave = ()=>{
        const {name, phone, email} = this.state;
        const contact = {
            familyName: name.substr(0,1),
            givenName: name.substr(1,name.length),
            phoneNumbers: [{label:'mobile',number: phone}],
            emailAddresses: [{label: "work", email: email,}]
        };
        Contacts.addContact(contact, ()=>{
            this.getContact();
            this.onCloseModal();
        })
    };

    render() {
        return (
            <View style={{flex:1}}>
                <Head headHeight={46} changeHeadHeight={(e)=>{}} />
                <ScrollView>
                    {/*FunctionList展现标签,群聊等功能列表*/}
                    <FunctionList onShowModal={this.onShowModal} />

                    <SectionList
                        ref='_sectionList'
                        refreshing={true}
                        sections={this.state.dataSource}
                        keyExtractor={this._keyExtractor}
                        renderSectionHeader={this._renderHeader}
                        renderItem={this._renderItem}
                        getItemLayout={(data,index)=>{
                            return (
                                {length: Row_Height, offset: (Row_Height+2) * index, index}
                            )
                        }}
                    />
                </ScrollView>
                <LetterList onScrollToEnd={this.onScrollToEnd}/>

                {/*添加弹窗*/}
                <Modal
                    transparent={false}
                    visible={this.state.visible}
                    animationType="slide-up"
                    onClose={this.onCloseModal}
                >
                    <View>
                        <List renderHeader={() => '新增'} >
                            <InputItem clear onChange={(value) => this.setState({name: value,})} placeholder="姓名">
                                姓名
                            </InputItem>
                            <InputItem clear onChange={(value) => this.setState({ phone: value,})} placeholder="手机">
                                手机
                            </InputItem>
                            <InputItem clear onChange={(value) => this.setState({ email: value,})} placeholder="邮件">
                                邮件
                            </InputItem>
                        </List>
                    </View>
                    <Button type="primary" inline onClick={this.onHave}>保存到通讯录中</Button>
                    <Button type="primary" inline onClick={this.onCloseModal}>close modal</Button>
                </Modal>
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
        const rightButtons = [
            <TouchableOpacity style={{justifyContent:'center'}} onPress={()=>this._doSomething(item,'tel')}>
                <Image style={{width:40,height:40}} source={require('./img/tel.png')}/>
            </TouchableOpacity>,
            <TouchableOpacity style={{justifyContent:'center'}} onPress={()=>this._doSomething(item,'smsto')}>
                <Image style={{width:35,height:35}} source={require('./img/mes.png')}/>
            </TouchableOpacity>
        ];
        return (
            <Swipeable
                rightButtons={rightButtons}
                rightActionActivationDistance={200}
            >
                <TouchableOpacity onPress={()=>this._doSomething(item,'tel')}>
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
            </Swipeable >
        );
    };
}