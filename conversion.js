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
      

      // Get Bike Reg Link
      regLink = eventsJSON[0].MatchingEvents[i].EventPermalink
    
      // Convert milliseconds to a Date object
      const displayDate = new Date(milliseconds);
      
      document.body.innerHTML += eventName + ",,,,,FALSE,FALSE,,,," + displayDate + ",," + regLink + "<br>";
    }
}