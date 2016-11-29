/**
 * Created by zz on 2016/11/25.
 */
//var arr=[];
function ObjectArrsort(arr){
  arr.sort(function(a,b){
    return Object.getOwnPropertyNames(a).length-Object.getOwnPropertyNames(b).length
  })
}