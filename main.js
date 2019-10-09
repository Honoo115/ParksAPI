`use strict`;

// fetch URL

function getPark(user, limit = 10) {
  fetch(
    `https://developer.nps.gov/api/v1/parks?stateCode=${user}&limit=${limit}&api_key=9om6BkJU6ogNXBC3d9jL9vYEpJDvmF7Nbpyz7C3B`
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => renderParks(responseJson.data))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

// Render Results

function renderParks(data) {
  //for loop items through array

  for (let i = 0; i < data.length; i++) {
    $("#park_results")
      .append(`<li class = "results"> <a href="${data[i].url}" target="_blank">${data[i].url}</a> <div class = "parkName">${data[i].fullName}</div>
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
    if (userLimit > 50) {
      errorHandler("You may only set a maximum of 50.");
    } else if (userLimit == 0) {
      errorHandler("Please enter a value between 10 and 50");
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
$(theListener);
