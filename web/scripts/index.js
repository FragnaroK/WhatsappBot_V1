const content = document.getElementById("content");
// HOME ROUTE

var pyConfig = {
  browser: "Edge",
  phone: "+141557897845",
};

var jsConfig = {
  modes: {
    random: true,
    scheduled: false,
    auto: false
  },
  randomPhrases: [
    "Some Phrase",
    "Another Phrase"
  ],
  scheduledPhrases: [
    {
      phrase: "Some Scheduled Phrase",
      time: 12
    },
    {
      phrase: "Another Scheduled Phrase",
      time: 22
    },
    {
      phrase: "An extra phrase as example of scheTime",
      time: 12
    }
  ],
  autoMessages: [
    {
      ask: "question or phrase",
      answers: [
        "question 1 answer 1",
        "question 1 answer 2",
        "question 1 answer 3",
      ]
    },
    {
      ask: "question or phrase 2",
      answers: [
        "question 2 answer 1",
        "question 2 answer 2",
        "question 2 answer 3",
      ]
    }
  ],
  keyWord: "hey, ",
  times: [12, 22],
  every: 36000,
};

var randomPhrases = [];
var newRandomPhrases = [];

var scheduledPhrases = [];
var newScheduledPhrases = [];

var autoMessages = [];
var newAutoMessages = [];

function asignarJsConfig(obj) {
  jsConfig.modes.random = obj.modes[0];
  jsConfig.modes.scheduled = obj.modes[1];
  jsConfig.modes.auto = obj.modes[2];
  jsConfig.randomPhrases = [...obj.randomPhrases];
  jsConfig.scheduledPhrases = [...obj.scheduledPhrases];
  jsConfig.autoMessages = [...obj.autoMessages];
  jsConfig.keyWord = obj.keyWord;
  jsConfig.times = [...obj.time];
  jsConfig.every = obj.every;
}

function asignarPyConfig(obj) {
  pyConfig.browser = obj.browser;
  pyConfig.phone = obj.phone;
  document.getElementById("Phone").value = pyConfig.phone;
  document.getElementById("Browser").value = pyConfig.browser;
}


eel.expose(getSavedData);
function getSavedData(jsData, pyData) {
  savedJsData = JSON.parse(jsData);
  savedPyData = JSON.parse(pyData);
  console.log("jsData: ",jsData);
  console.log("PyData: ", pyData);
  if (savedJsData != (undefined || null || "")) asignarJsConfig(savedJsData);
  if (savedPyData != (undefined || null || "")) asignarPyConfig(savedPyData);
  console.log("Valores guardados asigandos a js COnfig", jsConfig);
  console.log("Valores guardados asigandos a py COnfig", pyConfig);
  randomPhrases = [...jsConfig.randomPhrases];
  scheduledPhrases = [...jsConfig.scheduledPhrases];
  autoMessages = [...jsConfig.autoMessages]
}

function checkLocalData(loadData = false) {
  console.log("Loading Data...")
  if (loadData) routes("home", document.getElementById("homeTab"), true);
  eel.checkSavedData();
}

checkLocalData();

