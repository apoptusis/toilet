# 找厕所APP

##### 项目来源于：https://github.com/vczero/toilet
##### 下面的内容是学习这个项目时记的笔记。

## 1. 后台搭建

### 1.1 Node.js环境搭建
- 下载安装node.js
- Windows系统需要安装git bash（也可以使用cmd）
- Mac 系统自带bash

1. 安装express框架

```
npm install -g express-generator@4
```

2. 创建项目文件夹

```
cd myapp/					    进入myapp文件夹

express -e service				创建基于ejs模板的名为service的项目

cd service/						进入service文件夹
	
npm install						安装node_modules

npm start						启动项目，默认地址localhost:3000

npm install -g supervisor		安装supervisor来监听文件改变

supervisor bin/www			    用supervisor来启动项目
```

### 1.2 后端开发
- 创建数据模块routes/data和public/data/it.json等

- 在app.js中引入数据读取模块

  ```javascript
  var data = require('./routes/data');      //引入data模块的路由
  app.use('/data', data); 		          //设置数据路由
  ```

- data.js 获取url中某个字段的值，如

  ```javascript
  var type = req.param('type')  || '';
  var url = req.param('url')  || '';
  ```

- 读取文件

  ```javascript
  fs.readFile(filePath,function (err, data) {}
  ```

- 写入文件

  ```javascript
  fs.writeFile (filePath, newData, function (err, data) {}
  ```

- 回调函数中，如果错误返回错误信息

  ```javascript
   if(err) {
     return res.send({
       status : 0,
       info : '读取文件出现异常'
     });
   }
  ```

- 返回json信息

  ```javascript
  return res.send({
    status : 1,
    data : obj
  });
  ```
### 1.3 后台开发
1. 安装session插件

```
npm install express-session --save
```

2. 在app.js中引入

```javascript
// 引入express-session
var session = require('express-session');

//设置秘钥
app.use(session( {
  secret : '#sddjswdhww22ygfw2233@@@%#$!@%Q!% *12',
  resave : false,
  saveUninitialized : true
}));
```

3. 完成data.js中的登录接口
4. 页面模板（HTML、CSS）
5. 完成edit、index、login、recommend各个页面的ejs模板
6. 在index.js中设置各个页面的路由

----



## 2. APP开发

### 2.1 react-native环境搭建
- 安装Homebrew

- 安装node.js

- 安装Yarn、React Native的命令行工具（react-native-cli）

  ```
  npm install -g yarn react-native-cli
  ```


- 安装xcode7.0以上版本

- 安装watchman和flow

  ```
  brew install watchman
  brew install flow
  ```

- 创建并运行react-native项目

  ```
  react-native init projectName
  cd projectName
  react-native run-ios
  ```
### 2.2 解读index.ios.js

```javascript
//引入react核心组件
import React, { Component } from 'react';

//进入react-native组件和API
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

//创建组件
export default class toilet extends Component {
  //渲染视图
  render() {
    return (
      <View style={styles.container}>		//View组件
        <Text>		//text组件，类似于html中的span，文字必须在text组件中
          Hello world！
        </Text>
      </View>
    );
  }
}

//创造一个样式类，可以在组件标签里调用这些样式对象
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

//注册应用入口API
AppRegistry.registerComponent('toilet', () => toilet);
```

### 2.3 APP界面整体结构搭建

目标：搭建底部的TabBar按钮，点击不同的TabBar切换不同的页面。

1. 允许HTTP加载

在Xcode中打开info.plist文件，在App Transport Security Setting中添加Allow Arbitrary Loads，设置为YES。

2. 在index.ios.js中使用TabBar组件

TabBarIOS组件为页面中底部的整个按钮区域，其子组件TabBarIOS.Item为每一个按钮，主要组件的名字一定要拼写正确（大小写敏感）否则会报错。

```javascript
// 引入TabBarIOS组件
import {
  ...
  TabBarIOS
} from 'react-native';

// 创建组件
export default class toilet extends Component {
    // 构造函数  
    constructor(){
    }
    // 渲染视图
    render() {
        return (
            <TabBarIOS>
                <TabBarIOS.Item>
 
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}
AppRegistry.registerComponent('toilet', () => toilet);
```

3. 给TabBarIOS.Item添加属性

以卫生间模块的item为例，其他模块同理。

