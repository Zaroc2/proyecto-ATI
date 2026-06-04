// Función normal (window o undefined en modo estricto)
function metodoThisNormal() {
    console.log("this:", this);
}

// Función en objeto, apunta a objeto
const objetoPrueba = {
    nombre: "objeto",
    metodoThisObjeto: function() {
        console.log("this de objeto:", this);
    }
};

// funcion flecha, apunta al contexto en donde este
const metodoThisFlecha = () => {
    console.log("this de flecha:", this);
};

// Llama a las funciones para ver resultado en consola
metodoThisNormal();
objetoPrueba.metodoThisObjeto();
metodoThisFlecha();

const urlParams = new URLSearchParams(window.location.search);
let lang = urlParams.get("lang");
let search = urlParams.get("search");

if( lang === null )
    lang = 'ES';
else
    lang = lang.toUpperCase();

const confScript = document.createElement("script");

confScript.src =  `/conf/config${lang}.json`

let profilesCards;
let noResultsText;

confScript.onload = function() {

    
    document.getElementById("appTitle").innerHTML = `${config.site[0]}<sub>${config.site[1]}</sub>${config.site[2]}`;


    document.getElementById("searchBar").placeholder = config.name + "...";

    document.getElementById("searchButton").innerHTML = config.search;

    document.getElementById("semester").innerHTML = config.semester;

    document.getElementById("footerText").innerHTML = config.copyRight;

    document.getElementById("profileTextButton").innerHTML = config.profile;

    noResultsText = config.results;

    const profilesContainer = document.getElementById("perfiles");
    profilesCards = profiles;

    for (let i = 0; i < profilesCards.length; i++) {
        const profile = profilesCards[i];
        
        profilesContainer.innerHTML += `<div id="${profile.ci}" class="perfil">  <picture> <source media="(max-width: 480px)" srcset="/${profile.ci}/${profile.ci}Small${profile.image_ext}"> <source media="(min-width: 481px)" srcset="/${profile.ci}/${profile.ci}Big${profile.image_ext}"> <img src="/${profile.ci}/${profile.ci}Big${profile.image_ext}" alt="${profile.name}"> </picture> <h2>${profile.name}</h2> </div> `;

    }

    profilesContainer.addEventListener("click", (event) => {
        const profileCard = event.target.closest(".perfil");
        if (profileCard) {
            const ci = profileCard.id;
            window.location.href = `profile.html?ci=${ci}&lang=${lang}`;
        }
    });

    if(search !== null){
        document.getElementById("searchBar").value = search;
        searchProfile();
    }
    
}

document.head.appendChild(confScript);

document.getElementById("searchButton").addEventListener("click", searchProfile);

document.getElementById("searchBar").addEventListener("keyup",searchProfile);

function searchProfile(){
    
    
    let text = document.getElementById("searchBar").value;

    if(text === ""){
        for(let i=0; i<profilesCards.length; i++){
            document.getElementById(`${profilesCards[i].ci}`).style.display = "";
        }
        return;
    }
        
    let anyResults = false;

    for(let i=0; i<profilesCards.length; i++){

        if(!profilesCards[i].name.includes(text)){
            document.getElementById(`${profilesCards[i].ci}`).style.display = "none";
        }else{
            document.getElementById(`${profilesCards[i].ci}`).style.display = "";
            anyResults = true;
        }

    }


    if(!anyResults){
        document.getElementById("noResultsText").innerHTML = ` ${noResultsText} <strong> ${text} </strong> `;

        document.getElementById("noResultsText").style.display = "";
    }else{
        document.getElementById("noResultsText").style.display = "none";
    }

    
}

document.getElementById("mobileMenu").addEventListener("click",(event) => {

    document.querySelector("nav").classList.toggle("menu-open");

})