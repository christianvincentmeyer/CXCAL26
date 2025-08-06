 // import bikeRegData from 'bike-reg-data.json' assert { type: 'json' };
// const bikeRegParsed = JSON.parse(bikeRegData);

const Http = new XMLHttpRequest();
const url='bike-reg-data.json';
Http.open("GET", url);
Http.send();
var res = null;
var eventsJSON = null;
var events = null;
Http.onload = (e) => {
    res = Http.response;
    eventsJSON = JSON.parse(Http.response);
    
    // console.log(eventsJSON[0].MatchingEvents);
    // console.log(eventsJSON[0].MatchingEvents[0].date);

    var eventName
    var eventStartDate
    var eventEndDate
    var isMultiDay
    var regLink
    var eventLat
    var eventLong
    var eventCity
    var eventState
    var eventRegion
    var directionsURL
    var eventID

    for(let i = 0; i < eventsJSON[0].MatchingEvents.length; i++) {

      // Get Event Name
      eventName = eventsJSON[0].MatchingEvents[i].EventName
      


      // Get Event Start Date
      eventStartDate = eventsJSON[0].MatchingEvents[i].EventDate
      eventStartDate = eventStartDate.split("(");
      eventStartDate = eventStartDate[1]
      eventStartDate = eventStartDate.split("-");
      eventStartDate = eventStartDate[0]
      eventStartDate = parseInt(eventStartDate)
      const millisecondsStart = eventStartDate; // Example: March 15, 2023, 00:00:00 UTC

      // Convert milliseconds to a Date object
      const displayStartDate = new Date(millisecondsStart);

      // Get Event End Date
      eventEndDate = eventsJSON[0].MatchingEvents[i].EventEndDate
      eventEndDate = eventEndDate.split("(");
      eventEndDate = eventEndDate[1]
      eventEndDate = eventEndDate.split("-");
      eventEndDate = eventEndDate[0]
      eventEndDate = parseInt(eventEndDate)
      const millisecondsEnd = eventEndDate; // Example: March 15, 2023, 00:00:00 UTC

      // Convert milliseconds to a Date object
      const displayEndDate = new Date(millisecondsEnd);

      // check if event is multiday
      if(eventStartDate !== eventEndDate){
        isMultiDay = true
      }else{
        isMultiDay = false
      }

      // Create Google Map Link
      regLink = eventsJSON[0].MatchingEvents[i].EventPermalink

      // Assign City
      eventCity = eventsJSON[0].MatchingEvents[i].EventCity

      // Assign region
      eventState = eventsJSON[0].MatchingEvents[i].EventState 

      switch (eventState) {
        case "NJ":
        case "NY":
        case "PA":
          eventRegion = "North East";
          break; // Starts next region - 3
        case "ME":
        case "VT":
        case "NH":
        case "MA":
        case "RI":
        case "CT":
          eventRegion = "New England";
          break; // Starts next region - 6
        case "DE":
        case "MD":
        case "DC":
        case "VA":
        case "WV":
        case "NC":
          eventRegion = "Mid Atlantic";
          break; // Starts next region - 6
        case "SC":
        case "GA":
        case "FL":
          eventRegion = "South East";
          break; // Starts next region - 3
        case "ND":
        case "MN":
        case "MI":
        case "WI":
        case "SD":
        case "IA":
        case "NE":
        case "IL":
        case "IN":
        case "OH":
        case "MO":
        case "KS":
        case "KY":
        case "TN":
        case "AR":
          eventRegion = "Midwest";
          break; // Starts next region - 15
        case "ID":
        case "MT":
        case "WY":
        case "NV":
        case "UT":
        case "CO":
          eventRegion = "Mountain West";
          break; // Starts next region - 6
        case "AZ":
        case "NM":
        case "OK":
        case "TX":
        case "MS":
        case "AL":
        case "LA":
          eventRegion = "South";
          break; // Starts next region - 7
        case "WA":
        case "OR":
          eventRegion = "PNW";
          break; // Starts next region - 2
        case "CA":
          eventRegion = "West Coast";
          break; // Starts next region - 1
        default:
          eventRegion = "--";
      }

      // Get Bike Reg Link
      eventLat = eventsJSON[0].MatchingEvents[i].Latitude
      eventLong = eventsJSON[0].MatchingEvents[i].Longitude
      directionsURL = 'http://maps.google.com/maps/?z=12&t=m&q=loc:' + eventLat + '+' + eventLong


      // Get the following info as a way to check the CMS data is correct
      // Get Event ID
      eventID = eventsJSON[0].MatchingEvents[i].EventId
      
      document.body.innerHTML += '"' + eventName + '",' + displayStartDate + "," + displayEndDate + "," + isMultiDay + ',' + eventID + ',' + regLink + ',' + directionsURL + ',' + eventCity +',' + eventState + ',' + eventRegion + "<br>";
    }
}