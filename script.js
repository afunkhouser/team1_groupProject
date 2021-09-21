
//JOB SEARCH
var jobs = document.getElementById("jobTitle");
var zipCode = document.getElementById("zipCode");
var srchBtn = document.getElementById("searchBtn");

srchBtn.addEventListener("click", jobSearch);

function jobSearch() {
  //USA API
  var jobLocation = "&LocationName=" + zipCode.value;
  var jobCategory = "PositionTitle=" + jobs.value;
  var host = "data.usajobs.gov";
  var userAgent = "daniel.diaz.0515@gmail.com";
  var authKey = "TM6TEbYm8310tpJD+9CyVa7cpguDIpbSZKZwSgnukTU=";
  var url =
    "https://data.usajobs.gov/api/search?" +
    jobCategory +
    jobLocation +
    "&ResultsPerPage=5";

  fetch(url, {
    method: "GET",

    headers: {
      Host: host,
      "User-Agent": userAgent,
      "Authorization-Key": authKey,
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var searchResults = data.SearchResult.SearchResultItems;
      console.log(searchResults);
      var card = document.getElementById("card");
      card.innerHTML = " ";

      for (let i = 0; i < searchResults.length; i++) {
        const element = searchResults[i];
        console.log(element);

        var cardContent = document.createElement("div");
        cardContent.setAttribute("class", "content");
        card.append(cardContent);
        var posTitle = document.createElement("p");
        // // add class "card-header-title" to header

        // //create element for department name
        var dptName = document.createElement("p");
        // //create element for href to apply
        var link = document.createElement("a");
        // //create h1 container to fit all elements

        posTitle.textContent =
          "Position title: " + element.MatchedObjectDescriptor.PositionTitle;

        dptName.textContent =
          "Department Name: " + element.MatchedObjectDescriptor.DepartmentName;

        link.textContent = element.MatchedObjectDescriptor.PositionURI;
        link.setAttribute("href", link);
        cardContent.append(posTitle, dptName, link);
      }

      //CREATE CARD FOR EACH AVAILABLE POSITION
      // for (i = 0; i < searchResults.length; i++) {
      //   console.log(searchResults[i].MatchedObjectId);
      //   //gets the div with Bulma specified class
      //   var card = document.getElementById("card");
      //   var cardContent = document.createElement("div");
      //   //creates element for position title
      //   var posTitle = document.createElement("p");
      //   // add class "card-header-title" to header

      //   //create element for department name
      //   var dptName = document.createElement("p");
      //   //create element for href to apply
      //   var link = document.createElement("a");
      //   //create h1 container to fit all elements
      //   cardContent.setAttribute("class", "content");
      //   card.append(cardContent);

      //   posTitle.textContent =
      //     "Position title" + searchResult[i].MatchedObjectDescriptor;

      //   dptName.textContent =
      //     "Department Name" +
      //     data.SearchResult.SearchResultItems.MatchedObjectDescriptor;

      //   link.textContent =
      //     "href =" +
      //     data.SearchResult.SearchResultItems.MatchedObjectDescriptor
      //       .PositionURI;

      //   cardContent.append(posTitle, dptName, link);
      // }
    });
}

