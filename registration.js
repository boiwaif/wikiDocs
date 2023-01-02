// Generates endpoint for login
var endpoint = "https://docs.google.com/forms/d/e/1FAIpQLSfRVy_Kmn1dv4PTbi0R09QJ94LsiKwOqeQ6fwoDm1eAgX44_w/formResponse?"
var userEntry = "452285687";
var passEntry = "178915727";
var displayEntry = "178915727";

// Below function Executes on click of login button.
async function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    //Checks for valid login information
    //TODO

    //Hashing
    let userHash = username;
    let passHash = await sha256(password);
    var user = "&entry." + userEntry + "=" + userHash;
    var pass = "&entry." + passEntry + "=" + passHash;

    //Redirecting to other page
    window.location.assign(endpoint + user + pass);
    //Send request to authentication password
    //TODO
}

//Hash Function
async function sha256(source) {
    const sourceBytes = new TextEncoder().encode(source);
    const digest = await crypto.subtle.digest("SHA-256", sourceBytes);
    const resultBytes = [...new Uint8Array(digest)];
    return resultBytes.map(x => x.toString(16).padStart(2, '0')).join("");
}