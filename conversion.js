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
    var eventDate
    var regLink
    var eventLat
    var eventLong
    var directionsURL

    for(let i = 0; i < eventsJSON[0].MatchingEvents.length; i++) {

      // Get Event Name
      eventName = eventsJSON[0].MatchingEvents[i].EventName
      
      // Get Event Date
      eventDate = eventsJSON[0].MatchingEvents[i].EventDate
      eventDate = eventDate.split("(");
      eventDate = eventDate[1]
      eventDate = eventDate.split("-");
      eventDate = eventDate[0]
      eventDate = parseInt(eventDate)
      // const eventDateObject = new Date(eventDate);
      // displayDate = eventDate.toUTCString();
      const milliseconds = eventDate; // Example: March 15, 2023, 00:00:00 UTC

      // Create Google Map Link
      regLink = eventsJSON[0].MatchingEvents[i].EventPermalink
      regLink = eventsJSON[0].MatchingEvents[i].EventPermalink

      // Get Bike Reg Link
      eventLat = eventsJSON[0].MatchingEvents[i].Latitude
      eventLong = eventsJSON[0].MatchingEvents[i].Longitude
      directionsURL = 'http://maps.google.com/maps/?z=12&t=m&q=loc:' + eventLat + '+' + eventLong
    
      // Convert milliseconds to a Date object
      const displayDate = new Date(milliseconds);
      
      document.body.innerHTML += eventName + ",,,,,FALSE,FALSE,,,," + displayDate + ",," + regLink + ',' + directionsURL + "<br>";
    }
}