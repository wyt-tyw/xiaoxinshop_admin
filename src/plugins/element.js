import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
//把弹框组件挂载到了vue的原型对象上，这样每一个组件都可以直接通过this访问到$message，进行弹框提示
Vue.prototype.$message = Message