@ECHO off
ECHO Building Python App
ECHO . . . . . . . . . . . . .
ECHO: 
@REM Change the below line with your python address or alias
C:/Users/User/AppData/Local/Programs/Python/Python310/python.exe -m eel main.py App\web --onefile
ECHO:
ECHO:
IF EXIST main.exe ( DEL main.exe ); 
IF EXIST dist\main.exe ( COPY dist\main.exe . ) ELSE ( ECHO ERROR: File NOT FOUND )
ECHO:
ECHO . . . . . . . . . . . . .
IF EXIST main.exe ( ECHO Building succesful and executable copied to main folder)
ECHO:
ECHO:
@PAUSE