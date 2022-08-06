function onOpen() {
 SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
 .createMenu('Upload File Tutorial')
 .addItem('Attachment', 'openAttachmentDialog')
 .addToUi();
}
function openAttachmentDialog() {
 var html = HtmlService.createHtmlOutputFromFile('UploadFile');
 SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
 .showModalDialog(html, 'Upload File');
}
function saveFile(obj) {
 var blob = Utilities.newBlob(Utilities.base64Decode(obj.data), obj.mimeType, obj.fileName);
 var file = DriveApp.getFolderById("1-yJ1IJunttM1_HJYs7VOHZoQonUxWtcO").createFile(blob);
 var cellFormula = 'hyperlink("' + file.getUrl() + '";"' + file.getName() + '")';
 
 var activeSheet = SpreadsheetApp.getActiveSheet();
 var selection = activeSheet.getSelection();
 var cell = selection.getCurrentCell();
 cell.setFormula(cellFormula);
 
 return file.getId();
}