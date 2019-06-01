/*******************************************************************************
 * Instructions:
 * - 1) Install Node.js
 * - 2) Install all dependencies by runnning: npm install
 * - 3) Start the server by running: node server.js
 * - 4) Open http://127.0.0.1:1337/ in your favourite browser, or run: curl -is http://localhost:1337/ -H 'accept: application/json'
 * - 5) Start the jQuery demo page
 ******************************************************************************/

var express = require('express');
var url = require('url');

var state = {NEW: 17, IN_PROGRESS: 0, FINISHED: 0};
var count = 0;
function updateStateAndSerializeToJson() {
    if (state.NEW > 0) { --state.NEW; ++state.IN_PROGRESS };
    if ((state.NEW < 5) && (state.IN_PROGRESS > 0)) { --state.IN_PROGRESS; ++state.FINISHED };
    if ((state.NEW == 0) && (state.IN_PROGRESS == 0)) { if (count == 5) { state = {NEW: 17, IN_PROGRESS: 0, FINISHED: 0}; count = 0; }; ++count; };
    return JSON.stringify({"NEW": state.NEW, "IN PROGRESS": state.IN_PROGRESS, "FINISHED": state.FINISHED});
};

function getResponse(query) {
	var body = updateStateAndSerializeToJson();
    if (query.callback !== undefined) {
		return query.callback + '(\'' + body + '\');'; // JSONP
	} else {
		return body; // Pure JSON
	}
}

var app = express();
app.get('/', function(request, response) {
    var query = url.parse(request.url, true).query;
    console.log('Request: ' + JSON.stringify(query));

	var body = getResponse(query);
    console.log('Response: ' + body);

    response.writeHead(200, {'Content-Type': 'application/json'});
	response.end(body);
});

var port = process.env.PORT || 1337;
app.listen(port, function() {
  console.log("Listening on port " + port);
});