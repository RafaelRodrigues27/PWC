const carousel = new bootstrap.Carousel('#carouselExampleControls')

async function getData(country) {
    const url = "https://restcountries.com/v3.1/name/" + country;
    try {
      const response = await fetch(url);
      const json = await response.json();
      processData(json);
    } catch (error) {
      console.error(error.message);
    }
  }
  
  function processData(json) {
      var myDiv = document.getElementById('test');
      
      var myLabel = document.createElement("label");
      myLabel.innerHTML = json[0].name.official + "<br/>";
      myDiv.appendChild(myLabel);
      
      var flag = document.createElement('img');
      flag.src = json[0].flags.png
      myDiv.appendChild(flag);
      
      var myBreakLine = document.createElement("label");
      myBreakLine.innerHTML = "<br/><br/>";
      myDiv.appendChild(myBreakLine);
  }
  
  window.onload = function() {
    getData("Portugal");
    getData("Grenada");
    getData("Spain");
  };