# myapp

npm init
npm install express --save
npm install express-generator -g

create express project

express myapp --no-view

cd helloworld

#install dependencies
npm install

Enable server restart on file changes
npm install --save-dev nodemon

# Run the myapp on Windows
SET DEBUG=myapp:* & npm start

#start on file changes
SET DEBUG=myapp:* & npm run devstart

# Run myapp on Linux/macOS
DEBUG=myapp:* npm start
DEBUG=myapp:* npm start

--------------------
cookie-parser: Used to parse the cookie header and populate req.cookies (essentially provides a convenient method for accessing cookie information).
debug: A tiny node debugging utility modelled after node core's debugging technique.
morgan: An HTTP request logger middleware for node.
---------------------

BD
npm install mongoose

------------------
start -> C:\Archivos de programa\MongoDB\Server\4.0\bin\mongod.exe --dbpath="c:\data\db"

conect -> "C:\Program Files\MongoDB\Server\4.0\bin\mongo.exe"

------------------
JSON Formatter
