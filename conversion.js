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
    
    console.log(eventsJSON[0].MatchingEvents.length);

    for(let i = 0; i < eventsJSON[0].MatchingEvents.length; i++) {
      document.body.innerHTML = document.body.innerHTML += eventsJSON[0].MatchingEvents[i].EventName + ", <br>";
    }
}

// function createCSV() {
//   document.body.innerHTML = events;

//   console.log(events);

//   console.log('set events csv');
// }