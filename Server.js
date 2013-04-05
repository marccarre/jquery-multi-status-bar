// To run the below server:
// - 1) Install Node.js
// - 2) Run: node Server.js
// - 3) Open http://127.0.0.1:1337/ in your favourite browser, or run: curl -is http://localhost:1337/ -H 'accept: application/json'
// - 4) Start the demo

var http = require('http');
var url = require('url');

var state = {NEW: 17, IN_PROGRESS: 0, FINISHED: 0};
var count = 0;
function updateStateAndSerializeToJson() {
    if (state.NEW > 0) { --state.NEW; ++state.IN_PROGRESS };
    if ((state.NEW < 5) && (state.IN_PROGRESS > 0)) { --state.IN_PROGRESS; ++state.FINISHED };
    if ((state.NEW == 0) && (state.IN_PROGRESS == 0)) { if (count == 5) { state = {NEW: 17, IN_PROGRESS: 0, FINISHED: 0}; count = 0; }; ++count; };
    return JSON.stringify({"NEW": state.NEW, "IN PROGRESS": state.IN_PROGRESS, "FINISHED": state.FINISHED});
};

http.createServer(function (req, res) {
    var query = url.parse(req.url, true).query;
    console.log('Request: ' + JSON.stringify(query));
    var body = updateStateAndSerializeToJson();
    console.log('Response: ' + body);

    res.writeHead(200, {'Content-Type': 'application/json'});
    if (query.callback !== undefined) // Response as JSONP
        res.end(query.callback + '(\'' + body + '\');');
    else // Response as JSON
        res.end(body);
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');