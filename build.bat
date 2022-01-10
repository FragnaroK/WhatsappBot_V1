@ECHO off
ECHO Building Python App
ECHO . . . . . . . . . . . . . 
C:/Users/User/AppData/Local/Microsoft/WindowsApps/python3.9.exe -m eel main.py UI --onefile 
IF EXIST main.exe (DEL main.exe); 
IF EXIST dist\main.exe (COPY dist\main.exe . ) ELSE (ECHO [!] Error, no se encontro archivo compilado)
ECHO . . . . . . . . . . . . .
IF EXIST main.exe (ECHO [+] Building succesful and executable copied to main folder)