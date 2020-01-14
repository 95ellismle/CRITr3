function getChoice(choiceDivs) {
  var divs = document.getElementsByClassName(choiceDivs);
  for (var i=0; i<divs.length; i++) {
    if (divs[i].classList.contains("selected")) {
      return divs[i].id;
    }
  }
}

function selectActivity(currDiv, choiceClass) {
  if (currDiv.classList.contains("inactive")) {
    return;
  }

  var divs = document.getElementsByClassName(choiceClass);
  for (var i=0; i<divs.length; i++) {
    divs[i].classList.remove("selected");
  }
  currDiv.classList.add("selected");
}

function startActivity() {
  var currActivity = getChoice("choiceAct");

  switch (currActivity) {
    case "patrolAct":
      var startTime = new Date();
      startPatrol(startTime);
    default:

  }
}

function endActivity() {
  document.getElementById("fullOverlay").setAttribute('onclick','resetMapsPage();');

  var anonChoice = getChoice("choiceAnon");
  if (anonChoice == "makeAnon_yes") {
    var anon = true;
  } else if (anonChoice == "makeAnon_no") {
    var anon = false;
  } else {
    var msg = "Something went wrong! Please let Matt know at 95ellismle@gmail.com";
    msg += " To get the problem solved ASAP please explain exactly what you were ";
    msg += " doing and quote the following: 'The choice for anonymising tracking data";
    msg += " neither makeAnon_yes or makeAnon_no'. Thanks!";
    alert(msg);
    throw msg;
  };

  var saveChoice = getChoice("choiceSaveTrack");
  if (saveChoice == "saveTrack_yes") {
      saveTrackData(anon);
  };

  // Go back to normal home page
  resetMapsPage();
}

function startPatrol(startTime) {
  document.getElementById("fullOverlay").style.display = "none";
  document.getElementById("startActivityOverlay").style.display = "none";
  document.getElementById("patrolOverlay").style.display = "block";
  startTracking();

  window.patrolTimer_incrementClock = setInterval(function(){
    // Adjust the timer
    var endTime = new Date();
    var timeDiff = endTime - startTime;
    document.getElementById("patrolTimer").innerHTML = secToTimer(timeDiff);
  }, 1000);

  window.patrolTimer_drawPoint = setInterval(function() {
    drawTrackPoint();
  }, 5000);
}

function endPatrol() {
  // Go back to normal screen
  resetMapsPage();

  clearInterval(window.patrolTimer_incrementClock);
  clearInterval(window.patrolTimer_drawPoint);
  document.getElementById("patrolTimer").innerHTML = "00:00:00";

  // Stop the tracking and remove graphics
  stopTracking();

  // Open the final end patrol window
  openEndActivity();
}


function fillZeroes(n = 0, m = 1) {
  const p = Math.max(1, m);
  return String(n).replace(/\d+/, x => '0'.repeat(Math.max(p - x.length, 0)) + x);
}

function secToTimer(timeDiff){
  secTD = Math.round(timeDiff / 1000);
  var hours = Math.floor(secTD / 3600);
  var minutes = Math.floor((secTD - (hours*3600))/60);
  var secs = Math.floor(secTD - (hours*3600) - (minutes*60));
  return fillZeroes(hours, 2)+':'+fillZeroes(minutes, 2)+':'+fillZeroes(secs, 2);
}