```javascript
<TabBarIOS.Item
    //item显示的名字
	title="卫生间"
    //item的图标，采用base64格式
    icon={{url: img1_base64, scale:3.5}}			
    //如果点击这个item，就使用setState方法设置selectedTab的属性为toilet
    onPress={ () => {								
        this.setState({
            selectedTab: 'toilet'
        });
    }}
    //如果this.state.selectedTab为toilet，则toilet的item被选中
    selected={this.state.selectedTab === 'toilet'}	
>
    //渲染相印的视图
    {this._renderView('toilet')}
</TabBarIOS.Item>    
```

在构造函数中设置state.selectedTab属性的默认为toilet

```javascript
    // 构造函数
    constructor() {
        super();
        this.state = {
            selectedTab: 'toilet',
        };
    }
```
5. 点击不同的item，渲染不同的视图

在TabBarIOS.Item标签中调用函数

```javascript
{this._renderView('toilet')}
```

_renderView函数根据传入的name值来判断return哪种视图

```javascript
_renderView(name) {
    let view = null;
    switch (name){
        case 'toilet':
            view = <ToiletPage/>;
            break;
        case 'read':
            view = <Read/>;
            break;
        case 'weather':
            view = <Weather/>;
            break;
        case 'setting':
            view = <Setting/>;
            break;
        default :
            view = <ToiletPage/>;
            break;
    }
    return view;
}
```

需要在其他的地方分别编写相应的视图,再以组件的方式导入4个视图

```javascript
import ToiletPage from './ios_views/toiletPage';
import Read from './ios_views/read';
import Setting from './ios_views/setting';
import Weather from './ios_views/weather';
```

### 2.4 卫生间模块开发

1. WebView模块封装

   使用WebView组件来在View中显示一个网页（类似于HTML的iframe）

``` javascript
import {WebView} from 'react-native';//引入WebView
export default class  toiletPage extends Component {
    render(){
        return (
            <View style={styles.container}>
                <WebView
                    source={{url:'https://www.baidu.com'}}
                    style={{marginTop:-20}}
                />
            </View>
        );
    }
}
//一定要设置容器大小的样式，否则无法显示
var styles = StyleSheet.create({
    container:{
        flex:1
    }
});
```

​	由于卫生间模块中的WebView组件和其他模块的可以公用，所以单独建立一个TWebView组件

```javascript
export default class  TWebView extends Component {
    //构造函数
    constructor(props) {
        super(props);
        this.state = {
          	//添加state.url属性，用于传递url参数
            url : this.props.url
          	//isError属性，用于判断页面加载异常
          	isError : false
        };
    }

    render(){
        return (
            <View style={styles.container}>
                {
                    this.state.isError ?
          				//输出网络异常视图
                        <View style={styles.textView}>
                            <Text style={styles.text}>
                                网络异常，请检查网络链接！
                            </Text>
                        </View>
                        :
          				//输出WebView视图
                        <WebView
                            source={{url: this.state.url}}
                            style={{marginTop: -20}}
                            onError={this._showError.bind(this)}
                            startInLoadingState={true}
                        />
                }
            </View>
        );
    }
    
    //webview触发onError事件时，调用方法
    _showError(){
        this.setState({
            isError: true
        });
    }
}
```

在外部调用TWebView组件

```javascript
<View style={styles.container}>
	<TWebView url='https://www.xxxbaidu.com' />
</View>
```

2. 高德地图API完成地图模块

- 创建nearby.html文件，并在toiletPage的TWebView中显示
- 在nearby.html中配置好相应的移动端<meta>属性
- 引入高德地图API，引入相关控件

```javascript
       // 定位控件
        map.plugin('AMap.Geolocation', function () {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,
                timeout: 10000,          
                maximumAge: 0,           
                convert: true,        
                showButton: true,       
                buttonPosition: 'LB',  
                buttonOffset: new AMap.Pixel(10, 20),
                showMarker: true,       
                showCircle: true,        
                panToLocation: true,     
                zoomToAccuracy:true,     
                buttonDom: locationIcon
            });
            map.addControl(geolocation);
          	//返回定位信息
            AMap.event.addListener(geolocation, 'complete', onComplete);
            //返回定位出错信息
            AMap.event.addListener(geolocation, 'error', onError);        
        });

        // 放大缩小控件
        map.plugin(["AMap.ToolBar"],function() {
            map.addControl(new AMap.ToolBar());
        });

        // 比例尺控件
        map.plugin(["AMap.Scale"],function(){
            var scale = new AMap.Scale();
            map.addControl(scale);
        });
```

- 修改控件的样式，可以打开nearby.html，审查元素得到div的id或class
- 分别编写定位成功和失败的回调函数

