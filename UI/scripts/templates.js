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
                onkeyup="writing(this)"
              />
            </div>
          </section>
          <section class="modes">
            <div class="modes__random">
              <button
                class="modes__random--toggle toggleBtn ${
                  modes.scheduled ? "btnOn" : ""
                }"
                onclick="modeToggle('random')"
              >
                Random Mode
              </button>
            </div>
            <div class="modes__scheduled">
              <button
                class="modes__scheduled--toggle toggleBtn ${
                  modes.scheduled ? "btnOn" : ""
                }"
                onclick="modeToggle('scheduled')"
              >
                Scheduled Mode
              </button>
            </div>
          </section>
          <button class="start" onclick="startBot()">Start Bot</button>
        </section>
`;

const random = () => `
<section id="random">
          <section class="showPhrases">
            <ul class="phrases__list">
              <li class="list__phrase">phrase</li>
            </ul>
          </section>
          <section class="addPhrases">
            <div class="form">
            <input type="text" placeholder="Write message here" class="addrandomPhrase" id="r0" onkeyup=""/>
            <button class="btn add" onclick="delInput('r0', this)">X</button>
            </div>
            <button class="btn add" onclick="addInput('random','')">+</button>
            </section>
            <button class="btn apply" onclick="addPhrases()">Add Phrases</button>
        </section>
`;

const scheduled = () => `
<h1>Scheduled works</h1>
`;

const loadRandom = () => {
  randomPhrases.forEach((phrase) => {
    document.querySelector(".phrases__list").innerHTML += randomPhraseItem(
      phrase,
      randomPhrases.indexOf(phrase)
    );
    addInput("random", phrase);
  });
};
// ELEMENTS

const randomPhraseItem = (phrase, index) => `
<li class="list__phrase p${index}" onclick="deletePhrase(this)">${phrase}</li>
`;

const phraseInput = (type, value, index) => `
<input type="text" placeholder="Write message here" class="add${type.toLowerCase()}Phrase" id="${
  type.toLowerCase() == "random" ? "r" + index : "s" + index
}" value="${value}" onkeyup="phraseWriting('${
  type.toLowerCase() == "random" ? "r" : "s"
}', this, ${index})"/>
<button class="btn add" onclick="delInput('${
  type.toLowerCase() == "random" ? "r" + index : "s" + index
}', this)">X</button>
`;
