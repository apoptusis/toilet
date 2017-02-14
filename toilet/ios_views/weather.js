import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import TWebView from './twebview';

export default class  weather extends Component {
    render(){
        return (
            <View style={styles.container}>
                <TWebView url='http://localhost:63342/toilet/toilet/html/weather.html?_ijt=l25hsoa0i995q85fog47qu2e1h' />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

module.exports = weather;