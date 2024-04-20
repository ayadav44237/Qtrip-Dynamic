
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let p=new URLSearchParams(search);
  let city_id=p.get("city");
  return city_id;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let res=await fetch(`${config.backendEndpoint}/adventures/?city=${city}`);
    console.log(res);
    let d=await res.json()
    return d;
  } catch (error) {
    return null;
  }

}
//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  console.log(adventures);
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((key) => {
   
    let p1=document.createElement("p");
    let p2=document.createElement("p");
    p1.innerText=key.name;
    // console.log(key.name);
    p2.innerText= "₹"+key.costPerHead;
    
    
    let Div1=document.createElement("div");
    Div1.appendChild(p1);
    Div1.appendChild(p2);
    Div1.setAttribute("class","text-center d-md-flex crd-text justify-content-between")
    // console.log(Div1);
    let p3=document.createElement("p");
    let p4=document.createElement("p");
    p3.innerText="Duration";
    p4.innerText=key.duration+" hours";
    
    
    let Div2=document.createElement('div');
    Div2.appendChild(p3);
    Div2.appendChild(p4);
    Div2.setAttribute("class","text-center d-md-flex crd-text justify-content-between")
    // console.log(Div2);

    let Div_Parent=document.createElement("div");
    Div_Parent.appendChild(Div1);
    Div_Parent.appendChild(Div2);
    Div_Parent.setAttribute("class","space");
    // console.log(Div_Parent);

 
    let image_=document.createElement("img");
    image_.src=key.image;
    image_.setAttribute("class","card-img-top")


    let categ=document.createElement("div");
    categ.innerText=key.category;
    categ.setAttribute("class","category-banner");
    //  console.log(categ);



    let Grand_Div=document.createElement("div");
    Grand_Div.appendChild(image_);
    Grand_Div.appendChild(categ);
    Grand_Div.setAttribute("class","activity-card");
    Grand_Div.appendChild(Div_Parent);
    // console.log(Grand_Div);



    let anc_tag=document.createElement("a");
    anc_tag.href=`detail/?adventure=${key.id}`;
    anc_tag.id=key.id; 
    anc_tag.appendChild(Grand_Div);
    anc_tag.setAttribute("class","col-sm-12 col-md-6 col-lg-3 my-3");



    let main_div=document.getElementById("data");
    main_div.appendChild(anc_tag);

  });


}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
   let filt_Durat=list.filter((key)=>{
   if(key.duration>=parseInt(low) && key.duration<=parseInt(high)){
    return key;
     }
   });
  //  console.log(filt_Durat,"Duration");
   return filt_Durat;

  

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
   let filt_cat=list.filter((key)=>{
       if(categoryList.includes(key.category)){
        return key;
       }
   })

   return filt_cat;
   

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

//list==Adventure
function filterFunction(list, filters) {
  // console.log(list,"printing list");
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
    let filt_list=list;

    if(filters.category.length!=0 && filters.duration.length==0){
       filt_list=filterByCategory(list,filters.category)
    }

    if(filters.category.length==0 && filters.duration.length!=0){
      filt_list=filterByDuration(list,filters.duration.split("-")[0],filters.duration.split("-")[1]);

    }

    if(filters.category.length!=0 && filters.duration.length!=0){
      let filt=filterByDuration(list,filters.duration.split("-")[0],filters.duration.split("-")[1]);
      filt_list=filterByCategory(filt,filters.category);

      //let  filt=filterByCategory(list,filters.category);
      // filt_listt=filterByDuration(filt,filters.duration.split("-")[0],filters.duration.split("-")[1]);
    }
  // Place holder for functionality to work in the Stubs
  return filt_list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters))

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
 const d=JSON.parse(localStorage.getItem("filters"))

  // Place holder for functionality to work in the Stubs
  return d;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let p=filters.category;
  let pDiv=document.getElementById("category-list");
  
  p.forEach((key)=>{
    let pills=document.createElement("div");
    pills.innerText=(key);
    pills.setAttribute("class","category-filter")
    pDiv.append(pills);
  })



}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
