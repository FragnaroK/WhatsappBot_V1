var msgInput,lastMsg,cache=[],cacheLimit=phrases.length,diff=!1,chosenPhrase=0;count=0;const eventInput=new InputEvent("input",{bubbles:!0}),getTime=()=>new Date(Date.now()).getHours();function randInt(e,n){return Math.round(Math.random()*n-e)}function isDiff(e,n){for(i=0;i<n.length;i++)if(n[i]==e)return!1;return!0}function selectPhrase(){diff=!1;let e=0;for(;!diff;)chosenPhrase=randInt(0,phrases.length),diff=!!isDiff(chosenPhrase,cache),e++,100==e&&(diff=!0)}function checkcache(){(cache.length<cacheLimit?cache:cache=[]).push(chosenPhrase),console.log("valor de cache: ",cache)}function sendMsg(e){e.dispatchEvent(eventInput),document.querySelector("button._4sWnG").click()}function writeAndSendMsg(e){msgInput.textContent=e,sendMsg(msgInput)}function sendScheduledMessages(n){let e=schePhrases.filter(e=>Number(e.time)==n);e.forEach(e=>setTimeout(()=>writeAndSendMsg(e.phrase),2e3))}function whatsappBot(){let e=getTime();console.groupCollapsed("Message ["+count+"]"),console.log("======================================="),console.log("\nSelecting Message... \n\n"),onlyRandom&&(selectPhrase(),checkcache()),console.log("\tChosen phrase: "+phrases[chosenPhrase]),console.log("\tWriting..."),onlyScheduled&&everyS<=36e5?scheTime.includes(e.toString())?sendScheduledMessages(e):writeAndSendMsg(phrases[chosenPhrase]):onlyRandom&&writeAndSendMsg(phrases[chosenPhrase]),console.log("\n\n Sent!"),count++,console.groupEnd()}function stopBot(){clearInterval(bot),console.log("Bot stoped"),count=0}function startBot(){var e;onlyRandom&&(console.groupCollapsed("Message ["+count+"]"),console.log("======================================="),console.log("\nSelecting Message... \n\n"),selectPhrase(),checkcache(),console.log("\tChosen phrase: "+phrases[10]),console.log("\tWriting..."),writeAndSendMsg(phrases[chosenPhrase]),console.log("\n\n Sent!"),console.groupEnd()),onlyScheduled&&(e=getTime(),everyS<=36e5?(console.log("agendado"),scheTime.includes(e)&&sendScheduledMessages(e)):(alert("You MUST select less than 1 hour between messages on 'onlyScheduled' mode!"),alert("The bot wont send scheduled messages until you change the time or disable the onlyschedule mode"))),bot=setInterval(whatsappBot,everyS),console.log("Bot Initialized")}function checkInput(){void 0!==msgInput?(console.groupCollapsed("check Input"),console.log("Found input"),console.log(msgInput),console.groupEnd(),startBot(),clearInterval(isReady)):document.querySelectorAll("._13NKt.copyable-text.selectable-text").forEach(e=>{e.hasAttribute("spellcheck")&&(msgInput=e)})}const list_container=document.querySelector('[aria-label="Message list. Press right arrow key on a message to open message context menu."]'),chats=[{ask:"cosas bonitas",answers:["cosa bonita respuesta 1","cosa bonita respuesta 2","cosa bonita respuesta 3"]}];function getLastMsg(e){let n=e.target;n==list_container.lastElementChild&&n.classList.toString().includes("message-out focusable-list-item")&&(console.log("mensaje: ",n),answerMsg(lastMsg=n.innerText.slice(0,n.innerText.lastIndexOf("\n"))))}function answerMsg(e){let s=e.toString().toLowerCase();s.includes("bot contestame")&&chats.forEach((e,n)=>{s.toString().toLowerCase().includes(e.ask)?writeAndSendMsg(e.answers[randInt(0,e.answers.length)]):n==chats.length-1&&writeAndSendMsg("Lo siento, no entendi tu mensaje :(")})}function main(){list_container.addEventListener("DOMNodeInserted",e=>getLastMsg(e),!1),onlyRandom||onlyScheduled?isReady=setInterval(checkInput,2e3):alert("No mode selected!")}main();