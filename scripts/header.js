const headerClass = ".navigation";

const headerContent = 
    "<div class=\"col\">" +
        "<ul class=\"nav nav-tabs\">" +
            "<li class=\"nav-item\">" +
                "<a class=\"nav-link\" href=\"./index.html\">Home</a>" +
            "</li>" +
            "<li class=\"nav-item\">" +
                "<a class=\"nav-link\" href=\"./about.html\">About</a>" +
            "</li>" +
            "<li class=\"nav-item\">" +
                "<a class=\"nav-link\" href=\"./favorites.html\">Favorites</a>" +
            "</li>" +
            "<li class=\"nav-item\">" +
                "<a class=\"nav-link\" href=\"./earth.html\">Earth</a>" +
            "</li>" +
            "<li class=\"nav-item\">" +
                "<a class=\"nav-link\" href=\"./mars.html\">Mars</a>" +
            "</li>" +
            "<li class=\"nav-item\">" +
                "<a class=\"nav-link\" href=\"./hubble.html\">Hubble Telescope</a>" +
            "</li>" +
        "</ul>" +
        "<div class=\"row\">" +
            "<H2 class=\"col\">The Starry Messenger</H2>" +
        "</div>"
    "</div>";

$(headerClass).append(headerContent);