// download.js supplies download functionality for Starry Messenger.
// 

const downloadMediaType = "jpg";

// an async method for fetching an image as a blob
// and returning the result as a promise
async function fetchImage(imageSrcUrl) {
    return await fetch(imageSrcUrl).then(r => {
        if (r.ok) {
            return r.blob();
        }
    });
}

// searches the elem for an img tag and then 
// extracts its src attribute to use for downloading
// favorites.
function downloadFavorites(elem) {
    // search for img src and download as file
    $(elem).parent().parent().find("img").each(
        function () {
            let imageSrcUrl = $(this).attr("src");
            console.log(imageSrcUrl);
            if (imageSrcUrl) {
                fetchImage(imageSrcUrl).then(
                    blob => download(blob, imageSrcUrl)
                );
            }
        }
    );

    // alert the user
    alert("downloaded");

    // clean up cart and display success messages
    $(".cart ul li").detach();
    $(".cart h6").detach();
    $(".cart h4").text("Uploaded!");
    $(".cart p").text("Thanks for using Starry Messenger");

    // empty local storage
    emptyCart();
}

// downloads blob as file by creating an invisible <a> tag
// with a download attribute and clicking it.
// 
// method adapted from https://jsfiddle.net/koldev/cW7W5/
function download(blob, imageSrcUrl) {

    console.log("downloading " + imageSrcUrl);

    // create the <a> tag and set its attributes
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    // create a URL for the blob
    let downloadUrl = window.URL.createObjectURL(blob);
    a.href = downloadUrl;
    // set the download attribute to the imageSrcUrl
    a.download = imageSrcUrl;
    // click to download
    a.click();
    // cleanup
    window.URL.revokeObjectURL(downloadUrl);
    document.body.removeChild(a);
}