//Test-Request:
// https://script.google.com/macros/s/AKfycbx73uFKQxwv-4_ncICUv3zdMOAZqV4XHveX4-jPiK5e/dev?id=ChIJQbTavmyPsUcRFinTMwH3eGY&comment=EyYaYippieYeahHamburgHamburgStPaulay

var sheetId = "1CqtgRRLHGSPcmbpLwfKNowNYATFc0VZd-jKpjulM1BA";
var placesUrl = "https://maps.googleapis.com/maps/api/place/details/json?";
var key = "key=AIzaSyD2RgFIYn2ma32Edss21bmXPCgN_0bwo_c";

var placesId = "ChIJ06oY8ciFsUcRfmCbS8Zsqr8";

function doGet(request) { 
    if(!isRequestValid(request)){
      return ContentService.createTextOutput("Invalid Request")
    }
    var comment = request.parameters.comment
    var response = fetchPlaceDetails(request.parameters.id)
    var rowContent = parseResponseToRow(response)
    rowContent.push(request.parameters.comment[0])
    Logger.log(rowContent)
    var sheet = SpreadsheetApp.openById(sheetId);
    sheet.appendRow(rowContent) 
}

function isRequestValid(request){
 if(request===undefined || 
    request.parameters.comment == undefined || 
    request.parameters.id == undefined){
  return false
 }
   return true
}


function fetchPlaceDetails(id){
    var url = placesUrl + 
              key + "&" + 
              "placeid=" + id;
    var response =  UrlFetchApp.fetch(url)
    parseResponseToRow(response)
    return response
}

function parseResponseToRow(response){
  var allAdressDetails = JSON.parse(response.getContentText()).result
  Logger.log(allAdressDetails)
  var name = allAdressDetails.name
  var adress =  allAdressDetails.formatted_address
  var lat = allAdressDetails.geometry.location.lat
  var long = allAdressDetails.geometry.location.lng
  return [name, adress, lat, long]
}
