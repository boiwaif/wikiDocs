//API interface for Google Forms submission
function postForm(endpoint, value) {
    let domain = "https://docs.google.com/forms/" + endpoint["id"];
    let query = "/formResponse?";
    let parameter = endpoint["parameters"];

    //Translates the values to endpoints
    for (let arg in value) {
        try {
            query += "&entry." + parameter[arg] + "=" + value[arg];
        } catch (error) {
            console.log("Invalid arguments");
        }
    }
    return domain + query;
}

//Makes fetch request with CORs proxy
async function getData(url) {
    try {
        let response = await fetch(CORS_PROXY + url);
        let parse = Papa.parse(await response.text());
        return parse.data;
    } catch (e) {
        if (e instanceof ReferenceError) {
            console.log("Missing endpoint - Data request failed!")
        }
    }
}

//Creates a new cookie that expires in 1 UTC year
function createCookie(name, json) {
    let expiry = new Date(Date.now());
    expiry.setUTCFullYear(expiry.getUTCFullYear() + 1);
    expiry = expiry.toUTCString();

    let cookie = name + "=" + JSON.stringify(json);
    cookie += "; expires=" + expiry;
    cookie += "; expires=" + expiry;
    cookie += "; SameSite=" + "Lax";
    document.cookie = cookie;
}

//Gets cookie with name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    } else {
        return "None";
    }
}

//Sets document to display an error
function displayError(document) {
    var input = document.getElementById("password");
    input.style.setProperty("--focus", "#D90606");
    var input = document.getElementById("username");
    input.style.setProperty("--focus", "#D90606");
    var button = document.getElementById("submit");
    button.style.setProperty("--focus", "#D90606");
    button.style.setProperty("--button-hover", "#2F3136");
}

//Resets document to after displaying an error
function resetDisplay(document) {
    var input = document.getElementById("password");
    input.style.setProperty("--focus", "");
    var button = document.getElementById("submit");
    button.style.setProperty("--focus", "");
    button.style.setProperty("--button-hover", "");
}