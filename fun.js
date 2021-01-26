const apiKey = "at_vJkuXvGXTDEwY75nLt95iVtlIBYKP";
const input = document.getElementById("inp");
const button = document.getElementById("button");
const errMessage = document.getElementById("err");


let parent = document.getElementById("parent");
let inputValue;




const createMap = (lat, lng) => {

    const provider = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    //    checking if map already exists

    let container = L.DomUtil.get("map");
    if (container != null) {
        container._leaflet_id = null;
    }
    //    painting map

    let map = L.map("map").setView([lat, lng], 13);
    L.tileLayer(`${provider}`, {
        maxZoom: 18,
    }).addTo(map)

    let marcador = L.marker([lat, lng]).addTo(map);
}

const paintData = (country, city, isp) =>{
    
    parent.innerHTML = ` 
                
                <div class="info">
                <div class="pais">
                    <h3>País</h3>
                    <p class="pais_p">${country}</p>
                </div>
                <div class="region">
                    <h3>Ciudad</h3>
                    <p class="region_p">${city}</p>
                </div>
                <div class="isp">
                    <h3>Proveedor de internet</h3>
                    <p class="isp_p">${isp} </p>
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
    const {lat, lng} = data.location;
    const {isp, location: {country, region, city}} = data;
    
     
    paintData(country, city, isp);
    createMap(lat, lng);
    input.value = "";
    button.innerHTML = ` <i class="fas fa-search"></i>`; 
}

button.addEventListener("click", () =>{
    
    inputValue = input.value;
    if(/^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/.test(inputValue)){
        getData();
    
}else{
    
    errMessage.classList.add("act");
    setTimeout(() => {
        errMessage.classList.remove("act")
    }, 3000 )
    }
})
    
  
    
    



