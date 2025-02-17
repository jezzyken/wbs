"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[695],{3372:function(t,e,i){i.r(e),i.d(e,{default:function(){return ct}});var s=i(6103),a=i(7314),n=i(3698),r=i(2938),l=i(3180),o=i(4414),h=i(3449),c=i(3064),u=(i(8111),i(2489),i(1701),i(569)),d=i(8743),p=i(5803),m=i(4152),v=(0,p.A)(d.A).extend({methods:{genPickerButton(t,e,i,s=!1,a=""){const n=this[t]===e,r=i=>{i.stopPropagation(),this.$emit(`update:${(0,m.kW)(t)}`,e)};return this.$createElement("div",{staticClass:`v-picker__title__btn ${a}`.trim(),class:{"v-picker__title__btn--active":n,"v-picker__title__btn--readonly":s},on:n||s?void 0:{click:r}},Array.isArray(i)?i:[i])}}}),y=(0,p.A)(v).extend({name:"v-date-picker-title",props:{date:{type:String,default:""},disabled:Boolean,readonly:Boolean,selectingYear:Boolean,value:{type:String},year:{type:[Number,String],default:""},yearIcon:{type:String}},data:()=>({isReversing:!1}),computed:{computedTransition(){return this.isReversing?"picker-reverse-transition":"picker-transition"}},watch:{value(t,e){this.isReversing=t<e}},methods:{genYearIcon(){return this.$createElement(u.A,{props:{dark:!0}},this.yearIcon)},getYearBtn(){return this.genPickerButton("selectingYear",!0,[String(this.year),this.yearIcon?this.genYearIcon():null],!1,"v-date-picker-title__year")},genTitleText(){return this.$createElement("transition",{props:{name:this.computedTransition}},[this.$createElement("div",{domProps:{innerHTML:this.date||"&nbsp;"},key:this.value})])},genTitleDate(){return this.genPickerButton("selectingYear",!1,[this.genTitleText()],!1,"v-date-picker-title__date")}},render(t){return t("div",{staticClass:"v-date-picker-title",class:{"v-date-picker-title--disabled":this.disabled}},[this.getYearBtn(),this.genTitleDate()])}}),g=i(4728),f=i(5471),b=f.Ay.extend({name:"localable",props:{locale:String},computed:{currentLocale(){return this.locale||this.$vuetify.lang.current}}}),k=i(3381);const D=(t,e,i)=>(e|=0,t=String(t),i=String(i),t.length>e?String(t):(e-=t.length,e>i.length&&(i+=i.repeat(e/i.length)),i.slice(0,e)+String(t)));var $=(t,e=2)=>D(t,e,"0");function A(t,e,i={start:0,length:0}){const s=t=>{const[e,i,s]=t.trim().split(" ")[0].split("-");return[$(e,4),$(i||1),$(s||1)].join("-")};try{const i=new Intl.DateTimeFormat(t||void 0,e);return t=>i.format(new Date(`${s(t)}T00:00:00+00:00`))}catch(a){return i.start||i.length?t=>s(t).substr(i.start||0,i.length):void 0}}var x=A,T=(t,e)=>{const[i,s]=t.split("-").map(Number);return s+e===0?i-1+"-12":s+e===13?`${i+1}-01`:`${i}-${$(s+e)}`},C=(0,p.A)(d.A,b,k.A).extend({name:"v-date-picker-header",props:{disabled:Boolean,format:Function,min:String,max:String,nextAriaLabel:String,nextIcon:{type:String,default:"$next"},prevAriaLabel:String,prevIcon:{type:String,default:"$prev"},readonly:Boolean,value:{type:[Number,String],required:!0}},data(){return{isReversing:!1}},computed:{formatter(){return this.format?this.format:String(this.value).split("-")[1]?x(this.currentLocale,{month:"long",year:"numeric",timeZone:"UTC"},{length:7}):x(this.currentLocale,{year:"numeric",timeZone:"UTC"},{length:4})}},watch:{value(t,e){this.isReversing=t<e}},methods:{genBtn(t){const e=t>0?this.nextAriaLabel:this.prevAriaLabel,i=e?this.$vuetify.lang.t(e):void 0,s=this.disabled||t<0&&this.min&&this.calculateChange(t)<this.min||t>0&&this.max&&this.calculateChange(t)>this.max;return this.$createElement(g.A,{attrs:{"aria-label":i},props:{dark:this.dark,disabled:s,icon:!0,light:this.light},on:{click:e=>{e.stopPropagation(),this.$emit("input",this.calculateChange(t))}}},[this.$createElement(u.A,t<0===!this.$vuetify.rtl?this.prevIcon:this.nextIcon)])},calculateChange(t){const[e,i]=String(this.value).split("-").map(Number);return null==i?`${e+t}`:T(String(this.value),t)},genHeader(){const t=!this.disabled&&(this.color||"accent"),e=this.$createElement("div",this.setTextColor(t,{key:String(this.value)}),[this.$createElement("button",{attrs:{type:"button"},on:{click:()=>this.$emit("toggle")}},(0,m.$c)(this)||[this.formatter(String(this.value))])]),i=this.$createElement("transition",{props:{name:this.isReversing===!this.$vuetify.rtl?"tab-reverse-transition":"tab-transition"}},[e]);return this.$createElement("div",{staticClass:"v-date-picker-header__value",class:{"v-date-picker-header__value--disabled":this.disabled}},[i])}},render(){return this.$createElement("div",{staticClass:"v-date-picker-header",class:{"v-date-picker-header--disabled":this.disabled,...this.themeClasses}},[this.genBtn(-1),this.genHeader(),this.genBtn(1)])}}),M=(i(4114),i(2699));i(8237);function w(t,e,i){return Object.keys(t.$listeners).reduce(((s,a)=>(a.endsWith(e)&&(s[a.slice(0,-e.length)]=e=>t.$emit(a,i,e)),s)),{})}function _(t,e){return Object.keys(t.$listeners).reduce(((i,s)=>(s.endsWith(e)&&(i[s]=t.$listeners[s]),i)),{})}var S=(t,e)=>{const[i,s=1,a=1]=t.split("-");return`${i}-${$(s)}-${$(a)}`.substr(0,{date:10,month:7,year:4}[e])};function Y(t,e,i,s){return(!s||s(t))&&(!e||t>=e.substr(0,10))&&(!i||t<=i)}var E=i(8041),B=(0,p.A)(d.A,b,k.A).extend({directives:{Touch:M.A},props:{allowedDates:Function,current:String,disabled:Boolean,format:Function,events:{type:[Array,Function,Object],default:()=>null},eventColor:{type:[Array,Function,Object,String],default:()=>"warning"},min:String,max:String,range:Boolean,readonly:Boolean,scrollable:Boolean,tableDate:{type:String,required:!0},value:[String,Array]},data:()=>({isReversing:!1,wheelThrottle:null}),computed:{computedTransition(){return this.isReversing===!this.$vuetify.rtl?"tab-reverse-transition":"tab-transition"},displayedMonth(){return Number(this.tableDate.split("-")[1])-1},displayedYear(){return Number(this.tableDate.split("-")[0])}},watch:{tableDate(t,e){this.isReversing=t<e}},mounted(){this.wheelThrottle=(0,m.nF)(this.wheel,250)},methods:{genButtonClasses(t,e,i,s,a,n){return{"v-size--default":!e,"v-date-picker-table__current":s,"v-btn--active":i,"v-btn--flat":!t||this.disabled,"v-btn--text":i===s,"v-btn--rounded":e,"v-btn--disabled":!t||this.disabled,"v-btn--outlined":s&&!i,"v-date-picker--first-in-range":a,"v-date-picker--last-in-range":n,...this.themeClasses}},genButtonEvents(t,e,i){if(!this.disabled)return(0,E.wf)({click:()=>{e&&!this.readonly&&this.$emit("input",t)}},w(this,`:${i}`,t))},genButton(t,e,i,s,a=!1){const n=Y(t,this.min,this.max,this.allowedDates),r=this.isSelected(t)&&n,l=t===this.current,o=r?this.setBackgroundColor:this.setTextColor,h=(r||l)&&(this.color||"accent");let c=!1,u=!1;return this.range&&this.value&&Array.isArray(this.value)&&(c=t===this.value[0],u=t===this.value[this.value.length-1]),this.$createElement("button",o(h,{staticClass:"v-btn",class:this.genButtonClasses(n&&!a,e,r,l,c,u),attrs:{type:"button"},domProps:{disabled:this.disabled||!n||a},on:this.genButtonEvents(t,n,i)}),[this.$createElement("div",{staticClass:"v-btn__content"},[s(t)]),this.genEvents(t)])},getEventColors(t){const e=t=>Array.isArray(t)?t:[t];let i,s=[];return i=Array.isArray(this.events)?this.events.includes(t):this.events instanceof Function?this.events(t)||!1:this.events&&this.events[t]||!1,i?(s=!0!==i?e(i):"string"===typeof this.eventColor?[this.eventColor]:"function"===typeof this.eventColor?e(this.eventColor(t)):Array.isArray(this.eventColor)?this.eventColor:e(this.eventColor[t]),s.filter((t=>t))):[]},genEvents(t){const e=this.getEventColors(t);return e.length?this.$createElement("div",{staticClass:"v-date-picker-table__events"},e.map((t=>this.$createElement("div",this.setBackgroundColor(t))))):null},isValidScroll(t,e){const i=e(t),s=1===i.split("-").length?"year":"month";return t<0&&(!this.min||i>=S(this.min,s))||t>0&&(!this.max||i<=S(this.max,s))},wheel(t,e){this.$emit("update:table-date",e(t.deltaY))},touch(t,e){this.$emit("update:table-date",e(t))},genTable(t,e,i){const s=this.$createElement("transition",{props:{name:this.computedTransition}},[this.$createElement("table",{key:this.tableDate},e)]),a={name:"touch",value:{left:t=>t.offsetX<-15&&this.isValidScroll(1,i)&&this.touch(1,i),right:t=>t.offsetX>15&&this.isValidScroll(-1,i)&&this.touch(-1,i)}};return this.$createElement("div",{staticClass:t,class:{"v-date-picker-table--disabled":this.disabled,...this.themeClasses},on:!this.disabled&&this.scrollable?{wheel:t=>{t.preventDefault(),this.isValidScroll(t.deltaY,i)&&this.wheelThrottle(t,i)}}:void 0,directives:[a]},[s])},isSelected(t){if(Array.isArray(this.value)){if(this.range&&2===this.value.length){const[e,i]=[...this.value].sort();return e<=t&&t<=i}return-1!==this.value.indexOf(t)}return t===this.value}}});function I(t,e=0,i=1){let s;return t<100&&t>=0?(s=new Date(Date.UTC(t,e,i)),isFinite(s.getUTCFullYear())&&s.setUTCFullYear(t)):s=new Date(Date.UTC(t,e,i)),s}function F(t,e,i){const s=7+e-i,a=(7+I(t,0,s).getUTCDay()-e)%7;return-a+s-1}function P(t,e,i,s){let a=[0,31,59,90,120,151,181,212,243,273,304,334][e];return e>1&&L(t)&&a++,a+i}function N(t,e,i){const s=F(t,e,i),a=F(t+1,e,i),n=L(t)?366:365;return(n-s+a)/7}function O(t,e,i,s,a){const n=F(t,s,a),r=Math.ceil((P(t,e,i,s)-n)/7);return r<1?r+N(t-1,s,a):r>N(t,s,a)?r-N(t,s,a):r}function L(t){return t%4===0&&t%100!==0||t%400===0}var R=(0,p.A)(B).extend({name:"v-date-picker-date-table",props:{firstDayOfWeek:{type:[String,Number],default:0},localeFirstDayOfYear:{type:[String,Number],default:0},showAdjacentMonths:Boolean,showWeek:Boolean,weekdayFormat:Function},computed:{formatter(){return this.format||x(this.currentLocale,{day:"numeric",timeZone:"UTC"},{start:8,length:2})},weekdayFormatter(){return this.weekdayFormat||x(this.currentLocale,{weekday:"narrow",timeZone:"UTC"})},weekDays(){const t=parseInt(this.firstDayOfWeek,10);return this.weekdayFormatter?(0,m.Sd)(7).map((e=>this.weekdayFormatter(`2017-01-${t+e+15}`))):(0,m.Sd)(7).map((e=>["S","M","T","W","T","F","S"][(e+t)%7]))}},methods:{calculateTableDate(t){return T(this.tableDate,Math.sign(t||1))},genTHead(){const t=this.weekDays.map((t=>this.$createElement("th",t)));return this.showWeek&&t.unshift(this.$createElement("th")),this.$createElement("thead",this.genTR(t))},weekDaysBeforeFirstDayOfTheMonth(){const t=new Date(`${this.displayedYear}-${$(this.displayedMonth+1)}-01T00:00:00+00:00`),e=t.getUTCDay();return(e-parseInt(this.firstDayOfWeek)+7)%7},getWeekNumber(t){return O(this.displayedYear,this.displayedMonth,t,parseInt(this.firstDayOfWeek),parseInt(this.localeFirstDayOfYear))},genWeekNumber(t){return this.$createElement("td",[this.$createElement("small",{staticClass:"v-date-picker-table--date__week"},String(t).padStart(2,"0"))])},genTBody(){const t=[],e=new Date(this.displayedYear,this.displayedMonth+1,0).getDate();let i=[],s=this.weekDaysBeforeFirstDayOfTheMonth();this.showWeek&&i.push(this.genWeekNumber(this.getWeekNumber(1)));const a=this.displayedMonth?this.displayedYear:this.displayedYear-1,n=(this.displayedMonth+11)%12,r=new Date(this.displayedYear,this.displayedMonth,0).getDate(),l=this.showWeek?8:7;while(s--){const t=`${a}-${$(n+1)}-${$(r-s)}`;i.push(this.$createElement("td",this.showAdjacentMonths?[this.genButton(t,!0,"date",this.formatter,!0)]:[]))}for(s=1;s<=e;s++){const a=`${this.displayedYear}-${$(this.displayedMonth+1)}-${$(s)}`;i.push(this.$createElement("td",[this.genButton(a,!0,"date",this.formatter)])),i.length%l===0&&(t.push(this.genTR(i)),i=[],this.showWeek&&(s<e||this.showAdjacentMonths)&&i.push(this.genWeekNumber(this.getWeekNumber(s+7))))}const o=11===this.displayedMonth?this.displayedYear+1:this.displayedYear,h=(this.displayedMonth+1)%12;let c=1;while(i.length<l){const t=`${o}-${$(h+1)}-${$(c++)}`;i.push(this.$createElement("td",this.showAdjacentMonths?[this.genButton(t,!0,"date",this.formatter,!0)]:[]))}return i.length&&t.push(this.genTR(i)),this.$createElement("tbody",t)},genTR(t){return[this.$createElement("tr",t)]}},render(){return this.genTable("v-date-picker-table v-date-picker-table--date",[this.genTHead(),this.genTBody()],this.calculateTableDate)}}),W=(0,p.A)(B).extend({name:"v-date-picker-month-table",computed:{formatter(){return this.format||x(this.currentLocale,{month:"short",timeZone:"UTC"},{start:5,length:2})}},methods:{calculateTableDate(t){return`${parseInt(this.tableDate,10)+Math.sign(t||1)}`},genTBody(){const t=[],e=Array(3).fill(null),i=12/e.length;for(let s=0;s<i;s++){const i=e.map(((t,i)=>{const a=s*e.length+i,n=`${this.displayedYear}-${$(a+1)}`;return this.$createElement("td",{key:a},[this.genButton(n,!1,"month",this.formatter)])}));t.push(this.$createElement("tr",{key:s},i))}return this.$createElement("tbody",t)}},render(){return this.genTable("v-date-picker-table v-date-picker-table--month",[this.genTBody()],this.calculateTableDate)}}),H=(0,p.A)(d.A,b).extend({name:"v-date-picker-years",props:{format:Function,min:[Number,String],max:[Number,String],readonly:Boolean,value:[Number,String]},data(){return{defaultColor:"primary"}},computed:{formatter(){return this.format||x(this.currentLocale,{year:"numeric",timeZone:"UTC"},{length:4})}},mounted(){setTimeout((()=>{const t=this.$el.getElementsByClassName("active")[0];t?this.$el.scrollTop=t.offsetTop-this.$el.offsetHeight/2+t.offsetHeight/2:this.min&&!this.max?this.$el.scrollTop=this.$el.scrollHeight:!this.min&&this.max?this.$el.scrollTop=0:this.$el.scrollTop=this.$el.scrollHeight/2-this.$el.offsetHeight/2}))},methods:{genYearItem(t){const e=this.formatter(`${t}`),i=parseInt(this.value,10)===t,s=i&&(this.color||"primary");return this.$createElement("li",this.setTextColor(s,{key:t,class:{active:i},on:(0,E.wf)({click:()=>this.$emit("input",t)},w(this,":year",t))}),e)},genYearItems(){const t=[],e=this.value?parseInt(this.value,10):(new Date).getFullYear(),i=this.max?parseInt(this.max,10):e+100,s=Math.min(i,this.min?parseInt(this.min,10):e-100);for(let a=i;a>=s;a--)t.push(this.genYearItem(a));return t}},render(){return this.$createElement("ul",{staticClass:"v-date-picker-years",ref:"years"},this.genYearItems())}}),V=(i(6001),i(3251)),j=(0,p.A)(d.A,V.A,k.A).extend({name:"v-picker",props:{flat:Boolean,fullWidth:Boolean,landscape:Boolean,noTitle:Boolean,transition:{type:String,default:"fade-transition"},width:{type:[Number,String],default:290}},computed:{computedTitleColor(){const t=!this.isDark&&(this.color||"primary");return this.color||t}},methods:{genTitle(){return this.$createElement("div",this.setBackgroundColor(this.computedTitleColor,{staticClass:"v-picker__title",class:{"v-picker__title--landscape":this.landscape}}),(0,m.$c)(this,"title"))},genBodyTransition(){return this.$createElement("transition",{props:{name:this.transition}},(0,m.$c)(this))},genBody(){return this.$createElement("div",{staticClass:"v-picker__body",class:{"v-picker__body--no-title":this.noTitle,...this.themeClasses},style:this.fullWidth?void 0:{width:(0,m.Dg)(this.width)}},[this.genBodyTransition()])},genActions(){return this.$createElement("div",{staticClass:"v-picker__actions v-card__actions",class:{"v-picker__actions--no-title":this.noTitle}},(0,m.$c)(this,"actions"))}},render(t){return t("div",{staticClass:"v-picker v-card",class:{"v-picker--flat":this.flat,"v-picker--landscape":this.landscape,"v-picker--full-width":this.fullWidth,...this.themeClasses,...this.elevationClasses}},[this.$slots.title?this.genTitle():null,this.genBody(),this.$slots.actions?this.genActions():null])}}),U=j,X=(0,p.A)(d.A,V.A,k.A).extend({name:"picker",props:{flat:Boolean,fullWidth:Boolean,headerColor:String,landscape:Boolean,noTitle:Boolean,width:{type:[Number,String],default:290}},methods:{genPickerTitle(){return null},genPickerBody(){return null},genPickerActionsSlot(){return this.$scopedSlots.default?this.$scopedSlots.default({save:this.save,cancel:this.cancel}):(0,m.$c)(this)},genPicker(t){const e=[];if(!this.noTitle){const t=this.genPickerTitle();t&&e.push(t)}const i=this.genPickerBody();return i&&e.push(i),e.push(this.$createElement("template",{slot:"actions"},[this.genPickerActionsSlot()])),this.$createElement(U,{staticClass:t,props:{color:this.headerColor||this.color,dark:this.dark,elevation:this.elevation,flat:this.flat,fullWidth:this.fullWidth,landscape:this.landscape,light:this.light,width:this.width,noTitle:this.noTitle}},e)}}});const Z=[0,31,28,31,30,31,30,31,31,30,31,30,31],Q=[0,31,29,31,30,31,30,31,31,30,31,30,31];function q(t,e){return L(t)?Q[e]:Z[e]}var z=i(6988),G=(0,p.A)(b,X).extend({name:"v-date-picker",props:{activePicker:String,allowedDates:Function,dayFormat:Function,disabled:Boolean,events:{type:[Array,Function,Object],default:()=>null},eventColor:{type:[Array,Function,Object,String],default:()=>"warning"},firstDayOfWeek:{type:[String,Number],default:0},headerDateFormat:Function,localeFirstDayOfYear:{type:[String,Number],default:0},max:String,min:String,monthFormat:Function,multiple:Boolean,nextIcon:{type:String,default:"$next"},nextMonthAriaLabel:{type:String,default:"$vuetify.datePicker.nextMonthAriaLabel"},nextYearAriaLabel:{type:String,default:"$vuetify.datePicker.nextYearAriaLabel"},pickerDate:String,prevIcon:{type:String,default:"$prev"},prevMonthAriaLabel:{type:String,default:"$vuetify.datePicker.prevMonthAriaLabel"},prevYearAriaLabel:{type:String,default:"$vuetify.datePicker.prevYearAriaLabel"},range:Boolean,reactive:Boolean,readonly:Boolean,scrollable:Boolean,showCurrent:{type:[Boolean,String],default:!0},selectedItemsText:{type:String,default:"$vuetify.datePicker.itemsSelected"},showAdjacentMonths:Boolean,showWeek:Boolean,titleDateFormat:Function,type:{type:String,default:"date",validator:t=>["date","month"].includes(t)},value:[Array,String],weekdayFormat:Function,yearFormat:Function,yearIcon:String},data(){const t=new Date;return{internalActivePicker:this.type.toUpperCase(),inputDay:null,inputMonth:null,inputYear:null,isReversing:!1,now:t,tableDate:(()=>{if(this.pickerDate)return this.pickerDate;const e=(0,m.BN)(this.value),i=e[e.length-1]||("string"===typeof this.showCurrent?this.showCurrent:`${t.getFullYear()}-${t.getMonth()+1}`);return S(i,"date"===this.type?"month":"year")})()}},computed:{multipleValue(){return(0,m.BN)(this.value)},isMultiple(){return this.multiple||this.range},lastValue(){return this.isMultiple?this.multipleValue[this.multipleValue.length-1]:this.value},selectedMonths(){return this.value&&"month"!==this.type?this.isMultiple?this.multipleValue.map((t=>t.substr(0,7))):this.value.substr(0,7):this.value},current(){return!0===this.showCurrent?S(`${this.now.getFullYear()}-${this.now.getMonth()+1}-${this.now.getDate()}`,this.type):this.showCurrent||null},inputDate(){return"date"===this.type?`${this.inputYear}-${$(this.inputMonth+1)}-${$(this.inputDay)}`:`${this.inputYear}-${$(this.inputMonth+1)}`},tableMonth(){return Number((this.pickerDate||this.tableDate).split("-")[1])-1},tableYear(){return Number((this.pickerDate||this.tableDate).split("-")[0])},minMonth(){return this.min?S(this.min,"month"):null},maxMonth(){return this.max?S(this.max,"month"):null},minYear(){return this.min?S(this.min,"year"):null},maxYear(){return this.max?S(this.max,"year"):null},formatters(){return{year:this.yearFormat||x(this.currentLocale,{year:"numeric",timeZone:"UTC"},{length:4}),titleDate:this.titleDateFormat||(this.isMultiple?this.defaultTitleMultipleDateFormatter:this.defaultTitleDateFormatter)}},defaultTitleMultipleDateFormatter(){return t=>t.length?1===t.length?this.defaultTitleDateFormatter(t[0]):this.$vuetify.lang.t(this.selectedItemsText,t.length):"-"},defaultTitleDateFormatter(){const t={year:{year:"numeric",timeZone:"UTC"},month:{month:"long",timeZone:"UTC"},date:{weekday:"short",month:"short",day:"numeric",timeZone:"UTC"}},e=x(this.currentLocale,t[this.type],{start:0,length:{date:10,month:7,year:4}[this.type]}),i=t=>e(t).replace(/([^\d\s])([\d])/g,((t,e,i)=>`${e} ${i}`)).replace(", ",",<br>");return this.landscape?i:e}},watch:{internalActivePicker:{immediate:!0,handler(t){this.$emit("update:active-picker",t)}},activePicker(t){this.internalActivePicker=t},tableDate(t,e){const i="month"===this.type?"year":"month";this.isReversing=S(t,i)<S(e,i),this.$emit("update:picker-date",t)},pickerDate(t){t?this.tableDate=t:this.lastValue&&"date"===this.type?this.tableDate=S(this.lastValue,"month"):this.lastValue&&"month"===this.type&&(this.tableDate=S(this.lastValue,"year"))},value(t,e){this.checkMultipleProp(),this.setInputDate(),(this.isMultiple||!this.value||this.pickerDate)&&(!this.isMultiple||!this.multipleValue.length||e&&e.length||this.pickerDate)||(this.tableDate=S(this.inputDate,"month"===this.type?"year":"month"))},type(t){if(this.internalActivePicker=t.toUpperCase(),this.value&&this.value.length){const e=this.multipleValue.map((e=>S(e,t))).filter(this.isDateAllowed);this.$emit("input",this.isMultiple?e:e[0])}}},created(){this.checkMultipleProp(),this.pickerDate!==this.tableDate&&this.$emit("update:picker-date",this.tableDate),this.setInputDate()},methods:{emitInput(t){if(this.range){if(1!==this.multipleValue.length)this.$emit("input",[t]);else{const e=[this.multipleValue[0],t];this.$emit("input",e),this.$emit("change",e)}return}const e=this.multiple?-1===this.multipleValue.indexOf(t)?this.multipleValue.concat([t]):this.multipleValue.filter((e=>e!==t)):t;this.$emit("input",e),this.multiple||this.$emit("change",t)},checkMultipleProp(){if(null==this.value)return;const t=this.value.constructor.name,e=this.isMultiple?"Array":"String";t!==e&&(0,z.OP)(`Value must be ${this.isMultiple?"an":"a"} ${e}, got ${t}`,this)},isDateAllowed(t){return Y(t,this.min,this.max,this.allowedDates)},yearClick(t){this.inputYear=t,"month"===this.type?this.tableDate=`${t}`:this.tableDate=`${t}-${$((this.tableMonth||0)+1)}`,this.internalActivePicker="MONTH",this.reactive&&!this.readonly&&!this.isMultiple&&this.isDateAllowed(this.inputDate)&&this.$emit("input",this.inputDate)},monthClick(t){const[e,i]=t.split("-");this.inputYear=parseInt(e,10),this.inputMonth=parseInt(i,10)-1,"date"===this.type?(this.inputDay&&(this.inputDay=Math.min(this.inputDay,q(this.inputYear,this.inputMonth+1))),this.tableDate=t,this.internalActivePicker="DATE",this.reactive&&!this.readonly&&!this.isMultiple&&this.isDateAllowed(this.inputDate)&&this.$emit("input",this.inputDate)):this.emitInput(this.inputDate)},dateClick(t){const[e,i,s]=t.split("-");this.inputYear=parseInt(e,10),this.inputMonth=parseInt(i,10)-1,this.inputDay=parseInt(s,10),this.emitInput(this.inputDate)},genPickerTitle(){return this.$createElement(y,{props:{date:this.value?this.formatters.titleDate(this.isMultiple?this.multipleValue:this.value):"",disabled:this.disabled,readonly:this.readonly,selectingYear:"YEAR"===this.internalActivePicker,year:this.formatters.year(this.multipleValue.length?`${this.inputYear}`:this.tableDate),yearIcon:this.yearIcon,value:this.multipleValue[0]},slot:"title",on:{"update:selecting-year":t=>this.internalActivePicker=t?"YEAR":this.type.toUpperCase()}})},genTableHeader(){return this.$createElement(C,{props:{nextIcon:this.nextIcon,color:this.color,dark:this.dark,disabled:this.disabled,format:this.headerDateFormat,light:this.light,locale:this.locale,min:"DATE"===this.internalActivePicker?this.minMonth:this.minYear,max:"DATE"===this.internalActivePicker?this.maxMonth:this.maxYear,nextAriaLabel:"DATE"===this.internalActivePicker?this.nextMonthAriaLabel:this.nextYearAriaLabel,prevAriaLabel:"DATE"===this.internalActivePicker?this.prevMonthAriaLabel:this.prevYearAriaLabel,prevIcon:this.prevIcon,readonly:this.readonly,value:"DATE"===this.internalActivePicker?`${$(this.tableYear,4)}-${$(this.tableMonth+1)}`:`${$(this.tableYear,4)}`},on:{toggle:()=>this.internalActivePicker="DATE"===this.internalActivePicker?"MONTH":"YEAR",input:t=>this.tableDate=t}})},genDateTable(){return this.$createElement(R,{props:{allowedDates:this.allowedDates,color:this.color,current:this.current,dark:this.dark,disabled:this.disabled,events:this.events,eventColor:this.eventColor,firstDayOfWeek:this.firstDayOfWeek,format:this.dayFormat,light:this.light,locale:this.locale,localeFirstDayOfYear:this.localeFirstDayOfYear,min:this.min,max:this.max,range:this.range,readonly:this.readonly,scrollable:this.scrollable,showAdjacentMonths:this.showAdjacentMonths,showWeek:this.showWeek,tableDate:`${$(this.tableYear,4)}-${$(this.tableMonth+1)}`,value:this.value,weekdayFormat:this.weekdayFormat},ref:"table",on:{input:this.dateClick,"update:table-date":t=>this.tableDate=t,..._(this,":date")}})},genMonthTable(){return this.$createElement(W,{props:{allowedDates:"month"===this.type?this.allowedDates:null,color:this.color,current:this.current?S(this.current,"month"):null,dark:this.dark,disabled:this.disabled,events:"month"===this.type?this.events:null,eventColor:"month"===this.type?this.eventColor:null,format:this.monthFormat,light:this.light,locale:this.locale,min:this.minMonth,max:this.maxMonth,range:this.range,readonly:this.readonly&&"month"===this.type,scrollable:this.scrollable,value:this.selectedMonths,tableDate:`${$(this.tableYear,4)}`},ref:"table",on:{input:this.monthClick,"update:table-date":t=>this.tableDate=t,..._(this,":month")}})},genYears(){return this.$createElement(H,{props:{color:this.color,format:this.yearFormat,locale:this.locale,min:this.minYear,max:this.maxYear,value:this.tableYear},on:{input:this.yearClick,..._(this,":year")}})},genPickerBody(){const t="YEAR"===this.internalActivePicker?[this.genYears()]:[this.genTableHeader(),"DATE"===this.internalActivePicker?this.genDateTable():this.genMonthTable()];return this.$createElement("div",{key:this.internalActivePicker},t)},setInputDate(){if(this.lastValue){const t=this.lastValue.split("-");this.inputYear=parseInt(t[0],10),this.inputMonth=parseInt(t[1],10)-1,"date"===this.type&&(this.inputDay=parseInt(t[2],10))}else this.inputYear=this.inputYear||this.now.getFullYear(),this.inputMonth=null==this.inputMonth?this.inputMonth:this.now.getMonth(),this.inputDay=this.inputDay||this.now.getDate()}},render(){return this.genPicker("v-picker--date")}}),J=i(6930),K=i(7683),tt=i(2756),et=i(4312),it=i(7112),st=function(){var t=this,e=t._self._c;return e(h.A,{staticClass:"px-6"},[e("div",{staticClass:"mb-6"},[e(s.A,{staticClass:"pa-0",attrs:{items:t.breadcrumbs,divider:"/"}})],1),e(n.A,{staticClass:"mb-6"},[e(r.OQ,[e(tt.A,[e(o.A,{attrs:{cols:"12",sm:"6",md:"3"}},[e(et.A,{attrs:{items:t.reportTypes,label:"Report Type",outlined:"",dense:""},model:{value:t.reportType,callback:function(e){t.reportType=e},expression:"reportType"}})],1),e(o.A,{attrs:{cols:"12",sm:"6",md:"3"}},[e(et.A,{attrs:{items:t.periodTypes,label:"Period",outlined:"",dense:""},model:{value:t.periodType,callback:function(e){t.periodType=e},expression:"periodType"}})],1),"daily"===t.periodType?e(o.A,{attrs:{cols:"12",sm:"6",md:"3"}},[e(K.A,{attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","max-width":"290px","min-width":"290px"},scopedSlots:t._u([{key:"activator",fn:function({on:i,attrs:s}){return[e(it.A,t._g(t._b({attrs:{label:"Select Date",readonly:"",outlined:"",dense:""},model:{value:t.formattedDate,callback:function(e){t.formattedDate=e},expression:"formattedDate"}},"v-text-field",s,!1),i))]}}],null,!1,1090060386),model:{value:t.dateMenu,callback:function(e){t.dateMenu=e},expression:"dateMenu"}},[e(G,{attrs:{"no-title":""},on:{input:function(e){t.dateMenu=!1}},model:{value:t.selectedDate,callback:function(e){t.selectedDate=e},expression:"selectedDate"}})],1)],1):t._e(),"monthly"===t.periodType?e(o.A,{attrs:{cols:"12",sm:"6",md:"3"}},[e(K.A,{attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":""},scopedSlots:t._u([{key:"activator",fn:function({on:i,attrs:s}){return[e(it.A,t._g(t._b({attrs:{label:"Select Month",readonly:"",outlined:"",dense:""},model:{value:t.formattedMonth,callback:function(e){t.formattedMonth=e},expression:"formattedMonth"}},"v-text-field",s,!1),i))]}}],null,!1,1088482114),model:{value:t.monthMenu,callback:function(e){t.monthMenu=e},expression:"monthMenu"}},[e(G,{attrs:{type:"month","no-title":""},on:{input:function(e){t.monthMenu=!1}},model:{value:t.selectedMonth,callback:function(e){t.selectedMonth=e},expression:"selectedMonth"}})],1)],1):t._e(),e(o.A,{attrs:{cols:"12",sm:"6",md:"3"}},[e(a.A,{attrs:{color:"primary",block:"",loading:t.isLoading},on:{click:t.generateReport}},[t._v(" Generate Report ")])],1)],1)],1)],1),e(tt.A,{staticClass:"mb-6"},[e(o.A,{attrs:{cols:"12",md:"3"}},[e(n.A,{attrs:{height:"150"}},[e(r.OQ,[e("div",{staticClass:"text-h6 mb-2"},[t._v("Total Collections")]),e("div",{staticClass:"text-h4"},[t._v("₱"+t._s(t.formatNumber(t.totalCollections)))]),e("div",{staticClass:"text-caption"},[t._v(" "+t._s(t.totalTransactions.collections)+" transactions ")])])],1)],1),e(o.A,{attrs:{cols:"12",md:"3"}},[e(n.A,{attrs:{height:"150"}},[e(r.OQ,[e("div",{staticClass:"text-h6 mb-2"},[t._v("Total Received")]),e("div",{staticClass:"text-h4"},[t._v("₱"+t._s(t.formatNumber(t.totalReceived)))])])],1)],1),e(o.A,{attrs:{cols:"12",md:"3"}},[e(n.A,{attrs:{height:"150"}},[e(r.OQ,[e("div",{staticClass:"text-h6 mb-2"},[t._v("Total Expenses")]),e("div",{staticClass:"text-h4"},[t._v("₱"+t._s(t.formatNumber(t.totalExpenses)))]),e("div",{staticClass:"text-caption"},[t._v(" "+t._s(t.totalTransactions.expenses)+" transactions ")])])],1)],1),e(o.A,{attrs:{cols:"12",md:"3"}},[e(n.A,{attrs:{height:"150"}},[e(r.OQ,[e("div",{staticClass:"text-h6 mb-2"},[t._v("Net Income")]),e("div",{staticClass:"text-h4",class:t.netIncomeClass},[t._v(" ₱"+t._s(t.formatNumber(t.netIncome))+" ")])])],1)],1)],1),e(tt.A,[e(o.A,{attrs:{cols:"12"}},["collections"===t.reportType?e(n.A,[e(r.ri,{staticClass:"d-flex justify-space-between align-center"},[e("span",[t._v("Collections Detail")]),e(a.A,{attrs:{color:"primary",text:""},on:{click:t.exportData}},[e(J.A,{attrs:{left:""}},[t._v("mdi-download")]),t._v(" Export ")],1)],1),e(c.A,{attrs:{headers:t.collectionHeaders,items:t.collections.data,loading:t.collections.loading,"items-per-page":10},scopedSlots:t._u([{key:"item.createdAt",fn:function({item:e}){return[t._v(" "+t._s(t.formatDateTime(e.createdAt))+" ")]}},{key:"item.consumerId",fn:function({item:i}){return[e("div",[t._v(t._s(t.formatConsumerName(i.consumerId)))]),e("div",{staticClass:"text-caption"},[t._v(t._s(i.consumerId.accountNo))])]}},{key:"item.amount",fn:function({item:e}){return[t._v(" ₱"+t._s(t.formatNumber(e.amount))+" ")]}},{key:"item.amountReceived",fn:function({item:e}){return[t._v(" ₱"+t._s(t.formatNumber(e.amountReceived))+" ")]}},{key:"item.change",fn:function({item:e}){return[t._v(" ₱"+t._s(t.formatNumber(e.change))+" ")]}},{key:"item.status",fn:function({item:i}){return[e(l.A,{attrs:{color:t.getStatusColor(i.status),small:""}},[t._v(" "+t._s(i.status)+" ")])]}}],null,!1,595893729)})],1):e(n.A,[e(r.ri,{staticClass:"d-flex justify-space-between align-center"},[e("span",[t._v("Expenses Detail")]),e(a.A,{attrs:{color:"primary",text:""},on:{click:t.exportData}},[e(J.A,{attrs:{left:""}},[t._v("mdi-download")]),t._v(" Export ")],1)],1),e(c.A,{attrs:{headers:t.expenseHeaders,items:t.expenses.data,loading:t.expenses.loading,"items-per-page":10},scopedSlots:t._u([{key:"item.date",fn:function({item:e}){return[t._v(" "+t._s(t.formatDateTime(e.date))+" ")]}},{key:"item.amount",fn:function({item:e}){return[t._v(" ₱"+t._s(t.formatNumber(e.amount))+" ")]}}])})],1)],1)],1)],1)},at=[],nt=i(5353),rt={name:"ReportsPage",data:()=>({breadcrumbs:[{text:"Home",disabled:!1,href:"/"},{text:"Reports",disabled:!0}],reportType:"collections",reportTypes:[{text:"Collections",value:"collections"},{text:"Expenses",value:"expenses"}],periodType:"daily",periodTypes:[{text:"Daily",value:"daily"},{text:"Monthly",value:"monthly"}],dateMenu:!1,monthMenu:!1,selectedDate:(new Date).toISOString().substr(0,10),selectedMonth:(new Date).toISOString().substr(0,7),collectionHeaders:[{text:"Date",value:"createdAt"},{text:"Reference No.",value:"referenceNo"},{text:"Consumer",value:"consumerId"},{text:"Payment Type",value:"paymentType"},{text:"Payment Method",value:"paymentMethod"},{text:"Amount",value:"amount"},{text:"Status",value:"status"}],expenseHeaders:[{text:"Date",value:"date"},{text:"Type",value:"expenseType"},{text:"Description",value:"description"},{text:"Amount",value:"amount"}]}),computed:{...(0,nt.aH)("reports",["collections","expenses"]),...(0,nt.L8)("reports",["totalCollections","totalExpenses","netIncome","totalReceived","totalChange","totalTransactions","collectionsByPaymentMethod","collectionsByPaymentType"]),formattedDate(){return this.selectedDate},formattedMonth(){return this.selectedMonth},isLoading(){return this.collections.loading||this.expenses.loading},netIncomeClass(){return this.netIncome>=0?"success--text":"error--text"}},methods:{...(0,nt.i0)("reports",["fetchDailyCollections","fetchMonthlyCollections","fetchDailyExpenses","fetchMonthlyExpenses"]),formatNumber(t){return new Intl.NumberFormat("en-PH").format(t||0)},formatDateTime(t){return new Date(t).toLocaleString("en-PH")},formatConsumerName(t){if(!t)return"";let e=`${t.firstName}`;return t.middleName&&(e+=` ${t.middleName.charAt(0)}.`),e+=` ${t.lastName}`,t.nameExtension&&(e+=` ${t.nameExtension}`),e},formatPaymentType(t){return t.split("_").map((t=>t.charAt(0)+t.slice(1).toLowerCase())).join(" ")},getStatusColor(t){const e={completed:"success",pending:"warning",failed:"error",reversed:"grey"};return e[t]||"grey"},async generateReport(){try{if("collections"===this.reportType)if("daily"===this.periodType)await this.fetchDailyCollections(this.selectedDate);else{const[t,e]=this.selectedMonth.split("-");await this.fetchMonthlyCollections({month:parseInt(e),year:parseInt(t)})}else if("daily"===this.periodType)await this.fetchDailyExpenses(this.selectedDate);else{const[t,e]=this.selectedMonth.split("-");await this.fetchMonthlyExpenses({month:parseInt(e),year:parseInt(t)})}}catch(t){console.error("Error generating report:",t)}},exportData(){"collections"===this.reportType?this.collections.data:this.expenses.data}},async created(){await this.generateReport()}},lt=rt,ot=i(1656),ht=(0,ot.A)(lt,st,at,!1,null,"33e5b900",null),ct=ht.exports},2699:function(t,e,i){i(8111),i(7588);var s=i(4152);const a=t=>{const{touchstartX:e,touchendX:i,touchstartY:s,touchendY:a}=t,n=.5,r=16;t.offsetX=i-e,t.offsetY=a-s,Math.abs(t.offsetY)<n*Math.abs(t.offsetX)&&(t.left&&i<e-r&&t.left(t),t.right&&i>e+r&&t.right(t)),Math.abs(t.offsetX)<n*Math.abs(t.offsetY)&&(t.up&&a<s-r&&t.up(t),t.down&&a>s+r&&t.down(t))};function n(t,e){const i=t.changedTouches[0];e.touchstartX=i.clientX,e.touchstartY=i.clientY,e.start&&e.start(Object.assign(t,e))}function r(t,e){const i=t.changedTouches[0];e.touchendX=i.clientX,e.touchendY=i.clientY,e.end&&e.end(Object.assign(t,e)),a(e)}function l(t,e){const i=t.changedTouches[0];e.touchmoveX=i.clientX,e.touchmoveY=i.clientY,e.move&&e.move(Object.assign(t,e))}function o(t){const e={touchstartX:0,touchstartY:0,touchendX:0,touchendY:0,touchmoveX:0,touchmoveY:0,offsetX:0,offsetY:0,left:t.left,right:t.right,up:t.up,down:t.down,start:t.start,move:t.move,end:t.end};return{touchstart:t=>n(t,e),touchend:t=>r(t,e),touchmove:t=>l(t,e)}}function h(t,e,i){const a=e.value,n=a.parent?t.parentElement:t,r=a.options||{passive:!0};if(!n)return;const l=o(e.value);n._touchHandlers=Object(n._touchHandlers),n._touchHandlers[i.context._uid]=l,(0,s.HP)(l).forEach((t=>{n.addEventListener(t,l[t],r)}))}function c(t,e,i){const a=e.value.parent?t.parentElement:t;if(!a||!a._touchHandlers)return;const n=a._touchHandlers[i.context._uid];(0,s.HP)(n).forEach((t=>{a.removeEventListener(t,n[t])})),delete a._touchHandlers[i.context._uid]}const u={inserted:h,unbind:c};e.A=u}}]);
//# sourceMappingURL=695.c57abb1a.js.map