// VARIABLE DECLERATION

let getStarted=document.querySelectorAll('.get-started')[0]
let main=document.querySelectorAll('.main-page')[0]
let intro=document.querySelectorAll('.intro-light')[0]
let locName=document.querySelectorAll('.location')[0]
let seIcon=document.querySelectorAll('.search-icon')[0]
let locIcon=document.querySelectorAll('.location-icon')[0]
let inBox=document.querySelectorAll('.input-box')[0]
let seIconOg=document.querySelectorAll('.search-icon-og')[0]
let tempDeg=document.querySelectorAll('.temp')[0]
let descrip=document.querySelectorAll('.description')[0]
let date=document.querySelectorAll('.date')[0]
let windCon=document.querySelectorAll('.wind-M')[0] 
let humiCon=document.querySelectorAll('.humi-M')[0]
let pressCon=document.querySelectorAll('.pres-M')[0]
let bottom=document.querySelectorAll('.hourly-forcast')[0]
let wIcon=document.querySelectorAll('.weather-icon')[0]
let introH3=document.querySelectorAll('.h3-light')[0]
let introP=document.querySelectorAll('.p-light')[0]
let introImg=document.querySelectorAll('.icon')[0]
let cancelBt=document.querySelectorAll('.cancel')[0]


// DARK MODE FUNCTIONING 

function dark(){
    let data=new Date()
    if(data.getHours()>=18 || data.getHours()<6){
        introImg.src='./3d weather icons/moon/11.png'
        intro.classList.add('intro-dark')
        introH3.classList.add('h3-dark')
        introH3.style.color='rgba(143, 143, 143, 0.95)'
        introP.style.color='rgb(99, 98, 98)'
        document.querySelectorAll('.top-part-light')[0].classList.add('top-part-dark')
        document.querySelectorAll('.center-part-light')[0].classList.add('center-part-dark')
        document.querySelectorAll('.main-page')[0].style.backgroundColor='#010101'
        document.querySelectorAll('.other-details-light')[0].classList.add('other-details-dark')
        document.querySelectorAll('.search-result')[0].classList.add('search-result-dark')
        document.querySelectorAll('.input-box')[0].classList.add('input-box-dark')
    }
}
dark()

// DISAPEAR OF INTRO PAGE AND GETTING GEO LOCATION


getStarted.addEventListener('click',()=>{
    intro.classList.add('intro-light-anime')
    setTimeout(vanish,860) 
})

function vanish(){      
    intro.style.display='none'
    main.style.display='block'
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getLatLon)
      }
    else
    {
         alert("Sorry! your browser is not supporting")
     } 
}

function getLatLon(pos){
    recieveData(pos.coords.latitude,pos.coords.longitude)
}

// FETCHIING THE WEATHER DATA USING THIRD PARTY API AND IMPLEMENTING USING FUNCTIONS

function recieveData(lat,lon){
    const data1=fetch('https://api.openweathermap.org/geo/1.0/reverse?lat='+lat+'&lon='+lon+'&limit=1&appid=5e228105f6658f8f3deba169da924d78')
    .then(response => response.json())
    .then(data => locName.innerHTML=data[0].name+','+data[0].state)
    const data2=fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=5e228105f6658f8f3deba169da924d78')
    .then(response => response.json())
    .then(data => {
        currentWrUpdate(data)   
    })
    const data3=fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=minutely,daily&units=metric&appid=5e228105f6658f8f3deba169da924d78')
    .then(response =>response.json())
    .then(data =>{
        hourlyForcast(data)
    })
}

// DATE FETCHING AND IMPLEMENTING

const dateData= new Date()
const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const days=["Sunday","Monday","Tuesday","Wedsday","Thursady","Friday","Saturday"]

function dateFun(){
    date.innerHTML=days[dateData.getUTCDay()]+','+dateData.getUTCDate()+' '+months[dateData.getUTCMonth()]
}

// UPDATING THE VALUES WITH THE CURRENT WEATHEAR STATUS

function currentWrUpdate(data){
        let time=new Date()
        wIcon.src=currentWrImgUpdate(data,time)
        tempDeg.innerHTML=parseInt(data.main.temp-273)
        descrip.innerHTML=data.weather[0].description
        dateFun()
        windCon.innerHTML=data.wind.speed +' '+'km/hr'
        humiCon.innerHTML=data.main.humidity+'%'
        pressCon.innerHTML=data.main.pressure
}

