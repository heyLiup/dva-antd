import fetch from 'dva/fetch';
import fetchJsonp from 'fetch-jsonp';

function parseJSON(response) {
  return response.json();
}

/*function toFormData(json) {
  var str = [];
  for(var key in json){
      str.push(encodeURIComponent(key) + "=" + encodeURIComponent(json[key]));
  }
  return str.join("&");
}*/

function isFunction(fn){  
    return !!fn &&  
        typeof fn != "string" &&  
        !fn.nodeName &&  
        fn.constructor != Array &&  
        /^[\s[]?function/.test(fn + "");  
}

function each(object, callback, args){   
  
  //当需要遍历的是一个对象时,name变量用于记录对象的属性名   
  var name,       
     
  //当需要遍历的是一个数组时,i变量用于记录循环的数组下标   
  i = 0,       
     
  //遍历数组长度,当需要遍历的对象是一个数组时存储数组长度   
  //如果需要遍历的是一个对象,则length === undefined   
  length = object.length,       
     
  //检查第1个参数object是否是一个对象   
  //根据object.length排除数组类型，根据isFunction排除函数类型(因为函数也是对象)   
  isObj = length === undefined || isFunction(object);   
     
  //回调函数具有附加参数时,执行第一个分支   
  //if(!!args) {   
  if (args) {   
         
    //需要遍历的是一个对象   
    if (isObj) {   
           
      //遍历对象属性,name是对象的属性名,再函数顶部已声明   
      //许多人不太习惯for(var name in object)方式,如果不进行声明,则name就会被定义为全局变量   
      for (name in object) {   
         
        //调用callback回调函数,且回调函数的作用域表示为当前属性的值   
        //如:callback() {  this; //函数中的this指向当前属性值   
        //将each的第3个参数args作为回调函数的附加参数   
        if (callback.apply(object[name], args) === false) {   
         
          //如果在callback回调函数中使用return false;则不执行下一次循环   
          break;   
        }   
      }   
    }   
    //需要遍历的是一个数组   
    else {   
     
      //循环长度,循环变量i在函数顶部已定义   
      //循环变量的自增在循环内部执行   
      for (; i < length;) {   
         
        //调用callback函数,与上面注释的callback调用一致   
        //此处callback函数中的this指向当前数组元素   
        if (callback.apply(object[i++], args) === false) {   
            break;   
        }   
      }   
    }   
         
  }   
  //回调函数没有附加参数时,执行第二个分支   
  else {   
     
    //需要遍历的是一个对象   
    if (isObj) {   
       
      //循环对象的属性名,name在函数顶部已定义   
      for (name in object) {   
       
        //调用callback回调函数   
        //在不带参数的对象遍历中,作用域表示为当前属性的值   
        //且回调函数包含两个参数,第一个数当前属性名,第二个是当前属性值   
        //我觉得这句代码修改一下会更好用：if(callback.call(object, name, object[name]) === false) {   
        if (callback.call(object[name], name, object[name]) === false) {   
           
            //如果在callback回调函数中使用return false;则不执行下一次循环   
            break;   
        }   
      }   
    }   
    //需要遍历的是一个数组   
    else {   
      //这里的for写法有点BT,解释为：   
      //var value = object[0];   
      //for(; i < length;) {   
      //    if(false === callback.call(value, i, value)) {   
      //        break;   
      //    }   
      //    value = object[++i];   
      //}   
      //同样,我觉得这里的代码稍加修改会更好用:   
      //for (; i < length && false !== callback.call(object, i, object[i++]);) {   
      //}   
      for (var value = object[0]; i < length && callback.call(value, i, value) !== false; value = object[++i]) {   
      }   
    }   
  }   
     
  //这里返回遍历的对象或数组,但object没有被更改,因此一般不给$.each()赋值   
  //但是如果按照我在注释中所修改的写法来使用,且在callback回调函数中对this(即对object的引用)进行了修改   
  //则这里返回的object是被修改后的对象或数组   
  return object;   
}

function type(obj) {
  var class2type = {};
  each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase();
  });
  return obj == null ?
            String( obj ) :
            class2type[ toString.call(obj) ] || "object";
}

function buildParams( prefix, obj, traditional, add ) {
  var name;

  if ( Array.isArray( obj ) ) {

    // Serialize array item.
    each( obj, function( i, v ) {
      if ( traditional || rbracket.test( prefix ) ) {

        // Treat each array item as a scalar.
        add( prefix, v );

      } else {

        // Item is non-scalar (array or object), encode its numeric index.
        buildParams(
          prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
          v,
          traditional,
          add
        );
      }
    } );

  } else if ( !traditional && type( obj ) === "object" ) {

    // Serialize object item.
    for ( name in obj ) {
      buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
    }

  } else {

    // Serialize scalar item.
    add( prefix, obj );
  }
}

function param( a, traditional ) {
  var prefix,
    s = [],
    add = function( key, valueOrFunction ) {

      // If value is a function, invoke it and use its return value
      var value = isFunction( valueOrFunction ) ?
        valueOrFunction() :
        valueOrFunction;

      s[ s.length ] = encodeURIComponent( key ) + "=" +
        encodeURIComponent( value == null ? "" : value );
    };

  // If an array was passed in, assume that it is an array of form elements.
  if ( Array.isArray( a ) ) {

    // Serialize the form elements
    each( a, function() {
      add( this.name, this.value );
    } );

  } else {

    // If traditional, encode the "old" way (the way 1.3.2 or older
    // did it), otherwise encode params recursively.
    for ( prefix in a ) {
      buildParams( prefix, a[ prefix ], traditional, add );
    }
  }

  // Return the resulting serialization
  return s.join( "&" );
}

function checkStatus(response) {
  if(response.redirected === true) {
    return window.location.href = 'index.html#/login';
  }
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {

  options.credentials = 'include';

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  options.headers = {...headers, ...options.headers};

  if ((options.method === undefined || options.method === 'GET') && options.body != undefined) {
    url += ( /\?/.test( url ) ? "&" : "?" ) + param(options.body);
  }

  if (options.jsonpCallback) {
    return fetchJsonp(url, options)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
  } else {
    if (options.method === 'POST') {
      options.body = param(options.body);
    }

    return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      if(data.success === false && data.errCode === 408) {
        return Promise.reject('登录失效');
      }
      return { data }
    })
    //.catch(err => ({ err }));
  }
}