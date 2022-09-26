@REM this fire is for local linking of typed-data-parser

@echo off
echo Please enter project path to link:
goto setProjectPath

:setProjectPath:
	set /p projectPath=Project Path:
	if "%projectPath%" == "" goto setProjectPath

call npm link
call cd %projectPath%
call npm link typed-data-parser
pause