# localStorage带有使用频率限制的本地存储
```
1、存储的数据，带有获取次数记录。常用语运营位展示 n天n次 的业务需求。
2、存储格式支持对象，数组，字符串，number等类型
3、只针对业务中经常使用的场景，代码简单，代码量少
```
## 使用过程

npm install --save hd-localstorage 或 yarn add hd-localstorage
```js
import Frequency from "hd-localstorage" ;
```

## 使用方法介绍

提供了2种常用的方法：get() ，set(). <br />
new Frequency(options)&nbsp;&nbsp;---&nbsp;&nbsp;options配置实例默认值，选填参数 <br />
day:2&nbsp;&nbsp;---&nbsp;&nbsp;配置数据过期时间，单位，天。默认无限大 <br />
frequency: 3&nbsp;&nbsp;---&nbsp;&nbsp;配置数据最大请求次数，单位，次。默认无限大<br />
```js
let frequency = new Frequency({
      day: 2,           // 设置默认几天几次，如果不设置，则默认无数天，无数次
      frequency: 3
})
```

### 1、set()存入操作
方法：set(name, value, params) <br />
参数1：name => 存储的key值 <br />
参数2：value => 存储的value值，默认取name值 <br />
参数3: options{ day: 几天, frequency: 几次 } => <br />
      day: 单位，天，支持浮点数 <br />
      frequency: 单位，次，不支持浮点数 <br />
```js
frequency.set('name') 
frequency.set('name', '张三') 
frequency.set('name', '张三',{ day: 1, frequency: 1 }) //设置一天内只允许获取一次
```

### 2、对get()的获取操作
方法：get(name)<br />
参数1：name => 存储的key值
```js
frequency.get("name") ;
```
返回值：object || null <br />
注：如果没有存储过，或者存储过期，则返回 null，存储值存在并且在有效期范围内，则返回对象
```js
{
      value: "张三" ,   // 存储的value值
      isSafety: true ,  // 当前获取次数是否在安全值范围内
      nowNumber: 1, // 当前获取次数值
      maxNumber: 3, // 设置的获取次数限制
}
```

