const MAXIMUM_FORM_TRIES = 10;
const dbID = "1r9FYZVdTXHyh-C2Jz13WRYNHc2ewH7t5WAkCsTDPFY8";

function checkAuth(username, passhash){
  var csv = SpreadsheetApp.openById(dbID);
  data = csv.getSheetByName("register").getDataRange().getValues();
  for (i in data) {
    if (data[i][1] == username){
      if(data[i][2] == passhash){
        return Boolean(true);
      }
    }
  }
  return Boolean(false);
}

function onSubmit() {
    var tries = 0;
    Logger.log("Submition Accepted!!!");
    var form = FormApp.getActiveForm();
    var formResponses = form.getResponses();
    try{
      tries++;
      var latestResponse = formResponses[formResponses.length-1];
    }
    catch(ArrayIndexOutOfBounds) {
      Logger.log("Unable to access the form response, please check execution logs or try again");
      if(tries != MAXIMUM_FORM_TRIES){
        getLatestResponse();
      }
    }
    var response = latestResponse.getItemResponses(); 
    Logger.log(response);
    if (checkAuth(response[1].getResponse(), response[2].getResponse())){
      // Create and open a document
      var doc = DocumentApp.create(response[0].getResponse()),
      docFile = DriveApp.getFileById(doc.getId());
      DriveApp.getFolderById("1vg0pb7lLqaNCx5o5qCX6UeDdh2VD8B6o").addFile( docFile );
      DriveApp.getRootFolder().removeFile(docFile);
    }
    else{
      Logger.log("Error");
    }
    
}
