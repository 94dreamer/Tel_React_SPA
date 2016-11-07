/**
 * Created by zz on 2016/11/7.
 */
if(process.env.NODE_ENV==='production'){
  module.exports=require('./configureStore.prod');
}else{
  module.exports=require('./configureStore.dev');
}
