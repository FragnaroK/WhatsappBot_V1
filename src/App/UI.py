import eel
import eel.browsers as browsers
import sys
import json
from os import path
from pathlib import Path
from types import SimpleNamespace
from json.encoder import JSONEncoder

from App.models.userconfig import jsConfig, pyConfig

# determine if the application is a frozen `.exe` (e.g. pyinstaller --onefile) 
if getattr(sys, 'frozen', False):
    application_path = path.dirname(sys.executable)
# or a script file (e.g. `.py` / `.pyw`)
elif __file__:
    application_path = Path(path.dirname(__file__)).parent.absolute()
    

dir_path = application_path


class configEncoder(JSONEncoder):
    def default(self, o):
            return o.__dict__
        
@eel.expose       
def getpythonConfig(Config):
    print("\nGeneral Data Saved:\n\n")
    print(Config)
    print("\n")
    data = json.loads(str(Config), object_hook=lambda d: SimpleNamespace(**d))
    global botConfig
    botConfig = pyConfig(data.browser, data.phone)
    saveData(data, "botConfig")
    
@eel.expose       
def getjsConfig(Config):
    print("\nBot Data Saved:\n\n")
    print(Config)
    print("\n")
    data = json.loads(str(Config), object_hook=lambda d: SimpleNamespace(**d))
    global userConfig
    userConfig = jsConfig(data.modes, data.randomPhrases, data.scheduledPhrases, data.autoMessages, data.keyWord, data.every, data.times)
    saveData(data, "userConfig")

@eel.expose
def checkSavedData():
    from os.path import isfile as exists
    if (exists(r"{}\config\userConfig.json".format(dir_path)) and exists(r"{}\config\botConfig.json".format(dir_path))):
        with open(r"{}\config\userConfig.json".format(dir_path),
                "r", encoding="utf8") as f1:
            setJsConfigFile = json.load(f1, object_hook=lambda d: SimpleNamespace(**d))
            setJsConfig = jsConfig(setJsConfigFile.modes, setJsConfigFile.randomPhrases, setJsConfigFile.scheduledPhrases, setJsConfigFile.autoMessages, setJsConfigFile.keyWord , setJsConfigFile.every, setJsConfigFile.times)
            f1.close()
        with open(r"{}\config\botConfig.json".format(dir_path),
                "r", encoding="utf8") as f:
            pythonConfigFile = json.load(f, object_hook=lambda d: SimpleNamespace(**d))
            setPyConfig = pyConfig(pythonConfigFile.browser,pythonConfigFile.phone)
            f.close()
        print("\nData to be loaded: \n\n")
        print(pythonConfigFile)
        print("\n")
        print(setJsConfigFile)
        print("\n\nData sent!\n")
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
     main.startFromUI()

def runUI():
    print(dir_path)
    eel.init('{}\\App\\web'.format(dir_path), allowed_extensions=['.js', '.html'])
    browsers.set_path("chromium", r"{}\chrome-win\chrome.exe".format(dir_path))
    eel.start('index.html', mode="chromium", cmdline_args=['--disable-extensions', '--test-type=gpu'])

    