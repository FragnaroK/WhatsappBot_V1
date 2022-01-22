# WhatsApp Bot

#### News
> ***
> ***21/01/2022*** [ ! ] UPDATE [ ! ]
> * README.md updated! Finally...
> * UI works with chromium included, so you don't need to install chrome, but you will have to unzip the file "chrome-win.rar". 
> * It throw an error when you click on "Load Data" but if you click several times it should work well
> * With UI mode, it will minify the js code
> * Config files divided in two folders: 
>	- WUI: With UI
>	- WOUI: Without UI
> *** 

## Indexs

1. [Introduction](#introduction)
   - [Compatibility](#compatibility)
2. [Usage](#usage)
   - [With UI](#with-user-interface)
   - [Without UI](#without-user-interface)
     - [Python File](#python-file)
     - [JavaScript File](#javascript-file)
3. [Collaborations](#about-collaborations)
4. [Contact](#contact)

## Introduction

A WhatsApp bot developed with:

- Python and JavaScript (bot)
- Python, HTML, CSS and JavaScript (UI with [eel library](https://github.com/ChrisKnott/Eel))
***
I made it for **personal purposes** but modified some things to make it available to _anyone_ looking for a whatsapp bot that really _works well_.

Why did I do it? Well... Because I moved to the other side of the world leaving my life partner behind, so until we can meet again I have to find ways to keep the flame alive :D

After having a lot of headaches with bots from other developers, I realized that it was easier to do it myself (with some libraries of course) than to deal with other people's bugs. So I started this project with the idea of making a bot that is not intrusive for the user and that can stay active without any problem, eventually I realized that **doing it only with python was not going to give me what I wanted** so... I looked for a way to include a language that I'm still getting familiar with, **JavaScript**. Using selenium I was able to inject the javascript code into whatsapp web without having to do it manually.

***
### Compatibility

**_Only Available on Windows_**

For now, this bot is compatible with the following browsers:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

You may need to download the drivers corresponding to your browser version.

- [Chrome Drivers](https://chromedriver.chromium.org/downloads)
- [Edge Drivers](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)
- [Firefox Drivers](https://github.com/mozilla/geckodriver)

Once you have downloaded them, copy them into the "drivers" folder.

> ./src/drivers

## Usage
***
**FIRST UNZIP "chrome-win.rar"**
***
This bot can be used in two ways:

1. [With User Interface (Recommended)](#with-user-interface)
2. [Without User Interface](#without-user-interface)

The UI is enabled by default, but if you want to change it just change the value of `UIstatus` from `True` to `False` in _main.py_.

***
### With User Interface

Run main.exe

This UI is very simple and it doesn't require a complex explanation, if you have any doubt/issue or may be ideas to improve it, do not hesitate to send me an email or report it.

> The UI will start with default data just as example, to load your saved data just click on `Load Data`.

_Home Tab_
![Home Tab](./images/WPP_BOT--home.jpeg)
> Here you should be able to setup the target, browser, time between messages, keyword for auto mode, turn on/off any mode abd finally _start the bot_.

>>> I don't know if it is my imagination, but this tab is like a robot's face.

_Random Tab_
![Random Tab](./images/WPP_BOT--random.jpeg)
> Here you should be able to add and delete phrases to send randomly

_Scheduled Tab_
![Scheduled Tab](./images/WPP_BOT--scheduled.jpeg)
> Here you should be able to add and delete scheduled messages and the time preferred

_Automatic Tab_
![Automatic Tab](./images/WPP_BOT--auto.jpeg)
> Here you should be able to add and delete any ask and answer

#### Modify Saved Data Manually

Inside of the "config" folder, you will find the "dataStructure.json" file as example. Just if it is necessary to do it manually.

> ./config/dataStructure.json

***
### Without User Interface

You just have to focus on two files:

1. [Python file](#python-file) called "driverConfig.py"
2. [Javascript file](#javascript-file) called "config.js" located in the "config" folder


#### Python File

> ./driverConfig.py

1. Change the value of `selectedBrowser` to your preferred browser.

		selectedBrowser = "Edge"

2. Change the value of `manualPhone` to the target's phone number including its area code.

		manualPhone = "+141557897845"

3. Check _startBotOn_ function

You should check the paths included in this function because it may throw an error if some path is different, specifically on this part:

	 options.add_argument(
            "--user-data-dir=SomePath"
	 )

It's related to selecct the path of a profile of the selected browser. Anyway, just follow that path and check that it exists.

> If you choose Chrome, then you should create a new profile with your preferred name.

#### Javascript File

> ./config/WOUI/config.js

This bot has three modes:

- [Random Messages](#random-messages)
- [Scheduled Messages](#scheduled-messages)
- [Automatic Messages](#automatic-messages)

> You can keep all the modes activated
***
##### _Random Messages_

This mode aim to select a random message from a list and send it to your target, the time between messages can be selected changing `everyS` value. _If you decide to activate scheduled messages too, then the maximum of time is an hour (3600000 ms) between messages_

	const everyS = 3600000 // Send messages every hour
	
	const phrases = [
		"Some phrase",
		"Another phrase"
	]
***
##### _Scheduled Messages_

This mode aim to send messages at your preferred time, from 0 to 23.

	const schePhrases = [
		{
			phrase: "Some Scheduled Phrase", // the message
			time: 12 // your preferred time, in this case 12pm
		},
		{
			phrase: "Another Scheduled Phrase"
			time: 22
		},
		{
			phrase: "An extra phrase as example of scheTime",
			time: 12
		}
	]

	const scheTime = [12, 22] // it should have all the time values without repeated numbers.

> * Note-1: It doesn't matters if you put several messages at the same time, It will send them together.
***
##### _Automatic Messages_

This mode aim to answer messages from the traget, you'll be able to change the `keyWord` to read the message. This is a new feature that that I would love to improve it through the time.

	const keyWord = "hey, "; // the bot should read the message and answer only if it has this keyword
	
	const chats = [
		{
			ask: "question or phrase",
			answers: [	// it could have several answers
				"question 1 answer 1",
				"question 1 answer 2",
				"question 1 answer 3"
			]
		},
		{
			ask: "question or phrase 2",
			answers: [ // or only one but inside an array
				"question 2 answer 1"
			]
		}
	];
***
## About Collaborations

It's my first "bot" so I know there might be people who find bugs in it or manny ways to improve it, so if you want to give me some feedback or contribute to the project that would be great! :D

Also, English is not my first language, so I'd love if you could let me know if there are any grammatical errors.

## Contact

Don't be shy and contact me if you have any doubt or issue :D 

***

**Email**: _fcanalejo2000@outlook.com_ \
**Discord**: _FragnaroK#1636_

***
