import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,

} from 'react-native';

import TWebView from './twebview';
import Util from './util';

export default class  toiletPage extends Component {
    render(){
        return (
            <View style={styles.container}>
                <TWebView url='http://localhost:63342/toilet/toilet/html/nearby.html?_ijt=9u6b694gc4k1lorhla322fl32p' />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container:{
        flex:1
    }
});

module.exports = toiletPage;