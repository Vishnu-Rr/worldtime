var app = new Vue({
    el:'#main',
    data:{
        ly:true,
        countrys:[
           {
            title:"Singapore",
             time: 'Asia/singapore',
    
            },
        {
           title:"America",
          time:'america/Los_Angeles',

        },
     
        {
            title:"Tokyo",
            time:'Asia/Tokyo',
          },
         {
             title:"London",
             time:"Europe/london"
         },
         {
             title:"Paris",
             time:"europe/Paris"
         },
         {
             title:"New York",
             time:"america/new_york"
         },
         {
             title:"Dubai",
             time:"asia/dubai"
         },
         {
             title:"Chicago",
             time:"America/Chicago"
         },
         {
title:"Mumbai",
time:"asia/calcutta"
         },
         {
             title:"Qatar",
             time:"Asia/Qatar",
         },
         {
             title:"Bermuda",
             time:"Atlantic/Bermuda"
         },
         {
             title:"Australia",
             time:"Australia/Canberra"
         },
         {
             title:"Brazil",
             time:"Brazil/East"
         },
         {
             title:"Canada",
             time:"Canada/Eastern"
         },
         {
             title:"Egypt",
             time:"Egypt",
             
             
         }
       ],
       citys:"chennai",
        selectedTimezone: 'Asia/calcutta',
        weather:"chennai",
        temper:'',
        des:'',
        sr:'',
    am:false,

    pm:false,
day:'',
date:'',
month:'',
year:'',
hrs:'',

weekday: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
],
months:[
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
   "September",
   "October",
   "November",
   "December",
],
srs:'',
weatherData:null  ,
names:'',
humi:"",
des:"" ,
  },

 mounted(){
    this.change()
    setInterval(this.change,500) 

   this.india()
   this.onchange()
   setInterval(this.onchange,60000)
 },
methods: {
    india(){
        $.getJSON("https://api.openweathermap.org/data/2.5/weather?q="+this.weather+"&appid=2558f98220e53776243967987971b0a2", (response) => {
    
            var hour=response.name
                var temper= Math.round(response.main.temp - 273.15)
                var des=response.weather[0].icon
                this.weatherData=des
                this.temper=temper
                this.des=response.weather[0].description
 
        });
    },
    onchange(){
                 $.getJSON("https://api.openweathermap.org/data/2.5/weather?q="+this.selectedTimezone.title+"&appid=2558f98220e53776243967987971b0a2", (response) => {
            var temper=Math.round(response.main.temp - 273.15)
               var des=response.weather[0].description       
        this.weatherData=response.weather[0].icon
                this.temper=temper
                this.des=des
 
    });
    },
change(){
 
var localstring = new Date().toLocaleString('en-us',{timeZone: this.selectedTimezone.time});
var localdate = new Date(localstring);

var dayss=this.weekday[localdate.getDay()]
    this.day=dayss
var dates=localdate.getDate()
this.date=dates+"th"
if(dates==1){
this.date=dates+"st"
}if(dates==2){
    this.date=dates+"nd"
    }if(dates==3){
        this.date=dates+"rd"
        }
var mont= this.months[localdate.getMonth()]
this.month=mont
var yea=localdate.getFullYear()
this.year=yea
    var hours=localdate.getHours()%12;if(hours<=9 ){ var hours= "0"+hours}
    if(hours==0)
    {hours=12}
    var min= localdate.getMinutes();if(min<=9){var min="0"+min}
    var sec=localdate.getSeconds();if(sec<=9){ var sec="0"+sec}

  this.hrs=  hours+" : "+min+" : "+sec
  if(localdate.getHours()>12){
    this.am=true
    this.pm=false
}
 if  (localdate.getHours()<12){
    this.am=false
    this.pm=true
 }
},
default(){
    this.ly==false
}

}
})