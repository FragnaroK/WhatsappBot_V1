const onlyScheduled=true;const onlyRandom=true;const autoMode=true;const everyS=3540000;const scheTime=['12', '23', '17'];const phrases=['🌚 Sos el amorcito de mi vida, te amo y te extraño con todo mi corazon ❤️', '🌚 Te amo ❤️❤️', '🌚 Me encantas 😍', '🌚 Quiero tocarte el culo 😭🥺 y decirte que te amo  ❤️', '🌚 Todas las noches pienso en vos y recuerdo todos los bonitos momentos que tuvimos 🥺', '🌚 Teamoteamoteamoteamoteamoteamoteamoteamo', '🌚 Cada vez que miro las estrellas me acuerdo de vos y de como empezo esta hermosa historia✨✨✨', '🌚 Aunque no sea yo el que escribe, estoy siempre pensando en vos y en todas estas cosas para decirte ❤️', '🌚 Sos el amor de mi vida amorcito, mi motivacion para ser mejor 🥺', '🌚 Como olvidar esa nocache, cuando solo eramos vos y yo bailando a mitad de la nocache✨🥺', '🌚 Amo la manera en que me miras, amo tu sonrisa, tus ojos, tu olor, amo hasta la mas minima parte de tu ser 💘', 'Tanto tiempo, tantas personas, tantas cosas y pensar que todo este tiempo yo solo te buscaba a vos 🥺', 'Solo sé que haces de mi vida la más hermosa, te amo ❤️', 'Una distancia nos separa pero dos corazones nos unen, el tuyo y el mío ✨💘', 'Eres la manera que tiene el mundo de decirme lo bonita que es la vida 🥺❤️', 'Pienso en el amor de mi vida y me doy cuenta de que tienen tu nombre y apellido ✨', 'Mi felicidad lleva tu nombre y tu apellido, nunca lo olvides 🥰', 'Lo bonito de mi vida no es que estés en ella sino que yo estoy en la tuya 💖💝', '🌚 Amorcito te amo, perdon si a veces no puedo darte todo lo que te gustaria... Hago lo que puedo para poder mantener al amor de mi vida feliz 🥺❤️🥺❤️', '🌚 Te amo con todo mi corazon, hasta el infinito y mas allá 💖💝', '🌚 No hay dia en el que no piense en como poder sacarte una sonrisa 🥺❤️', '🌚 Sé que tengo mil defectos, pero una de mis mas grandes fortalezas es la motivacion y la felicidad que vos me generas para poder ser mejor 🥺🥺', '🌚 Unas Ganas de comerte a besos amorcito', '🌚 Nada mejor que vivir esta aventura con la mujer que quiero a mi lado para toda la vida 💘'];const schePhrases=[{phrase:'🥺❤️Sos preciosa mi amor, la reina de las reinas, nunca olvides lo hermosa que sos!💖💝 Que duermas muy bien mi amor TE AMO❤️', time:'12'}, {phrase:'Buen dia mi amorcito, mensaje programado pero por las dudas si estoy ocupado y no puedo mandartle un buen dia al amor de mi vida :(, Te amo con todo mi corazon y espero que estes teniendo una mañana fantastica👩🏻\u200d❤️\u200d👨🏽', time:'23'}, {phrase:'Sos el amor de mi vida, te extraño muchisimo y estoy ansioso por volverte a abrazar 🥺❤️ SOS HERMOSA!', time:'17'}];const chats=[{ask:'decime cosas lindas', answers:['Te amo con todo mi corazon ❤️🥺', '💘Sos mi motivacion del dia a dia💘', 'Espero que te guste este programa, se que no es mucho pero la motivacion y la perseverancia vienen de lo mucho que te amo🥺❤️👩\u200d❤️\u200d👩', 'Amo tu pelo, tu sonrisa, necesito de tus abrazos mas que nunca😭❤️', 'No importa que este haciendo, siempre estoy pensando en mil maneras de comerte a besos🤭😗']}, {ask:'Te amo', answers:['Te amo mas amorcito, con toda mi alma❤️', 'Yo mas preciosa, hasta el infinito y mas allá 💓✨', 'yo maaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasssss💘', 'yo mas que vos a mi😗', 'yo tambien preciosura, muchisimo 🥺']}, {ask:'Te extraño', answers:['Yo mas amor, todo el tiempo🥺', 'Yo tambien mi princesa, ya quiero poder abrazarte y comerte a besos💓😭', 'Yo mas amorcito, hasta el infinito y mas alla❤️❤️❤️❤️❤️❤️', 'Mandame foto entonces😗❤️ je', 'Me encantaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaas y te extraño todo el tiempo❤️❤️❤️']}, {ask:'contame un chiste', answers:['al pan pan al vino vino y a tu culo un pepino(?', 'no tengo mas chistes xd, los voy a agregar a medida que se me ocurran xd']}, {ask:'contame algo', answers:['algo', '1, 2, 3, 4, 5, 6...', 'Te acordas cuando nos robaron volviendo del clona?🤣 tenemos mucha mala suerte ambos', 'La vez que te fui a buscar al trabajo pero llegue tan justo que ya te habias ido, me puse re mal porque sentia que te habia fallado :(, una compañera tuya me dijo que ya te habias ido pero cuando sali y te vi casi me pongo a llorar :( sos muy importante para mi amorcito', 'Me encantas amorcito, me encanta tu familia y la verdad fue la primera vez que me senti comodo con la familia de una pareja', 'Puede que no te lo diga, porque tampoco es que pasamos mucho tiempo con ella, pero extraño a Uma :(', 'Sabias que sos el amor de mi vida? bueno, lo sos 😗']}];const keyWord="amorcito ";console.log("Runing Program");const onlyScheduled=!1,onlyRandom=!1,autoMode=!1,everyS=36e5,phrases=["Some Random Phrase","Another Random Phrase"],schePhrases=[{phrase:"Some Scheduled Phrase",time:12},{phrase:"Another Scheduled Phrase",time:22},{phrase:"An extra phrase as example of scheTime",time:12}],scheTime=[12,22],keyWord="hey, ",chats=[{ask:"question",answers:["question answer 1","question answer 2","question answer 3"]}];var list_container,lastMsg,msgInput,cache=[],cacheLimit=phrases.length,diff=!1,chosenPhrase=0;count=0;const eventInput=new InputEvent("input",{bubbles:!0}),getTime=()=>new Date(Date.now()).getHours();function randInt(e,n){return e=Math.ceil(e),n=Math.floor(n),Math.floor(Math.random()*(n-e+1))+e}function isDiff(e,n){for(i=0;i<n.length;i++)if(n[i]==e)return!1;return!0}function selectPhrase(){diff=!1;let e=0;for(;!diff;)chosenPhrase=randInt(0,phrases.length),diff=!!isDiff(chosenPhrase,cache),e++,100==e&&(diff=!0)}function checkcache(){(cache.length<cacheLimit?cache:cache=[]).push(chosenPhrase),console.log("valor de cache: ",cache)}function sendMsg(e){e.dispatchEvent(eventInput),e.dispatchEvent(eventInput),e.dispatchEvent(eventInput),setTimeout(()=>{document.querySelector("button._4sWnG").click()},500)}function writeAndSendMsg(e){msgInput.textContent=e,sendMsg(msgInput)}function sendScheduledMessages(n){let e=schePhrases.filter(e=>Number(e.time)==n);e.forEach(e=>setTimeout(()=>writeAndSendMsg(e.phrase),2e3))}function whatsappBot(){let e=getTime();console.groupCollapsed("Message ["+count+"]"),console.log("======================================="),console.log("\nSelecting Message... \n\n"),onlyRandom&&(selectPhrase(),checkcache()),console.log("\tChosen phrase: "+phrases[chosenPhrase]),console.log("\tWriting..."),onlyScheduled&&everyS<=36e5?scheTime.includes(e.toString())?sendScheduledMessages(e):writeAndSendMsg(phrases[chosenPhrase]):onlyRandom&&writeAndSendMsg(phrases[chosenPhrase]),console.log("\n\n Sent!"),count++,console.groupEnd()}function stopBot(){clearInterval(bot),console.log("Bot stoped"),count=0}function startBot(){var e;onlyRandom&&(console.groupCollapsed("Message ["+count+"]"),console.log("======================================="),console.log("\nSelecting Message... \n\n"),selectPhrase(),checkcache(),console.log("\tChosen phrase: "+phrases[10]),console.log("\tWriting..."),writeAndSendMsg(phrases[chosenPhrase]),console.log("\n\n Sent!"),console.groupEnd()),onlyScheduled&&(e=getTime(),everyS<=36e5?(console.log("agendado"),scheTime.includes(e)&&sendScheduledMessages(e)):(alert("You MUST select less than 1 hour between messages on 'onlyScheduled' mode!"),alert("The bot wont send scheduled messages until you change the time or disable the onlyschedule mode"))),bot=setInterval(whatsappBot,everyS),console.log("Bot Initialized")}function checkInput(e,n){isReady=setInterval(()=>{void 0!==msgInput&&void 0!==list_container?(console.groupCollapsed("check Input"),console.log("Found input"),console.log(msgInput),console.groupEnd(),n&&startAI(),e&&startBot(),clearInterval(isReady)):(list_container=document.querySelector('[aria-label="Message list. Press right arrow key on a message to open message context menu."]'),document.querySelectorAll("._13NKt.copyable-text.selectable-text").forEach(e=>{e.hasAttribute("spellcheck")&&(msgInput=e)}))},2e3)}function startAI(){list_container.addEventListener("DOMNodeInserted",e=>getLastMsg(e),!1)}function getLastMsg(e){let n=e.target;n==list_container.lastElementChild&&n.classList.toString().includes("message-in focusable-list-item")&&answerMsg(lastMsg=n.innerText.slice(0,n.innerText.lastIndexOf("\n")))}var lastMsgSent=void 0;function answerMsg(e){let n=e.toString().toLowerCase(),s=!1;n.slice(0,keyWord.length).includes(keyWord)&&chats.forEach((t,e)=>{n.includes(t.ask.toLowerCase())&&(setTimeout(()=>{let e=randInt(0,t.answers.length),n={value:!0,count:0};if(null!=lastMsgSent)for(;e==lastMsgSent&&n.value;)e=randInt(0,t.answers.length),n.count++,100==n.count&&(n.value=!1);e!=lastMsgSent&&(lastMsgSent=e),writeAndSendMsg(t.answers[e])},1e3),s=!0)}),!s&&n.slice(0,keyWord.length).includes(keyWord)&&setTimeout(()=>{writeAndSendMsg("Perdon Amorcito, no entendi la respuesta TE AMO <3")},3e3)}function main(){onlyRandom||onlyScheduled&&autoMode?checkInput(!0,!0):onlyRandom||onlyScheduled||!autoMode?onlyRandom||onlyScheduled||autoMode||alert("No mode selected!"):checkInput(!1,!0)}main();