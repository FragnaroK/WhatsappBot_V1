@ECHO OFF
IF EXIST chrome-win (ECHO FOUND: chrome-win floder) ELSE ( ECHO NOT FOUND: chrome-win folder )
ECHO:
ECHO:
ECHO:
ECHO Deleting User Data . . . 
ECHO ^|
RMDIR /s chrome-win\AppData\"User Data"\"Profile 1"\Default && ECHO COMPLETED: Data Deleted || ECHO ERROR: Cannot Delete Data
ECHO:
ECHO:
ECHO Deleting Cache . . . 
ECHO ^|
RMDIR /s chrome-win\AppData\"User Data"\"Profile 1"\Cache && ECHO COMPLETED: Cache Deleted || ECHO ERROR: Cannot Delete Cache
ECHO:
ECHO:
ECHO Deleting Local State . . . 
ECHO ^|
DEL chrome-win\AppData\"User Data"\"Profile 1"\"Local State" && ECHO COMPLETED: Local State Deleted || ECHO ERROR: Cannot Delete Local State
ECHO:
ECHO:
ECHO:
@PAUSE