
// Firefox 1.0+
const isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
///constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// Internet Explorer 6-11
const isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
const isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
const isChrome = !!window.chrome && !!window.chrome.webstore;

const warningDisplayedKey = "warningDisplayedKey";
const warningDisplayedValue = "The warning has been displayed."

function displayWarning() {
    // check if warning has already been displayed.
    // It only needs to be displayed once.
    let warningDisplayed = localStorage.getItem(warningDisplayedKey);
    if (warningDisplayed !== warningDisplayedValue) {
        if (isSafari) {
            alert(new Date() +
                "Safari detected. The Starry Messenger requires use of localStorage. "
                + "Be sure to have \"Disable local file restrictions\" set to true in your menu bar.\n\n"
                + "For more on working around this issue, please see: "
                + "https://stackoverflow.com/questions/46374291/safari-11-gets-securityerror-dom-exception-18-when-accessing-localstorage");
        }
        else if (isChrome) {
            alert("Chrome detected. The Starry Messenger requires use of localStorage. To enable it:\n"
                + "1.) Click on the menu button in the top-right corner of your Chrome window.\n"
                + "2.) Select “Settings” from that menu.\n"
                + "3.) Click “Advanced” at the bottom of the page.\n"
                + "4.) Click on the “Content settings…” button under the Privacy and Security section.\n"
                + "5.) Click on “Cookies”.\n"
                + "6.) Toggle on the setting for “Allow sites to save and read cookie data (recommended)”.\n"
                + "7.) Toggle off the setting for “Block third-party cookies”.");
        }
        else if (isIE) {
            alert("IE detected. Why are you using IE?");
            alert("Again, why are you using IE? What year is it? The date is " + new Date());
        }
        else if (isEdge) {
            alert("Edge detected. The Starry Messenger requires use of localStorage. "
            + "If this is an issue, please see: https://stackoverflow.com/questions/32374875/localstorage-not-working-in-edge.")
        }
        else if (isFirefox) {
            console.log("The user is awesome. Way to go Firefox.");
        }
        localStorage.setItem(warningDisplayedKey, warningDisplayedValue);
    }
    else {
        console.log("No need to display browser warning. " + warningDisplayed);
    }
}

function resetBrowserWarning() {
    localStorage.setItem(warningDisplayedKey, null);
}

displayWarning();