function currentWrImgUpdate(data,time){
  let imgSource=""
    let  data1=time
        if(data.weather[0].description==="clear sky"){
            if(data1.getHours()>=18 || data1.getHours()<=6){
                imgSource="../3d weather icons/moon/10.png"
                
            }
            else{
                imgSource="../3d weather icons/sun/26.png"
                
            }
        }
        else if(data.weather[0].description==="few clouds","broken clouds","scattered clouds","overcast clouds"){
            if(data1.getHours()>=18 || data1.getHours()<=6){
                imgSource="../3d weather icons/moon/31.png"
            }
            else{
                imgSource="../3d weather icons/sun/27.png"
            }
        }
        else if(data.weather[0].description==="scattered clouds"){
                imgSource="../3d weather icons/cloud/35.png"   
        }
        else if(data.weather[0].description==="shower rain"){
                imgSource="../3d weather icons/cloud/7.png"   
        }
        else if(data.weather[0].description==="rain","light rain","moderate rain","	heavy intensity rain","	very heavy rain","extreme rain"){
            if(data1.getHours()>=18 || data1.getHours()<=6){
                imgSource="../3d weather icons/moon/1.png"
            }
            else{
                imgSource="../3d weather icons/sun/8.png"
            }
        }
        else if(data.weather[0].description==="thunderstorm","light thunderstorm","heavy thunderstorm","ragged thunderstorm"){
            if(data1.getHours()>=18 || data1.getHours()<=6){
                imgSource="../3d weather icons/moon/11.png"
            }
            else{
                imgSource="../3d weather icons/sun/thunder storm.png"
            }
        }
        else if(data.weather[0].description==="snow"){
            if(data1.getHours()>=18 || data1.getHours()<=6){
                imgSource="../3d weather icons/moon/19.png"
            }
            else{
                imgSource="../3d weather icons/cloud/23.png"
            }
        }
        else if(data.weather[0].description==="	thunderstorm with light rain","thunderstorm with rain","thunderstorm with heavy rain"){
            if(data1.getHours()>=18 || data1.getHours()<=6){
                imgSource="../3d weather icons/cloud/17.png"
            }
            else{
                imgSource="../3d weather icons/sun/16.png"
            }
        }
        return imgSource
        
}

// UPDATING THE VALUES WITH NEXT 10 HR WEATHER STATUS

function hourlyForcast(data){

    let hrDark="hr1"
    let h5Dark="h5L"
    let time1=new Date()
    if(time1.getHours()>=18 || time1.getHours()<6){
        hrDark="hr2"
        h5Dark="h5D"
    }

    let arrayTimeStamp=data.hourly.map(data=>{
    let time=new Date(data.dt*1000)
    let t=""

        if(time.getHours()>12){
            t=time.getHours()%12
        }
        else if(time.getHours()===0){
            t=12
        }
        else{
            t=time.getHours()
        }

    let imgSource=currentWrImgUpdate(data,time)
        return  `<div class="${hrDark}"><h5 class="${h5Dark}">${t}:00</h5><img src="${imgSource}" alt="" class="imgL"><div class="degree"></div><h4>${parseInt(data.temp)}</h4></div>`
    })

    let arrayData=arrayTimeStamp.slice(0,9)
        let html=""
        for(i=0;i<9;i++)
        html += arrayData[i]
        bottom.innerHTML=html
}



// SEARCH FUNCTIONS 



seIcon.addEventListener('click',()=>{
    locName.style.display='none'
    locIcon.style.display='none'
    seIconOg.style.display='block'
    cancelBt.style.display='block'
    inBox.classList.add('active')
    seIcon.style.display='none'
})

function s(lat,lon){
    recieveData(lat,lon)
    afterSearch()
}

cancelBt.addEventListener('click',afterSearch)

function afterSearch(){
    sResult.style.display='none'
    locName.style.display='block'
    locIcon.style.display='block'
    seIconOg.style.display='none'
    inBox.classList.remove('active')
    seIcon.style.display='block'
    inBox.value=""
    cancelBt.style.display='none'
}

let sResult=document.querySelectorAll('.search-result')[0]

seIconOg.addEventListener('click',()=>{
    if(inBox.value){
    const coData=fetch('https://api.openweathermap.org/geo/1.0/direct?q='+inBox.value+'&limit=5&appid=5e228105f6658f8f3deba169da924d78')
    .then(response=>response.json())
    .then(data=>{
        sResult.style.display='block'
        let html=""
        data.forEach(data => {
            html += `<li class="search-data"><img src="./Icons/location.svg" alt="location" ><p class="result-locations" onClick=s("${data.lat}","${data.lon}")>${data.name},${data.state}</p></li>`
        });
        sResult.innerHTML= html
    })}
})




