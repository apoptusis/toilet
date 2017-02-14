import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    NavigatorIOS,
    ScrollView,
    AlertIOS,
} from 'react-native';
import Util from './util';
import Help from './setting/help';
import Detail from './setting/detail';
import Tips from './setting/tips';

export default class settingView extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <ScrollView style={styles.container}>
                <View style={styles.bg}>
                    <Text style={{fontSize:18,color:'#fff',marginTop:10,fontWeight:'bold'}}>
                        设置
                    </Text>
                </View>

                <View style={styles.container}>
                    <View style={{justifyContent:'center', alignItems: 'center',marginTop:10,marginBottom:20}}>
                        <Image style={styles.icon} source={{url:'./setting/logo.jpg'}} resizeMode="contain"/>
                        <Text style={[styles.text, {fontSize:13}]}>v1.0.0</Text>
                    </View>

                    <TouchableOpacity
                        navigator={this.props.navigator}
                        onPress={this._goPage.bind(this,Detail,'功能介绍')}>
                        <View style={[styles.item, {borderTopWidth:Util.pixel}]}>
                            <Text style={styles.text}>功能介绍</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        navigator={this.props.navigator}
                        onPress={this._goPage.bind(this,Help,'帮助中心')}>
                        <View style={styles.item}>
                            <Text style={styles.text}>帮助中心</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        navigator={this.props.navigator}
                        onPress={this._goPage.bind(this,Tips,'服务条款')}>
                        <View style={styles.item}>
                            <Text style={styles.text}>服务条款</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        navigator={this.props.navigator}
                        onPress={this._showAbout.bind(this)}>
                        <View style={styles.item}>
                            <Text style={styles.text}>关于</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

    _goPage(component,title) {
        this.props.navigator.push({
            component: component,
            title: title,
            barTintColor: '#fff'
        });
    }

    _showAbout(){
        AlertIOS.alert('如有问题,联系', 'abc@.123.com', [{text: '确认'}]);
    }
}

class setting extends Component {
    render() {
        return (
            <NavigatorIOS
                initialRoute={{
                    component: settingView,
                    title: '设置',
                    navigationBarHidden: true,
                }}
                style={{flex: 1}}
            />
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    item:{
        height:50,
        backgroundColor:'#fff',
        borderBottomWidth: Util.pixel,
        borderColor:'#ccc',
        justifyContent: 'center'
    },
    bg:{
        backgroundColor: '#FFF',
        height:40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontSize:15,
        marginLeft:10,
        color: '#7E7F7E'
    },
    icon:{
        width:88,
        height:100
    }
});

module.exports = setting;