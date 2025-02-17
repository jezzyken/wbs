"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[648],{6648:function(e,s,r){r.r(s),r.d(s,{default:function(){return l}});var a=function(){var e=this,s=e._self._c;return s("div",{staticClass:"login-page"},[s("div",{staticClass:"login-container"},[s("div",{staticClass:"login-header"},[s("img",{attrs:{src:r(4785),alt:"Logo",height:"80"}}),s("h1",[e._v("SITIO BASAC WATER DISTRICT")]),s("p",[e._v("Administrative Portal Login")])]),s("form",{staticClass:"login-form",on:{submit:function(s){return s.preventDefault(),e.handleLogin.apply(null,arguments)}}},[s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"username"}},[e._v("Username or Email")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.credentials.username,expression:"credentials.username"}],attrs:{id:"username",type:"text",required:"",disabled:e.isLoading,placeholder:"Enter your username"},domProps:{value:e.credentials.username},on:{input:function(s){s.target.composing||e.$set(e.credentials,"username",s.target.value)}}})]),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"password"}},[e._v("Password")]),s("div",{staticClass:"password-input"},["checkbox"===(e.showPassword?"text":"password")?s("input",{directives:[{name:"model",rawName:"v-model",value:e.credentials.password,expression:"credentials.password"}],attrs:{id:"password",required:"",disabled:e.isLoading,placeholder:"Enter your password",type:"checkbox"},domProps:{checked:Array.isArray(e.credentials.password)?e._i(e.credentials.password,null)>-1:e.credentials.password},on:{change:function(s){var r=e.credentials.password,a=s.target,t=!!a.checked;if(Array.isArray(r)){var o=null,i=e._i(r,o);a.checked?i<0&&e.$set(e.credentials,"password",r.concat([o])):i>-1&&e.$set(e.credentials,"password",r.slice(0,i).concat(r.slice(i+1)))}else e.$set(e.credentials,"password",t)}}}):"radio"===(e.showPassword?"text":"password")?s("input",{directives:[{name:"model",rawName:"v-model",value:e.credentials.password,expression:"credentials.password"}],attrs:{id:"password",required:"",disabled:e.isLoading,placeholder:"Enter your password",type:"radio"},domProps:{checked:e._q(e.credentials.password,null)},on:{change:function(s){return e.$set(e.credentials,"password",null)}}}):s("input",{directives:[{name:"model",rawName:"v-model",value:e.credentials.password,expression:"credentials.password"}],attrs:{id:"password",required:"",disabled:e.isLoading,placeholder:"Enter your password",type:e.showPassword?"text":"password"},domProps:{value:e.credentials.password},on:{input:function(s){s.target.composing||e.$set(e.credentials,"password",s.target.value)}}}),s("button",{staticClass:"toggle-password",attrs:{type:"button"},on:{click:function(s){e.showPassword=!e.showPassword}}},[e._v(" "+e._s(e.showPassword?"🔓":"🔒")+" ")])])]),e.error?s("div",{staticClass:"error-message"},[e._v(" "+e._s(e.error)+" ")]):e._e(),s("button",{staticClass:"btn btn-primary login-btn",attrs:{type:"submit",disabled:e.isLoading}},[e.isLoading?s("span",{staticClass:"loader"}):e._e(),s("span",{style:{color:"white"}},[e._v(e._s(e.isLoading?"Logging in...":"Login"))])])]),s("div",{staticClass:"login-footer"},[s("p",[e._v("© "+e._s(e.currentYear)+" Sitio Basac Water District")])])])])},t=[],o=(r(4114),{name:"LoginPage",data(){return{credentials:{username:"",password:""},rememberMe:!1,showPassword:!1,isLoading:!1,error:null}},computed:{currentYear(){return(new Date).getFullYear()}},methods:{async handleLogin(){try{await this.$store.dispatch("auth/login",{...this.credentials,rememberMe:this.rememberMe});const e=this.$route.query.redirect||"/admin/dashboard";this.$router.push(e)}catch(e){this.error=e.message||"Login failed"}},handleForgotPassword(){console.log("Forgot password clicked")}}}),i=o,n=r(1656),d=(0,n.A)(i,a,t,!1,null,"0f7da8b0",null),l=d.exports}}]);
//# sourceMappingURL=648.ae55f7eb.js.map