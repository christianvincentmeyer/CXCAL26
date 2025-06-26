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

    var eventDate

    for(let i = 0; i < eventsJSON[0].MatchingEvents.length; i++) {
      
      eventDate = eventsJSON[0].MatchingEvents[i].EventDate
      eventDate = eventDate.split("(");
      eventDate = eventDate[1]
      eventDate = eventDate.split("-");
      eventDate = eventDate[0]
      eventDate = parseInt(eventDate)
      // const eventDateObject = new Date(eventDate);

      // displayDate = eventDate.toUTCString();

      const milliseconds = eventDate; // Example: March 15, 2023, 00:00:00 UTC

    
      // Convert milliseconds to a Date object
      const displayDate = new Date(milliseconds);
      
      document.body.innerHTML += eventsJSON[0].MatchingEvents[i].EventName + ",,,,,FALSE,FALSE,,,," + displayDate + "<br>";
    }
}