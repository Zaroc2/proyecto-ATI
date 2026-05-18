

document.getElementById("appTitle").innerHTML = `${config.site[0]}<sub>${config.site[1]}</sub>${config.site[2]}`;


document.getElementById("searchBar").placeholder = config.name + "...";

document.getElementById("searchButton").innerHTML = config.search;

document.getElementById("semester").innerHTML = config.semester;

document.getElementById("footerText").innerHTML = config.copyRight;