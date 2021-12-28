const content = document.getElementById("content");

// HOME ROUTE

var browser = "Chrome";
var phone = "";

var finalData = {
  browser: "",
  phone: "",
};

var modes = {
  random: false,
  scheduled: false,
};

function modeToggle(mode) {
  if (mode == "random") {
    let random = document.querySelector(".modes__random--toggle");
    modes.random = !modes.random;
    console.log("random: ", modes.random);
    modes.random
      ? addRemClass(random, ["btnOn"])
      : addRemClass(random, [false], ["btnOn"]);
  }

  if (mode == "scheduled") {
    let scheduled = document.querySelector(".modes__scheduled--toggle");
    modes.scheduled = !modes.scheduled;
    console.log("scheduled: ", modes.scheduled);
    modes.scheduled
      ? addRemClass(scheduled, ["btnOn"])
      : addRemClass(scheduled, [false], ["btnOn"]);
  }
}

function addRemClass(element, toAdd, toRemove) {
  if (toRemove) {
    toRemove.forEach((clase) => {
      element.classList.remove(clase);
    });
  }
  if (toAdd) {
    toAdd.forEach((clase) => {
      element.classList.add(clase);
    });
  }
}

function writing(e) {
  if (e.id == "Browser") browser = e.value;
  if (e.id == "Phone") phone = e.value;
}

function startBot() {
  finalData.browser = browser;
  finalData.phone = phone;
  console.log(finalData);
}

// RANDOM ROUTE

var randomPhrases = ["hola como andas", "Soy una frase", "Soy otra frase"];
var newRandomPhrases = [];

function addInput(type, value) {
  newRandomPhrases.push(value);
  document.querySelector(".form").innerHTML += phraseInput(
    type,
    value,
    newRandomPhrases.length - 1
  );
  console.log(newRandomPhrases);
}

function delInput(input, button) {
  document.getElementById(input).remove();
  button.remove();
}

function phraseWriting(type, text, index) {
  if (type == "r") newRandomPhrases[index] = text.value;
  if (type == "s") newScheduledPhrases[index] = text.value;
  console.log(newRandomPhrases[index]);
  console.log(text.value);
}
