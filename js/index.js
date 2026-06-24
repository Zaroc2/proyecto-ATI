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

// Función para obtener el valor de una cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Leer el idioma
const lang = getCookie('lang');

if (!lang) {
    lang = 'es';
}

const confScript = document.createElement("script");

fetch('/conf')
    .then(response => response.json())
    .then(data => {
        config = data;
        document.getElementById("appTitle").innerHTML = `${config.site[0]}<sub>${config.site[1]}</sub>${config.site[2]}`;
        document.getElementById("searchBar").placeholder = config.name + "...";
        document.getElementById("searchButton").innerHTML = config.search;
        document.getElementById("semester").innerHTML = config.semester;
        document.getElementById("footerText").innerHTML = config.copyRight;
        document.getElementById("profileTextButton").innerHTML = config.profile;
        let noResultsText = config.results;
    });

fetch('/profiles')
    .then(response => response.json())
    .then(data => {
        profiles = data;

        const profilesContainer = document.getElementById("perfiles");
        let profilesCards = profiles;

        for (let i = 0; i < profilesCards.length; i++) {
            const profile = profilesCards[i];
            
            profilesContainer.innerHTML += `<div id="${profile.ci}" class="perfil">  <picture> <source media="(max-width: 480px)" srcset="/${profile.ci}/${profile.ci}Small${profile.image_ext}"> <source media="(min-width: 481px)" srcset="/${profile.ci}/${profile.ci}Big${profile.image_ext}"> <img src="/${profile.ci}/${profile.ci}Big${profile.image_ext}" alt="${profile.name}"> </picture> <h2>${profile.name}</h2> </div> `;

        }

        profilesContainer.addEventListener("click", (event) => {
            const profileCard = event.target.closest(".perfil");
            if (profileCard) {
                
                //--------------------------AQUI VAMOS AL PERFIL--------------------------

            }
        });

    })
    .catch(error => {
        console.error('Error al obtener los perfiles:', error);
    });



document.getElementById("searchButton").addEventListener("click", searchProfile);

document.getElementById("searchBar").addEventListener("keyup",searchProfile);


function searchProfile(){
    
    
    let text = document.getElementById("searchBar").value;

    if(text === ""){
        return;
    }
        
    fetch('/profiles?search='+text)
    .then(response => response.json())
    .then(data => {
        profiles = data;

        const profilesContainer = document.getElementById("perfiles");
        profilesContainer.innerHTML = ""; // Limpiar el contenedor antes de agregar los nuevos perfiles
        let profilesCards = profiles;

        for (let i = 0; i < profilesCards.length; i++) {
            const profile = profilesCards[i];
            
            profilesContainer.innerHTML += `<div id="${profile.ci}" class="perfil">  <picture> <source media="(max-width: 480px)" srcset="/${profile.ci}/${profile.ci}Small${profile.image_ext}"> <source media="(min-width: 481px)" srcset="/${profile.ci}/${profile.ci}Big${profile.image_ext}"> <img src="/${profile.ci}/${profile.ci}Big${profile.image_ext}" alt="${profile.name}"> </picture> <h2>${profile.name}</h2> </div> `;

        }

        profilesContainer.addEventListener("click", (event) => {
            const profileCard = event.target.closest(".perfil");
            if (profileCard) {
                
                //--------------------------AQUI VAMOS AL PERFIL--------------------------

            }
        });

    })
    .catch(error => {
        console.error('Error al obtener los perfiles:', error);
    });

    
}

document.getElementById("mobileMenu").addEventListener("click",(event) => {

    document.querySelector("nav").classList.toggle("menu-open");

})*/