// cart.js implements cart functionality for the 
// Starry Messenger site.
// 
// It contains functions for handling button clicks as
// well as basic CRUD operations on the favorites cart.

// constants
const addMessage = "add to favorites";
const removeMessage = "remove from favorites";
const favoritesKey = "favorites";
const favoritesPage = "favorites.html";


//
// handlers
//


// toggles add/remove button label
// directly appends/removes to cart or feed without reloading.
// saves/removes from localStorage
function handleClick(elem) {

    // if the current page == favoritesPage
    // use favorites workflow
    if (getCurrentPage() === favoritesPage) {
        handleClickFavoritesPage(elem);
    }
    // else use the page external workflow
    else {
        handleClickPageExternal(elem);
    }
}

// handles click on favorites page.
function handleClickFavoritesPage(elem) {
    if ($(elem).text() === addMessage) {
        $(".cart ul").append($(elem).parent().parent());
        $(".cart ul li div button").text(removeMessage);
        // addToCart only after mutating element to 
        // ensure equality checks remain valid
        addToCart(elem);
    }
    else {
        // removeFromCart before mutating element
        // otherwise, equality checks could get messed up
        removeFromCart(elem);
        $(".feed").append($(elem).parent().parent());
        $(".feed li div button").text(addMessage);
    }
}

// designed use on pages without the .cart. 
// simply adds the elem to localStorage.
function handleClickPageExternal(elem) {
    if ($(elem).text() === addMessage) {
        $(elem).text(removeMessage);
        addToCart(elem);
    }
    else {
        removeFromCart(elem);
        $(elem).text(addMessage);
    }
}

// loads favorites from localStorage and appends them to .cart ul
function loadCart() {
    let favorites = JSON.parse(localStorage.getItem(favoritesKey));
    if (favorites) {
        $(".cart ul").empty();
        favorites.forEach(
            (fav) => {
                $(".cart ul").append(wrapMediaElement(fav));
            }
        );
    }
}

// 
function handleRemoveAllClick() {
    emptyCart();
    // redraw the cart
    location.reload();
}

// utility function to wrap content in media <li>
function wrapMediaElement(contentToWrap) {
    return "<li class=\"media p-3 row\">" + contentToWrap + "</li>";
}

// utility function to get the current html page
function getCurrentPage() {
    let path = window.location.pathname;
    return path.split("/").pop();
}


//
// CRUD operations
// 


function addToCart(elem) {
    let favorites = JSON.parse(localStorage.getItem(favoritesKey));
    // if favorites is empty, initialize
    if (!favorites) {
        favorites = [];
    }
    // elem is the button that was clicked
    // get parents to capture media element
    favorites.push($(elem).parent().parent().html());

    // save favorites to local storage
    localStorage.setItem(favoritesKey, JSON.stringify(favorites));
    console.log("localStorage.favorites:\n" + localStorage.getItem(favoritesKey));
}

// searches cart for elem and removes it if found.
function removeFromCart(elem) {
    let favorites = JSON.parse(localStorage.getItem(favoritesKey));
    // get the text of the element to remove
    // this is used for string matching below
    let elemToRemove = JSON.stringify($(elem).parent().parent().html());
    if (favorites) {
        console.log("Searching localStorage for\n" + elemToRemove);
        // iterate over favorites
        const favoritesLength = favorites.length;
        for (let i = 0; i < favoritesLength; i++) {
            currentFav = JSON.stringify(favorites[i]);
            // check currentFav against element to remove
            if (currentFav == elemToRemove) {
                console.log("Found element to remove. Removing...");
                favorites.splice(i, 1);
                localStorage.setItem(favoritesKey, JSON.stringify(favorites));
                // found the element, nothing left to do, break
                break;
            }
        }
        console.log("cart after removing element:\n"
            + JSON.parse(localStorage.getItem(favoritesKey)));
    }
    // if the cart was already empty, no action is required.
    // log a warning anyways
    else {
        console.warn("attempt to remove from empty cart. no further action needed.")
    }
}

// removes all from the cart
function emptyCart() {

    let favorites = JSON.parse(localStorage.getItem(favoritesKey));
    // if favorites found, clear it and refresh the page.
    if (favorites) {
        console.log("clearing favorites from localStorage!")
        localStorage.setItem(favoritesKey, null);
    }
    // otherwise, no work to do. log a warning.
    else {
        console.warn("attempt to remove from empty cart. no further action needed.")
    }
}