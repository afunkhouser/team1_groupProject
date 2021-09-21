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
        var saveJob = document.createElement("button");
        saveJob.setAttribute("class", "button is-info");

        var cardContent = document.createElement("div");
        cardContent.setAttribute("class", "content");
        cardContent.setAttribute("class", "box");

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
        link.setAttribute("href", element.MatchedObjectDescriptor.PositionURI);
        cardContent.append(saveJob, posTitle, dptName, link);
      }
    });
}

var googleSearch = document.querySelector(".googleSearch");
var button = document.querySelector("#searchButton");
var title = document.querySelector(".title");
var linked = document.querySelector(".link");
var description = document.querySelector(".description");
button.addEventListener("click", function () {
  fetch(
    "https://google-search3.p.rapidapi.com/api/v1/search/q=" +
      googleSearch.value +
      "",
    {
      method: "GET",
      headers: {
        "x-user-agent": "desktop",
        "x-rapidapi-host": "google-search3.p.rapidapi.com",
        "x-rapidapi-key": "1facf0ba13msh50a08ee6bc71163p150cc9jsnef4d9487f09d",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //first result
      //var string = data["results"][1]["additional_links"][0]["href"];
      //var result = string.link("string.innerHTML")
      //console.log(result)
      //linked.innerHTML = result;
      var a = document.createElement("a");
      a.href = data["results"][1]["additional_links"][0]["href"];
      linked.innerHTML = a.href;
      a.setAttribute("href", a.href);
      var titleValue = data["results"][1]["title"];
      title.innerHTML = titleValue;
      var descriptionValue = data["results"][1]["description"];
      description.innerHTML = descriptionValue;
    });
});
