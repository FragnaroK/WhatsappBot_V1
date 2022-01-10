from json.encoder import JSONEncoder
from os import path
import sys
import eel
import json
from types import SimpleNamespace
# determine if the application is a frozen `.exe` (e.g. pyinstaller --onefile) 
if getattr(sys, 'frozen', False):
    application_path = path.dirname(sys.executable)
# or a script file (e.g. `.py` / `.pyw`)
elif __file__:
    application_path = path.dirname(__file__)
    

dir_path = application_path


class configEncoder(JSONEncoder):
    def default(self, o):
            return o.__dict__
        

class schePhrases:
    def __init__(self, phrase):
        self.phrase = phrase.phrase
        self.time = phrase.time
# Parse JSON into an object with attributes corresponding to dict keys.

class pyConfig:
    def __init__(self, browser, phone):
        self.browser = browser
        self.phone = phone
        
class jsConfig:
    def __init__(self, modes, rPhrases, sPhrases, aMessages, interval, time):
        self.modes = [modes.random, modes.scheduled, modes.auto]
        self.randomPhrases = rPhrases
        self.scheduledPhrases = sPhrases
        self.autoMessages = aMessages
        self.every = interval
        self.time = time
        
@eel.expose       
def getpythonConfig(Config):
    print(Config)
    data = json.loads(str(Config), object_hook=lambda d: SimpleNamespace(**d))
    global botConfig
    botConfig = pyConfig(data.browser, data.phone)
    saveData(data, "botConfig")
    
@eel.expose       
def getjsConfig(Config):
    print(Config)
    data = json.loads(str(Config), object_hook=lambda d: SimpleNamespace(**d))
    global userConfig
    userConfig = jsConfig(data.modes, data.randomPhrases, data.scheduledPhrases, data.autoMessages , data.every, data.times)
    saveData(data, "userConfig")

@eel.expose
def checkSavedData():
    from os.path import isfile as exists
    if (exists(r"{}\config\userConfig.json".format(dir_path)) and exists(r"{}\config\botConfig.json".format(dir_path))):
        with open(r"{}\config\userConfig.json".format(dir_path),
                "r", encoding="utf8") as f1:
            setJsConfigFile = json.load(f1, object_hook=lambda d: SimpleNamespace(**d))
            setJsConfig = jsConfig(setJsConfigFile.modes, setJsConfigFile.randomPhrases, setJsConfigFile.scheduledPhrases, setJsConfigFile.autoMessages, setJsConfigFile.every, setJsConfigFile.times) 
            f1.close()
        with open(r"{}\config\botConfig.json".format(dir_path),
                "r", encoding="utf8") as f:
            pythonConfigFile = json.load(f, object_hook=lambda d: SimpleNamespace(**d))
            setPyConfig = pyConfig(pythonConfigFile.browser,pythonConfigFile.phone)
            f.close()
        eel.getSavedData(json.dumps(setJsConfig, cls=configEncoder, ensure_ascii=False), json.dumps(setPyConfig, cls=configEncoder, ensure_ascii=False))
            
    

def saveData(data, filename):
    with open(r'{}\config\{}.json'.format(dir_path, filename), 'w', encoding='utf-8') as f:
        json.dump(data, f, cls=configEncoder, ensure_ascii=False)
    
@eel.expose      
def startBot():
     try:
        import main
        print("Bot module Found!")
     except ModuleNotFoundError or ImportError as err:
        print("[!] ERROR:  Bot Module Not Found")
        print(err)
     main.runBot()

def runUI():
    eel.init('web', allowed_extensions=['.js', '.html'])
    eel.start('index.html')

    