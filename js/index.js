

const urlParams = new URLSearchParams(window.location.search);
let lang = urlParams.get("lang");

if( lang === null )
    lang = 'ES';
else
    lang = lang.toUpperCase();

const confScript = document.createElement("script");

confScript.src =  `/conf/config${lang}.json`

confScript.onload = function() {

    
    document.getElementById("appTitle").innerHTML = `${config.site[0]}<sub>${config.site[1]}</sub>${config.site[2]}`;


    document.getElementById("searchBar").placeholder = config.name + "...";

    document.getElementById("searchButton").innerHTML = config.search;

    document.getElementById("semester").innerHTML = config.semester;

    document.getElementById("footerText").innerHTML = config.copyRight;


    const profilesContainer = document.getElementById("perfiles");
    const profilesCards = profiles;

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

}

document.head.appendChild(confScript);