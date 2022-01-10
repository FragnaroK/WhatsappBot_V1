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
            <input type="number" placeholder="Time between messages (Min)" onkeyup="writing(this)" name="every" id="Every">
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
          </section>
          <button class="start" onclick="saveBot()">Save</button>
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
};

const loadAuto = (reload, p = autoMessages) => {
  if (reload) autoMessages = [...newAutoMessages];
  newAutoMessages = [];
  p.forEach((chat) => {
    document.querySelector(".form").innerHTML += phraseInput(
      "auto",
      chat,
      p.indexOf(chat)
    );
  });
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
    <button class="btn add" onclick="delInput('r', this, ${index})">X</button>
    </div>
    `;
  }
  if (type == "scheduled" && where == ".form") {
    return `<div class="input s">
    <input type="text" placeholder="Write a message here" class="inputPhrase s${index}" value="${value.phrase}" onkeyup="phraseWriting('scheduled', this, ${index})">
    <input type="number" placeholder="time" value="${value.time}" class="inputTime s${index}">
    <button class="btn add" onclick="delInput('s', this, ${index})">X</button>
  </div>`;
  }

  if (type == "auto") {
    let answers = "";
    let func = `addInput({name: 'auto', index: ${index}},{ask: ${value.ask== ''? '\'\'' : "'"+value.ask+"'" }, answers: [''] },  {where: '.answers', chat: '.chat-${index}__answers'} )`;

    value.answers.forEach(
      (answer, i) =>
        (answers += `<input type="text" placeholder="Write answer" ${i == (value.answers.length - 1)? `onkeyup=\"event.key == 'Enter'? ${func} : null\"` : ""} class="inputAnswer chat-${index} answer${i}" value="${answer}">`)
    );
    if (where == ".form") {
      return `<section class="chat chat-${index}">
      <input type="text" placeholder="Write query" class="inputPhrase question${index}" value="${value.ask}">
      <section class="answers chat-${index}__answers">
      ${answers}
      <button class="btn add" onclick="${func}">+</button>
      </section>
      </section>`;
    }
    if (where == ".answers") {
      return `${answers}<button class="btn add" onclick="${func}">+</button> `;
    }
  } 
  
};