```javascript
//定位成功执行函数
var onComplete = function(data) {
	map.clearMap();// 清楚所有的覆盖物
	doSearch(data);// 搜索附近的厕所
};

//定位失败执行函数
var onError = function(){
	alert('定位失败！请在手机上开启定位:设置->隐私->定位服务->找厕所->使用应用期间');
};
```
- 编写doSeach方法，整体思路为：

保存用户定位信息，并绘制marker点

```javascript
var pos = data.position;
var marker = new AMap.Marker({
	position: pos,
	map: map,
  	content://自定义样式
});
```

利用高德地图的搜索服务来查找附近的厕所

```javascript
AMap.service(["AMap.PlaceSearch"], function() {
  var placeSearch = new AMap.PlaceSearch({
      ...
  });
  placeSearch.searchNearBy("厕所", pos, 1500, function(status, result){...
```

查找结果保存在pois中，编例出来，并分别绘制marker点

```javascript
var pois = result.poiList.pois;
pois.forEach(function(poi){
	...
}
```

为每一个marker点添加，信息窗体和路径规划导航

```javascript
function showInfo(){
  	var infowindow = new AMap.InfoWindow({
      content: info,
      offset: new AMap.Pixel(40,-35),
      isCustom: true
  	});
	infowindow.open(map, poi.location);
	// 路径规划导航
	walking.clear();
	var start = pos;
	var end = poi.location;
	walking.search(start, end, function(status, result){});
}
```

### 2.5 工具类封装

1. Dimensions模块用于获取设备屏幕的宽高。

```javascript
size : {
	height : Dimensions.get('window').height,
	width : Dimensions.get('window').width,
},
```

2. 获取最小线宽，PixelRatio.get()访问设备的像素密度

```javascript
pixel : 1 / PixelRatio.get(),
```

3. 远程获取页面数据，用fetch代替ajax

```javascript
get : function (url, successCallback, failCallback) {
	return fetch(url)
		.then((response) => response.json())
		.then((responseJson) => {
			successCallback(responseJson);
        })
        .catch((error) => {
        	successCallback(error);
        });
}
```

### 2.6 阅读模块开发

1. 五个模块创建

   - 在read文件夹中创建category.js，list.js，recommend.js，search.js，topic.js五个模块组件
   - 在read模块中应用

   ```javascript
   // 引入ScrollView组件，提供滚动视图功能,NavaigatorIOS组件提供页面导航
   import { ScrollView,NavaigatorIOS } from 'react-native';
   // 引入五个模块
   import Util from './util';
   import Category from './read/category';
   import Recommend from './read/recommend';
   import Search from './read/search';
   import Topic from './read/topic';

   class readView extends Component {
       render(){
           return (
             	//按顺序放置五个模块
               <View>
                   <Search/>
                   <ScrollView>
                       <Topic/>
                       <Recommend/>
                       <Category/>
                       <Recommend/>
                   </ScrollView>
               </View>
           );
       }
   }
   // NavaigatorIOS提供页面导航
   export default class read extends Component {
       render() {
           return (
               <NavigatorIOS
                   initialRoute={{
                       component: readView,
                       title: '阅读',
                   }}
                   style={{flex: 1}}
               />
           );
       }
   }
   ```

   加入ScrollView组件，并且只有在有数据的时候才显示全部内容

   ``` javascript
   <View>
   <Search/>
   {
   // 有数据的时候才显示相应的模块
   	this.state.isShow ?
   	<ScrollView>
   		<Topic/>
   		<Recommend/>
   		<Category/>
   		<Recommend/>
   	</ScrollView>
   	: null
   }
   </View>
   ```

2. 搜索模块组件

   使用react native的TextInput组件来实现文字输入框，并定义其样式

   ```javascript
   <View style={styles.container}>
     <TextInput
         placeholder='搜索'
         placeholderTextColor='#929292'
         style={styles.search_input}
     />
   </View>
   ```

3. 分割线Hr组件

   在read.js中封装Hr组件，编写样式

   ```javascript
   class Hr extends Component {
       render() {
           return (
               <View>
                   <View style={styles.hr}></View>
               </View>
           );
       }
   }
   ```

4. 推荐专题／热门推荐／分类模块

   使用Image／Text组件，布局，修改样式

5. 数据渲染

   利用util中封装的fetch.get方法获取http://localhost:3000/data/read?type=config中的json数据。

   通过setState方法将数据发送给各个组件。


```javascript
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
```

​    组件接受数据

```jsx
<ScrollView style={styles.container}>
	<Topic data={this.state.recommendTopic}/>
	<Hr/>
	<Recommend name="年度推荐"
			   data={this.state.hotTopic}/>
	<Hr/>
	<Category data={this.state.category}/>
	<Hr/>
	<Recommend name="年度大误"
			   data={this.state.other}/>
</ScrollView>
```

