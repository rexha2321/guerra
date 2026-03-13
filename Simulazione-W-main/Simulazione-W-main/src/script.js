const countries = {

USA:{gdp:25, military:880, population:331},
China:{gdp:18, military:290, population:1410},
Russia:{gdp:2.2, military:120, population:145},
India:{gdp:3.5, military:80, population:1400},
UK:{gdp:3.2, military:65, population:67},
France:{gdp:3, military:55, population:65},
Germany:{gdp:4.4, military:60, population:83},
Italy:{gdp:2.2, military:30, population:59},
Japan:{gdp:4.2, military:50, population:125},
Brazil:{gdp:2.1, military:25, population:214}

}

const countryA = document.getElementById("countryA")
const countryB = document.getElementById("countryB")

Object.keys(countries).forEach(c=>{

let option1=document.createElement("option")
option1.value=c
option1.text=c
countryA.appendChild(option1)

let option2=document.createElement("option")
option2.value=c
option2.text=c
countryB.appendChild(option2)

})

let map = L.map('map').setView([20,0],2)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
}).addTo(map)

let markers=[]

function getPower(country){

let data=countries[country]

return data.gdp*2 + data.military*3 + data.population*0.5

}

function startSimulation(){

markers.forEach(m=>map.removeLayer(m))

let A=countryA.value
let B=countryB.value
let months=Number(document.getElementById("months").value)

let powerA=getPower(A)
let powerB=getPower(B)

let lossA=0
let lossB=0

let historyA=[]
let historyB=[]

for(let i=0;i<months;i++){

let factor=Math.random()

lossA+=factor*powerB*0.02
lossB+=factor*powerA*0.02

historyA.push(lossA)
historyB.push(lossB)

}

generateChart(historyA,historyB,months,A,B)

document.getElementById("report").innerHTML=
`
⚔️ Conflitto tra ${A} e ${B}<br><br>

Perdite militari ${A}: ${Math.round(lossA)}<br>
Perdite militari ${B}: ${Math.round(lossB)}<br><br>

Durata guerra: ${months} mesi
`

}

function generateChart(dataA,dataB,months,A,B){

let ctx=document.getElementById("warChart")

new Chart(ctx,{
type:'line',

data:{
labels:Array.from({length:months},(_,i)=>i+1),

datasets:[

{
label:A,
data:dataA,
borderColor:"red"
},

{
label:B,
data:dataB,
borderColor:"cyan"
}

]

}

})

}