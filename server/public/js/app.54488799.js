(function(){var e={8362:function(e,t,a){"use strict";var n=a(4335);let s=!0;const r=s?"https://basak.onrender.com/api":"http://localhost:3000/api",o=n.A.create({baseURL:r,timeout:1e4,headers:{"Content-Type":"application/json",Accept:"application/json"}});o.interceptors.request.use((e=>{const t=localStorage.getItem("token");return t&&(e.headers.Authorization=`Bearer ${t}`),e}),(e=>Promise.reject(e))),t.A=o},5553:function(e,t,a){"use strict";var n=a(5471),s=a(5668),r=function(){var e=this,t=e._self._c;return t(s.A,[t("router-view"),e.isLoading?t("div",{staticClass:"global-loader"},[t("div",{staticClass:"loader-spinner"})]):e._e(),e.notification.show?t("div",{class:["notification",`notification-${e.notification.type}`]},[e._v(" "+e._s(e.notification.message)+" "),t("button",{staticClass:"notification-close",on:{click:e.closeNotification}},[e._v("×")])]):e._e()],1)},o=[],i=a(5353),c={name:"App",data(){return{notification:{show:!1,message:"",type:"info",timeout:null},isLoading:!1}},computed:{...(0,i.aH)({isLoading:e=>e.app.isLoading,isAuthenticated:e=>e.auth.isAuthenticated})},created(){this.$root.$on("show-notification",this.showNotification),this.checkAuth()},beforeDestroy(){this.$root.$off("show-notification",this.showNotification),this.notification.timeout&&clearTimeout(this.notification.timeout)},methods:{async checkAuth(){try{const e=localStorage.getItem("token");e&&await this.$store.dispatch("auth/validateToken",e)}catch(e){console.error("Auth check failed:",e)}},showNotification({message:e,type:t="info",duration:a=5e3}){this.notification.timeout&&clearTimeout(this.notification.timeout),this.notification={show:!0,message:e,type:t,timeout:setTimeout((()=>{this.closeNotification()}),a)}},closeNotification(){this.notification.show=!1,this.notification.timeout&&clearTimeout(this.notification.timeout)}}},l=c,u=a(1656),m=(0,u.A)(l,r,o,!1,null,null,null),d=m.exports,E=a(3723);(0,E.k)("/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});a(8111),a(3579);var h=a(173),S=function(){var e=this,t=e._self._c;return t("div",{staticClass:"admin-layout"},[t("header",{staticClass:"gov-header"},[t("span",[e._v(e._s(e.localDate))]),e._v(" • "),t("span",[e._v(e._s(e.localTime))])]),t("header",{staticClass:"main-header"},[t("div",{staticClass:"header-content"},[t("div",{staticClass:"logo-section"},[t("img",{attrs:{src:a(4785),alt:"Logo",height:"80"}}),e._m(0)])])]),t("nav",{staticClass:"nav-bar"},[t("div",{staticClass:"nav-content"},[t("ul",{staticClass:"nav-links"},e._l(e.menuItems,(function(a){return t("li",{key:a.text},[t("router-link",{class:{active:e.isActiveRoute(a.link)},attrs:{to:a.link}},[e._v(" "+e._s(a.text)+" ")])],1)})),0),t("div",{staticClass:"user-section"},[t("span",[e._v("Welcome, "+e._s(e.userName))]),t("button",{staticClass:"btn btn-outline",on:{click:e.handleLogout}},[e._v("Logout")])])])]),t("main",{staticClass:"main-container"},[t("router-view")],1)])},R=[function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"logo-text"},[e._v("SITIO BASAK WATER DISTRICT")]),t("div",{staticClass:"logo-subtext"},[e._v("Malandag Malungon Sarangani Province")])])}],_=(a(4114),{name:"AdminLayout",data(){return{localDate:"",localTime:"",timer:null}},created(){this.updateDateTime(),this.timer=setInterval(this.updateDateTime,1e3)},beforeDestroy(){this.timer&&clearInterval(this.timer)},computed:{menuItems(){const e=[{text:"Dashboard",link:"/admin/dashboard",roles:["admin","collection_officer"]},{text:"Consumer Records",link:"/admin/consumers",roles:["admin","collection_officer"],children:[{text:"Add Consumer",link:"/admin/consumers/add"},{text:"View Consumers",link:"/admin/consumers/view"},{text:"Consumer Categories",link:"/admin/consumers/categories"}]},{text:"Billing",link:"/admin/billing",roles:["admin","collection_officer"]},{text:"Readings",link:"/admin/readings",roles:["admin"]},{text:"Expenses",link:"/admin/expenses",roles:["admin","collection_officer"]},{text:"Users",link:"/admin/users",roles:["admin"]},{text:"Reports",link:"/admin/reports",roles:["admin"]}];return e.filter((e=>!e.roles||e.roles.includes(this.userRole)))},userRole(){return this.$store.state.auth.user?.role},userName(){return this.$store.state.auth.user?.username||"Guest"}},methods:{updateDateTime(){const e=new Date;this.localDate=e.toLocaleDateString("en-PH",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),this.localTime=e.toLocaleTimeString("en-PH",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0})},isActiveRoute(e){return this.$route.path===e},async handleLogout(){try{await this.$store.dispatch("auth/logout"),this.$router.push("/login")}catch(e){console.error("Logout failed:",e)}}}}),y=_,T=(0,u.A)(y,S,R,!1,null,"10c782a1",null),f=T.exports,p=function(){var e=this,t=e._self._c;return t("div",{staticClass:"public-layout"},[t("header",{staticClass:"gov-header"},[t("span",[e._v(e._s(e.localDate))]),e._v(" • "),t("span",[e._v(e._s(e.localTime))])]),t("header",{staticClass:"main-header"},[t("div",{staticClass:"header-content"},[t("div",{staticClass:"logo-section"},[t("img",{attrs:{src:a(4785),alt:"Logo",height:"80"}}),e._m(0)]),t("nav",{staticClass:"public-nav"},[t("ul",{staticClass:"nav-links"},e._l(e.menuItems,(function(a){return t("li",{key:a.text},[t("router-link",{class:{active:e.isActiveRoute(a.link)},attrs:{to:a.link}},[e._v(" "+e._s(a.text)+" ")])],1)})),0),t("button",{staticClass:"btn btn-primary",on:{click:e.handleAuthButton}},[e._v(" "+e._s(e.isAuthenticated?"Dashboard":"Login")+" ")])])])]),t("main",{staticClass:"public-main"},[t("router-view")],1),t("footer",{staticClass:"public-footer"},[t("div",{staticClass:"footer-content"},[t("div",{staticClass:"footer-grid"},[e._m(1),t("div",{staticClass:"footer-section"},[t("h3",[e._v("Quick Links")]),t("ul",[t("li",[t("router-link",{attrs:{to:"/bill-inquiry"}},[e._v("Bill Inquiry")])],1)])]),e._m(2)]),t("div",{staticClass:"footer-bottom"},[t("p",[e._v(" © "+e._s(e.currentYear)+" Sitio Basak Water District. All rights reserved. ")])])])])])},g=[function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"logo-text"},[e._v("SITIO BASAK WATER DISTRICT")]),t("div",{staticClass:"logo-subtext"},[e._v("Malandag Malungon Sarangani Province")])])},function(){var e=this,t=e._self._c;return t("div",{staticClass:"footer-section"},[t("h3",[e._v("Contact Us")]),t("p",[e._v("Sitio Basak, Malandag")]),t("p",[e._v("Malungon, Sarangani Province")]),t("p",[e._v("Phone: (123) 456-7890")]),t("p",[e._v("Email: info@sitiobasakwd.gov.ph")])])},function(){var e=this,t=e._self._c;return t("div",{staticClass:"footer-section"},[t("h3",[e._v("Office Hours")]),t("p",[e._v("Monday - Friday: 8:00 AM - 5:00 PM")]),t("p",[e._v("Saturday: 8:00 AM - 12:00 PM")]),t("p",[e._v("Sunday: Closed")])])}],A={name:"PublicLayout",data(){return{menuItems:[{text:"Home",link:"/"},{text:"Bill Inquiry",link:"/bill-inquiry"}],localDate:"",localTime:"",timer:null}},computed:{...(0,i.L8)("auth",["isAuthenticated"]),...(0,i.aH)("auth",["user"]),currentYear(){return(new Date).getFullYear()}},created(){this.updateDateTime(),this.timer=setInterval(this.updateDateTime,1e3)},beforeDestroy(){this.timer&&clearInterval(this.timer)},methods:{updateDateTime(){const e=new Date;this.localDate=e.toLocaleDateString("en-PH",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),this.localTime=e.toLocaleTimeString("en-PH",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0})},isActiveRoute(e){return this.$route.path===e},navigateToLogin(){this.$router.push("/login")},handleAuthButton(){if(this.isAuthenticated){const e={admin:"/admin/dashboard",meter_reader:"/meter-reader/dashboard",collection_officer:"/collection/dashboard"},t=e[this.user?.role]||"/admin/dashboard";this.$router.push(t)}else this.$router.push("/login")}}},O=A,N=(0,u.A)(O,p,g,!1,null,"593fd946",null),L=N.exports;a(7588);n.Ay.use(i.Ay);const I=new i.Ay.Store({}),v=a(8043);v.keys().forEach((e=>{const t=e.replace(/(\.\/|\.js)/g,"");I.registerModule(t,v(e).default)}));var w=I;n.Ay.use(h.Ay);const D=[{path:"/",component:L,children:[{path:"",name:"Home",component:()=>a.e(28).then(a.bind(a,7028))},{path:"bill-inquiry",name:"BillInquiry",component:()=>Promise.all([a.e(93),a.e(767)]).then(a.bind(a,3767))},{path:"contact",name:"ContactUs",component:()=>a.e(78).then(a.bind(a,2078))},{path:"annoucements",name:"Annoucements",component:()=>a.e(214).then(a.bind(a,6214))}]},{path:"/admin",component:f,meta:{requiresAuth:!0},children:[{path:"",redirect:"dashboard"},{path:"dashboard",name:"Dashboard",component:()=>Promise.all([a.e(416),a.e(444)]).then(a.bind(a,1444))},{path:"consumers",name:"ConsumerRecords",component:()=>Promise.all([a.e(416),a.e(117),a.e(506),a.e(64),a.e(461),a.e(413)]).then(a.bind(a,4255))},{path:"billing",name:"Billing",component:()=>Promise.all([a.e(416),a.e(117),a.e(506),a.e(64),a.e(93),a.e(940)]).then(a.bind(a,7675))},{path:"payments",name:"Payments",component:()=>Promise.all([a.e(416),a.e(117),a.e(461),a.e(296)]).then(a.bind(a,4877)),props:!0},{path:"readings",name:"Readings",component:()=>Promise.all([a.e(416),a.e(117),a.e(506),a.e(535)]).then(a.bind(a,3376))},{path:"users",name:"Users",component:()=>Promise.all([a.e(416),a.e(117),a.e(506),a.e(64),a.e(461),a.e(261)]).then(a.bind(a,399))},{path:"expenses",name:"Expenses",component:()=>Promise.all([a.e(416),a.e(117),a.e(506),a.e(64),a.e(461),a.e(93),a.e(282)]).then(a.bind(a,9700))},{path:"reports",name:"Reports",component:()=>Promise.all([a.e(416),a.e(117),a.e(506),a.e(64),a.e(695)]).then(a.bind(a,3372))},{path:"settings",name:"Settings",component:()=>a.e(49).then(a.bind(a,3049))}]},{path:"/login",name:"Login",component:()=>a.e(179).then(a.bind(a,2179))}],C=new h.Ay({mode:"history",base:"/",routes:D});C.beforeEach(((e,t,a)=>{if("/login"!==e.path)if(e.matched.some((e=>e.meta.requiresAuth)))if(w.getters["auth/isAuthenticated"]){const t=w.getters["auth/userRole"];e.meta.roles&&!e.meta.roles.includes(t)?a("/unauthorized"):a()}else a({path:"/login",query:{redirect:e.fullPath}});else a();else w.getters["auth/isAuthenticated"]?a("/admin/dashboard"):a()}));var b=C,G=a(3971);n.Ay.use(G.A);var P=new G.A({theme:{themes:{light:{primary:"#003875",secondary:"#1a4c7c",accent:"#c8102e",success:"#28a745",warning:"#ffc107",danger:"#dc3545",background:"#f5f7fa",border:"#dee2e6"}},options:{customProperties:!0}}});n.Ay.config.productionTip=!1,new n.Ay({router:b,store:w,vuetify:P,render:e=>e(d)}).$mount("#app")},8985:function(e,t,a){"use strict";a.r(t);var n=a(8362);t["default"]={namespaced:!0,state:{user:JSON.parse(localStorage.getItem("user")),token:localStorage.getItem("token"),loading:!1,error:null},mutations:{SET_USER(e,t){e.user=t,t?localStorage.setItem("user",JSON.stringify(t)):localStorage.removeItem("user")},SET_TOKEN(e,t){e.token=t,t?(localStorage.setItem("token",t),n.A.defaults.headers.common["Authorization"]=`Bearer ${t}`):(localStorage.removeItem("token"),delete n.A.defaults.headers.common["Authorization"])},SET_LOADING(e,t){e.loading=t},SET_ERROR(e,t){e.error=t}},actions:{async login({commit:e},t){e("SET_LOADING",!0);try{const{data:a}=await n.A.post("/auths/login",t);return console.log(a),e("SET_USER",a.user),e("SET_TOKEN",a.token),e("SET_ERROR",null),a.user}catch(a){throw e("SET_ERROR",a.response?.data?.error||"Login failed"),a}finally{e("SET_LOADING",!1)}},async verifyToken({commit:e}){const t=localStorage.getItem("token");if(!t)return null;try{n.A.defaults.headers.common["Authorization"]=`Bearer ${t}`;const{data:a}=await n.A.post("/auths/verify-token");return e("SET_USER",a.user),e("SET_TOKEN",t),a.user}catch(a){throw e("SET_USER",null),e("SET_TOKEN",null),a}},logout({commit:e}){e("SET_USER",null),e("SET_TOKEN",null)}},getters:{isAuthenticated:e=>!!e.token&&!!e.user,userRole:e=>e.user?.role}}},5631:function(e,t,a){"use strict";a.r(t);a(8111),a(116);var n=a(8362);t["default"]={namespaced:!0,state:{bills:[],currentBill:null,loading:!1,error:null,billTemplate:null},mutations:{SET_BILLS(e,t){e.bills=t},SET_CURRENT_BILL(e,t){e.currentBill=t},SET_LOADING(e,t){e.loading=t},SET_ERROR(e,t){e.error=t},SET_BILL_TEMPLATE(e,t){e.billTemplate=t}},actions:{async fetchBills({commit:e},t){e("SET_LOADING",!0);try{let a="/bills";t?.to&&(a+=`?to=${t.to}`);const{data:s}=await n.A.get(a);e("SET_BILLS",s),e("SET_ERROR",null)}catch(a){e("SET_ERROR",a.message)}finally{e("SET_LOADING",!1)}},async fetchUnpaidBills({commit:e},t){e("SET_LOADING",!0);try{const{data:a}=await n.A.get(`/bills?consumerId=${t}&status=unpaid`);return e("SET_ERROR",null),a}catch(a){throw e("SET_ERROR",a.message),a}finally{e("SET_LOADING",!1)}},async fetchBillById({commit:e},t){e("SET_LOADING",!0);try{const{data:a}=await n.A.get(`/bills/${t}`);return e("SET_CURRENT_BILL",a),e("SET_ERROR",null),a}catch(a){throw e("SET_ERROR",a.message),a}finally{e("SET_LOADING",!1)}},async fetchBillByAccountNo({commit:e},t){e("SET_LOADING",!0);try{const{data:a}=await n.A.get(`/bills/inquiry/${t}`);return e("SET_CURRENT_BILL",a),e("SET_ERROR",null),a}catch(a){throw e("SET_ERROR",a.response?.data?.message||a.message),a}finally{e("SET_LOADING",!1)}},async createBill({commit:e,dispatch:t},a){e("SET_LOADING",!0);try{const{data:e}=await n.A.post("/bills",a);return await t("fetchBills"),e}catch(s){throw e("SET_ERROR",s.message),s}finally{e("SET_LOADING",!1)}},async updateBill({commit:e,dispatch:t},{id:a,bill:s}){e("SET_LOADING",!0);try{const{data:e}=await n.A.put(`/bills/${a}`,s);return await t("fetchBills"),e}catch(r){throw e("SET_ERROR",r.message),r}finally{e("SET_LOADING",!1)}},async fetchBillTemplate({commit:e}){e("SET_LOADING",!0);try{const{data:t}=await n.A.get("/bills/template/html");return e("SET_BILL_TEMPLATE",t),e("SET_ERROR",null),t}catch(t){throw e("SET_ERROR",t.message),t}finally{e("SET_LOADING",!1)}}},getters:{getBillById:e=>t=>e.bills.find((e=>e._id===t)),sortedBills:e=>[...e.bills].sort(((e,t)=>new Date(t.createdAt)-new Date(e.createdAt))),isLoading:e=>e.loading,hasError:e=>null!==e.error}}},1518:function(e,t,a){"use strict";a.r(t);var n=a(8362);t["default"]={namespaced:!0,state:{consumers:[],currentConsumer:null,loading:!1,error:null},mutations:{SET_CONSUMERS(e,t){e.consumers=t},SET_CURRENT_CONSUMER(e,t){e.currentConsumer=t},SET_LOADING(e,t){e.loading=t},SET_ERROR(e,t){e.error=t}},actions:{async fetchConsumers({commit:e}){e("SET_LOADING",!0);try{const{data:t}=await n.A.get("/consumers");e("SET_CONSUMERS",t),e("SET_ERROR",null)}catch(t){e("SET_ERROR",t.message)}finally{e("SET_LOADING",!1)}},async fetchConsumerById({commit:e},t){e("SET_LOADING",!0);try{const{data:a}=await n.A.get(`/consumers/${t}`);return e("SET_CURRENT_CONSUMER",a),e("SET_ERROR",null),a}catch(a){throw e("SET_ERROR",a.message),a}finally{e("SET_LOADING",!1)}},async createConsumer({commit:e,dispatch:t},a){e("SET_LOADING",!0);try{await n.A.post("/consumers",a),await t("fetchConsumers")}catch(s){throw e("SET_ERROR",s.message),s}finally{e("SET_LOADING",!1)}},async updateConsumer({commit:e,dispatch:t},{id:a,consumer:s}){e("SET_LOADING",!0);try{await n.A.put(`/consumers/${a}`,s),await t("fetchConsumers")}catch(r){throw e("SET_ERROR",r.message),r}finally{e("SET_LOADING",!1)}},async archiveConsumer({commit:e,dispatch:t},{id:a,reason:s}){e("SET_LOADING",!0);try{await n.A.delete(`/consumers/${a}`,{data:{reason:s}}),await t("fetchConsumers")}catch(r){throw e("SET_ERROR",r.message),r}finally{e("SET_LOADING",!1)}}}}},9342:function(e,t,a){"use strict";a.r(t);var n=a(8362);t["default"]={namespaced:!0,state:{summary:{totalConsumers:0,activeConsumers:0,totalUnpaidBills:0,totalOverdueBills:0,currentMonthReadings:0,monthlyExpenses:0},collections:[],consumerStatus:[],expenseSummary:[],recentActivities:{recentBills:[],recentReadings:[]},loading:!1,error:null},mutations:{SET_SUMMARY(e,t){e.summary=t},SET_COLLECTIONS(e,t){e.collections=t},SET_CONSUMER_STATUS(e,t){e.consumerStatus=t},SET_EXPENSE_SUMMARY(e,t){e.expenseSummary=t},SET_RECENT_ACTIVITIES(e,t){e.recentActivities=t},SET_LOADING(e,t){e.loading=t},SET_ERROR(e,t){e.error=t}},actions:{async fetchDashboardSummary({commit:e}){e("SET_LOADING",!0);try{const{data:t}=await n.A.get("/dashboards/summary");e("SET_SUMMARY",t),e("SET_ERROR",null)}catch(t){e("SET_ERROR",t.message)}finally{e("SET_LOADING",!1)}},async fetchCollections({commit:e}){e("SET_LOADING",!0);try{const{data:t}=await n.A.get("/dashboards/collections");e("SET_COLLECTIONS",t),e("SET_ERROR",null)}catch(t){e("SET_ERROR",t.message)}finally{e("SET_LOADING",!1)}},async fetchConsumerStatus({commit:e}){e("SET_LOADING",!0);try{const{data:t}=await n.A.get("/dashboards/consumer-status");e("SET_CONSUMER_STATUS",t),e("SET_ERROR",null)}catch(t){e("SET_ERROR",t.message)}finally{e("SET_LOADING",!1)}},async fetchExpenseSummary({commit:e}){e("SET_LOADING",!0);try{const{data:t}=await n.A.get("/dashboards/expenses");e("SET_EXPENSE_SUMMARY",t),e("SET_ERROR",null)}catch(t){e("SET_ERROR",t.message)}finally{e("SET_LOADING",!1)}},async fetchRecentActivities({commit:e}){e("SET_LOADING",!0);try{const{data:t}=await n.A.get("/dashboards/recent-activities");e("SET_RECENT_ACTIVITIES",t),e("SET_ERROR",null)}catch(t){e("SET_ERROR",t.message)}finally{e("SET_LOADING",!1)}},async fetchAllDashboardData({dispatch:e}){try{await Promise.all([e("fetchDashboardSummary"),e("fetchCollections"),e("fetchConsumerStatus"),e("fetchExpenseSummary"),e("fetchRecentActivities")])}catch(t){console.error("Error fetching dashboard data:",t)}}},getters:{getSummary:e=>e.summary,getCollections:e=>e.collections,getConsumerStatus:e=>e.consumerStatus,getExpenseSummary:e=>e.expenseSummary,getRecentActivities:e=>e.recentActivities,isLoading:e=>e.loading,getError:e=>e.error}}},3862:function(e,t,a){"use strict";a.r(t);a(8111),a(2489),a(8237);var n=a(8362);t["default"]={namespaced:!0,state:{expenses:[],currentExpense:null,loading:!1,error:null},mutations:{SET_EXPENSES(e,t){e.expenses=t},SET_CURRENT_EXPENSE(e,t){e.currentExpense=t},SET_LOADING(e,t){e.loading=t},SET_ERROR(e,t){e.error=t}},actions:{async fetchExpenses({commit:e}){e("SET_LOADING",!0);try{const{data:t}=await n.A.get("/expenses");e("SET_EXPENSES",t),e("SET_ERROR",null)}catch(t){e("SET_ERROR",t.message)}finally{e("SET_LOADING",!1)}},async fetchExpenseById({commit:e},t){e("SET_LOADING",!0);try{const{data:a}=await n.A.get(`/expenses/${t}`);return e("SET_CURRENT_EXPENSE",a),e("SET_ERROR",null),a}catch(a){throw e("SET_ERROR",a.message),a}finally{e("SET_LOADING",!1)}},async createExpense({commit:e,dispatch:t},a){e("SET_LOADING",!0);try{const{data:e}=await n.A.post("/expenses",a);return await t("fetchExpenses"),e}catch(s){throw e("SET_ERROR",s.message),s}finally{e("SET_LOADING",!1)}},async updateExpense({commit:e,dispatch:t},{id:a,expense:s}){e("SET_LOADING",!0);try{const{data:e}=await n.A.put(`/expenses/${a}`,s);return await t("fetchExpenses"),e}catch(r){throw e("SET_ERROR",r.message),r}finally{e("SET_LOADING",!1)}},async deleteExpense({commit:e,dispatch:t},a){e("SET_LOADING",!0);try{await n.A.delete(`/api/expenses/${a}`),await t("fetchExpenses")}catch(s){throw e("SET_ERROR",s.message),s}finally{e("SET_LOADING",!1)}}},getters:{totalExpenses:e=>e.expenses.reduce(((e,t)=>e+t.amount),0),expensesByType:e=>t=>e.expenses.filter((e=>e.expenseType===t))}}},868:function(e,t,a){"use strict";a.r(t);a(8111),a(2489),a(8237);var n=a(8362);t["default"]={namespaced:!0,state:{payments:[],currentPayment:null,loading:!1,error:null},mutations:{SET_PAYMENTS(e,t){e.payments=t},SET_CURRENT_PAYMENT(e,t){e.currentPayment=t},SET_LOADING(e,t){e.loading=t},SET_ERROR(e,t){e.error=t}},actions:{async fetchPayments({commit:e}){e("SET_LOADING",!0);try{const{data:t}=await n.A.get("/payments");e("SET_PAYMENTS",t),e("SET_ERROR",null)}catch(t){throw e("SET_ERROR",t.message),t}finally{e("SET_LOADING",!1)}},async fetchPaymentById({commit:e},t){e("SET_LOADING",!0);try{const{data:a}=await n.A.get(`/payments/${t}`);return e("SET_CURRENT_PAYMENT",a),e("SET_ERROR",null),a}catch(a){throw e("SET_ERROR",a.message),a}finally{e("SET_LOADING",!1)}},async createPayment({commit:e,dispatch:t},a){e("SET_LOADING",!0);try{const{data:s}=await n.A.post("/payments",a);return await t("fetchPayments"),e("SET_ERROR",null),s}catch(s){throw e("SET_ERROR",s.message),s}finally{e("SET_LOADING",!1)}},async updatePayment({commit:e,dispatch:t},{id:a,payment:s}){e("SET_LOADING",!0);try{const{data:r}=await n.A.put(`/payments/${a}`,s);return await t("fetchPayments"),e("SET_ERROR",null),r}catch(r){throw e("SET_ERROR",r.message),r}finally{e("SET_LOADING",!1)}},clearCurrentPayment({commit:e}){e("SET_CURRENT_PAYMENT",null)},clearError({commit:e}){e("SET_ERROR",null)}},getters:{getPaymentsByType:e=>t=>e.payments.filter((e=>e.paymentType===t)),getPaymentsByConsumer:e=>t=>e.payments.filter((e=>e.consumerId===t)),getTotalPayments:e=>e.payments.reduce(((e,t)=>e+t.amount),0),getPendingPayments:e=>e.payments.filter((e=>"pending"===e.status)),getCompletedPayments:e=>e.payments.filter((e=>"completed"===e.status)),isProcessing:e=>e.loading,getCurrentPayment:e=>e.currentPayment}}},3686:function(e,t,a){"use strict";a.r(t);a(8111),a(2489),a(8237);var n=a(8362);t["default"]={namespaced:!0,state:{readings:[],currentReading:null,loading:!1,error:null},mutations:{SET_READINGS(e,t){e.readings=t},SET_CURRENT_READING(e,t){e.currentReading=t},SET_LOADING(e,t){e.loading=t},SET_ERROR(e,t){e.error=t},UPDATE_READING(e,t){const a=e.readings.findIndex((e=>e._id===t._id));-1!==a&&(e.readings[a]=t)}},actions:{async fetchReadings({commit:e}){e("SET_LOADING",!0);try{const{data:t}=await n.A.get("/meterreadings");e("SET_READINGS",t),e("SET_ERROR",null)}catch(t){throw e("SET_ERROR",t.message),t}finally{e("SET_LOADING",!1)}},async fetchReading({commit:e},t){e("SET_LOADING",!0);try{const{data:a}=await n.A.get(`/meterreadings/${t}`);return e("SET_CURRENT_READING",a),e("SET_ERROR",null),a}catch(a){throw e("SET_ERROR",a.message),a}finally{e("SET_LOADING",!1)}},async createReading({commit:e,dispatch:t},a){e("SET_LOADING",!0);try{const{data:s}=await n.A.post("/meterreadings",{...a,consumption:a.currentReading-a.previousReading});return await t("fetchReadings"),e("SET_ERROR",null),s}catch(s){throw e("SET_ERROR",s.message),s}finally{e("SET_LOADING",!1)}},async updateReading({commit:e,dispatch:t},{id:a,readingData:s}){e("SET_LOADING",!0);try{const{data:r}=await n.A.put(`/meterreadings/${a}`,{...s,consumption:s.currentReading-s.previousReading});return await t("fetchReadings"),e("SET_ERROR",null),r}catch(r){throw e("SET_ERROR",r.message),r}finally{e("SET_LOADING",!1)}},async filterReadings({commit:e},{startDate:t,endDate:a}){e("SET_LOADING",!0);try{const{data:s}=await n.A.get("/meterreadings",{params:{startDate:t,endDate:a}});e("SET_READINGS",s),e("SET_ERROR",null)}catch(s){throw e("SET_ERROR",s.message),s}finally{e("SET_LOADING",!1)}}},getters:{getReadingsByConsumer:e=>t=>e.readings.filter((e=>e.consumerId===t)),getLatestReading:e=>t=>e.readings.filter((e=>e.consumerId===t)).sort(((e,t)=>new Date(t.readingDate)-new Date(e.readingDate)))[0],getReadingsByStatus:e=>t=>e.readings.filter((e=>e.status===t)),getTotalConsumption:e=>e.readings.reduce(((e,t)=>e+t.consumption),0)}}},1104:function(e,t,a){"use strict";a.r(t);var n=a(8362);const s={collections:{data:[],summary:null,loading:!1,error:null},expenses:{data:[],summary:null,loading:!1,error:null},annualSummary:{data:null,loading:!1,error:null},dateRange:{startDate:null,endDate:null},currentPeriod:{type:"daily",date:null,month:null,year:null}},r={SET_COLLECTIONS(e,{data:t,summary:a}){e.collections.data=t,e.collections.summary=a},SET_EXPENSES(e,{data:t,summary:a}){e.expenses.data=t,e.expenses.summary=a},SET_ANNUAL_SUMMARY(e,t){e.annualSummary.data=t},SET_COLLECTIONS_LOADING(e,t){e.collections.loading=t},SET_EXPENSES_LOADING(e,t){e.expenses.loading=t},SET_ANNUAL_SUMMARY_LOADING(e,t){e.annualSummary.loading=t},SET_COLLECTIONS_ERROR(e,t){e.collections.error=t},SET_EXPENSES_ERROR(e,t){e.expenses.error=t},SET_ANNUAL_SUMMARY_ERROR(e,t){e.annualSummary.error=t},SET_DATE_RANGE(e,{startDate:t,endDate:a}){e.dateRange={startDate:t,endDate:a}},SET_CURRENT_PERIOD(e,t){e.currentPeriod={...e.currentPeriod,...t}}},o={async fetchDailyCollections({commit:e},t){try{e("SET_COLLECTIONS_LOADING",!0);const a=await n.A.get("/reports/collections/daily",{params:{date:t}});e("SET_COLLECTIONS",{data:a.data.collections,summary:a.data.summary}),e("SET_CURRENT_PERIOD",{type:"daily",date:t})}catch(a){throw e("SET_COLLECTIONS_ERROR",a.message),a}finally{e("SET_COLLECTIONS_LOADING",!1)}},async fetchMonthlyCollections({commit:e},{month:t,year:a}){try{e("SET_COLLECTIONS_LOADING",!0);const s=await n.A.get("/reports/collections/monthly",{params:{month:t,year:a}});e("SET_COLLECTIONS",{data:s.data.collections,summary:s.data.summary}),e("SET_CURRENT_PERIOD",{type:"monthly",month:t,year:a})}catch(s){throw e("SET_COLLECTIONS_ERROR",s.message),s}finally{e("SET_COLLECTIONS_LOADING",!1)}},async fetchDailyExpenses({commit:e},t){try{e("SET_EXPENSES_LOADING",!0);const a=await n.A.get("/reports/expenses/daily",{params:{date:t}});e("SET_EXPENSES",{data:a.data.expenses,summary:a.data.summary}),e("SET_CURRENT_PERIOD",{type:"daily",date:t})}catch(a){throw e("SET_EXPENSES_ERROR",a.message),a}finally{e("SET_EXPENSES_LOADING",!1)}},async fetchMonthlyExpenses({commit:e},{month:t,year:a}){try{e("SET_EXPENSES_LOADING",!0);const s=await n.A.get("/reports/expenses/monthly",{params:{month:t,year:a}});e("SET_EXPENSES",{data:s.data.expenses,summary:s.data.summary}),e("SET_CURRENT_PERIOD",{type:"monthly",month:t,year:a})}catch(s){throw e("SET_EXPENSES_ERROR",s.message),s}finally{e("SET_EXPENSES_LOADING",!1)}},async fetchAnnualSummary({commit:e},t){try{e("SET_ANNUAL_SUMMARY_LOADING",!0);const a=await n.A.get("/reports/annual-summary",{params:{year:t}});e("SET_ANNUAL_SUMMARY",a.data.summary),e("SET_CURRENT_PERIOD",{type:"annual",year:t})}catch(a){throw e("SET_ANNUAL_SUMMARY_ERROR",a.message),a}finally{e("SET_ANNUAL_SUMMARY_LOADING",!1)}}},i={collectionsSummary:e=>e.collections.summary,expensesSummary:e=>e.expenses.summary,annualSummaryData:e=>e.annualSummary.data,totalCollections:e=>e.collections.summary?.totalAmount||0,totalExpenses:e=>e.expenses.summary?.totalAmount||0,totalReceived:e=>e.collections.summary?.totalReceived||0,totalChange:e=>e.collections.summary?.totalChange||0,netIncome:(e,t)=>t.totalCollections-t.totalExpenses,collectionsByPaymentMethod:e=>e.collections.summary?.byPaymentMethod||{},collectionsByPaymentType:e=>e.collections.summary?.byPaymentType||{},expensesByType:e=>e.expenses.summary?.byExpenseType||{},dailyCollectionsSummary:e=>e.collections.summary?.dailySummary||{},dailyExpensesSummary:e=>e.expenses.summary?.dailySummary||{},isLoadingCollections:e=>e.collections.loading,isLoadingExpenses:e=>e.expenses.loading,isLoadingAnnualSummary:e=>e.annualSummary.loading,hasCollectionsError:e=>!!e.collections.error,hasExpensesError:e=>!!e.expenses.error,hasAnnualSummaryError:e=>!!e.annualSummary.error,collectionsError:e=>e.collections.error,expensesError:e=>e.expenses.error,annualSummaryError:e=>e.annualSummary.error,currentPeriodInfo:e=>e.currentPeriod,totalTransactions:e=>({collections:e.collections.summary?.totalTransactions||0,expenses:e.expenses.summary?.totalTransactions||0}),monthlyStats:e=>e.annualSummary.data?.monthlySummary||[],yearlyTotals:e=>({collections:e.annualSummary.data?.totalCollections||0,expenses:e.annualSummary.data?.totalExpenses||0,netIncome:e.annualSummary.data?.netIncome||0})};t["default"]={namespaced:!0,state:s,mutations:r,actions:o,getters:i}},4295:function(e,t,a){"use strict";a.r(t);var n=a(8362);t["default"]={namespaced:!0,state:{users:[],currentUser:null,loading:!1,error:null},mutations:{SET_USERS(e,t){e.users=t},SET_CURRENT_USER(e,t){e.currentUser=t},SET_LOADING(e,t){e.loading=t},SET_ERROR(e,t){e.error=t}},actions:{async fetchCurrentUser({commit:e}){e("SET_LOADING",!0);try{const{data:t}=await n.A.get("/users/me");e("SET_CURRENT_USER",t),e("SET_ERROR",null)}catch(t){throw e("SET_ERROR",t.message),t}finally{e("SET_LOADING",!1)}},async updateCurrentUser({commit:e},t){e("SET_LOADING",!0);try{const{data:a}=await n.A.put("/users/me",t);e("SET_CURRENT_USER",a),e("SET_ERROR",null)}catch(a){throw e("SET_ERROR",a.message),a}finally{e("SET_LOADING",!1)}},async fetchUsers({commit:e}){e("SET_LOADING",!0);try{const{data:t}=await n.A.get("/users");e("SET_USERS",t),e("SET_ERROR",null)}catch(t){throw e("SET_ERROR",t.message),t}finally{e("SET_LOADING",!1)}},async fetchUserById({commit:e},t){e("SET_LOADING",!0);try{const{data:a}=await n.A.get(`/users/${t}`);return e("SET_CURRENT_USER",a),e("SET_ERROR",null),a}catch(a){throw e("SET_ERROR",a.message),a}finally{e("SET_LOADING",!1)}},async createUser({commit:e,dispatch:t},a){e("SET_LOADING",!0);try{await n.A.post("/users",a),await t("fetchUsers"),e("SET_ERROR",null)}catch(s){throw e("SET_ERROR",s.message),s}finally{e("SET_LOADING",!1)}},async updateUser({commit:e,dispatch:t},{id:a,userData:s}){e("SET_LOADING",!0);try{await n.A.put(`/users/${a}`,s),await t("fetchUsers"),e("SET_ERROR",null)}catch(r){throw e("SET_ERROR",r.message),r}finally{e("SET_LOADING",!1)}},async archiveUser({commit:e,dispatch:t},{id:a,reason:s}){e("SET_LOADING",!0);try{await n.A.delete(`/users/${a}`,{data:{reason:s}}),await t("fetchUsers"),e("SET_ERROR",null)}catch(r){throw e("SET_ERROR",r.message),r}finally{e("SET_LOADING",!1)}},async changePassword({commit:e},{currentPassword:t,newPassword:a}){e("SET_LOADING",!0);try{await n.A.post("/users/change-password",{currentPassword:t,newPassword:a}),e("SET_ERROR",null)}catch(s){throw e("SET_ERROR",s.message),s}finally{e("SET_LOADING",!1)}},async requestPasswordReset({commit:e},t){e("SET_LOADING",!0);try{await n.A.post("/users/reset-password-request",{email:t}),e("SET_ERROR",null)}catch(a){throw e("SET_ERROR",a.message),a}finally{e("SET_LOADING",!1)}},async resetPassword({commit:e},{token:t,newPassword:a}){e("SET_LOADING",!0);try{await n.A.post("/users/reset-password",{token:t,newPassword:a}),e("SET_ERROR",null)}catch(s){throw e("SET_ERROR",s.message),s}finally{e("SET_LOADING",!1)}}}}},8043:function(e,t,a){var n={"./auth.js":8985,"./billings.js":5631,"./consumers.js":1518,"./dashboards.js":9342,"./expenses.js":3862,"./payments.js":868,"./readings.js":3686,"./reports.js":1104,"./users.js":4295};function s(e){var t=r(e);return a(t)}function r(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}s.keys=function(){return Object.keys(n)},s.resolve=r,e.exports=s,s.id=8043},4785:function(e,t,a){"use strict";e.exports=a.p+"img/blogo.b8048436.png"}},t={};function a(n){var s=t[n];if(void 0!==s)return s.exports;var r=t[n]={id:n,loaded:!1,exports:{}};return e[n].call(r.exports,r,r.exports,a),r.loaded=!0,r.exports}a.m=e,function(){var e=[];a.O=function(t,n,s,r){if(!n){var o=1/0;for(u=0;u<e.length;u++){n=e[u][0],s=e[u][1],r=e[u][2];for(var i=!0,c=0;c<n.length;c++)(!1&r||o>=r)&&Object.keys(a.O).every((function(e){return a.O[e](n[c])}))?n.splice(c--,1):(i=!1,r<o&&(o=r));if(i){e.splice(u--,1);var l=s();void 0!==l&&(t=l)}}return t}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[n,s,r]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){var e,t=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__};a.t=function(n,s){if(1&s&&(n=this(n)),8&s)return n;if("object"===typeof n&&n){if(4&s&&n.__esModule)return n;if(16&s&&"function"===typeof n.then)return n}var r=Object.create(null);a.r(r);var o={};e=e||[null,t({}),t([]),t(t)];for(var i=2&s&&n;"object"==typeof i&&!~e.indexOf(i);i=t(i))Object.getOwnPropertyNames(i).forEach((function(e){o[e]=function(){return n[e]}}));return o["default"]=function(){return n},a.d(r,o),r}}(),function(){a.d=function(e,t){for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){a.f={},a.e=function(e){return Promise.all(Object.keys(a.f).reduce((function(t,n){return a.f[n](e,t),t}),[]))}}(),function(){a.u=function(e){return"js/"+e+"."+{28:"f2f62ab2",49:"07d2a5ca",64:"827824a5",78:"6e9501d8",93:"70e64cd5",117:"95e194b2",179:"b03d25cf",214:"2bc7ab7c",261:"44edc27f",282:"4a70c624",296:"87f7c72b",413:"bbde7983",416:"a61f19e0",444:"8e778db5",461:"f6721c5e",480:"8f816ace",506:"ab5fc973",535:"d7a030e4",695:"c57abb1a",767:"7882b497",838:"c1c31473",940:"772bfc4e"}[e]+".js"}}(),function(){a.miniCssF=function(e){return"css/"+e+"."+{28:"d8e62226",117:"8cbaca70",179:"090cad32",214:"e657a79a",261:"fcc0d17e",282:"57ec4688",296:"3c92612b",413:"5528d0c6",416:"2b19c1fd",444:"245a6ebf",535:"a06aff36",695:"235c064a",767:"d879df71",940:"4efcd724"}[e]+".css"}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="client:";a.l=function(n,s,r,o){if(e[n])e[n].push(s);else{var i,c;if(void 0!==r)for(var l=document.getElementsByTagName("script"),u=0;u<l.length;u++){var m=l[u];if(m.getAttribute("src")==n||m.getAttribute("data-webpack")==t+r){i=m;break}}i||(c=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,a.nc&&i.setAttribute("nonce",a.nc),i.setAttribute("data-webpack",t+r),i.src=n),e[n]=[s];var d=function(t,a){i.onerror=i.onload=null,clearTimeout(E);var s=e[n];if(delete e[n],i.parentNode&&i.parentNode.removeChild(i),s&&s.forEach((function(e){return e(a)})),t)return t(a)},E=setTimeout(d.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=d.bind(null,i.onerror),i.onload=d.bind(null,i.onload),c&&document.head.appendChild(i)}}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){a.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){a.p="/"}(),function(){if("undefined"!==typeof document){var e=function(e,t,n,s,r){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css",a.nc&&(o.nonce=a.nc);var i=function(a){if(o.onerror=o.onload=null,"load"===a.type)s();else{var n=a&&a.type,i=a&&a.target&&a.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+n+": "+i+")");c.name="ChunkLoadError",c.code="CSS_CHUNK_LOAD_FAILED",c.type=n,c.request=i,o.parentNode&&o.parentNode.removeChild(o),r(c)}};return o.onerror=o.onload=i,o.href=t,n?n.parentNode.insertBefore(o,n.nextSibling):document.head.appendChild(o),o},t=function(e,t){for(var a=document.getElementsByTagName("link"),n=0;n<a.length;n++){var s=a[n],r=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(r===e||r===t))return s}var o=document.getElementsByTagName("style");for(n=0;n<o.length;n++){s=o[n],r=s.getAttribute("data-href");if(r===e||r===t)return s}},n=function(n){return new Promise((function(s,r){var o=a.miniCssF(n),i=a.p+o;if(t(o,i))return s();e(n,i,null,s,r)}))},s={524:0};a.f.miniCss=function(e,t){var a={28:1,117:1,179:1,214:1,261:1,282:1,296:1,413:1,416:1,444:1,535:1,695:1,767:1,940:1};s[e]?t.push(s[e]):0!==s[e]&&a[e]&&t.push(s[e]=n(e).then((function(){s[e]=0}),(function(t){throw delete s[e],t})))}}}(),function(){var e={524:0};a.f.j=function(t,n){var s=a.o(e,t)?e[t]:void 0;if(0!==s)if(s)n.push(s[2]);else{var r=new Promise((function(a,n){s=e[t]=[a,n]}));n.push(s[2]=r);var o=a.p+a.u(t),i=new Error,c=function(n){if(a.o(e,t)&&(s=e[t],0!==s&&(e[t]=void 0),s)){var r=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src;i.message="Loading chunk "+t+" failed.\n("+r+": "+o+")",i.name="ChunkLoadError",i.type=r,i.request=o,s[1](i)}};a.l(o,c,"chunk-"+t,t)}},a.O.j=function(t){return 0===e[t]};var t=function(t,n){var s,r,o=n[0],i=n[1],c=n[2],l=0;if(o.some((function(t){return 0!==e[t]}))){for(s in i)a.o(i,s)&&(a.m[s]=i[s]);if(c)var u=c(a)}for(t&&t(n);l<o.length;l++)r=o[l],a.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return a.O(u)},n=self["webpackChunkclient"]=self["webpackChunkclient"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=a.O(void 0,[504],(function(){return a(5553)}));n=a.O(n)})();
//# sourceMappingURL=app.54488799.js.map