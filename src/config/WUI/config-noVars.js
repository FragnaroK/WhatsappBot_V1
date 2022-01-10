//  Message input code: _2lMWa
console.log("Runing Program");

// LIST OF EMOJIS ON "emojis.txt"

// MODES: Can be activated together
const onlyScheduled = false;
const onlyRandom = false;
const autoMode = false;

// TIME: An hour or less on Scheduled Mode
const everyS = 3600000; // How much it should wait between messages (in miliseconds)

// Here you add the phrases that you want to send. ** Do not forget the "cuotes" and ,commas, **
const phrases = ["Some Random Phrase", "Another Random Phrase"];

const schePhrases = [
  {
    phrase: "Some Scheduled Phrase", // Well, the phrase
    time: 12, // Here you should put the specific hour that you want to send it from 0 to 23
  },
  {
    phrase: "Another Scheduled Phrase",
    time: 22,
  },
  {
    phrase: "An extra phrase as example of scheTime",
    time: 12,
  },
];

// Just mention the hours that you would like to schedule the messages (One per hour)
const scheTime = [12, 22]; // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15...


const chats = [
  {
    ask: "question",
    answers: [
      "question answer 1",
      "question answer 2",
      "question answer 3",
    ],
  },
];



// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ***** BOT CODE - DO NOT MODIFY ANYTHING UNLESS YOU KNOW WHAT YOU'RE DOING!!! ***** ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/* SCHEDULED AND RANDOM MESSAGES CONFIGURATION */

var list_container;
var lastMsg;
var cache = []; // To avoid repeated phrases.
var cacheLimit = phrases.length;
var diff = false;
var chosenPhrase = 0;
var msgInput;
count = 0; // Just to count messages sent. You can see it on Dev tools of chrome, on console tab. (right click and "inspect element")

const eventInput = new InputEvent("input", {
  // "Click" Event
  bubbles: true,
});

const getTime = () => new Date(Date.now()).getHours(); // Get the current time(hour)

