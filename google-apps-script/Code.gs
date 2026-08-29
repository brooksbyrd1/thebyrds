// Deploy: Extensions > Apps Script in the target Google Sheet, paste this file,
// then Deploy > New deployment > Web app (execute as "Me", access "Anyone").
// Copy the resulting /exec URL into SCRIPT_URL in rsvp.html.

var MAX_GUESTS = 8;
var SHEET_NAME = 'RSVPs';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getOrCreateSheet_();

    var guests = data.guests || [];
    var row = [new Date(), data.leadName || '', data.partySize || guests.length, data.notes || ''];
    for (var i = 0; i < MAX_GUESTS; i++) {
      if (guests[i]) {
        row.push(guests[i].name || '', guests[i].dietary || '');
      } else {
        row.push('', '');
      }
    }
    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    var headers = ['Timestamp', 'Submitted By', 'Party Size', 'Notes'];
    for (var i = 1; i <= MAX_GUESTS; i++) {
      headers.push('Guest ' + i + ' Name', 'Guest ' + i + ' Dietary Restrictions');
    }
    sheet.appendRow(headers);
  }
  return sheet;
}
