var express = require("express");

const PORT = 8080;

const randomTime = () => {
	const MIN = 1;
	const MAX = 100;
	return Math.random()*(0, MAX-MIN) + MIN;
}

const randomDate = () => {
	const MIN = 1;
	const MAX = 32;
	return Math.random()*(0, MAX-MIN) + MIN;
}

class Response
{
	constructor(version, data, errors)
	{
		this.version = version;
		this.data = data;
		this.errors = errors;
	}
}

class Data
{
	constructor(columns, rows)
	{
		this.columns = columns;
		this.rows = rows;
	}
}

class Errors
{
	constructor(hasErrors, errorMessage)
	{
		this.hasErrors = hasErrors;
		this.errorMessage = errorMessage;
	}
}

const columns = [{name: "TimeToOpenInSeconds", dataType: "DateTime"}, 
			   {name: "CreatedDate", dataType: "DateTime"}];
var errors = new Errors(false, "");
const version = 1.0;

function getResult()
{
	var rows = [];
	for(var i=0; i<10; ++i)
	{
		rows.push([randomTime().toFixed(3), Math.floor(randomDate())]);
	}

	return new Response(version, new Data(columns, rows), errors);
}

const app = express();

app.use(function(req, res, next) {
	console.log(req.method);
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
	next();
}).use(express.json());
 
app.get('/', (req, res) => {
	var authHeader = req.headers["authorization"];
	var accessToken = authHeader.match(/\s.*/);
	console.log(Date());
	console.log(accessToken + "\n");

	if(accessToken == null)
	{
		res.status(401);
		return res.send();
	}
  	return res.send(getResult());
});

app.post('/', (req, res) => {
	var authHeader = req.headers["authorization"];
	var accessToken = authHeader.match(/\s.*/)[0].trim();
	var query = req.body.query;

	console.log(Date());
	console.log(query);
	console.log(accessToken + "\n");

	if(accessToken == null)
	{
		res.status(401);
		return res.send();
	}
  	return res.send(getResult());
});
 
app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}!`),
);