function modeToggle(mode) {
  if (mode == "random") {
    let random = document.querySelector(".modes__random--toggle");
    jsConfig.modes.random = !jsConfig.modes.random;
    console.log("random: ", jsConfig.modes.random);
    jsConfig.modes.random
      ? addRemClass(random, ["btnOn"])
      : addRemClass(random, [false], ["btnOn"]);
  }

  if (mode == "scheduled") {
    let scheduled = document.querySelector(".modes__scheduled--toggle");
    jsConfig.modes.scheduled = !jsConfig.modes.scheduled;
    console.log("scheduled: ", jsConfig.modes.scheduled);
    jsConfig.modes.scheduled
      ? addRemClass(scheduled, ["btnOn"])
      : addRemClass(scheduled, [false], ["btnOn"]);
  }

  if (mode == "auto") {
    let auto = document.querySelector(".modes__auto--toggle");
    jsConfig.modes.auto = !jsConfig.modes.auto;
    console.log("auto: " + jsConfig.modes.auto)
    jsConfig.modes.auto
      ? addRemClass(auto, ["btnOn"])
      : addRemClass(auto, [false], ["btnOn"]);
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
  if (e.id == "Browser") pyConfig.browser = e.value;
  if (e.id == "Phone") pyConfig.phone = e.value;
  if (e.id == "Every") jsConfig.every = Number(e.value) * 60000;
  if (e.id == "autoKeyWord") jsConfig.keyWord = e.value.toLowerCase();
}

function saveBot() {
  eel.getpythonConfig(JSON.stringify(pyConfig));
  eel.getjsConfig(JSON.stringify(jsConfig));
}

function startBot() {
  saveBot();
  eel.startBot();
}

// RANDOM ROUTE

function addInput(type, value, where = ".form") {
  let inputs = document.querySelectorAll(".inputPhrase");
  let values = [];
  if (type == "scheduled") {
    let times = document.querySelectorAll(".inputTime");
    if (value == "") {
      object = { phrase: value, time: value };
    }
    inputs.forEach((input, index) => {
      values.push({ phrase: input.value, time: times[index].value });
    });
    document.querySelector(where).innerHTML = "";
    newScheduledPhrases = [...values];
    loadScheduled(true, newScheduledPhrases);
    document.querySelector(where).innerHTML += phraseInput(
      "scheduled",
      value != "" ? value : object,
      newScheduledPhrases.length - 1
    );
    console.log("Scheduled input added: ", newScheduledPhrases);
  }

  if (type == "random") {
    inputs.forEach((input) => {
      values.push(input.value);
    });
    document.querySelector(where).innerHTML = "";
    newRandomPhrases = [...values];
    console.log(`[newRandomPhrases] Segundo push: ${newRandomPhrases}`);

    loadRandom(true, newRandomPhrases);
    document.querySelector(where).innerHTML += phraseInput(
      "random",
      value,
      newRandomPhrases.length
    );
    console.log(
      `[newRandomPhrases] Luego de LoadRandom(): ${newRandomPhrases}`
    );

    console.log("Random input added: ", newRandomPhrases);
  }

  if (type.name == "auto") {
    let openAnswers = []
    inputs.forEach((ask, i) => {
      values.push({ ask: ask.value, answers: [] });
      document.querySelectorAll(`.inputAnswer.chat-${i}`).forEach((answer) => {
        values[i].answers.push(answer.value);
      });
      if (document.querySelector(`.chat-${i}__answers`).classList.contains("ansOpen")) openAnswers.push(i)
    });
    if (where.where == ".answers") values[type.index].answers.push("");
    if (where == ".form") values.push(value);
    document.querySelector(".form").innerHTML =
      "";
    newAutoMessages = [...values];
    console.log("nAm asigando: ", newAutoMessages);
    if (newAutoMessages.length != 0)
      loadAuto(true, newAutoMessages, openAnswers);
    console.log("Values: ", values);
    console.log("NewAutoMessages: ", newAutoMessages);
    console.log("AutoMessages: ", autoMessages);
  }
}

function delInput(input, button = false, index) {
  if (input == ("r" || "s")) {
  document.querySelectorAll("." + input + index).forEach((e) => e.remove());
  button.remove();
  if (input == "r") {
    if (index == 0) newRandomPhrases.shift();
    if (index > 0) newRandomPhrases.splice(index, index++);
  }

  if (input == "s") {
    if (index == 0) newScheduledPhrases.shift();
    if (index > 0) newScheduledPhrases.splice(index, index++);
  }
}
  if (input.type == "a") {
    if (input.input == "answer"){
      document.querySelectorAll(`.chat-${index.chat}__answerCont-${index.answer}`).forEach((e) => e.remove());
      button.remove();
      if (index == 0) newAutoMessages[index.chat].answers[index.answer].shift();
      if (index > 0) newAutoMessages[index.chat].answers[index.answer].splice(index.answer, index.answer++);
    }
    if (input.input == "chat"){
      document.querySelectorAll(`.chat-${index}`).forEach((e) => e.remove());
      document.querySelectorAll(`.chat-${index}__answers`).forEach((e) => e.remove());
      button.remove();
      if (index == 0) newAutoMessages.shift();
      if (index > 0) newAutoMessages.splice(index, index++);
    }
    let openAnswers;
    document.querySelectorAll(`.chat`).forEach((input, i) => {
      if (document.querySelector(`.chat-${i}__answers`) && document.querySelector(`.chat-${i}__answers`).classList.contains("ansOpen")) openAnswers.push(i)
    })
    addPhrases("auto", openAnswers)
  }
}

function phraseWriting(type, text, index) {
  if (type == "random") newRandomPhrases[index] = text.value;
  if (type == "scheduled") newScheduledPhrases[index] = text.value;
}

function addPhrases(type, openAnswers = false) {
  let values = [];
  let inputs = document.querySelectorAll(".inputPhrase");
  if (type == "random") {
    inputs.forEach((input) => {
      input.value != "" ? values.push(input.value) : null;
    });
    newRandomPhrases = [...values];
    document.querySelector(".form").innerHTML = "";
    jsConfig.randomPhrases = [...newRandomPhrases];
    loadRandom(true, newRandomPhrases);
    console.log("Random phrases saved: ", randomPhrases);
  }
  if (type == "scheduled") {
    let times = document.querySelectorAll(".inputTime");
    inputs.forEach((input, pos) => {
      let index = pos;
      if (
        input.value != "" &&
        times[index].value != (0 || undefined || null || "")
      ) {
        values.push({ phrase: input.value, time: times[index].value });
      } else {
        console.log("Messages Incompleted Deleted!");
      }
    });
    newScheduledPhrases = [...values];
    document.querySelector(".form").innerHTML = "";
    jsConfig.scheduledPhrases = [...newScheduledPhrases];
    loadScheduled(true, newScheduledPhrases);
    console.log("Scheduled phrases saved: ", scheduledPhrases);
    jsConfig.times = [];
    jsConfig.scheduledPhrases.forEach((phrase) => {
      if (!jsConfig.times.includes(phrase.time)) {
        jsConfig.times.push(phrase.time);
      }
    });
  }

  if (type == "auto") {
    inputs.forEach((ask, i) => {
      
      if (ask.value != ("" || undefined || null)) {
        values.push({ ask: ask.value, answers: [] });
        document.querySelectorAll(`.inputAnswer.chat-${i}`).forEach((answer) => {
          values[i].answers.push(answer.value);
        });
      } else {
        console.log("Messages Without Question Deleted!")
      }
    });
    document.querySelector(".form").innerHTML =
    "";
    newAutoMessages = [...values];
    jsConfig.autoMessages = [...newAutoMessages];
    console.log("nAm asigando: ", newAutoMessages);
    if (newAutoMessages.length != 0)
      loadAuto(true, newAutoMessages, openAnswers);
      console.log("reloaded")
    console.log("Auto phrases saved: ", jsConfig.autoMessages);

  }
  saveBot();
}

function toggleAnswers(answers, button) {
  const ans = document.querySelector(`.${answers}`);
  const btn = document.getElementById(button.id);

  if (btn.classList.contains("btnOpen")){
    addRemClass(btn, false, ["btnOpen"]);
    addRemClass(ans, false, ["ansOpen"]);
    btn.textContent = "View Answers";
  } else {
    addRemClass(btn, ["btnOpen"], false);
    addRemClass(ans, ["ansOpen"], false);
    btn.textContent = "Hide Answers";
  }

}
