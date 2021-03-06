/**
* Author: handan
* intro: 本地存储模块
* date: 2020.10。28
* note:
*/

import WebStorageCache from "web-storage-cache";
let wsCache = new WebStorageCache({
  storage: "localStorage" ,
  exp: 60 * 60 * 24 
})

class Frequency{
  constructor(params = {}){
    this.defaults = {
      day: Infinity,
      frequency: Infinity,
      nowFrequency: 0,
    }

    this.config = Object.assign(this.defaults, params) ;
  }

  /**
   * 
   * @param {string} name 存储key值
   * 每取值一次，取值频次就+1。如果取值次数，大于预存次数则返回null; 
   */
  get(name){
    let cacheData = wsCache.get(name) ;
    if(!(cacheData instanceof Object)) return null ; // 超时或者没有存储过

    let { value, expTime, frequency, nowFrequency } = cacheData || {} ;
    let isSafety = false ; // 获取次数是否在安全值范围内
    if(nowFrequency < frequency){
      isSafety = true ;
    }else{
      isSafety = false ;
    }
    nowFrequency++ ;
    wsCache.set(name, { value, expTime, frequency, nowFrequency }, { exp: expTime })
    return {
      value,
      isSafety,
      nowNumber: nowFrequency,
      maxNumber: frequency,
    } ;
  }

  /**
   * 
   * @param {string} name 存储key值
   * @param {any} value 存储的value值，默认value值 = name值
   * @param {object} options 访问频率配置，{ day: 几天, frequency: 几次, nowFrequency: 当前获取次数 }, day默认值Infinity，无限多天；frequency默认值Infinity，无限多次
   */
  set(name, value = name, options){
    let { day = this.config.day, frequency = this.config.frequency, nowFrequency = this.config.nowFrequency } = options || {} ;
    if(typeof day !== "number" || typeof frequency !== "number"){
      return false ;
    }
    let expTime = "" ;
    if(day === Infinity){
      expTime = Infinity ;
    }else{
      var dateTime = new Date().getTime() + 1000 * 3600 * 24 * day;
      expTime = new Date(dateTime) ;
    }
    wsCache.set(name, { value, expTime ,frequency: Math.floor(frequency), nowFrequency: Math.floor(nowFrequency) }, { exp: expTime })
  }
}

export default Frequency ;