var iYear = 0;
var iMonth = 0;
var missionarydata;

function loadData() {
    loadMissionaryJSON('missionarios.json',
           function(data) { console.log(data); },
           function(xhr) { console.error(xhr); }
  );
  mySelectYearFunction("1997");
  mySelectMonthFunction("7");

}

function loadMissionaryJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
                    missionarydata = JSON.parse(xhr.responseText);
                    UpdateChegadasSaidas();
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

//Highlight Text on Over
function myEnterFunction(divid) {
  
  if (iYear==parseInt(divid) || iMonth==parseInt(divid)){
      document.getElementById(divid).style.backgroundColor = "blue";
      document.getElementById(divid).style.color = "white";
  } else {
      document.getElementById(divid).style.backgroundColor = "lightblue";
      document.getElementById(divid).style.color = "black";
  }
}
function myLeaveFunction(divid) {
  if (iYear==parseInt(divid) || iMonth==parseInt(divid)){
      document.getElementById(divid).style.backgroundColor = "blue";
  } else {
      document.getElementById(divid).style.backgroundColor = "transparent";
  }    
}

function mySelectYearFunction(divyear) {
  iYear = parseInt(divyear);

  for (var i=1997; i<=2000; i++) {
      if (i==iYear) {
          document.getElementById(i.toString()).style.backgroundColor = "blue";
          document.getElementById(i.toString()).style.color = "white";
      } else {
          document.getElementById(i.toString()).style.backgroundColor = "transparent";
          document.getElementById(i.toString()).style.color = "black";
      }
  }
  document.getElementById("1").style.display = "block";
  document.getElementById("2").style.display = "block";
  document.getElementById("3").style.display = "block";
  document.getElementById("4").style.display = "block";
  document.getElementById("5").style.display = "block";
  document.getElementById("6").style.display = "block";
  document.getElementById("7").style.display = "block";
  document.getElementById("8").style.display = "block";
  document.getElementById("9").style.display = "block";
  document.getElementById("10").style.display = "block";
  document.getElementById("11").style.display = "block";
  document.getElementById("12").style.display = "block";   
  if (iYear == 1997) {
    if (iMonth<=6) {
        iMonth = 7;
        mySelectMonthFunction("7");
    }
    document.getElementById("1").style.display = "none";
    document.getElementById("2").style.display = "none";
    document.getElementById("3").style.display = "none";
    document.getElementById("4").style.display = "none";
    document.getElementById("5").style.display = "none";
    document.getElementById("6").style.display = "none";        
  } else if (iYear == 2000) {
    if (iMonth>=7) {
        iMonth = 6;
        mySelectMonthFunction("6");
    }
    document.getElementById("7").style.display = "none";
    document.getElementById("8").style.display = "none";
    document.getElementById("9").style.display = "none";
    document.getElementById("10").style.display = "none";
    document.getElementById("11").style.display = "none";
    document.getElementById("12").style.display = "none";   
  }
  
  UpdateChegadasSaidas();
}

function mySelectMonthFunction(divmonth) {
  iMonth = parseInt(divmonth);
  for (var i=1; i<=12; i++) {
      if (i==iMonth) {
          document.getElementById(i.toString()).style.backgroundColor = "blue";
          document.getElementById(i.toString()).style.color = "white";
      } else {
          document.getElementById(i.toString()).style.backgroundColor = "transparent";
          document.getElementById(i.toString()).style.color = "black";
      }
  }
  UpdateChegadasSaidas();
}

function UpdateChegadasSaidas() {
  var strChegadas = "";
  for (i in missionarydata) {
    if (iYear == missionarydata[i].ChegadaAno && iMonth == missionarydata[i].ChegadaMês) {
      strChegadas = strChegadas +  "<p>" + missionarydata[i].Título + " " + missionarydata[i].Plaqueta + "</p>";
    }
  }
  document.getElementById("chegadas").innerHTML = strChegadas;
  var strSaídas = "";
  for (i in missionarydata) {
    if (iYear == missionarydata[i].SaídaAno && iMonth == missionarydata[i].SaídaMês) {
      strSaídas = strSaídas + "<p>" + missionarydata[i].Título + " " + missionarydata[i].Plaqueta + "</p>";
    }
  }
  document.getElementById("saídas").innerHTML = strSaídas;
}