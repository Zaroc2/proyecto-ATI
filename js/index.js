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
let lang = getCookie('lang');

if (!lang) {
    lang = 'ES';
}

var noResultsText;
var config;

fetch('/ATI/config')
    .then(response => response.json())
    .then(data => {
        config = data;
        document.getElementById("appTitle").innerHTML = `${config.site[0]}<sub>${config.site[1]}</sub>${config.site[2]}`;
        document.getElementById("searchBar").placeholder = config.name + "...";
        document.getElementById("searchButton").innerHTML = config.search;
        document.getElementById("semester").innerHTML = config.semester;
        document.getElementById("footerText").innerHTML = config.copyRight;
        document.getElementById("profileTextButton").innerHTML = config.profile;
        noResultsText = config.results;
    });


function fetchProfiles(){

    fetch('/ATI/profiles')
        .then(response => response.json())
        .then(data => {

            profiles = data;

            const profilesContainer = document.getElementById("perfiles");
            let profilesCards = profiles;

            for (let i = 0; i < profilesCards.length; i++) {
                const profile = profilesCards[i];
                
                profilesContainer.innerHTML += `<div id="${profile.ci}" class="perfil">  <picture> <source media="(max-width: 480px)" srcset="/${profile.ci}/${profile.ci}Small${profile.image_ext}"> <source media="(min-width: 481px)" srcset="/${profile.ci}/${profile.ci}Big${profile.image_ext}"> <img src="/${profile.ci}/${profile.ci}Big${profile.image_ext}" alt="${profile.name}"> </picture> <h2>${profile.name}</h2> </div> `;

            }

        })
        .catch(error => {
            console.error('Error al obtener los perfiles:', error);
        });
}

document.getElementById("searchButton").addEventListener("click", searchProfile);

document.getElementById("searchBar").addEventListener("keyup",searchProfile);

fetchProfiles()

function searchProfile(e = null){

    let text = document.getElementById("searchBar").value;
    let profilesContainer = document.getElementById("perfiles");

    if(document.querySelector("section").classList.contains("contenedorPerfil")){
        if(e?.type === "click" || (e?.type === "keyup" && e?.key === "Enter")){
            //Si tiene la clase de contenedor, es porque esta en un perfil, y solo se activara si es por click
            document.querySelector("section").classList.toggle("contenedorPerfil");
            document.querySelector("section").innerHTML = '<h1 id="semester"></h1><div id="perfiles"></div><p id="noResultsText"></p>';
            let text = document.getElementById("searchBar").value;
            profilesContainer = document.getElementById("perfiles");
            console.log("searchProfile ("+text+")");
        
            fetch('/ATI/profiles?search='+encodeURIComponent(text))
            .then(response => response.json())
            .then(data => {

                if(data.length === 0){
                    profilesContainer.innerHTML = ""; // Limpiar el contenedor antes de re-agregar los perfiles
                    document.getElementById("noResultsText").innerHTML = `${noResultsText} <strong> ${text} </strong>`;
                    document.getElementById("noResultsText").style.display = "";
                    return;
                }
                else{
                    document.getElementById("noResultsText").style.display = "none";
                }

                profiles = data;

                profilesContainer.innerHTML = ""; // Limpiar el contenedor antes de agregar los nuevos perfiles
                let profilesCards = profiles;

                for (let i = 0; i < profilesCards.length; i++) {
                    const profile = profilesCards[i];
                    
                    profilesContainer.innerHTML += `<div id="${profile.ci}" class="perfil">  <picture> <source media="(max-width: 480px)" srcset="/${profile.ci}/${profile.ci}Small${profile.image_ext}"> <source media="(min-width: 481px)" srcset="/${profile.ci}/${profile.ci}Big${profile.image_ext}"> <img src="/${profile.ci}/${profile.ci}Big${profile.image_ext}" alt="${profile.name}"> </picture> <h2>${profile.name}</h2> </div> `;

                }

            })
            .catch(error => {
                console.error('Error al obtener los perfiles:', error);
            });
            profilesContainer.addEventListener("click", (event) => {
                const profileCard = event.target.closest(".perfil");
                console.log("En la funcion")
                if (profileCard) {     
                    console.log("YEndo al fetchCI")
                    fetchCI(profileCard.id);
                    }
            });
            return;
        } else {
            return;
        }
    }

    if(text === ""){
        profilesContainer.innerHTML = ""; // Limpiar el contenedor antes de re-agregar los perfiles
        fetchProfiles()
        return;
    }

    console.log("searchProfile ("+text+")");
        
    fetch('/ATI/profiles?search='+encodeURIComponent(text))
    .then(response => response.json())
    .then(data => {

        if(data.length === 0){
            profilesContainer.innerHTML = ""; // Limpiar el contenedor antes de re-agregar los perfiles
            document.getElementById("noResultsText").innerHTML = `${noResultsText} <strong> ${text} </strong>`;
            document.getElementById("noResultsText").style.display = "";
            return;
        }
        else{
            document.getElementById("noResultsText").style.display = "none";
        }

        profiles = data;

        profilesContainer.innerHTML = ""; // Limpiar el contenedor antes de agregar los nuevos perfiles
        let profilesCards = profiles;

        for (let i = 0; i < profilesCards.length; i++) {
            const profile = profilesCards[i];
            
            profilesContainer.innerHTML += `<div id="${profile.ci}" class="perfil">  <picture> <source media="(max-width: 480px)" srcset="/${profile.ci}/${profile.ci}Small${profile.image_ext}"> <source media="(min-width: 481px)" srcset="/${profile.ci}/${profile.ci}Big${profile.image_ext}"> <img src="/${profile.ci}/${profile.ci}Big${profile.image_ext}" alt="${profile.name}"> </picture> <h2>${profile.name}</h2> </div> `;

        }

    })
    .catch(error => {
        console.error('Error al obtener los perfiles:', error);
    });

    
}
let profilesContainer = document.getElementById("perfiles");
profilesContainer.addEventListener("click", (event) => {
    const profileCard = event.target.closest(".perfil");
    console.log("En la funcion")
    if (profileCard) {     
        console.log("YEndo al fetchCI")
        fetchCI(profileCard.id);
        }
});

document.getElementById("appTitle").addEventListener("click", () => {

    if(document.querySelector("section").classList.contains("contenedorPerfil")){
        document.querySelector("section").classList.toggle("contenedorPerfil");
    }
    document.querySelector("section").innerHTML = '<h1 id="semester"></h1><div id="perfiles"></div><p id="noResultsText"></p>';
    fetchProfiles();
    let profilesContainer = document.getElementById("perfiles");
    profilesContainer.addEventListener("click", (event) => {
        const profileCard = event.target.closest(".perfil");
        console.log("En la funcion")
        if (profileCard) {     
            console.log("YEndo al fetchCI")
            fetchCI(profileCard.id);
            }
    });
})

document.getElementById("mobileMenu").addEventListener("click",(event) => {

    document.querySelector("nav").classList.toggle("menu-open");

})

function fetchCI(ci) {

    fetch('/ATI/p?ci='+encodeURIComponent(ci))
    .then(response => response.text())
    .then(html => {
        document.querySelector("section").innerHTML =  html;
        document.querySelector("section").classList.toggle("contenedorPerfil")
        setTexts();     
    })
    .catch(error => {
            console.error('Error al obtener el perfil', error);
        });

}
