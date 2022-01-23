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

import sys
import json
from pathlib import Path
from os import getlogin, path
from selenium import webdriver
from types import SimpleNamespace
from time import sleep as wait
from App.models.userconfig import botConfig, dataStatusMessage


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
    

selectedBrowser = "Chromium"

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
    setJsConfig = botConfig.jsConfig(setJsConfigFile.modes, setJsConfigFile.randomPhrases, setJsConfigFile.scheduledPhrases, setJsConfigFile.autoMessages, setJsConfigFile.keyWord, setJsConfigFile.every, setJsConfigFile.times) 
    f.close()
    
def getPytConfig():
    with open(r"{}\config\botConfig.json".format(dir_path),
                "r", encoding="utf8") as f:
        pythonConfigFile = json.load(f, object_hook=lambda d: SimpleNamespace(**d))
    global setPyConfig
    setPyConfig = botConfig.pyConfig(pythonConfigFile.browser,pythonConfigFile.phone)
    f.close()


def clearBotConfig():
    bot = open(r"{}\bot.js".format(dir_path),
               "w", encoding="utf8")
    bot.close()

def getArray(data, t):
    global aux
    aux = ""
    if t == "scheduled":
        i = 0
        for msg in data:
            if i == 0:
                aux = aux.__add__("[")
            aux = aux.__add__("{ phrase: '" + msg.phrase + "', time: " + str(msg.time) + " }")
            if i == (len(data) - 1):
                aux = aux.__add__("]")
            else:
                aux = aux.__add__(",")
            i = i + 1
        return str(aux)
    
    if t == "auto":
        i = 0
        for msg in data:
            if i == 0:
                aux = aux.__add__("[")    
            aux = aux.__add__("{ ask: '"+ msg.ask +"', answers: [")
            j = 0
            for ans in msg.answers:
                if j == (len(msg.answers) - 1):
                    aux = aux.__add__("'" + ans + "']")
                else:
                    aux = aux.__add__( "'" + ans + "',")
                j = j + 1
            if i == (len(data) - 1):
                aux = aux.__add__("}]")
            else:
                aux = aux.__add__("},")       
            i = i + 1
        return str(aux)   
    
def setupConfig(Config):
    try:
        from css_html_js_minify import process_single_js_file
        print("\n\tStarting JS Compressor!\n")
        wait(1)
    except ModuleNotFoundError or ImportError as err:
        print("[!] ERROR: JavaScript Minify Module Not Found!")
        print(err)
    process_single_js_file(r"{}\config\WUI\config-noVars.js".format(dir_path),overwrite=False, output_path=r"{}\config\WUI\min-config.js".format(dir_path))
    print("\n\tMinify Completed!\n\n")
    print("\nAdding saved data into BOT...\n\n")
    wait(2)
    schePhra = getArray(Config.scheduledPhrases, "scheduled")
    autoPhra = getArray(Config.autoMessages, "auto")
    clearBotConfig()
    # Bot logic
    config = open(r"{}\config\WUI\min-config.js".format(dir_path),
                  "r", encoding="utf8")

    # Only change it if the name of the javascript file change, or path
    bot = open(r"{}\bot.js".format(dir_path),
               "a+", encoding="utf8")
    bot.write("const onlyScheduled={};".format(str(Config.modes.scheduled).casefold()))
    bot.write("const onlyRandom={};".format(str(Config.modes.random).casefold()))
    bot.write("const autoMode={};".format(str(Config.modes.auto).casefold()))
    bot.write("const everyS={};".format(Config.every))
    bot.write("const scheTime={};".format(Config.times))
    bot.write("const phrases={};".format(Config.randomPhrases))
    bot.write("const schePhrases={};".format(schePhra))
    bot.write("const chats={};".format(autoPhra))
    bot.write('const keyWord="{}";'.format(Config.keyWord))
    
    for line in config:
        bot.write(line)
    config.close()
    bot.close()
    print("\n\t Saved data added into BOT!\n\n")


