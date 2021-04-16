document.addEventListener("DOMContentLoaded", function () {
  let checkBox = document.getElementById("consent");
  let nextBtn = document.getElementById("submit-button");
  let instructionsBtn = document.getElementById("instructions-button");
  let readyDiv = document.getElementById("practice");
  let image = document.getElementById("background-image");
  let trialDiv = document.getElementById("trial-div");
  let scoreDiv = document.getElementById("score-div");
  let shotTextDiv = document.getElementById("shot");
  let shotPointsDiv = document.getElementById("points");
  let shotTotalDiv = document.getElementById("total");
  let realStartDiv = document.getElementById("practice-complete");
  let footer = document.getElementById("legend-div");
  let studyDiv = document.getElementById("study-div");
  let formDiv = document.getElementById("form-div");
  let form = document.getElementById("form");
  let cardAppendDiv = document.getElementById("card-append");
  let beforeForm = document.getElementById("before-form");
  let afterForm = document.getElementById("after-form");
  let surveyURL = "https://csunsbs.qualtrics.com/jfe/form/SV_cSEQTYWt6Ykh5Ii?id="
  let allDone = false;
  let trialResults = [];
  let gun;
  let shotText;
  let shotPoints;
  let count = 0;
  let total = 0;
  let shooterTimer;
  let goodShot = 10;
  let goodNoShot = 5;
  let badShot = -20;
  let badNoShot = -40;
  let noShot = -10;
  let shooterBackground;
  let noShooterBackground;
  let numBackgrounds;
  let bgCounter = 0;
  let key;
  let whichTrial;
  let realTrial = false;
  let practice = true;
  let fired = true;
  let lowCard;
  let midCard;
  let highCard;
  let faceCard;
  let cardBack;
  let cardArr = [];
  let id;

  let practiceImages = [
    [
      "./assets/images/practice/wu01.jpg",
      "./assets/images/practice/wu01y.jpg",
      false,
    ],
    [
      "./assets/images/practice/wu02.jpg",
      "./assets/images/practice/wu02y.jpg",
      false,
    ],
    [
      "./assets/images/practice/wu04.jpg",
      "./assets/images/practice/wu04y.jpg",
      true,
    ],
    [
      "./assets/images/practice/wu05.jpg",
      "./assets/images/practice/wu05y.jpg",
      false,
    ],
    [
      "./assets/images/practice/wu06.jpg",
      "./assets/images/practice/wu06y.jpg",
      false,
    ],
    [
      "./assets/images/practice/wu08.jpg",
      "./assets/images/practice/wu08y.jpg",
      true,
    ],
    [
      "./assets/images/practice/wu09.jpg",
      "./assets/images/practice/wu09y.jpg",
      false,
    ],
    [
      "./assets/images/practice/wu10.jpg",
      "./assets/images/practice/wu10y.jpg",
      false,
    ],
    [
      "./assets/images/practice/wu11.jpg",
      "./assets/images/practice/wu11y.jpg",
      true,
    ],
    [
      "./assets/images/practice/wu12.jpg",
      "./assets/images/practice/wu12y.jpg",
      false,
    ],
    [
      "./assets/images/practice/wu13.jpg",
      "./assets/images/practice/wu13y.jpg",
      true,
    ],
    [
      "./assets/images/practice/wu15.jpg",
      "./assets/images/practice/wu15y.jpg",
      false,
    ],
    [
      "./assets/images/practice/wu16.jpg",
      "./assets/images/practice/wu16y.jpg",
      true,
    ],
    [
      "./assets/images/practice/wu17.jpg",
      "./assets/images/practice/wu17y.jpg",
      true,
    ],
    [
      "./assets/images/practice/wu18.jpg",
      "./assets/images/practice/wu18y.jpg",
      true,
    ],
    [
      "./assets/images/practice/wu19.jpg",
      "./assets/images/practice/wu19y.jpg",
      true,
    ],
  ];

  let trialImages = [
    [
      "./assets/images/test/za.bmp",
      [
        "./assets/images/test/zaba011.bmp",
        "./assets/images/test/zabu02w4.bmp",
        "./assets/images/test/zawa90d3.bmp",
        "./assets/images/test/zawu02w4.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/zb.bmp",
      [
        "./assets/images/test/zbba05d1.bmp",
        "./assets/images/test/zbba923.bmp",
        "./assets/images/test/zbbu07p4.bmp",
        "./assets/images/test/zbbu98p1.bmp",
        "./assets/images/test/zbwa08d5.bmp",
        "./assets/images/test/zbwa012.bmp",
        "./assets/images/test/zbwu06p1.bmp",
        "./assets/images/test/zbwu90c3.bmp",
      ],
      [true, true, false, false, true, true, false, false],
    ],
    [
      "./assets/images/test/zc.bmp",
      [
        "./assets/images/test/zcba03d5.bmp",
        "./assets/images/test/zcbu90p5.bmp",
        "./assets/images/test/zcwa935.bmp",
        "./assets/images/test/zcwu97p4.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/zd.bmp",
      [
        "./assets/images/test/zdba022.bmp",
        "./assets/images/test/zdbu03c3.bmp",
        "./assets/images/test/zdwa94d1.bmp",
        "./assets/images/test/zdwu95w2.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/ze.bmp",
      [
        "./assets/images/test/zeba045.bmp",
        "./assets/images/test/zebu10p1.bmp",
        "./assets/images/test/zewa921.bmp",
        "./assets/images/test/zewu96w1.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/zf.bmp",
      [
        "./assets/images/test/zfba90d3.bmp",
        "./assets/images/test/zfbu92w1.bmp",
        "./assets/images/test/zfwa911.bmp",
        "./assets/images/test/zfwu01p4.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/zg.bmp",
      [
        "./assets/images/test/zgba072.bmp",
        "./assets/images/test/zgba103.bmp",
        "./assets/images/test/zgbu04p3.bmp",
        "./assets/images/test/zgbu08w1.bmp",
        "./assets/images/test/zgwa02d4.bmp",
        "./assets/images/test/zgwa06d2.bmp",
        "./assets/images/test/zgwu07w2.bmp",
        "./assets/images/test/zgwu99p2.bmp",
      ],
      [true, true, false, false, true, true, false, false],
    ],
    [
      "./assets/images/test/zh.bmp",
      [
        "./assets/images/test/zhba94d1.bmp",
        "./assets/images/test/zhbu05c5.bmp",
        "./assets/images/test/zhwa03d2.bmp",
        "./assets/images/test/zhwu05p5.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/zi.bmp",
      [
        "./assets/images/test/ziba08d5.bmp",
        "./assets/images/test/ziba972.bmp",
        "./assets/images/test/zibu01p2.bmp",
        "./assets/images/test/zibu09p5.bmp",
        "./assets/images/test/ziwa05d2.bmp",
        "./assets/images/test/ziwa073.bmp",
        "./assets/images/test/ziwu04p2.bmp",
        "./assets/images/test/ziwu08p3.bmp",
      ],
      [true, true, false, false, true, true, false, false],
    ],
    [
      "./assets/images/test/zj.bmp",
      [
        "./assets/images/test/zjba094.bmp",
        "./assets/images/test/zjbu97c1.bmp",
        "./assets/images/test/zjwa04d1.bmp",
        "./assets/images/test/zjwu03c5.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/zk.bmp",
      [
        "./assets/images/test/zkba99d4.bmp",
        "./assets/images/test/zkba131.bmp",
        "./assets/images/test/zkbu11w2.bmp",
        "./assets/images/test/zkbu16c3.bmp",
        "./assets/images/test/zkwa97d3.bmp",
        "./assets/images/test/zkwa152.bmp",
        "./assets/images/test/zkwu11p4.bmp",
        "./assets/images/test/zkwu13p1.bmp",
      ],
      [true, true, false, false, true, true, false, false],
    ],
    [
      "./assets/images/test/zl.bmp",
      [
        "./assets/images/test/zlba931.bmp",
        "./assets/images/test/zlbu12p4.bmp",
        "./assets/images/test/zlwa953.bmp",
        "./assets/images/test/zlwu16c1.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/zm.bmp",
      [
        "./assets/images/test/zmba96d2.bmp",
        "./assets/images/test/zmbu91c4.bmp",
        "./assets/images/test/zmwa98d5.bmp",
        "./assets/images/test/zmwu94c1.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/zn.bmp",
      [
        "./assets/images/test/znba11d5.bmp",
        "./assets/images/test/znbu94p4.bmp",
        "./assets/images/test/znwa16d3.bmp",
        "./assets/images/test/znwu19c3.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/zo.bmp",
      [
        "./assets/images/test/zoba125.bmp",
        "./assets/images/test/zobu96w2.bmp",
        "./assets/images/test/zowa195.bmp",
        "./assets/images/test/zowu91w3.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/zp.bmp",
      [
        "./assets/images/test/zpba95d3.bmp",
        "./assets/images/test/zpbu99w5.bmp",
        "./assets/images/test/zpwa14d1.bmp",
        "./assets/images/test/zpwu98w5.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/zq.bmp",
      [
        "./assets/images/test/zqba91d4.bmp",
        "./assets/images/test/zqbu13p3.bmp",
        "./assets/images/test/zqwa11d4.bmp",
        "./assets/images/test/zqwu15w2.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/zr.bmp",
      [
        "./assets/images/test/zrba141.bmp",
        "./assets/images/test/zrba164.bmp",
        "./assets/images/test/zrbu17w3.bmp",
        "./assets/images/test/zrbu93c1.bmp",
        "./assets/images/test/zrwa134.bmp",
        "./assets/images/test/zrwa964.bmp",
        "./assets/images/test/zrwu14p3.bmp",
        "./assets/images/test/zrwu92c2.bmp",
      ],
      [true, true, false, false, true, true, false, false],
    ],
    [
      "./assets/images/test/zs.bmp",
      [
        "./assets/images/test/zsba17d3.bmp",
        "./assets/images/test/zsbu95c2.bmp",
        "./assets/images/test/zswa174.bmp",
        "./assets/images/test/zswu93c4.bmp",
      ],
      [true, false, true, false],
    ],
    [
      "./assets/images/test/zt.bmp",
      [
        "./assets/images/test/ztba98d2.bmp",
        "./assets/images/test/ztbu14p2.bmp",
        "./assets/images/test/ztwa995.bmp",
        "./assets/images/test/ztwu17p5.bmp",
      ],
      [true, false, true, false],
    ],
  ];

  if (checkBox) {
    checkBox.onchange = function () {
      if (this.checked) {
        nextBtn.disabled = false;
      } else {
        nextBtn.disabled = true;
      }
    };
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function (e) {
      e.preventDefault;
      localStorage.setItem("consent", "true");
      window.location.href = "instructions.html";
    });
  }

  if (instructionsBtn) {
    instructionsBtn.addEventListener("click", function (e) {
      e.preventDefault;
      window.location.href = "study.html";
    });
  }

  if (form) {
    form.onsubmit = submit;
    function submit(e) {
      e.preventDefault();
      cardArr = [];
      let lowCards = document.getElementsByName("lowcardradio");
      let midCards = document.getElementsByName("midcardradio");
      let highCards = document.getElementsByName("highcardradio");
      let faceCards = document.getElementsByName("facecardradio");
      let cardBacks = document.getElementsByName("cardbackradio");
      lowCard = getChecked(lowCards);
      midCard = getChecked(midCards);
      highCard = getChecked(highCards);
      faceCard = getChecked(faceCards);
      cardBack = getChecked(cardBacks);

      id = lowCard + midCard + highCard + faceCard + cardBack;

      checkForFirstTime(id);
    }
  }

  function getChecked(cardArray) {
    
    for (let i = 0; i < cardArray.length; i++) {
      if (cardArray[i].checked) {
        cardImage = new Image();
        cardImage.classList.add("radio-card");
        cardImage.src = cardArray[i].nextElementSibling.firstChild.src
        cardArr.push(cardImage);
        return cardArray[i].value;
      }
    }
  }

  let firebaseConfig = {
    apiKey: "AIzaSyBoMxRZMTUYZLSJ3sliVZJw8GFxDJ-sINk",
    authDomain: "shooter-ffae9.firebaseapp.com",
    databaseURL: "https://shooter-ffae9-default-rtdb.firebaseio.com",
    projectId: "shooter-ffae9",
    storageBucket: "shooter-ffae9.appspot.com",
    messagingSenderId: "976013835210",
    appId: "1:976013835210:web:45d88db539d0d538996d33",
    measurementId: "G-DPTCJ9LF0T",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  let database = firebase.database();

  function userFirstTimeCallback(exists) {
    
    if (exists) {
      form.reset();
      alert(
        "That combination already exists. Please select a different assortment of cards."
      );
    } else {
      let userRef = database.ref(id + "/firstStudy");
      writeUserData(userRef);
    }
  }

  function checkForFirstTime(userId) {
    let ref = database.ref();
    let exists;
    ref.child(userId).once("value", function (snapshot) {
      exists = snapshot.val() !== null;
    }).then(function(){
      userFirstTimeCallback(exists);
    });
  }

  function writeUserData(userRef) {
    userRef.set(trialResults).then(function () {
      form.classList.add("invisible");
      beforeForm.classList.add("invisible");
      afterForm.classList.remove("invisible");
      allDone = true;
      for(i = 0; i < cardArr.length; i++){
        cardAppendDiv.appendChild(cardArr[i]);
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (!fired && e.key == "i" || e.key == "e") {
      fired = true;
      clearTimeout(shooterTimer);
      key = e.key;
      showScore(realTrial);
    }
    if (!practice && e.key == " ") {
      practice = true;
      realStartDiv.classList.add("invisible");
      readyDiv.classList.remove("invisible");
      setTimeout(trial, 5000);
    }
    if (allDone && e.key == " "){
      window.location.href = surveyURL + id;
    }
  });

  class Trial {}

  function showScore(real) {
    fired = true;
    if (real) {
      arr = trialImages;
      whichTrial = trial;
    } else {
      arr = practiceImages;
      whichTrial = practiceTrial;
    }
    switch (key) {
      case "i":
        if (gun) {
          shotText = "Good shot!";
          shotPoints = goodShot;
          total = total + goodShot;
        } else {
          shotText = "Incorrect!";
          shotPoints = badShot;
          total = total + badShot;
        }
        break;

      case "e":
        if (gun) {
          shotText = "You've been shot!";
          shotPoints = badNoShot;
          total = total + badNoShot;
        } else {
          shotText = "Correct!";
          shotPoints = goodNoShot;
          total = total + goodNoShot;
        }
        break;

      default:
        shotText = "Please respond more quickly next time.";
        shotPoints = noShot;
        total = total + noShot;
        break;
    }

    if (real) {
      thisTrial = new Trial();
      thisTrial.image = shooterBackground.substring(21);
      thisTrial.shotText = shotText;
      thisTrial.points = shotPoints;
      thisTrial.totalPoints = total;
      thisTrial.trialNumber = count;
      trialResults.push(thisTrial);
    }

    shotTextDiv.textContent = shotText;
    shotPointsDiv.textContent = shotPoints + " points";
    shotTotalDiv.textContent = total + " total points";
    trialDiv.classList.add("invisible");
    scoreDiv.classList.remove("invisible");

    setTimeout(whichTrial, 3000);
  }

  function getRandomTime() {
    return Math.floor(Math.random() * (1000 - 500) + 500);
  }

  function showBackground(real) {
    
    fired = true;
    if (real) {
      arr = trialImages;
      bgArrLoc = Math.floor(Math.random() * arr.length);
      randomShooterImage = Math.floor(Math.random() * arr[bgArrLoc][1].length);
      noShooterBackground = arr[bgArrLoc][0];
      shooterBackground = arr[bgArrLoc][1][randomShooterImage];
      gun = arr[bgArrLoc][2][randomShooterImage];
      whichTrial = trial;
    } else {
      arr = practiceImages;
      bgArrLoc = Math.floor(Math.random() * arr.length);
      noShooterBackground = arr[bgArrLoc][0];
      shooterBackground = arr[bgArrLoc][1];
      gun = arr[bgArrLoc][2];
      whichTrial = practiceTrial;
    }

    image.src = noShooterBackground;
    image.onload = function () {
      trialDiv.classList.remove("invisible");
      bgCounter++;
      whichTrial();
    };
  }

  function showShooterBackground(real) {
    fired = false;
    image.src = shooterBackground;
    image.onload = function () {
      count++;
      bgCounter = 0;
      shooterTimer = setTimeout(showScore, 700, real);
    };
  }

  function practiceTrial() {
    key = null;
    scoreDiv.classList.add("invisible");
    if (count < 2) {
      if (bgCounter == 0) {
        numBackgrounds = Math.floor(Math.random() * 4) + 1;
      }
      bgCounter < numBackgrounds
        ? setTimeout(showBackground, getRandomTime(), false)
        : setTimeout(showShooterBackground, getRandomTime(), false);
    } else {
      realStart();
    }
  }

  function trial() {
    key = null;
    readyDiv.classList.add("invisible");
    scoreDiv.classList.add("invisible");
    if (count < 2) {
      if (bgCounter == 0) {
        numBackgrounds = Math.floor(Math.random() * 4) + 1;
      }
      bgCounter < numBackgrounds
        ? setTimeout(showBackground, getRandomTime(), true)
        : setTimeout(showShooterBackground, getRandomTime(), true);
    } else {
      complete();
    }
  }

  function realStart() {
    total = 0;
    count = 0;
    realTrial = true;
    realStartDiv.classList.remove("invisible");
    practice = false;
  }

  function start() {
    setTimeout(function () {
      readyDiv.classList.add("invisible");
      practiceTrial();
    }, 5000);
  }

  function complete() {
    footer.classList.add("invisible");
    studyDiv.classList.add("invisible");
    formDiv.classList.remove("invisible");
  }

  start();
});
