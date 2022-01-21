#!/usr/bin/env python3


# ██╗    ██╗██╗  ██╗ █████╗ ████████╗███████╗ █████╗ ██████╗ ██████╗     ██████╗  ██████╗ ████████╗
# ██║    ██║██║  ██║██╔══██╗╚══██╔══╝██╔════╝██╔══██╗██╔══██╗██╔══██╗    ██╔══██╗██╔═══██╗╚══██╔══╝
# ██║ █╗ ██║███████║███████║   ██║   ███████╗███████║██████╔╝██████╔╝    ██████╔╝██║   ██║   ██║
# ██║███╗██║██╔══██║██╔══██║   ██║   ╚════██║██╔══██║██╔═══╝ ██╔═══╝     ██╔══██╗██║   ██║   ██║
# ╚███╔███╔╝██║  ██║██║  ██║   ██║   ███████║██║  ██║██║     ██║         ██████╔╝╚██████╔╝   ██║
#  ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝         ╚═════╝  ╚═════╝    ╚═╝

#                    _   _     _   _   _   _   _   _   _   _   _
#                   / \ / \   / \ / \ / \ / \ / \ / \ / \ / \ / \
#                  ( B | y ) ( F | r | a | g | n | a | r | o | K )
#                   \_/ \_/   \_/ \_/ \_/ \_/ \_/ \_/ \_/ \_/ \_/

# Github profile: https://github.com/FragnaroK
# Website:        https://fcanalejo.web.app

import json
from pathlib import Path
import sys
from types import SimpleNamespace
from selenium import webdriver
from os import getlogin, path

from App.models.userconfig import jsConfig, pyConfig


# Change the name of the browser that you want to run this bot
# Available browsers:
#       - Chrome
#       - Edge -> I would recommend this browser if you want to run this program for a long time on your computer, because it has less consuption of RAM
#       - Firefox

# determine if the application is a frozen `.exe` (e.g. pyinstaller --onefile) 
if getattr(sys, 'frozen', False):
    application_path = path.dirname(sys.executable)
# or a script file (e.g. `.py` / `.pyw`)
elif __file__:
    application_path = Path(path.dirname(__file__)).parent.absolute()
    

selectedBrowser = "Edge"

# Here you can add the target, do not forget the area code +00
manualPhone = "+0000000001"

# Url of whatsapp, do not change ir unless it is necesary
manualURL = "https://web.whatsapp.com/send?phone={}".format(manualPhone)

# Do not change this
dir_path = application_path
user = getlogin()

# Check if all the addresses are okay, may change depending of your computer


def getJsConfig():
    with open(r"{}\config\userConfig.json".format(dir_path),
                "r", encoding="utf8") as f:
        setJsConfigFile = json.load(f, object_hook=lambda d: SimpleNamespace(**d))
    global setJsConfig
    setJsConfig = jsConfig(setJsConfigFile.modes, setJsConfigFile.randomPhrases, setJsConfigFile.scheduledPhrases, setJsConfigFile.autoMessages, setJsConfigFile.keyWord, setJsConfigFile.every, setJsConfigFile.times) 
    f.close()
    
def getPytConfig():
    with open(r"{}\config\botConfig.json".format(dir_path),
                "r", encoding="utf8") as f:
        pythonConfigFile = json.load(f, object_hook=lambda d: SimpleNamespace(**d))
    global setPyConfig
    setPyConfig = pyConfig(pythonConfigFile.browser,pythonConfigFile.phone)
    f.close()


def clearBotConfig():
    bot = open(r"{}\bot.js".format(dir_path),
               "w", encoding="utf8")
    bot.close()


