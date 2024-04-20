import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const res=await fetch(`${config.backendEndpoint}/cities`);
  const data=await res.json();
  // console.log(data);
  return data;
  } catch (error) {
    return null; 
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let ele1=document.createElement("h5");
  let ele2=document.createElement("h6");
  ele1.innerText=city;
  ele2.innerText=description;

  let textDiv=document.createElement("div");
  textDiv.append(ele1);//ele1 and ele2 inside div
  textDiv.append(ele2);
  textDiv.setAttribute("class","tile-text")

  let img=document.createElement("img");
  img.src=image;

  let anchor_tag = document.createElement("a")
  anchor_tag.href=`pages/adventures/?city=${id}`;
  anchor_tag.id=id

  anchor_tag.append(img);
  anchor_tag.append(textDiv);

  let divColum=document.createElement("div");
  divColum.setAttribute("class","col-sm-12 col-md-6 col-lg-3 my-3 tile")
  divColum.appendChild(anchor_tag);


  let addcolumnInRow = document.getElementById("data");
  addcolumnInRow.appendChild(divColum);



}

export { init, fetchCities, addCityToDOM };
