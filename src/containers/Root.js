/**
 * Created by zz on 2016/11/7.
 */
if(process.env.NODE_ENV==='production'){
  module.exports=require('./Root.prod');
}else{
  module.exports=require('./Root.dev');
}
