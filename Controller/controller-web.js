var firebase = require('firebase');
var request = require('request');
var fetch = require('node-fetch');
var title, date, desp, pre;
var task;
//var ref = new firebase("https://Task-list.firebaseio.com");

var firebaseConfig = {
    apiKey: "AIzaSyB8R8it8Ri7cQX5gPst0Uc9IXhtKLhnFUg",
    authDomain: "task-list-575a9.firebaseapp.com",
    databaseURL: "https://task-list-575a9.firebaseio.com",
    projectId: "task-list-575a9",
    storageBucket: "task-list-575a9.appspot.com",
    messagingSenderId: "904054232931",
    appId: "1:904054232931:web:90681879b4325aecaba556",
    measurementId: "G-BRGVRVTW6H"
};
// Initialize Firebase
var id = 1;
firebase.initializeApp(firebaseConfig);


module.exports = function(app, parser) {

    app.get('/', function(req, res) {

        res.render('pages/base');

    });

    app.post('/', parser, function(req, res) {

        console.log(req.body.Title);
        console.log(req.body.description);
        firebase.database().ref('task' + id).set({
            Title: req.body.Title,
            Description: req.body.description,
            Date: req.body.date,
            Priority: req.body.prior
        });
        id++;
        res.render('pages/base');
    });

    app.get('/edit', function(req, res) {

        res.render('pages/edit');
    });
    app.post('/ok', parser, function(req, res) {
        console.log(req.body);
        task = req.body.task;
        //  https: //task-list-575a9.firebaseio.com/
        var url = 'https://task-list-575a9.firebaseio.com/' + req.body.task + '.json';
        x = api_call(url);
        res.render('pages/ok')
    })
    app.get('/update', function(req, res) {

        console.log(title);
        res.render('pages/update', { task: task, title: title, desp: desp, date: date, prior: pre });
    });
    app.post('/updated', parser, function(req, res) {

        firebase.database().ref(task).set({
            Title: req.body.Title,
            Description: req.body.description,
            Date: req.body.date,
            Priority: req.body.prior
        });
        res.redirect('/');
    });
    app.get('/delete', function(req, res) {
        res.render('pages/delete');
    });
    app.post('/delete', parser, function(req, res) {
        console.log(req.body);

        var out = req.body.task;
        console.log(out);
        var adaRef = firebase.database().ref(out);
        adaRef.remove()
            .then(function() {
                console.log("Remove succeeded.")
            })
            .catch(function(error) {
                console.log("Remove failed: " + error.message)
            });
        //ref.child(req.body.task).remove();
        res.redirect('/');
    });
    app.get('/view', function(req, res) {
        res.redirect('https://task-list-575a9.firebaseio.com/.json');
    })

    api_call = function(url) {
        let settings = { method: "Get" };


        fetch(url, settings)
            .then(res => res.json())
            .then((json) => {
                // do something with JSON
                console.log(json);
                title = json.Title;
                // console.log(title);
                pre = json.Priority;
                date = json.Date;
                desp = json.Description;

                // res.render('/pages/update')
            });

    }

}