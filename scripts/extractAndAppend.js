// extractAndAppend.js is a utility class for extracting data from a source API 
// and appending the results to a <li> element.

// the targetClass to which to append the element
const targetClass = ".feed";

// A convenience method for constructing <li> elements.
// Given resourceName, the mediaSrcUrl, title, and description of the element,
// it returns a string representation of the element.
function createLiElement(resourceName, mediaSrcUrl, title, description) {
    let elementToAppend = "<li class=\"media p-3 row\"><img class=\"mr-3 col-lg-4\" src=\""
        // set src image
        + mediaSrcUrl
        // set resourceName
        + "\" alt=\"" + resourceName + "\" style=\"max-width: 50%; height: auto;\" download>"
        + "<div class=\"media-body col-lg-8\">"
        + " <h5 class=\"mt-0 mb-1\">"
        // set title
        + title
        + "</h5><button type=\"submit\" class=\"btn btn-info\" onclick=\"handleClick(this)\">"
        + "add to favorites</button><p>"
        // set explaination 
        + description + "</p></div ></li> ";

    return elementToAppend;
}

// Given a sourceUrl and the name of the resource to extract,
// this method fetches the resources from the source and appends
// them as <li> elements to the target class.
function extractAndAppend(sourceUrl, resourceName) {
    $.ajax({
        url: sourceUrl,
        dataType: "json",
        success: (result) => {
            for (const record of result.collection.items) {
                // construct li element to append to <ul class="nasa-images">
                let elementToAppend = createLiElement(resourceName, record.links[0].href,
                    record.data[0].title, record.data[0].description);

                console.log(elementToAppend);
                // apend element to targetId
                $(targetClass).append(elementToAppend);
            }
        }
    });
}