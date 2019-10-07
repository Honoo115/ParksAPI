`use strict`;
// format query

// function formatQueryParams(params) {
//   const queryItems = Object.keys(params).map(
//     key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
//   );
//   return queryItems.join("&");
// }

// fetch URL

function getPark(user) {
  fetch(
    `https://developer.nps.gov/api/v1/parks?stateCode=${user}&api_key=9om6BkJU6ogNXBC3d9jL9vYEpJDvmF7Nbpyz7C3B`
  )
    .then(response => response.json())
    .then(responseJson => renderParks(responseJson.data));
}

// Render Results

function renderParks(data) {
  //for loop items through array

  for (let i = 0; i < data.length; i++) {
    $("#park_results")
      .append(`<li class = "results"> <a href="${data[i].url}">${data[i].url}</a> <div class = "parkName">${data[i].fullName}</div>
      <div class = "parkDesc" >${data[i].description}</div> <div class="parkDirec">${data[i].directionsInfo}</div>
 </li>`);
  }
}

//Listener

function theListener() {
  $("#park_form").submit(e => {
    e.preventDefault();
    let userInput = $("#userInput")
      .val()
      .replace(" ", "");
    $("#park_results").empty();
    getPark(userInput);
  });
}
$(function() {
  theListener();
});
