var express = require('express')
var app = new express();
var port = 3088


var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// users rest endpoints
var usersStore = [
    { id: 1, name: 'matt', email: 'matt@river.red', gender: 'male', membershipType: 'bronze' },
    { id: 2, name: 'joe', email: 'joe.boggs@test.com', gender: 'male', membershipType: 'gold' },
    { id: 3, name: 'kerrigan', email: 'kerrigan@starcraft.com', gender: 'female', membershipType: 'silver' },
]
var nextUserId = usersStore.length + 1;


app.get('/users', function(req, res) {
    let filter = (req.query.filter || "").trim();
    let membershipFilter = (req.query.membershipType || "").trim().toLowerCase();
    
    let output = usersStore;
    if(filter){
        output = output.filter(x => x.name.toLowerCase().includes(filter.toLowerCase()));
    }

    if(membershipFilter){
        output = output.filter(x => x.membershipType == membershipFilter);
    }

    var total = output.length;
    var pageNumber = req.query.pageNum || 1;
    var pageSize = req.query.pageSize || 10;
    var skip = (pageNumber - 1) * pageSize;
    output = output.slice(skip, skip + pageSize);

    res.json({
        results: output,
        totalResults: total
    })
})


app.post('/users', jsonParser, function(req, res){
    const user = req.body;
    if(!user)
        return res.sendStatus(400)

    user.id = nextUserId
    usersStore.push(user);
    nextUserId = nextUserId + 1;

    return res.sendStatus(200);
})

app.put('/users/:id', jsonParser, function(req,res){
    const user = req.body
    const existingIndex = usersStore.findIndex(x => x.id == req.params.id);

    if(!user || existingIndex == -1 || !req.params.id)
        return res.sendStatus(400);

    user.id = req.params.id;
    usersStore[existingIndex] = user;

    return res.sendStatus(200);
})

app.delete('/users/:id', jsonParser, function(req,res){
    const user = req.body;
    const existingIndex = usersStore.findIndex(x => x.id == Number.parseInt(req.params.id));

    if(!user || existingIndex == -1 || !req.params.id)
        return res.sendStatus(400);

        usersStore.splice(existingIndex, 1);
    return res.sendStatus(200);
})




var eventsStore = [
    { id: 1, title: 'Test', description: 'This is a test', },
];
var nextEventId = eventsStore.length + 1;

app.get('/events', function(req, res) {
    let filter = (req.query.filter || "").trim();
    
    let output = eventsStore;
    if(filter){
        output = output.filter(x => x.title.toLowerCase().includes(filter.toLowerCase()) || x.description.toLowerCase().includes(filter.toLowerCase()));
    }

    var total = output.length;
    var pageNumber = req.query.pageNum || 1;
    var pageSize = req.query.pageSize || 10;
    var skip = (pageNumber - 1) * pageSize;
    output = output.slice(skip, skip + pageSize);

    res.json({
        results: output,
        totalResults: total
    })
})

app.post('/events', jsonParser, function(req, res){
    const eventData = req.body;
    if(!eventData)
        return res.sendStatus(400)

        eventData.id = nextUserId
    eventsStore.push(eventData);
    nextEventId = nextEventId + 1;

    return res.sendStatus(200);
})

app.put('/events/:id', jsonParser, function(req,res){
    const eventData = req.body
    const existingIndex = eventsStore.findIndex(x => x.id == req.params.id);

    if(!eventData || existingIndex == -1 || !req.params.id)
        return res.sendStatus(400);

    eventData.id = req.params.id;
    eventsStore[existingIndex] = eventData;

    return res.sendStatus(200);
})

app.delete('/events/:id', jsonParser, function(req,res){
    const eventData = req.body;
    const existingIndex = eventsStore.findIndex(x => x.id == Number.parseInt(req.params.id));

    if(!eventData || existingIndex == -1 || !req.params.id)
        return res.sendStatus(400);

    eventsStore.splice(existingIndex, 1);
    return res.sendStatus(200);
})


app.listen(port, () => console.log('Api server running on port ' + port))