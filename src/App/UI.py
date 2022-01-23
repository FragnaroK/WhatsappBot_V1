import eel
import sys
import json
from os import path
from pathlib import Path
import App.models.art as art
from time import sleep as wait
import eel.browsers as browsers
from types import SimpleNamespace
from json.encoder import JSONEncoder

from App.models.userconfig import botConfig
from App.models.art import dataStatusMessage, aPrint
# determine if the application is a frozen `.exe` (e.g. pyinstaller --onefile) 
if getattr(sys, 'frozen', False):
    application_path = path.dirname(sys.executable)
# or a script file (e.g. `.py` / `.pyw`)
elif __file__:
    application_path = Path(path.dirname(__file__)).parent.absolute()
    

dir_path = application_path
pyPath = "src/App/UI.py"

class configEncoder(JSONEncoder):
    def default(self, o):
            return o.__dict__
        
@eel.expose       
def getpythonConfig(Config):
    data = json.loads(str(Config), object_hook=lambda d: SimpleNamespace(**d))
    global setPyConfig
    setPyConfig = botConfig().pyConfig(data.browser, data.phone)
    saveData(data, "botConfig")
    
    
@eel.expose       
def getjsConfig(Config):
    data = json.loads(str(Config), object_hook=lambda d: SimpleNamespace(**d))
    global setJsConfig
    setJsConfig = botConfig.jsConfig(data.modes, data.randomPhrases, data.scheduledPhrases, data.autoMessages, data.keyWord, data.every, data.times)
    saveData(data, "userConfig")

@eel.expose
def checkSavedData():
    from os.path import isfile as exists
    if (exists(r"{}\config\userConfig.json".format(dir_path)) and exists(r"{}\config\botConfig.json".format(dir_path))):
        aPrint("info", "Saved Data Found!")
        wait(0.5)
        with open(r"{}\config\userConfig.json".format(dir_path),
                "r", encoding="utf8") as f1:
            getJsConfigFile = json.load(f1, object_hook=lambda d: SimpleNamespace(**d))
            getJsConfig = botConfig.jsConfig(getJsConfigFile.modes, getJsConfigFile.randomPhrases, getJsConfigFile.scheduledPhrases, getJsConfigFile.autoMessages, getJsConfigFile.keyWord , getJsConfigFile.every, getJsConfigFile.times)
            f1.close()
        with open(r"{}\config\botConfig.json".format(dir_path),
                "r", encoding="utf8") as f:
            getPythonConfigFile = json.load(f, object_hook=lambda d: SimpleNamespace(**d))
            getPyConfig = botConfig.pyConfig(getPythonConfigFile.browser,getPythonConfigFile.phone)
            f.close()
        aPrint("info", "Data to be loaded: ")
        dataStatusMessage(getPyConfig, getJsConfig)
        print("\n")
        aPrint("info", "Data Loaded!")
        eel.getSavedData(botConfig.toJSON().encode(getJsConfig), botConfig.toJSON().encode(getPyConfig))            
        wait(0.5)
    else:
        aPrint("error", "Saved Data Unavailable!!", [pyPath, "checkSavedData()"])

allSaved = ""
def saveData(data, filename):
    with open(r'{}\config\{}.json'.format(dir_path, filename), 'w', encoding='utf-8') as f:
        json.dump(data, f, cls=configEncoder, ensure_ascii=False)
    aPrint("update", filename + ".json Saved!")
    allSaved = filename
    if allSaved == ("userConfig" or "botConfig"):
        dataStatusMessage(setPyConfig, setJsConfig)
        wait(3)
    
@eel.expose      
def startBot():
     try:
        import main
        aPrint("info", "Bot module Found!")
        wait(0.5)
     except ModuleNotFoundError or ImportError as err:
        aPrint("error", "Bot Module Not Found", [pyPath, "startBot()"])
        print(err)
     main.startFromUI()

def runUI():
    print(art.welcoming())
    wait(3) # Just to see this awesome title
    eel.init('{}\\App\\web'.format(dir_path), allowed_extensions=['.js', '.html'])
    browsers.set_path("chromium", r"{}\chrome-win\chrome.exe".format(dir_path))
    eel.start('index.html', mode="chromium", cmdline_args=['--disable-extensions', '--test-type=gpu'])

    