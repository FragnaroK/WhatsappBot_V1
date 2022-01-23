def welcoming():
    return """\n\n
          ██╗    ██╗██╗  ██╗ █████╗ ████████╗███████╗ █████╗ ██████╗ ██████╗     ██████╗  ██████╗ ████████╗
          ██║    ██║██║  ██║██╔══██╗╚══██╔══╝██╔════╝██╔══██╗██╔══██╗██╔══██╗    ██╔══██╗██╔═══██╗╚══██╔══╝
          ██║ █╗ ██║███████║███████║   ██║   ███████╗███████║██████╔╝██████╔╝    ██████╔╝██║   ██║   ██║
          ██║███╗██║██╔══██║██╔══██║   ██║   ╚════██║██╔══██║██╔═══╝ ██╔═══╝     ██╔══██╗██║   ██║   ██║
          ╚███╔███╔╝██║  ██║██║  ██║   ██║   ███████║██║  ██║██║     ██║         ██████╔╝╚██████╔╝   ██║
           ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝         ╚═════╝  ╚═════╝    ╚═╝
____________________________                                                         ______________________________
                            \      _   _     _   _   _   _   _   _   _   _   _      /
                             \    / \ / \   / \ / \ / \ / \ / \ / \ / \ / \ / \    /
                              \  ( B | y ) ( F | r | a | g | n | a | r | o | K )  /
                               \  \_/ \_/   \_/ \_/ \_/ \_/ \_/ \_/ \_/ \_/ \_/  /
                                \_______________________________________________/

Github profile =>  https://github.com/FragnaroK
Website        =>  https://fcanalejo.web.app

====================================================================================================================
 ____                                                                                                             
|INFO|_____________________________________________________________________________________________________________
|                                                                                                                  |
|  Don't worry about the "KeyError", I haven't figured out what it is yet. Everything should work fine, so enjoy!  |
|__________________________________________________________________________________________________________________|

[@] Loading...."""
# Sorry for the fake loading :D

def dataStatusMessage(a, b):
    print("""\n
                General     [botConfig.json]
            __________________________________
           |                                 
           |  Browser: {}                    
           |  Phone  : {}                    
           |_________________________________
            
                Bot         [userConfig.json]
            __________________________________
           |                                 
           |  Random Mode Status   : {}      
           |  Scheduled Mode Status: {}      
           |  Automatic Mode Status: {}      
           |                                 
           |  Keyword  (Auto Mode) : {}      
           |  Every    ( Minutes ) : {}      
           |  Scheduled Time (hour): {}      
           ----------------------------------- """.format(a.browser,
                         a.phone,
                         b.modes.random,
                         b.modes.scheduled,
                         b.modes.auto,
                         b.keyWord,
                         str(b.every /  60000),
                         b.times))
    
def aPrint(state, msg, where = []):
  if state == "info":
        print("""
  ______
 | INFO |>  {}
 """.format(msg))
        
  if state == "update":
        print("""
              
 ++++++++++
 + UPDATE + {} 
 """.format(msg))

  if  state == "error":
    print("""
          
 ^^^^^^^^^
 ! ERROR !> {}
 ##########
 | CHECK |> [{}] {}
 ---------              

 """.format(msg, where[0], where[1]))
      