def startBotOn(browser, phone):
    
    global driver
    if browser == ("Chrome" or "chrome"):
        try:
            from selenium.webdriver.chrome.options import Options
            print("[+] FOUND: Chrome Module")
            wait(1)
        except ModuleNotFoundError or ImportError as err:
            print("[!] ERROR: Selenium WebDriver Chrome Not Found")
            print(err)

        options = Options()
        options.add_argument(
            "--user-data-dir=C:\\Users\\{}\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 2".format(user))
        options.add_argument("--disable-extensions")
        options.add_argument("--new-windoww")
        options.add_argument("--app=https://web.whatsapp.com/send?phone={}".format(phone))
        if path.isfile(r"{}drivers\chromedriver.exe".format(dir_path)):
            print("[+] FOUND: Chrome Driver (chromedriver.exe)")
            driver = webdriver.Chrome(
                executable_path='{}\\drivers\\chromedriver.exe'.format(dir_path), options=options)
        else:
            print("[!] ERROR: Chrome Driver NOT Found. (Check 'src/drivers/geckodriver.exe')")

    if browser == ("Edge" or "edge"):
        try:
            from selenium.webdriver.edge.options import Options
            print("[+] FOUND: Edge Module")
            wait(1)
        except ModuleNotFoundError or ImportError as err:
            print("[!] ERROR:  Selenium WebDriver Edge Not Found")
            print(err)
        options = Options()
        options.add_argument(
            "--user-data-dir=C:\\Users\\{}\\AppData\\Local\\MicrosoftEdge\\User\\Default".format(
                user)
        )
        if path.isfile(r"{}drivers\msedgedriver.exe".format(dir_path)):
            print("[+] FOUND: Edge Driver (msedgedriver.exe)")
            driver = webdriver.Edge(
                executable_path='{}\\drivers\\msedgedriver.exe'.format(dir_path), options=options)
        else:
            print("[!] ERROR: Edge Driver NOT Found. (Check 'src/drivers/geckodriver.exe')")

    if browser == ("Firefox" or "firefox"):
        try:
            from selenium.webdriver.firefox.options import Options
            print("[+] FOUND: Firefox Module")
            wait(1)
        except ModuleNotFoundError or ImportError as err:
            print("[!] ERROR: Selenium WebDriver Firefox Not Found")
            print(err)
        options = Options()
        options.add_argument(  # May you should have to change the profile name, look for this address -> C:\Users\%USERNAME%\AppData\Local\Mozilla\Profiles
            "--user-data-dir=C:\\Users\\{}\\AppData\\Local\\Mozilla\\Profiles\\2ql2x3dk.default-release".format(
                user)
        )
        if path.isfile(r"{}drivers\geckodriver.exe".format(dir_path)): 
            print("[+] FOUND: Firefox Driver (geckodriver.exe)")
            driver = webdriver.Firefox(
                executable_path='{}\\drivers\\geckodriver.exe'.format(dir_path), options=options)
        else:
            print("[!] ERROR: Firefox Driver NOT Found. (Check 'src/drivers/geckodriver.exe')")
            
    if browser == ("Chromium" or "chromium"):
        try:
            from selenium.webdriver.chrome.options import Options
            print("[+] FOUND: Chromium Module")
            wait(1)
        except ModuleNotFoundError or ImportError as err:
            print("[!] ERROR: Selenium WebDriver Chromium (Chrome) Not Found")
            print(err)

        chromium_path = r"{}\chrome-win\chrome.exe".format(dir_path)
        
        options = Options()
        options.add_argument(
            "--user-data-dir={}\\chrome-win\\AppData\\User Data\\Profile 1".format(dir_path))
        options.add_argument("--disable-extensions")
        options.add_argument("--new-windoww")
        options.add_argument("--app=https://web.whatsapp.com/send?phone={}".format(phone))
        
        if path.isfile(r"{}\chrome-win\chrome.exe".format(dir_path)):
            print("[+] FOUND: Chromium executable at => '{}'".format(chromium_path))
            wait(0.5)
            options.binary_location = chromium_path
            options.add_argument("--disable-extensions")
            if path.isfile(r"{}\drivers\chromedriver.exe".format(dir_path)):
                print("[+] FOUND: Chromium Driver (chromedriver.exe)")
                wait(0.5)
                driver = webdriver.Chrome(
                    executable_path='{}\\drivers\\chromedriver.exe'.format(dir_path), options=options)
            else:
                print("\n[!] ERROR: Chrome Driver NOT Found. (Check 'src/drivers/chromedriver.exe')")
                wait(2)
        else:
            print("[!] NOT FOUND: Chromium executable (Do not forget to unzip 'chrome-win.rar', then check if 'chrome-win' folder exists and it has 'chrome.exe')")
            print("\n\nTrying to start with Edge...\n\n")
            wait(2)
            startBotOn("Edge")

def startBot(UI = True):
    if (UI):
        getJsConfig()
        getPytConfig()
        setupConfig(setJsConfig)
        startBotOn(setPyConfig.browser, setPyConfig.phone)
        print("\n Data Loaded Into the Bot:\n")
        dataStatusMessage(setPyConfig, setJsConfig)
        wait(3)
        url = "https://web.whatsapp.com/send?phone={}".format(setPyConfig.phone)
        bot = open(r"{}\bot.js".format(dir_path),
                "r", encoding="utf8")
        if setPyConfig.browser != ("Chrome" and "chrome" and "Chromium" and "chromium"):
            driver.get(url)
            
        driver.execute_script(bot.read())
    else:
        startBotOn(selectedBrowser)
        bot = open(r"{}\config\WOUI\config.js".format(dir_path),
                "r", encoding="utf8")
        driver.get(manualURL)
        driver.execute_script(bot.read())

