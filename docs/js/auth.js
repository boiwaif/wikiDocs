//{}, args{source} => this, errs{hash}
async function sha256(source) {
    const sourceBytes = new TextEncoder().encode(source);
    const digest = await crypto.subtle.digest("SHA-256", sourceBytes);
    const resultBytes = [...new Uint8Array(digest)];
    return resultBytes.map(x => x.toString(16).padStart(2, '0')).join("");
}

//endpoint, args{username, plaintext} => this, errs{url}
async function createAuth(username, plaintext) {
    let hashed = await sha256(plaintext);
    let auth = {
        "username": username,
        "hash": hashed
    }

    try {
        createCookie("auth", auth);
        return postForm(REGISTER_ENDPOINT, auth);
    } catch {
        throw new Error("Unable to interface with document data...");
    }
}

//{}, args{username, plaintext} => this, errs{true, false*}
async function checkAuth(username, password) {
    let passhash = await sha256(password);
    let data = await getData(DB_ENDPOINT);
    for (entry of data) {
        if (username == entry[1]) {
            if (passhash == entry[2]) {
                return new Boolean(true);
            }
        }
    }
    return new Boolean(false);
}

function requestAccess(action, auth = getCookie("auth")){
    newSalt = Math.floor(Math.random() * 10);

    let resourceType = 0;
    let actionType = 0;

    postForm = formAPI(POST_ENDPOINT, request);
}