def setupConfig(Config):
    try:
        from css_html_js_minify import process_single_js_file
        print("Starting JS Compressor!\n")
    except ModuleNotFoundError or ImportError as err:
        print("[!] ERROR: JavaScript Minify Module Not Found!")
        print(err)
    process_single_js_file(r"{}\config\WUI\config-noVars.js".format(dir_path),overwrite=False, output_path=r"{}\config\WUI\min-config.js".format(dir_path))
    print("Minify Completed!\n\n")
    schePhra = str(Config.scheduledPhrases).replace("namespace(" , "{")
    schePhra = schePhra.replace(")", "}")
    autoMsg = str(Config.autoMessages).replace("namespace(" , "{")
    autoMsg = autoMsg.replace(")", "}")
    clearBotConfig()
    # Bot logic
    config = open(r"{}\config\WUI\min-config.js".format(dir_path),
                  "r", encoding="utf8")

    # Only change it if the name of the javascript file change, or path
    bot = open(r"{}\bot.js".format(dir_path),
               "a+", encoding="utf8")
    bot.write("const onlyScheduled={};".format(str(Config.modes[1]).casefold()))
    bot.write("const onlyRandom={};".format(str(Config.modes[0]).casefold()))
    bot.write("const autoMode={};".format(str(Config.modes[2]).casefold()))
    bot.write("const everyS={};".format(Config.every))
    bot.write("const scheTime={};".format(Config.times))
    bot.write("const phrases={};".format(Config.randomPhrases))
    bot.write("const schePhrases={};".format(schePhra.replace("=", ":")))
    bot.write("const chats={};".format(autoMsg.replace("=", ":")))
    bot.write('const keyWord="{}";'.format(Config.keyWord))
    
    for line in config:
        bot.write(line)
    config.close()
    bot.close()


def startBotOn(browser):
    
    global driver
    if browser == ("Chrome" or "chrome"):
        try:
            from selenium.webdriver.chrome.options import Options
            print("Chrome Module Found!")
        except ModuleNotFoundError or ImportError as err:
            print("[!] ERROR: Selenium WebDriver Chrome Not Found")
            print(err)

        options = Options()
        options.add_argument(
            "--user-data-dir=C:\\Users\\{}\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 2".format(user))
        options.add_argument("--disable-extensions")
        driver = webdriver.Chrome(
            executable_path='{}\\drivers\\chromedriver.exe'.format(dir_path), options=options)

    if browser == ("Edge" or "edge"):
        try:
            from selenium.webdriver.edge.options import Options
            print("Edge Module Found!")
        except ModuleNotFoundError or ImportError as err:
            print("[!] ERROR:  Selenium WebDriver Edge Not Found")
            print(err)
        options = Options()
        options.add_argument(
            "--user-data-dir=C:\\Users\\{}\\AppData\\Local\\MicrosoftEdge\\User\\Default".format(
                user)
        )
        driver = webdriver.Edge(
            executable_path='{}\\drivers\\msedgedriver.exe'.format(dir_path), options=options)

    if browser == ("Firefox" or "firefox"):
        try:
            from selenium.webdriver.firefox.options import Options
            print("Firefox Module Found!")
        except ModuleNotFoundError or ImportError as err:
            print("[!] ERROR: Selenium WebDriver Firefox Not Found")
            print(err)
        options = Options()
        options.add_argument(  # May you should have to change the profile name, look for this address -> C:\Users\%USERNAME%\AppData\Local\Mozilla\Profiles
            "--user-data-dir=C:\\Users\\{}\\AppData\\Local\\Mozilla\\Profiles\\2ql2x3dk.default-release".format(
                user)
        )
        driver = webdriver.Firefox(
            executable_path='{}\\drivers\\geckodriver.exe'.format(dir_path), options=options)

def startBot(UI = True):
    if (UI):
        getJsConfig()
        getPytConfig()
        setupConfig(setJsConfig)
        startBotOn(setPyConfig.browser)
        url = "https://web.whatsapp.com/send?phone={}".format(setPyConfig.phone)
        bot = open(r"{}\bot.js".format(dir_path),
                "r", encoding="utf8")
        driver.get(url)
        driver.execute_script(bot.read())
    else:
        startBotOn(selectedBrowser)
        bot = open(r"{}\config\WOUI\config.js".format(dir_path),
                "r", encoding="utf8")
        driver.get(manualURL)
        driver.execute_script(bot.read())

