
document.getElementById("appTitle").innerHTML = `${config.site[0]}<sub>${config.site[1]}</sub>${config.site[2]}`;


document.getElementById("searchBar").placeholder = config.name + "...";

document.getElementById("searchButton").innerHTML = config.search;

document.getElementById("footerText").innerHTML = config.copyRight;

const urlParams = new URLSearchParams(window.location.search);
const ci = urlParams.get("ci");
const script = document.createElement("script");
script.src = `/${ci}/profile.json`; //Con esto cargamos el perfil especifico por cada ci

script.onload = function() {
    
    document.querySelector("title").innerHTML = profile.name;

    document.getElementById("imagenPerfil").innerHTML = `<picture> <source media="(max-width: 480px)" srcset="/${profile.ci}/${profile.ci}Small${profile.image_ext}"> <source media="(min-width: 481px)" srcset="/${profile.ci}/${profile.ci}Big${profile.image_ext}"> <img src="/${profile.ci}/${profile.ci}Small${profile.image_ext}" alt="${profile.name}"> </picture>`

    document.getElementById("title-name").innerHTML = profile.name;
    
    document.getElementById("breve-descripcion-de-mi-persona").innerHTML = profile.description

    document.getElementById("favorite-color").innerHTML = config.color + ": ";
    document.getElementById("favorite-color-data").innerHTML = profile.color;

    if(profile.book.length > 1){
        document.getElementById("favorite-book").innerHTML = config.book[1] + ": ";
    }else{
        document.getElementById("favorite-book").innerHTML = config.book[0] + ": ";
    }
    document.getElementById("favorite-book-data").innerHTML = profile.book;

    if(profile.music.length > 1){
        document.getElementById("favorite-music").innerHTML = config.music[1] + ": ";
    }else{
        document.getElementById("favorite-music").innerHTML = config.music[0] + ": ";
    }
    document.getElementById("favorite-music-data").innerHTML = profile.music;

    if(profile.video_game.length > 1){
        document.getElementById("favorite-game").innerHTML = config.video_game[1] + ": ";
    }else{
        document.getElementById("favorite-game").innerHTML = config.video_game[0] + ": ";
    }
    document.getElementById("favorite-game-data").innerHTML = profile.video_game;

    document.getElementById("learnt-languages").innerHTML = "<strong>" + config.language + ": </strong>";
    document.getElementById("learnt-languages-data").innerHTML = "<strong>" + profile.language + "</strong>";

    const emailText = config.email.replace(" [email]", `: <a href="mailto:${profile.email}">` + profile.email + "</a>");
    document.getElementById("email-contact").innerHTML = emailText;

}

document.head.appendChild(script);