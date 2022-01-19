from UI import runUI
from driverConfig import startBot

# User Interface enable with `True` and disabled with `False`
UIstatus = True

def startFromUI():
    startBot(UI)

def runBot(UI = True):
    if (UI):
        runUI()
    else:
        startBot(UI)

if __name__ == "__main__":
    runBot(UIstatus)