function randInt(min, max) {
  // Generate a random number
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isDiff(phrase, che) {
  // This function check the cache to avoid repeating phrases. It compare the phrase selected with the phrases saved in cache
  for (i = 0; i < che.length; i++) {
    if (che[i] == phrase) return false;
  }
  return true;
}

function selectPhrase() {
  // It select a phrase and send it to "isDiff( "phrase selected", cache[string] )" to avoid repeat the phrase, if it isn't on the list, then finish the loop turning diff to true
  diff = false;
  let count = 0;
  while (!diff) {
    chosenPhrase = randInt(0, phrases.length);
    isDiff(chosenPhrase, cache) ? (diff = true) : (diff = false);
    count++;
    if (count == 100) diff = true;
  }
}

function checkcache() {
  // check if the cache is full, if it is full then delete all the content
  if (cache.length < cacheLimit) {
    cache.push(chosenPhrase);
  } else {
    cache = [];
    cache.push(chosenPhrase);
  }
  console.log("valor de cache: ", cache);
}

function sendMsg(input) {
  // "click" on input to unlock "send button" and "click" on "send button"
  input.dispatchEvent(eventInput);
  input.dispatchEvent(eventInput);
  input.dispatchEvent(eventInput);

  setTimeout(() => {
    document.querySelector("button._4sWnG").click();

  }, 500)
}

function writeAndSendMsg(phrase) {
  // Write phrase on input and send message
  msgInput.textContent = phrase;
  sendMsg(msgInput);
}

function sendScheduledMessages(hour) {
  let schePhrase = schePhrases.filter((phrase) => Number(phrase.time) == hour);
  schePhrase.forEach((p) => setTimeout(() => writeAndSendMsg(p.phrase), 2000));
}

function whatsappBot() {
  let time = getTime(); // Get current hour
  console.groupCollapsed("Message [" + count + "]");
  console.log("=======================================");
  console.log("\nSelecting Message... \n\n");
  if (onlyRandom) {
    selectPhrase();
    checkcache();
  }
  console.log("\tChosen phrase: " + phrases[chosenPhrase]);
  console.log("\tWriting...");
  if (onlyScheduled && everyS <= 3600000) {
    scheTime.includes(time.toString()) // if the current hour is 10 o'clock or 22 o'clock then send this message
      ? sendScheduledMessages(time)
      : writeAndSendMsg(phrases[chosenPhrase]);
  } else {
    onlyRandom ? writeAndSendMsg(phrases[chosenPhrase]) : null; // if not, send selected phrase
  }
  console.log("\n\n Sent!");
  count++;
  console.groupEnd();
}

function stopBot() {
  // an extra function to stop the bot, nothing special, just to stop the interval and reset count
  clearInterval(bot);
  console.log("Bot stoped");
  count = 0;
}
function startBot() {
  if (onlyRandom) {
    console.groupCollapsed("Message [" + count + "]");
    console.log("=======================================");
    console.log("\nSelecting Message... \n\n");
    selectPhrase();
    checkcache();
    console.log("\tChosen phrase: " + phrases[10]);
    console.log("\tWriting...");
    writeAndSendMsg(phrases[chosenPhrase]);
    console.log("\n\n Sent!");
    console.groupEnd();
  }

  if (onlyScheduled) {
    let time = getTime();
    if (everyS <= 3600000) {
      console.log("agendado");
      if (scheTime.includes(time)) sendScheduledMessages(time);
    } else {
      alert(
        "You MUST select less than 1 hour between messages on 'onlyScheduled' mode!"
      );
      alert(
        "The bot wont send scheduled messages until you change the time or disable the onlyschedule mode"
      );
    }
  }
  bot = setInterval(whatsappBot, everyS);
  console.log("Bot Initialized");
}

function checkInput(bot, ia) {
  // Check if the input (message area) is available, if it is then start the bot. else, check again.
  isReady = setInterval(() => {
    if (
      typeof msgInput != "undefined" &&
      typeof list_container != ("undefined" || null)
    ) {
      console.groupCollapsed("check Input");
      console.log("Found input");
      console.log(msgInput);
      console.groupEnd();
      if (ia) startAI();
      if (bot) startBot();
      clearInterval(isReady);
    } else {
      list_container = document.querySelector(
        '[aria-label="Message list. Press right arrow key on a message to open message context menu."]'
      );
      document
        .querySelectorAll("._13NKt.copyable-text.selectable-text")
        .forEach((e) => {
          e.hasAttribute("spellcheck") ? (msgInput = e) : null;
        });
    }
  }, 2000)
}

/* "AI" */

function startAI() {
  list_container.addEventListener(
    "DOMNodeInserted",
    (output) => getLastMsg(output),
    false
  );
}

function getLastMsg(output) {
  let e = output.target;
  if (e == list_container.lastElementChild) {
    if (e.classList.toString().includes("message-in focusable-list-item")) {
      lastMsg = e.innerText.slice(0, e.innerText.lastIndexOf("\n"));
      answerMsg(lastMsg);
    }
  } else {
    // console.log("No valido: ", e);
  }
}
var lastMsgSent = undefined;

function answerMsg(message) {
  let msg = message.toString().toLowerCase();
  let exist = false;
  if (msg.includes("hey, ")) {
    chats.forEach((chat, i) => {
      if (msg.includes(chat.ask.toLowerCase())) {
        setTimeout(() => {
          let answer = randInt(0, chat.answers.length);
          let flag = {
            value: true,
            count: 0
          };
          if (lastMsgSent != undefined) {
            while (answer == lastMsgSent && flag) {
              answer = randInt(0, chat.answers.length);
              flag.count++;
              if (flag.count == 100) flag.value = false;
            }
          }
          if (answer != lastMsgSent) lastMsgSent = answer;
          writeAndSendMsg(chat.answers[answer]);
        }, 1000);
        exist = true;
      } 
    });
  }
  if (!exist) {
    setTimeout(() => {
      writeAndSendMsg("Sorry, try another question :(");
    }, 3000);
  }
}


function main() {
  // check every 2 seconds if the input area is available, when it is available finish the interval.
 if (onlyRandom || onlyScheduled && autoMode){ // if no mode selected, then throw an alert
    checkInput(true, true)
    
  } else if (!onlyRandom && !onlyScheduled && autoMode ) {
    checkInput(false, true)

  } else if (!onlyRandom && !onlyScheduled && !autoMode) {
    alert("No mode selected!");
  }
}

main(); // Start program
