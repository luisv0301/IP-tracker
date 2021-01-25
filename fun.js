const apiKey = "at_vJkuXvGXTDEwY75nLt95iVtlIBYKP";
const input = document.getElementById("inp");
const button = document.getElementById("button");
const provider = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
let parent = document.getElementById("parent");
let myMap;
let data;
let inputValue;




const createMap = () => {
    let latitude = data.location.lat;
    let longitude = data.location.lng;
    
    myMap = L.map("map").setView([`${latitude}`, `${longitude}`], 13);
    L.tileLayer(`${provider}`, {
    maxZoom: 18,
}).addTo(myMap)
    
    let marcador = L.marker([`${latitude}`, `${longitude}`]).addTo(myMap);
}

const paintData = () =>{
    
    parent.innerHTML = ` 
                
                <div class="info">
                <div class="pais">
                    <h3>País</h3>
                    <p class="pais_p">${data.location.country}</p>
                </div>
                <div class="region">
                    <h3>Región</h3>
                    <p class="region_p">${data.location.region}</p>
                </div>
                <div class="isp">
                    <h3>Proveedor de internet</h3>
                    <p class="isp_p">${data.isp} </p>
                </div>
               </div>
             `
               
}
    
const getData = async () => {
    button.innerHTML = `<i class="fa fa-circle-o-notch fa-spin"></i>`;
    let valor = input.value;
    let response = await fetch(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${inputValue}`);
    let responseJson = await response.json();
    data = responseJson;
    button.innerHTML = ` <i class="fas fa-search"></i>`; 
    paintData();
    createMap();
}

button.addEventListener("click", () =>{
    inputValue = input.value;
    if(inputValue){
        getData();
    
}else{
    
    input.classList.add("error");
    }
})
    
  
    
    



