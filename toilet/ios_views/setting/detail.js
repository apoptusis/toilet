import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';

import Util from './../util';

class Detail extends Component{
    render(){
        return(
            <ScrollView style={styles.container}>
                <View style={styles.center}>
                    <Text style={styles.text}>附近卫生间并导航</Text>
                    <View style={styles.items}>
                        <Image
                            resizeMode="contain"
                            style={styles.icon}
                            source={{uri: 'http://123.57.39.116:3000/help_1.png'}}
                        />
                    </View>
                </View>

                <View style={styles.center}>
                    <Text style={styles.text}>实时天气预报</Text>
                    <View style={styles.items}>
                        <Image
                            resizeMode="contain"
                            style={styles.icon}
                            source={{uri: 'http://123.57.39.116:3000/help_2.png'}}
                        />
                    </View>
                </View>

                <View style={styles.center}>
                    <Text style={styles.text}>阅读文章</Text>
                    <View style={styles.items}>
                        <Image
                            resizeMode="contain"
                            style={styles.icon}
                            source={{uri: 'http://123.57.39.116:3000/help_3.png'}}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    center:{
        justifyContent:'center',
        alignItems: 'center'
    },
    icon:{
        width:300,
        height:530
    },
    items:{
        width:300,
        marginBottom:10,
        shadowOpacity: 1,
        shadowColor: '#ccc',
        shadowOffset:{width: 1*Util.pixel, height: Util.pixel},
    },
    text:{
        fontSize:16,
        fontWeight:'300',
        marginBottom:15,
        marginLeft:10,
        marginTop:15
    }
});

module.exports = Detail;