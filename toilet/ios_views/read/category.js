import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Util from '../util'
import List from './list';

export default class category extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: props.data,
            navigator: props.navigator,
        }
    }

    render(){
        let data = this.state.data;
        let views1 = [];
        let views2 = [];
        for (var i in data){
            let item = (
                <View style={styles.row_item} key={i}>
                    <TouchableOpacity style={styles.item} onPress={this._goToList.bind(this,data[i].text)}>
                        <Text style={styles.text}>
                            {data[i].text}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
            if(i < 2) {
                views1.push(item);
            } else {
                views2.push(item);
            }
        }
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    分类
                </Text>
                <View style={styles.row}>
                    {views1}
                </View>

                <View style={styles.row}>
                    {views2}
                </View>
            </View>
        );
    }

    _goToList(name) {
        let type = this._getType(name);
        let url = 'http://localhost:3000/data/read?type=' + type;
        this.state.navigator.push({
            component: List,
            title: name,
            barTintColor: '#fff',
            passProps: {
                url: url
            }
        });
    }

    _getType(name) {
        let type = 'it';
        switch (name){
            case '互联网':
                type = 'it';
                break;
            case '娱乐':
                type = 'article';
                break;
            case '游戏':
                type = 'jocks';
                break;
            case '动漫':
                type = 'manager';
                break;
            default :
                type = 'it';
                break;
        }
        return type;
    }
}

var styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginRight: 10,
    },
    title: {
        color: '#5e5e5e',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
    },
    row: {
        flexDirection: 'row',
        marginTop: 5
    },
    row_item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        height: 80,
        width: (Util.size.width - 30) /2,
        borderColor: '#f1f1f1',
        borderWidth: 1,//Util.pixel,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#707070',
        fontSize: 18,
        fontWeight: '300',
    }
});

module.exports = category;