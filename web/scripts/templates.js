// ROUTES

const home = () => `
<section id="home">
          <section class="data">
            <div class="form">
              <label for="Browser">Browser</label>
              <input
                type="text"
                class="browser"
                placeholder="Chrome, Edge or Firefox"
                id="Browser"
                value="${pyConfig.browser}"
                onkeyup="writing(this)"
              />
            </div>
            <div class="container--logo"> 
            <img src="./assets/wpp.png" class="logo">
            </div>
            <div class="form">
              <label for="Phone">Phone</label>
              <input
                type="text"
                class="phone"
                placeholder="E.g, +64468487982"
                id="Phone"
                value="${pyConfig.phone}"
                onkeyup="writing(this)"
              />
            </div>
            <div class="form">
              <label for="Phone">Every</label>
              <input type="number" placeholder="Send Every... (Minutes)" onkeyup="writing(this)" name="every" id="Every" value="${jsConfig.every}"/>
            </div>
          </section>
          <section class="modes">
         
            <div class="modes__random">
              <button
                class="modes__random--toggle toggleBtn ${
                  jsConfig.modes.scheduled ? "btnOn" : ""
                }"
                onclick="modeToggle('random')"
              >
              
                Random Mode
              </button>
            </div>
            <div class="modes__auto">
            <button
              class="modes__auto--toggle toggleBtn ${
                jsConfig.modes.auto ? "btnOn" : ""
              }"
              onclick="modeToggle('auto')"
            >
              Auto Mode
            </button>
              
            </div>
            <div class="modes__scheduled">
              <button
                class="modes__scheduled--toggle toggleBtn ${
                  jsConfig.modes.scheduled ? "btnOn" : ""
                }"
                onclick="modeToggle('scheduled')"
              >
                Scheduled Mode
              </button>
            </div>
            <input type="text" placeholder="Key Word for Auto Mode" onkeyup="writing(this)" name="autoKeyWord" id="autoKeyWord" value="${jsConfig.keyWord}"/>
          </section>
         <!-- <button class="start" onclick="saveBot()">Save</button> -->
          <button class="start" onclick="startBot()">Start Bot</button>
        </section>
`;

const scheme = (type) =>
  `<section id="${type == "random" ? "random" : "scheduled"}">
          <section class="addPhrases">
          <button class="btn add" onclick="addInput('${
            type == "random" ? "random" : "scheduled"
          }','')">+</button>
            <div class="form">
            </div>
            </section>
            <button class="btn apply" onclick="addPhrases('${
              type == "random" ? "random" : "scheduled"
            }')">Apply</button>
        </section>`;

const auto = () => `
<section id="auto">
          <section class="addQuestion">
            <button class="btn add" onclick="addInput({name: 'auto', index: autoMessages.length},{ask: '', answers: ['']})">+</button>
              <div class="form">
              </div>
              </section>
              <button class="btn apply" onclick="addPhrases('auto')">Apply</button>
          </section>
`;

const loadRandom = (reload, p = randomPhrases) => {
  if (reload) randomPhrases = [...newRandomPhrases];
  newRandomPhrases = [];
  p.forEach((phrase) => {
    document.querySelector(".form").innerHTML += phraseInput(
      "random",
      phrase,
      p.indexOf(phrase)
    );
  });
  // if (!reload) addInput('random','');
};

const loadScheduled = (reload, p = scheduledPhrases) => {
  if (reload) scheduledPhrases = [...newScheduledPhrases];
  newScheduledPhrases = [];
  p.forEach((phrase) => {
    document.querySelector(".form").innerHTML += phraseInput(
      "scheduled",
      phrase,
      p.indexOf(phrase)
    );
  });
  // if (!reload) addInput('scheduled','');
};

const loadAuto = (reload, p = autoMessages, openAnswers) => {
  if (reload) autoMessages = [...newAutoMessages];
  newAutoMessages = [];
  p.forEach((chat) => {
    document.querySelector(".form").innerHTML += phraseInput(
      "auto",
      chat,
      p.indexOf(chat)
      );
    });
    if (openAnswers) openAnswers.forEach((i) => toggleAnswers(`chat-${i}__answers`, document.getElementById(`showAnswersButton${i}`)))
    // if (!reload && ) addInput({name: 'auto', index: autoMessages.length},{ask: '', answers: ['']});
};
// ELEMENTS

const randomPhraseItem = (phrase, index) => `
<li class="list__phrase p${index}" onclick="deletePhrase(this)">${phrase}</li>
`;

const phraseInput = (type, value, index, where = ".form") => {

  if (type == "random" && where == ".form") {
    return `
    <div class="input r">
    <input type="text" placeholder="Write message here" class="addRandomPhrase inputPhrase r${index}" value="${value}" onkeyup="phraseWriting('random', this, ${index})"/>
    <button class="btn del" onclick="delInput('r', this, ${index})">X</button>
    </div>
    `;
  }
  if (type == "scheduled" && where == ".form") {
    return `<div class="input s">
    <input type="text" placeholder="Write a message here" class="inputPhrase s${index}" value="${value.phrase}" onkeyup="phraseWriting('scheduled', this, ${index})">
    <input type="number" placeholder="time (H)" value="${value.time}" class="inputTime s${index}">
    <button class="btn del" onclick="delInput('s', this, ${index})">X</button>
  </div>`;
  }

  if (type == "auto") {
    let answers = "";
    let func = `addInput({name: 'auto', index: ${index}},{ask: ${value.ask== ''? '\'\'' : "'"+value.ask+"'" }, answers: [''] },  {where: '.answers', chat: '.chat-${index}__answers'} )`;

    value.answers.forEach(
      (answer, i) =>
        (answers += `
        <div class="answerCont answerCont-${i}">
        <input type="text" placeholder="Answer" ${i == (value.answers.length - 1)? `onkeyup=\"event.key == 'Enter'? ${func} : null\"` : ""} class="inputAnswer chat-${index} answer${i}" value="${answer}">
        <button class="btn del" onclick="delInput({type: 'a', input: 'answer'},this,{chat: ${index}, answer: ${i}})">X</button>
        </div>`)
    );
    if (where == ".form") {
      return `<section class="chat chat-${index}">
      <input type="text" placeholder="Question" class="inputPhrase question${index}" value="${value.ask}"> 
      <section class="answers chat-${index}__answers">
      ${answers}
      <button class="btn add" onclick="${func}">+</button>
      </section>
      <button class="showAnswers" onclick="toggleAnswers('chat-${index}__answers', this)" id="showAnswersButton${index}">
       View Answers
      </button>
      <button class="btn del" onclick="delInput({type: 'a', input: 'chat'}, this, ${index})">X</button>
      </section>`;
    }
    if (where == ".answers") {
      return `${answers}<button class="btn add" onclick="${func}">+</button> `;
    }
  } 
  
};
