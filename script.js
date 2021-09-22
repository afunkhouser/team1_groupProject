//JOB SEARCH
var jobs = document.getElementById("jobTitle");
var zipCode = document.getElementById("zipCode");
var srchBtn = document.getElementById("searchBtn");
var clearBtn = document.querySelector(".clearBtn")

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
        saveJob.setAttribute("class", "button is-info save-btn");
        saveJob.textContent = 'Save';

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
      
      var jobBtn = document.querySelectorAll('.save-btn');
      var savedJobs = JSON.parse(window.localStorage.getItem('saved-jobs')) || [];

        
      if( jobBtn != null) {
        for(var i=0; i<jobBtn.length; i++) {
          jobBtn[i].addEventListener('click', function(event) {
            var newJob = event.target.nextElementSibling.textContent
            var addedJob = {
              job: newJob,
              resume: true,
              interview: false
            } 
            savedJobs.push(addedJob);
            console.log(newJob)
            window.localStorage.setItem('saved-jobs', JSON.stringify(savedJobs))
          })
        }
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
      //console.log(data);
      var a = document.createElement("a");
      a.textContent = data["results"][1]["link"];
      a.setAttribute("href", data["results"][1]["link"]);
      linked.append(a);
      var titleValue = data["results"][1]["title"];
      title.innerHTML = titleValue;
      var descriptionValue = data["results"][1]["description"];
      description.innerHTML = descriptionValue;
    });
});

function displayeSavedJobs() {
  var savedJobs = JSON.parse(window.localStorage.getItem('saved-jobs')) || [];

  savedJobs.forEach(function(savedJob){
    var liTag = document.createElement('li');
    liTag.textContent = savedJob.job
    //var checkBox = document.createElement('input')
    //checkBox.setAttribute('type', 'checkbox')

    var olEl = document.getElementById('saved-jobs')
    //liTag.appendChild(checkBox)
    olEl.appendChild(liTag)

    //if(savedJob.resume == true) {
      
    //}

  })
}

displayeSavedJobs();

//refresh page after clear btn is clicked 
clearBtn.addEventListener("click", function () {
  localStorage.clear();

});