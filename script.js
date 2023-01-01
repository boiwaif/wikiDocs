<head>
  <title>Javascript Login Form Validation</title>
  <script>
    async function sha256(source) {
      const sourceBytes = new TextEncoder().encode(source);
      const digest = await crypto.subtle.digest("SHA-256", sourceBytes);
      const resultBytes = [...new Uint8Array(digest)];
      return resultBytes.map(x => x.toString(16).padStart(2, '0')).join("");
    }
    // Variable to count number of attempts.
    var attempt = 3;
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
      let userHash = username;
      let passHash = await sha256(password);
      var user = "&entry." + userEntry + "=" + userHash;
      var pass = "&entry." + passEntry + "=" + passHash;
      //Redirecting to other page.
      window.location.assign(endpoint + user + pass);
    }
  </script>
</head>
<html>
  <body>
    <div class="container">
      <div class="main">
        <form id="form_id" method="post" name="myform">
          <p>
            <label>Username :</label>
            <input type="text" name="username" id="username" />
          </p>
          <p>
            <label>Password :</label>
            <input type="password" name="password" id="password" />
          </p>
          <p>
            <input type="button" value="Register" id="submit" onclick="validate()" />
          </p>
        </form>
      </div>
    </div>
  </body>
  <footer>
    <p>Source: https://www.formget.com/javascript-login-form/ </p>
    <p>Source: https://stackoverflow.com/questions/8670909/is-there-any-builtin-javascript-string-hash-function-in-newest-browsers </p>
    <p>Source: https://theconfuzedsourcecode.wordpress.com/2019/11/11/you-may-restfully-submit-to-your-google-forms/</p>
  </footer>
</html>
<style>
  p,
  body {
    background-color: #36393e;
    text-align: center;
    font-family: 'Public Sans';
    color: #ffffff;
  }

  input {
    text-align: left;
    color: #7289da;
  }

  /* latin */
  @font-face {
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/dmsans/v11/rP2Hp2ywxg089UriCZOIHQ.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  /* latin */
  @font-face {
    font-family: 'Public Sans';
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/publicsans/v14/ijwTs572Xtc6ZYQws9YVwnNDTJzaxw.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
</style>