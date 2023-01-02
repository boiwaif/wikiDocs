//Generate request for API call to form 
function formAPI(id, args) {
    //Construct request for form endpoint
    domain = "https://docs.google.com/forms/" + id;
    let parameters = "/formResponse?";
    for (let key in args) {
        parameters += + "&entry.";
        parameters += key + "=" + args[key];
    }
    return domain + parameters;
}

function setCookie(json){
    let loginInfo = "auth=";
    login += JSON.stringify(json) + ";"
    login += "expires=Thu, 18 Dec 2072 12:00:00 UTC;";
    login += "path=/site/auth";
    document.cookie = login;
}

async function register() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    let passhash = await sha256(password);

    var formID = "d/e/1FAIpQLSfRVy_Kmn1dv4PTbi0R09QJ94LsiKwOqeQ6fwoDm1eAgX44_w"
    let submission = {
        "452285687": username,
        "178915727": passhash
    };
    setCookie(submission);

    //Redirecting to other page
    window.location.assign(formAPI(formID, json));
}

async function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    let passhash = await sha256(password);

    var formID = "d/1tjLlJC5ucGU-9c_fjYYLSw4OQxIa-cafjsLhBxCfNlk/"
    let json = {
        "78609054": username,
        "1559692011": passhash
    };
    //Check password for validity for username

    setCookie(json);

    //Redirecting to other page
    window.location.assign(formAPI(formID, json));
}

//Hashing Function
async function sha256(source) {
    const sourceBytes = new TextEncoder().encode(source);
    const digest = await crypto.subtle.digest("SHA-256", sourceBytes);
    const resultBytes = [...new Uint8Array(digest)];
    return resultBytes.map(x => x.toString(16).padStart(2, '0')).join("");
}