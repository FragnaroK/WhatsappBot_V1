from json.encoder import JSONEncoder
import eel
import json
from types import SimpleNamespace

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
    def __init__(self, modes, rPhrases, sPhrases, interval, time):
        self.modes = [modes.random, modes.scheduled]
        self.randomPhrases = rPhrases
        self.scheduledPhrases = sPhrases
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
    userConfig = jsConfig(data.modes, data.randomPhrases, data.scheduledPhrases , data.every, data.times)
    saveData(data, "userConfig")


def saveData(data, filename):
    with open('{}.json'.format(filename), 'w', encoding='utf-8') as f:
        json.dump(data, f, cls=configEncoder, ensure_ascii=False)
    
@eel.expose      
def startBot():
     try:
        import main
        print("Bot module Found!")
     except ModuleNotFoundError or ImportError as err:
        print("[!] ERROR:  Selenium WebDriver Edge Not Found")
        print(err)
     main.runBot()

def runUI():
    eel.init('web', allowed_extensions=['.js', '.html'])
    eel.start('index.html')

    