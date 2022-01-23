import json
from xmlrpc.client import Boolean

class modesObj:
    def __init__(self, random, scheduled, automatic):
        self.random = Boolean(random)
        self.scheduled = Boolean(scheduled)
        self.auto = Boolean(automatic)

class scheduled:
    def __init__(self, message, time):
        self.phrase = str(message)
        self.time = int(time)

class automatic:
    def __init__(self, ask, answers):
        self.ask = ask
        self.answers = self.addAnswers(answers)
    
    def addAnswers(self, list):
        newList = []
        for ans in list:
            newList.append(ans)
        return newList
    
class botConfig:
    def __init__(self):
        pass            
    class pyConfig:
        def __init__(self, browser, phone):
            self.browser = browser
            self.phone = phone

    class jsConfig:
        def __init__(self, modes, randomPhrases, schePhra, autoMessages, kWord, every, times):
            self.modes = modesObj(modes.random, modes.scheduled, modes.auto)
            self.randomPhrases = randomPhrases
            self.scheduledPhrases = self.addScheduled(schePhra)
            self.autoMessages = self.addAutomatic(autoMessages)
            self.keyWord = kWord
            self.every = every
            self.times = times
        def addScheduled(self, list):
            newList = []
            for msg in list:
                newList.append(scheduled(msg.phrase, msg.time))
            return newList
        def addAutomatic(self, list):
            newList = []
            for msg in list:
                newList.append(automatic(msg.ask, msg.answers))
            return newList
    class toJSON(json.JSONEncoder):
            def default(self, o):
                return o.__dict__