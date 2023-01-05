async function register() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (getCookie("auth") != 'None') {
        console.log("auth Cookie Already Exists!");
        displayError(document);
    } else if (await (checkAuth(username, password)) == true) {
        console.log("username:password Already Exists!");
        displayError(document);
    } else {
        //Submits the user:hash to the Google Form
        let reponseURL = await createAuth(username, password);

        //Redirecting to confirmation page
        window.location.assign(reponseURL);
    }
}

async function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (await checkAuth(username, password) == true) {
        resetDisplay(document);
        window.location.assign("confirmation.html"); 
    } else {
        displayError(document);
    }
}

async function addPage() {
    let page = document.getElementById("page").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let passhash = await sha256(password);

    let newPage = {"name":page, "user":username, "hash":passhash};

    window.location.assign(postForm(PAGE_ADD, newPage));
}





