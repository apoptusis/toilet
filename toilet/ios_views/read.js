import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    NavigatorIOS
} from 'react-native';

import Util from './util';
import Category from './read/category';
import Recommend from './read/recommend';
import Search from './read/search';
import Topic from './read/topic';

// 分割线Hr组件
class Hr extends Component {
    render() {
        return (
            <View style={styles.hr}></View>
        );
    }
}

class readView extends Component {
    constructor() {
        super();
        this.state = {
            isShow : false
        };
    }

    render(){
        return (
            <View style={styles.container}>
                <Search/>
                <Hr/>
                {
                    // 有数据的时候才显示相应的模块
                    this.state.isShow ?
                        <ScrollView style={styles.container}>
                            <Topic data={this.state.recommendTopic} navigator={this.props.navigator}/>
                            <Hr/>
                            <Recommend name="年度推荐"
                                       data={this.state.hotTopic} navigator={this.props.navigator}/>
                            <Hr/>
                            <Category data={this.state.category} navigator={this.props.navigator}/>
                            <Hr/>
                            <Recommend name="年度大误"
                                       data={this.state.other} navigator={this.props.navigator}/>
                        </ScrollView>
                    : null
                }
            </View>
        );
    }

    componentDidMount() {
        var that = this;
        // fetch获得数据
        Util.get('http://localhost:3000/data/read?type=config',
            function (data) {
                if(data.status === 1) {
                    let obj = data.data;
                    // 取得不同类型的数据
                    let recommendTopic = obj.recommendTopic;
                    let hotTopic = obj.hotTopic;
                    let other = obj.other;
                    let category = obj.category;
                    // 发送给组件
                    that.setState({
                        isShow : true,
                        hotTopic: hotTopic,
                        recommendTopic: recommendTopic,
                        other: other,
                        category: category,
                    });
                } else {
                    alert('404');
                }
            },
            function (err) {
                alert('数据读取失败');
            }
        );
    }
}

export default class read extends Component {
    render() {
        return (
            <NavigatorIOS
                initialRoute={{
                    component: readView,
                    title: '阅读',
                    navigationBarHidden: true,
                }}
                style={{flex: 1}}
            />
        );
    }
}

var styles = StyleSheet.create({
    container : {
        flex: 1
    },
    hr : {
        marginTop:10,
        borderColor:"#f0f0f0",
        borderWidth: Util.pixel,
    }
});

module.exports = read;