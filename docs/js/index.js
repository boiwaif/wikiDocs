// Generates endpoint for login
function formAPI(formID, args) {
    //Construct request for form endpoint
    domain = "docs.google.com/forms/" + formID
    let parameters = "/formResponse?";
    for (let key in args) {
        parameters = parameters + "&entry." + key + "=" + args[key];
    }

    return domain + parameters;
}

// Below function Executes on click of login button.
async function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var formID = "d/e/1FAIpQLSfRVy_Kmn1dv4PTbi0R09QJ94LsiKwOqeQ6fwoDm1eAgX44_w"
    let json = {
        "452285687": username,
        "178915727": sha256(password)
    };

    //Redirecting to other page
    window.location.assign(API(endpoint, json));
}

//Hash Function
async function sha256(source) {
    const sourceBytes = new TextEncoder().encode(source);
    const digest = await crypto.subtle.digest("SHA-256", sourceBytes);
    const resultBytes = [...new Uint8Array(digest)];
    return resultBytes.map(x => x.toString(16).padStart(2, '0')).join("");
}