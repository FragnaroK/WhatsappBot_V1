class pyConfig:
    def __init__(self, browser, phone):
        self.browser = browser
        self.phone = phone

class jsConfig:
    def __init__(self, modes, randomPhrases, scheduledPhrases, autoMessages, kWord, every, times):
        self.modes = [modes.random, modes.scheduled, modes.auto]
        self.randomPhrases = randomPhrases
        self.scheduledPhrases = scheduledPhrases
        self.autoMessages = autoMessages
        self.keyWord = kWord
        self.every = every
        self.times = times