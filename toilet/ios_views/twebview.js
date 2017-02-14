import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView,
} from 'react-native';

export default class TWebView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //添加state.url属性，用于传递url参数
            url : this.props.url,
            //isError属性，用于判断页面加载异常
            isError : false
        };
    }

    render(){
        return (
            <View style={styles.container}>
                {
                    //如果onError触发，则输出异常视图，否则输出WebView视图
                    this.state.isError ?
                        <View style={styles.textView}>
                            <Text style={styles.text}>
                                网络异常，请检查网络链接！
                            </Text>
                        </View>
                        :
                        <WebView
                            source={{url: this.state.url}}
                            style={{marginTop: -62}}                //页面上部分没有达到最顶端
                            //WebView触发onError事件时，调用方法
                            //onError={this._showError.bind(this)}
                            onError={() => {
                                this.setState({
                                    isError: true
                                });
                            }}
                            startInLoadingState={true}              //载入页面的菊花
                        />
                }
            </View>
        );
        //_showError(){
        //    this.setState({
        //        isError: true
        //    });
        //}
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text:{
        fontSize:16,
        fontWeight:'300'
    },
    textView:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center'
    }
});

module.exports = TWebView;