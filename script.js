var host = "data.usajobs.gov";
var userAgent = "daniel.diaz.0515@gmail.com";
var authKey = "TM6TEbYm8310tpJD+9CyVa7cpguDIpbSZKZwSgnukTU=";
var url = "https://data.usajobs.gov/api/search?" + jobCategory;
//test
var jobCategory = "JobCategoryCode=2210";

fetch(url, {
  method: "GET",
  //do i need to stringify?//
  headers: {
    //host will not save with quotes
    Host: host,
    "User-Agent": userAgent,
    "Authorization-Key": authKey,
  },
})
  .then(function (response) {
    //do i need to parse?
    //   console.log(JSON.parse(response.body));
    return response.json();
  })
  .then(function (response) {
    console.log(response);
  });

//JOBS 2 CAREERS API

// var key ="HkdyhY4qQUmJXi5";
// var id = "273";
// var queryURL ="http://api.jobs2careers.com/api/search.php?id=" + id +"&pass=" + key "";

// http://api.jobs2careers.com/api/search.php?id=273&pass=HkdyhY4qQUmJXi5p&ip=