​    在每个组件中创建构造函数接收数据

```javascript
    constructor(props){
        super(props);
        this.state = {
            data: props.data,
        }
    }
```

   循环输出视图模块

```javascript
var views = [];
var data = this.state.data;
for (var i in data) {
  views.push(
    <View style={styles.img_item} key={i}>
      <Image style={styles.image}
      		 source={{url:data[i].img}}
      		 resizeMethod='auto'
      />
    </View>
  );
}
```

6. 列表组件
   在category组件中，引入TouchableOpacity组件，点击相应的文字，跳转到不同的列表内容

   ```jsx
   <TouchableOpacity style={styles.item} onPress={this._goToList.bind(this,data[i].text)}>
       <Text style={styles.text}>
           {data[i].text}
       </Text>
   </TouchableOpacity>
   ```


```javascript
   // 拼接url字符串，并将其发送到list组件
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
   // 将data[i].text的值转化成url中的type值
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
```

   在list.js中，使用ListView组件。在构造函数中接收传递过来的url，并实例ListView.DataSource

```javascript
   constructor(props){
       super(props);
       var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
       this.state = {
           url : props.url,
           dataSource: ds.cloneWithRows([]),
       };
   }
```

   ListView 渲染视图

```javascript
   render(){
       return (
       <ListView
           enableEmptySections={true}
           dataSource={this.state.dataSource}
           renderRow={(rowData) => (
               <View style={styles.item}>
                   <View>
                       <Image style={styles.image} source={{url:rowData.img}}/>
                   </View>
               <View style={styles.text_wrapper}>
                   <Text style={styles.title} numberOfLines={1}>{rowData.title}</Text>
                       <Text style={styles.time}>{rowData.time}</Text>
                   </View>
               </View>
           )}
       />
       );
   }
```

   compoentDIdMount中使用Util的get方法，获取数据，setState给dataSource
7. 详情页

使用TouchableOpacity给image添加可点击属性，并编写onPress事件执行函数

```javascript
<TouchableOpacity style={styles.img_item}
    key={i}
    onPress={this._showWebPage.bind(this, data[i].url ,  data[i].title)}
>
<Image style={styles.image}
	source={{url:data[i].img}}
	resizeMethod='auto'
/>
</TouchableOpacity>
```

_showWebPage函数

```javascript
// 展示详情页
_showWebPage(url,title){
    this.props.navigator.push({
        component: TWebView,
        title: title,
        passProps: {
            url: url,
        }
    });
}
```

### 2.7 天气模块

- 在weather.js中载入tWebView模块，使用WebView来渲染页面

- 编写weather.html页面

- 载入高德地图，加载定位控件

- 利用定位的控件讲经纬度信息转化为地理编码

- 利用AMap.Weather服务查询天气，将查询结果添加到HTML页面

  ```javascript
  function showWeather(center){
          // 经纬度转换为地理编码
          AMap.service('AMap.Geocoder', function() {
              var geo = new AMap.Geocoder();
              geo.getAddress(center, function(status, result){
                  if (status === 'complete' && result.info === 'OK') {
                      var district = result.regeocode.addressComponent.district;
                      // 获取天气信息
                      AMap.service('AMap.Weather', function() {
                          var weather = new AMap.Weather();
                          weather.getLive(district, function(err, result){
                              if (err) {return;}
                              // 插入数据
                              document.querySelector('#weather_pro').innerHTML = result.province;
                              document.querySelector('#weather_city').innerHTML = result.city;
                              document.querySelector('#weather_weather').innerHTML = result.weather;
                              document.querySelector('#weather_wind').innerHTML = result.windDirection;
                              document.querySelector('#weather_temp').innerHTML = result.temperature;
                              document.querySelector('#weather_time').innerHTML = result.reportTime;
                          });
                      });
                  }
              });
          });
      }
  ```

### 2.8 设置模块

- 引入子组件

  ```javascript
  import Help from './setting/help';
  import Detail from './setting/detail';
  import Tips from './setting/tips';
  ```

- 编写setting.js，主要通过View／Image／Text／TouchableOpacity／ScrollView等组件

  ```jsx
  <TouchableOpacity
      navigator={this.props.navigator}
      onPress={this._goPage.bind(this,Help,'帮助中心')}>
      <View style={styles.item}>
          <Text style={styles.text}>帮助中心</Text>
      </View>
  </TouchableOpacity>
  ```

- 编写goPage方法用于TouchableOpacity组件切换页面

``` javascript
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
```
- 编写help／detail／tips等组件
