/**
 * Created by chenqiming on 16/4/16.
 */
import React, {
    Dimensions,
    StyleSheet
} from 'react-native';

let {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    containerIOS: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: '#fff'
    },
    containerAndroid: {
        flex: 1,
        backgroundColor: '#fff'
    },
    head: {
        backgroundColor: '#fff'
    },
    searchBar: {
        height: 46,
        backgroundColor: '#e3e3e3'
    },
    search: {
        backgroundColor: '#f5f5f5',
        height: 30,
        borderColor: '#ccc',
        borderRadius: 5,
        borderWidth: 1,
        marginLeft: 17,
        marginRight: 17,
        marginTop: 7,
        paddingLeft: 5
    },
    rightRows: {
        // flex: 1,
        position: 'absolute',
        top: height * 0.15,
        right: 0,
        backgroundColor: 'transparent'
    },
    rightText: {
        padding: 0,
        fontSize: 11,
        width: 20,
        textAlign: 'center',
        color: '#555'
    },
    listItem: {
        height: 65,
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 30,
        flexDirection: 'row'
    },
    line: {
        height: 1,
        backgroundColor: '#eee',
        marginLeft: 10,
        marginRight: 30
    },
    searchImg: {
        width: 17,
        height: 17,
    },
    searchBtn: {
        position: 'absolute',
        top: 13,
        right: 24
    },
    img: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 9
    },
    listTitle: {
        position: 'relative',
        top: -1,
        paddingLeft: 10,
        paddingTop: 3,
        paddingBottom: 3,
        backgroundColor: '#eee'
    },
    listTitleText: {
        fontSize: 12,
        color: '#777'
    }
});

export default styles;