`use strict`;
// format query

// function formatQueryParams(params) {
//   const queryItems = Object.keys(params).map(
//     key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
//   );
//   return queryItems.join("&");
// }

// fetch URL

function getPark(user, limit) {
  fetch(
    `https://developer.nps.gov/api/v1/parks?stateCode=${user}&limit=${limit}&api_key=9om6BkJU6ogNXBC3d9jL9vYEpJDvmF7Nbpyz7C3B`
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
    $(".error_handle").hide();
    let userInput = $("#userInput")
      .val()
      .replace(" ", "");
    let userLimit = $("#userLimit").val();
    if (userLimit > 10) {
      errorHandler("You may only set a maximum of 10.");
    } else if (userLimit == 0) {
      errorHandler("Please enter a value between 1 and 10");
    } else {
      getPark(userInput, userLimit);
    }
    $("#park_results").empty();
  });
}
function errorHandler(errorMsg) {
  $(".error_handle")
    .text(errorMsg)
    .show();
}
$(function() {
  theListener();
});
