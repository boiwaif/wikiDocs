var MAXIMUM_FORM_TRIES = 10;

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
    // Create and open a document
    var response = latestResponse.getItemResponses(); 
    var doc = DocumentApp.create(response[0].getResponse()),
      docFile = DriveApp.getFileById(doc.getId());
    DriveApp.getFolderById("1vg0pb7lLqaNCx5o5qCX6UeDdh2VD8B6o").addFile( docFile );
    DriveApp.getRootFolder().removeFile(docFile);
}
