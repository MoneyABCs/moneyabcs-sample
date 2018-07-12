//  OpenShift sample Node application
var express = require('express'),
    app = express(),
    morgan = require('morgan');


////////////////////////////////////

var fs = require('fs');
var readline = require('readline');
var googleAuth = require('google-auth-library');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongodb = require('mongodb');
var passport = require('passport');
var flash = require('connect-flash');
var engines = require('consolidate');
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
var configDB = require('./config/database.js');
var open = require('open');


////////////////////////////

Object.assign = require('object-assign')

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL || 'mongodb://localhost:27017/moneyabcsdb',
    mongoURLLabel = "";
//|| 'mongodb://flpf:emmanuel2015@localhost:27017/moneyabcsdb'
//|| 'mongodb://localhost:27017/moneyabcsdb'
if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
    var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
        mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
        mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
        mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
        mongoPassword = process.env[mongoServiceName + '_PASSWORD']
    mongoUser = process.env[mongoServiceName + '_USER'];
    if (mongoHost && mongoPort && mongoDatabase) {
        mongoURLLabel = mongoURL = 'mongodb://';
        if (mongoUser && mongoPassword) {
            mongoURL += mongoUser + ':' + mongoPassword + '@';
        }
        // Provide UI label that excludes user id and pw
        mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
        mongoURL += mongoHost + ':' + mongoPort + '/' + mongoDatabase;

    }
}
//mongoURL = "mongodb://flpf:emmanuel2015@172.30.131.189:27017/moneyabcsdb";
//mongoURL = "mongodb://flpf:emmanuel2015@mongodb-nodejsapp.b9ad.pro-us-east-1.openshiftapps.com:27017/moneyabcsdb";
var db = null,
    dbDetails = new Object();

var initDb = function (callback) {
    if (mongoURL == null) return;

    var mongodb = require('mongodb');
    if (mongodb == null) return;
    mongoose.connect(mongoURL);
};
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());
app.get('/', function (req, res) {
    // try to initialize the db on every request if it's not already
    // initialized.
    if (!db) {
        initDb(function (err) {
        });
    }
    if (db) {
        var col = db.collection('counts');
        // Create a document with request IP and current time of request
        col.insert({ip: req.ip, date: Date.now()});
        col.count(function (err, count) {
            res.render('index.html');
        });
    } else {
        res.render('index.html');
    }
});

app.get('/pagecount', function (req, res) {
    // try to initialize the db on every request if it's not already
    // initialized.
    if (!db) {
        initDb(function (err) {
        });
    }
    if (db) {
        db.collection('counts').count(function (err, count) {
            res.send('{ pageCount: ' + count + '}');
        });
    } else {
        res.send('{ pageCount: -1 }');
    }
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var ArticleSchema = new mongoose.Schema({
    title: String,
    iframeLink: String,
    date: String,
    snippet: String,
    imgUrl: String,
    displayLink: String, //domain
    rank: Number,
    globalRank: Number,
    index: "",
    indexTopic: "",
    topicRank: Number,
    daysInLead: Number
}, {collection: 'articleFeaturedRes'}); // articleFeaturedRes
var ArticleFeaturedResult = mongoose.model('ArticleFeaturedResult', ArticleSchema);

var ArticleSchemaFake = new mongoose.Schema({
    title: String,
    iframeLink: String,
    date: String,
    snippet: String,
    imgUrl: String,
    displayLink: String,
    rank: Number,
    globalRank: Number,
    index: ""

}, {collection: 'articleResFake'}); //override default collection name as web
var ArticleFakeResult = mongoose.model('ArticleFakeResult', ArticleSchemaFake);


var donationsFormSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    corporate: Boolean,
    CRAGift: Boolean,
    individual: Boolean,
    Anonymous: Boolean,
    comment: String,
    test_field: String,
}, {collection: 'donationsForm'}); // articleFeaturedRes
var donationsFormModel = mongoose.model('donationsFormModel', donationsFormSchema);


//START///////////////PROFILE SECTION//////////////// Saved Article & Saved Resources
var profile2 = new mongoose.Schema({
    emailId: String,
    title: [{}],
    restitle: [{}]

}, {collection: 'profile2'});
var profileRes = mongoose.model('profileRes', profile2);

app.post('/api/profile', function (req, res) {
    console.log("inside post cal");
    console.log(req.body.newObj[0].emailId);
    console.log(req.body.newObj[0].title);

    //Currntly remove and new entry get added
    //EXPECTED: updatewith new title (to do)
    profileRes.find({emailId: req.body.newObj[0].emailId}).remove().exec(function (err, data) {
        var newData = new profileRes({
            emailId: req.body.newObj[0].emailId,
            title: req.body.newObj[0].title
        });
        newData.save();
    });
    /*profileRes.findOne({ emailId:req.body.newObj[0].emailId },function(err,data){
        data.remove();
        var newData = new profileRes({
            emailId:req.body.newObj[0].emailId,
            title:req.body.newObj[0].title
        });
        newData.save();
    });*/

    // data.update({re})
    /*new profileRes.update({emailId : req.body.newObj[0].emailId},
    {
        title:req.body.newObj[0].title
    })*/

});

app.post("/api/updateProfileArticle", function (req, res) {
    console.log(req.body.emailId);
    profileRes.update({"emailId": req.body.emailId}, {
        $push: {title: req.body.articles}
    }, function (err, numberAffected, rawResponse) {
        //handle it
        if (err) {
            console.log("Failed to update Saved Article")
        }
        else {
            console.log("Updated Saved Artcile");
        }
    });
});

app.post("/api/updateProfileResource", function (req, res) {
    console.log(req.body.emailId);
    profileRes.update({"emailId": req.body.emailId}, {
        $push: {restitle: req.body.resources}
    }, function (err, numberAffected, rawResponse) {
        //handle it
        if (err) {
            console.log("Failed to update Saved resource")
        }
        else {
            console.log("Updated Saved resource");
        }
    });
});

app.post("/api/getProfile", function (req, res) {
    var data = profileRes.find({"emailId": req.body.emailId}, function (err, data) {
        res.json(data);
    });
});


app.post("/api/deleteArticleProfile", function (req, res) {
    profileRes.find({"emailId": req.body.emailId}, function (err, data) {
        var ans = data[0];
        for (i in ans.title) {
            if (ans.title[i]._id == req.body.id) {
                ans.title.splice(i, 1)
            }
        }
        ans.save();
        res.json(ans);
    });

});

app.post("/api/deleteResourceProfile", function (req, res) {
    profileRes.find({"emailId": req.body.emailId}, function (err, data) {
        var ans = data[0];
        for (i in ans.restitle) {
            if (ans.restitle[i]._id == req.body.id) {
                ans.restitle.splice(i, 1)
            }
        }
        ans.save();
        res.json(ans);
    });

});
//END///////////////PROFILE SECTION//////////////// Saved Article & Saved Resources

var profile = new mongoose.Schema({
    "local.title": String,
    "local.email": String,
    "local.username": String,
    "local.lastname": String,
    "local.phonenumber": String,
    "local.nameoforganisation": String,
    "local.roleinorganisation": String,
    "local.organization": String,
    "local.nonprofit": String,
    "local.school": String,
    "local.url1": String,
    "local.url2": String,
    "local.address1": String,
    "local.address2": String,
    "local.city": String,
    "local.states": String,
    "local.zipcode": String,
    "local.countries": String

}, {collection: 'users'});
var userProfile = mongoose.model('userProfile', profile);

app.post("/api/getUserProfile", function (req, res) {
    var data = userProfile.find({"local.username": req.body.username}, 'local.title local.nameoforganisation local..organization local.nonprofit local.address1 local.address2 local.city local.states local.zipcode local.countries local.email local.lastname local.username local.phonenumber local.url1 local.url2 local.roleinorganisation local.selectedlayout local.selectedtopics', function (err, prof) {
        res.json(prof[0]);
    });
});

app.post("/api/editUserProfile", function (req, res) {



    userProfile.update({"local.username": req.body.username},
        {
            $set: {
                "local.title": req.body.title,
                "local.organization": req.body.typeoforganisation,
                "local.nameoforganisation": req.body.nameoforganisation,
                "local.roleinorganisation": req.body.roleinorganisation,
                "local.url1": req.body.url1,
                "local.url2": req.body.url2,
                "local.address1": req.body.address1,
                "local.address2": req.body.address2,
                "local.city": req.body.city,
                "local.states": req.body.states,
                "local.zipcode": req.body.zipcode,
                "local.countries": req.body.countries,
                "local.lastname": req.body.lastname,
                "local.username": req.body.username,
                "local.phonenumber": req.body.phonenumber
            }
        },
        function (err, numberAffected, rawResponse) {
            //handle it
            if (err) {
                console.log("Failed to update Saved resource")
                // res.json("Failure");
                res.end();
            }
            else {
                console.log("Updated Saved resource");
                // res.json("success");
                res.end();
            }
        }
    )

});

app.get("/article/featured", function (req, res) {
    ArticleFeaturedResult.find(function (err, data) {
        res.json(data);
    });
});

app.get("/article/loadMore", function (req, res) {
    ArticleFeaturedResult.find(function (err, data) {
        res.json(data);
    });
});
app.get("/clearFile", function (req, res) {
    var LocalStorage = require('node-localstorage').LocalStorage,
        localStorage = new LocalStorage('./public/js/');
    localStorage.setItem('uname.js', "");
    /* global.localStorage = require('localStorage')
    var store = require('store')
    store.set('uname', '');
    var a = store.get('uname');
     */
    res.json("cleared")
})

app.get("/localVal", function (req, res) {
    global.localStorage = require('localStorage')
    var store = require('store')
    var a = store.get('uname');

    res.json(a)
})


app.post('/addDonation', function (req, res) {
    //send mail
    // create a todo, information comes from AJAX request from Angular
    donationsFormModel.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            corporate: req.body.corporate,
            CRAGift: req.body.CRAGift,
            individual: req.body.individual,
            Anonymous: req.body.Anonymous,
            comment: req.body.comment,
            test_field: req.body.test_field
        },
        function (err, donation) {
            if (err) {
                res.send(err);
            }
            else {
                var result = {
                    "data": donation,
                    "status": 200
                }
                res.json(donation);
            }
        }
    );
});


app.get("/process", function (req, res) {
    res.json(process.env);
});
/**end getting article ****/
var ArticleSearchFake = new mongoose.Schema({
    _id: {'$oid': ''},
    title: String,
    iframeLink: String,
    date: String,
    snippet: String,
    imgUrl: String,
    displayLink: String,
    topicRank: String, //found using fetchcomponent
    topicName: String,
    topicArrIndex: String,
    '__v': ''

}, {collection: 'articleSearchRes'}); //override default collection name as web
var ArticleSearchResult = mongoose.model('ArticleSearchResult', ArticleSearchFake);

var searchSampleBackup = function (searchKeyword, res) {
    var srcKey = searchKeyword;
    searchKeyword = searchKeyword.trim();//.replace(/ /g,"%20");
    var arr = searchKeyword.split(" ");
    var finalData = [];
    var i = 0;
    var myVar = setInterval(function () {
        if (i < arr.length) {
            var data = ArticleSearchResult.find({"title": new RegExp('^' + arr[i])}, function (err, data) {
                if (data.length > 0) {
                    for (var l = 0; l < data.length; l++) {
                        finalData.push(data[l]);
                    }
                }
                i++;
            });
        } else {
            srcKey = srcKey.trim().replace(/ /g, "%20");
            var data = ArticleSearchResult.find({"topicName": new RegExp('^' + srcKey)}, function (err, data) {
                if (data.length > 0) {
                    for (var l = 0; l < data.length; l++) {
                        finalData.push(data[l]);
                    }
                }
                clearInterval(myVar);
                if (finalData.length > 0) {
                    var result = {
                        "data": finalData,
                        "status": 500
                    }
                } else {
                    var result = {
                        "data": [],
                        "status": 404,
                        "errMsg": "No search results found."
                    }
                }
                clearInterval(myVar);
                res.json(result);
            });

        }
    }, 50);

}

var searchSample = function (searchKeyword, res) {
    var srcKey = searchKeyword;
    searchKeyword = searchKeyword.trim();//.replace(/ /g,"%20");
    var arr = searchKeyword.split(" ");
    var finalData = [];
    var i = 0;

    var myVar = setInterval(function () {
        if (i < arr.length) {
            var data = ArticleFeaturedResult.find({"title": new RegExp('^.* ' + arr[i] + '.*$')}, function (err, data) {
                if (data.length > 0) {
                    for (var l = 0; l < data.length; l++) {
                        finalData.push(data[l]);
                    }
                }
                var data = ArticleFeaturedResult.find({"topicName": new RegExp('^.* ' + arr[i] + '.*$')}, function (err, data) {
                    if (data.length > 0) {
                        for (var l = 0; l < data.length; l++) {
                            johnRemoved = finalData.filter(function (el) {
                                return el.title !== data[l].title;
                            });
                            johnRemoved.push(data[l]);
                            finalData = johnRemoved;
                        }
                    }
                });
            });
            i++;
        } else {
            var data = ArticleFeaturedResult.find({"title": new RegExp('^.* ' + searchKeyword + '.*$')}, function (err, data) {
                if (data.length > 0) {
                    for (var l = 0; l < data.length; l++) {
                        johnRemoved = finalData.filter(function (el) {
                            return el.title !== data[l].title;
                        });
                        johnRemoved.push(data[l]);
                        finalData = johnRemoved;
                    }
                }
                srcKey = srcKey.trim().replace(/ /g, "%20");
                var data = ArticleFeaturedResult.find({"topicName": new RegExp('^.* ' + srcKey + '.*$')}, function (err, data) {
                    if (data.length > 0) {
                        for (var l = 0; l < data.length; l++) {
                            johnRemoved = finalData.filter(function (el) {
                                return el.title !== data[l].title;
                            });
                            johnRemoved.push(data[l]);
                            finalData = johnRemoved;
                        }
                    }
                    clearInterval(myVar);
                    if (finalData.length > 0) {
                        var result = {
                            "data": finalData,
                            "status": 500
                        }
                    } else {
                        var result = {
                            "data": [],
                            "status": 404,
                            "errMsg": "No search results found."
                        }
                    }
                    clearInterval(myVar);
                    res.json(result);
                });
            });
        }
    }, 50);

}

var searchArticles = function (searchkeyword, res) {
    var srcKey = searchkeyword;
    searchKeyword = searchkeyword.trim();//.replace(/ /g,"%20");
    var arr = searchKeyword.split(" ");
    var finalData = [];
    var i = 0;
    var data = ArticleFeaturedResult.find({"$or": [{"title": new RegExp('^.* ' + searchKeyword + '.*$')}, {"indexTopic": new RegExp('^.* ' + searchKeyword + '.*$')}]}, function (err, data) {
        if (data.length > 0) {
            var result = {
                "data": data,
                "status": 500
            }
        } else {
            var result = {
                "data": [],
                "status": 404,
                "errMsg": "No search results found."
            }
        }
        res.json(result);
    });
}


var searchResources = function (searchKeyword, filtertype, res) {
    var srcKey = searchKeyword;
    searchKeyword = searchKeyword.trim();//.replace(/ /g,"%20");
    var arr = searchKeyword.split(" ");
    var typeHashMap = {
        "articles": "images/article.png",
        "presentations": "images/presentation.png",
        "videos": "images/video.png"
    };
    var i = 0;
    if ((filtertype == undefined) || (filtertype == "")) {
        var data = ResourcesListResult.find({"category": new RegExp('^.* ' + searchKeyword + '.*$')}, function (err, data) {
            if (data.length > 0) {
                var result = {
                    "data": data,
                    "status": 500
                }
            }
            else {
                var result = {
                    "data": [],
                    "status": 404,
                    "errMsg": "No search results found."
                }
            }
            res.json(result);
        });
    }
    else {
        var data = ResourcesListResult.find({
            "category": new RegExp('^.* ' + searchKeyword + '.*$'),
            "type": typeHashMap[filtertype]
        }, function (err, data) {
            if (data.length > 0) {
                var result = {
                    "data": data,
                    "status": 500
                }
            }
            else {
                var result = {
                    "data": [],
                    "status": 404,
                    "errMsg": "No search results found."
                }
            }
            res.json(result);
        });
    }
}

app.post("/searchArticle", function (req, res) {
    searchArticle(req.body.name, res);
});

var searchChosenArticles = function (searchKeyword, res) {
    var arr = searchKeyword.split(",");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].trim();
        arr[i] = arr[i].replace(/ /g, "%20");
    }
    var data = ArticleSearchResult.find({topicName: {$in: arr}}, function (err, data) {
        res.json(data);
    });
}

app.post("/searchSample", function (req, res) {
    searchSample(req.body.name, res);

});

app.post("/searchArticles", function (req, res) {
    searchArticles(req.body.name, res);
});

app.post("/searchResources", function (req, res) {
    searchResources(req.body.name, req.body.filterType, res);
    //res.json("heeeeeeeeeeeeee");
});

app.post("/article/chosenTopics", function (req, res) {
    searchChosenArticles(req.body.articleTopics, res);
});

var ResourcesList = new mongoose.Schema({
    _id: {'$oid': ''},
    topic: String,
    type_material: String,
    name: String,
    thumbnailLink: String,
    description: String,
    webUrl: String,
    embedUrl: String,
    category: String,
    type: String,
    language: String,
    age: String,
    age_category: String,
    school: String,
    createdAt: Date,
    '__v': ''

}, {timestamps: true, collection: 'resourcesList'});
var ResourcesListResult = mongoose.model('ResourcesListResult', ResourcesList);


/** resourcesList **/
app.get('/resourcesList', function (req, res) {
    ResourcesListResult.find(function (err, todos) {
        if (err)
            res.send(err);

        res.json(todos);
    });
});

/** resourcesList **/


/** Processing comment **/

var Todo = mongoose.model('Todo', {
    name: String,
    email: String,
    text: String,
    timestamp: {type: Date, default: Date.now}
});
// routes ======================================================================

// api ---------------------------------------------------------------------
// get all todos
app.get('/api/todos', function (req, res) {

    // use mongoose to get all todos in the database
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err);

        res.json(todos); // return all todos in JSON format
    });
});

// create todo and send back all todos after creation
app.post('/api/todos', function (req, res) {

    // create a todo, information comes from AJAX request from Angular
    Todo.create({
        name: req.body.name,
        email: req.body.email,
        text: req.body.text,
        timestamp: new Date(),
        done: false
    }, function (err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function (err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });

});

/** End Processing comment **/
var Finance = mongoose.model('Finance', {
    name: String,
    email: String,
    text: String,
    timestamp: {type: Date, default: Date.now}
});
app.post('/api/finance', function (req, res) {

    // create a todo, information comes from AJAX request from Angular
    Finance.create({
        name: req.body.name,
        email: req.body.email,
        text: req.body.text,
        timestamp: new Date(),
        done: false
    }, function (err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function (err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });

});


require('./config/passport.js')(passport);

app.use(cookieParser());
app.use(session({
    secret: 'anystringoftext',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.set('view engine', 'ejs');
require('./app/routes.js')(app, passport);

//mailer

var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        XOAuth2: {
            user: "moneyabcsorg@gmail.com", //"shilpa.chander.99@gmail.com", // Your gmail address.
            // Not @developer.gserviceaccount.com
            clientId: "360054163394-5h68g7au3m6brbnbivj8ku24mhb44gs6.apps.googleusercontent.com", //"367932091928-ul3am3l02ui4qgjm6qn85ivahm38qosn.apps.googleusercontent.com",
            clientSecret: "T5EXEJ2otKsSrP_zOYCP3HlD", //"8P5yAO6BzvjNSYQv_nHpdcKV",
            refreshToken: "1/qVA9ImbETMCB2x1TVKb0JVVW_lOqhy4YwKRdqfhR0to" //"1/-3GRc5EoeWWmd5w4FJmYjviZH9TmH0z8yrOEPUwYA71VUgYXBMzP8hrsXVOGMPuO"
        }
    }
});


app.post('/send', function (req, res) {
    var emailArticle = req.body.emailArticle
    var mailOptions = {
        from: "moneyabcsorg@gmail.com",
        to: req.body.receiver,
        subject: "Hi, Your friend" + req.body.sender + " has sent you an intersting article from MoneyABCs. ",
        generateTextFromHTML: true,
        html: "<html xmlns='http://www.w3.org/1999/xhtml'> <head> <title>Internal_email-29</title> <meta http-equiv='Content-Type' content='text/html; charset=utf-8' /> <meta name='viewport' content='width=device-width, initial-scale=1.0' /> <style type='text/css'> * { -ms-text-size-adjust:100%; -webkit-text-size-adjust:none; -webkit-text-resize:100%; text-resize:100%; } a{ outline:none; color:#40aceb; text-decoration:underline; } a:hover{text-decoration:none !important;} .nav a:hover{text-decoration:underline !important;} .title a:hover{text-decoration:underline !important;} .title-2 a:hover{text-decoration:underline !important;} .btn:hover{opacity:0.8;} .btn a:hover{text-decoration:none !important;} .btn{ -webkit-transition:all 0.3s ease; -moz-transition:all 0.3s ease; -ms-transition:all 0.3s ease; transition:all 0.3s ease; } table td {border-collapse: collapse !important;} .ExternalClass, .ExternalClass a, .ExternalClass span, .ExternalClass b, .ExternalClass br, .ExternalClass p, .ExternalClass div{line-height:inherit;} @media only screen and (max-width:500px) { table[class='flexible']{width:100% !important;} table[class='center']{ float:none !important; margin:0 auto !important; } *[class='hide']{ display:none !important; width:0 !important; height:0 !important; padding:0 !important; font-size:0 !important; line-height:0 !important; } td[class='img-flex'] img{ width:100% !important; height:auto !important; } td[class='aligncenter']{text-align:center !important;} th[class='flex']{ display:block !important; width:100% !important; } td[class='wrapper']{padding:0 !important;} td[class='holder']{padding:30px 15px 20px !important;} td[class='nav']{ padding:20px 0 0 !important; text-align:center !important; } td[class='h-auto']{height:auto !important;} td[class='description']{padding:30px 20px !important;} td[class='i-120'] img{ width:120px !important; height:auto !important; } td[class='footer']{padding:5px 20px 20px !important;} td[class='footer'] td[class='aligncenter']{ line-height:25px !important; padding:20px 0 0 !important; } tr[class='table-holder']{ display:table !important; width:100% !important; } th[class='thead']{display:table-header-group !important; width:100% !important;} th[class='tfoot']{display:table-footer-group !important; width:100% !important;} } </style> </head>" +
        " <body style='margin:0; padding:0;' bgcolor='#eaeced'> <table style='min-width:320px;' width='100%' cellspacing='0' cellpadding='0' bgcolor='#eaeced'> <!-- fix for gmail --> <tr> <td class='hide'> <table width='600' cellpadding='0' cellspacing='0' style='width:600px !important;'> <tr> <td style='min-width:600px; font-size:0; line-height:0;'> </td> </tr> </table> </td> </tr> <tr> <td class='wrapper' style='padding:0 10px;'> <!-- module 1 --> <table data-module='module-1' data-thumb='thumbnails/01.png' width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-module' bgcolor='#eaeced'> <table class='flexible' width='600' align='center' style='margin:0 auto;' cellpadding='0' cellspacing='0'> <tr> <td style='padding:29px 0 30px;'> <table width='100%' cellpadding='0' cellspacing='0'> <tr> <th class='flex' width='113' align='left' style='padding:0;'> <table class='center' cellpadding='0' cellspacing='0'> <tr> <td style='line-height:0;'> <a target='_blank' style='text-decoration:none;' href='https://www.psd2html.com/'>MoneyABCs</a> </td> </tr> </table> </th> <th class='flex' align='left' style='padding:0;'> <table width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-color='text' data-size='size navigation' data-min='10' data-max='22' data-link-style='text-decoration:none; color:#888;' class='nav' align='right' style='font:bold 13px/15px Arial, Helvetica, sans-serif; color:#888;'> </td> </tr> </table> </th> </tr> </table> </td> </tr> </table> </td> </tr> </table> <!-- module 2 --> <table data-module='module-2' data-thumb='thumbnails/02.png' width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-module' bgcolor='#eaeced'> <table class='flexible' width='600' align='center' style='margin:0 auto;' cellpadding='0' cellspacing='0'> <tr> <td class='img-flex'>" +
        "<a href=http://www.moneyabcs.org/loadEmail/" + emailArticle.title.replace(/ /g, "%20") + " target='_blank'>" +
        "<img src='" + emailArticle.imgUrl + "' style='vertical-align:top;' width='600' height='306' alt='' /></a></td> </tr> <tr> <td data-bgcolor='bg-block' class='holder' style='padding:58px 60px 52px;' bgcolor='#f9f9f9'> <table width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-color='title' data-size='size title' data-min='25' data-max='45' data-link-color='link title color' data-link-style='text-decoration:none; color:#292c34;' class='title' align='center' style='font:35px/38px Arial, Helvetica, sans-serif; color:#292c34; padding:0 0 24px;'>" +
        emailArticle.title + "</td> </tr> <tr> <td data-color='text' data-size='size text' data-min='10' data-max='26' data-link-color='link text color' data-link-style='font-weight:bold; text-decoration:underline; color:#40aceb;' align='center' style='font:bold 16px/25px Arial, Helvetica, sans-serif; color:#888; padding:0 0 23px;'>" +
        emailArticle.snippet + "</td> </tr> <tr> <td style='padding:0 0 20px;'> <table width='134' align='center' style='margin:0 auto;' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-button' data-size='size button' data-min='10' data-max='16' class='btn' align='center' style='font:12px/14px Arial, Helvetica, sans-serif; color:#f8f9fb; text-transform:uppercase; mso-padding-alt:12px 10px 10px; border-radius:2px;' bgcolor='#7bb84f'> <a target='_blank' style='text-decoration:none; color:#f8f9fb; display:block; padding:12px 10px 10px;' href='#'>Learn More</a> </td> </tr> </table> </td> </tr> </table> </td> </tr> <tr><td height='28'></td></tr> </table> </td> </tr> </table> <!-- module 6 --> <table data-module='module-6' data-thumb='thumbnails/06.png' width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-module' bgcolor='#eaeced'> <table class='flexible' width='600' align='center' style='margin:0 auto;' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-block' class='holder' style='padding:64px 60px 50px;' bgcolor='#f9f9f9'> <table width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-color='title' data-size='size title' data-min='20' data-max='40' data-link-color='link title color' data-link-style='text-decoration:none; color:#292c34;' class='title' align='center' style='font:30px/33px Arial, Helvetica, sans-serif; color:#292c34; padding:0 0 23px;'> Be a part of our Team </td> </tr> <tr> <td data-color='text' data-size='size text' data-min='10' data-max='26' data-link-color='link text color' data-link-style='font-weight:bold; text-decoration:underline; color:#40aceb;' align='center' style='font:16px/29px Arial, Helvetica, sans-serif; color:#888; padding:0 0 21px;'> Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy </td> </tr> <tr> <td style='padding:0 0 20px;'> <table width='232' align='center' style='margin:0 auto;' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-button' data-size='size button' data-min='10' data-max='20' class='btn' align='center' style='font:bold 16px/18px Arial, Helvetica, sans-serif; color:#f9f9f9; text-transform:uppercase; mso-padding-alt:22px 10px; border-radius:3px;' bgcolor='#e02d74'> <a target='_blank' style='text-decoration:none; color:#f9f9f9; display:block; padding:22px 10px;' href='http://www.moneyabcs.org/'>Sign up now on MoneyABCs</a> </td> </tr> </table> </td> </tr> </table> </td> </tr> <tr><td height='28'></td></tr> </table> </td> </tr> </table> <!-- module 7 --> <table data-module='module-7' data-thumb='thumbnails/07.png' width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-module' bgcolor='#eaeced'> <table class='flexible' width='600' align='center' style='margin:0 auto;' cellpadding='0' cellspacing='0'> <tr> <td class='footer' style='padding:0 0 10px;'> <table width='100%' cellpadding='0' cellspacing='0'> <tr class='table-holder'> <th class='tfoot' width='400' align='left' style='vertical-align:top; padding:0;'> <table width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-color='text' data-link-color='link text color' data-link-style='text-decoration:underline; color:#797c82;' class='aligncenter' style='font:12px/16px Arial, Helvetica, sans-serif; color:#797c82; padding:0 0 10px;'> MoneyABCs 2016.   All Rights Reserved. <a target='_blank' style='text-decoration:underline; color:#797c82;' href='sr_unsubscribe'>Unsubscribe.</a> </td> </tr> </table> </th> <th class='thead' width='200' align='left' style='vertical-align:top; padding:0;'> <table class='center' align='right' cellpadding='0' cellspacing='0'> <tr> <td class='btn' valign='top' style='line-height:0; padding:3px 0 0;'> <a target='_blank' style='text-decoration:none;' href='#'><img src='images/ico-facebook.png' border='0' style='font:12px/15px Arial, Helvetica, sans-serif; color:#797c82;' align='left' vspace='0' hspace='0' width='6' height='13' alt='fb' /></a> </td> <td width='20'></td> <td class='btn' valign='top' style='line-height:0; padding:3px 0 0;'> <a target='_blank' style='text-decoration:none;' href='#'><img src='images/ico-twitter.png' border='0' style='font:12px/15px Arial, Helvetica, sans-serif; color:#797c82;' align='left' vspace='0' hspace='0' width='13' height='11' alt='tw' /></a> </td> <td width='19'></td> <td class='btn' valign='top' style='line-height:0; padding:3px 0 0;'> <a target='_blank' style='text-decoration:none;' href='#'><img src='images/ico-google-plus.png' border='0' style='font:12px/15px Arial, Helvetica, sans-serif; color:#797c82;' align='left' vspace='0' hspace='0' width='19' height='15' alt='g+' /></a> </td> <td width='20'></td> <td class='btn' valign='top' style='line-height:0; padding:3px 0 0;'> <a target='_blank' style='text-decoration:none;' href='#'><img src='images/ico-linkedin.png' border='0' style='font:12px/15px Arial, Helvetica, sans-serif; color:#797c82;' align='left' vspace='0' hspace='0' width='13' height='11' alt='in' /></a> </td> </tr> </table> </th> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr> <!-- fix for gmail --> <tr> <td style='line-height:0;'><div style='display:none; white-space:nowrap; font:15px/1px courier;'>                                                                 </div></td> </tr> </table> </body> </html>"

    };

    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log(response);
        }
        smtpTransport.close();
    });
});
//mailer end
//contact mail
app.post('/send1', function (req, res) {
    //var emailArticle = req.body.emailArticle
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    var subject = req.body.subject

    /*var mailOptions={
        from : "moneyabcsorg@gmail.com",
        to : req.body.receiver, //"shilpa.chander.99@gmail.com",
        subject : "Hi, Your friend" + req.body.sender + " has sent you an intersting article from MoneyABCs. ",
        text : "http://www.forbes.com/sites/williampbarrett/2016/04/04/the-best-places-to-retire-in-2016/#51245abf703e",
        html : "<html xmlns='http://www.w3.org/1999/xhtml'> <head> <title>Internal_email-29</title> <meta http-equiv='Content-Type' content='text/html; charset=utf-8' /> <meta name='viewport' content='width=device-width, initial-scale=1.0' /> <style type='text/css'> * { -ms-text-size-adjust:100%; -webkit-text-size-adjust:none; -webkit-text-resize:100%; text-resize:100%; } a{ outline:none; color:#40aceb; text-decoration:underline; } a:hover{text-decoration:none !important;} .nav a:hover{text-decoration:underline !important;} .title a:hover{text-decoration:underline !important;} .title-2 a:hover{text-decoration:underline !important;} .btn:hover{opacity:0.8;} .btn a:hover{text-decoration:none !important;} .btn{ -webkit-transition:all 0.3s ease; -moz-transition:all 0.3s ease; -ms-transition:all 0.3s ease; transition:all 0.3s ease; } table td {border-collapse: collapse !important;} .ExternalClass, .ExternalClass a, .ExternalClass span, .ExternalClass b, .ExternalClass br, .ExternalClass p, .ExternalClass div{line-height:inherit;} @media only screen and (max-width:500px) { table[class='flexible']{width:100% !important;} table[class='center']{ float:none !important; margin:0 auto !important; } *[class='hide']{ display:none !important; width:0 !important; height:0 !important; padding:0 !important; font-size:0 !important; line-height:0 !important; } td[class='img-flex'] img{ width:100% !important; height:auto !important; } td[class='aligncenter']{text-align:center !important;} th[class='flex']{ display:block !important; width:100% !important; } td[class='wrapper']{padding:0 !important;} td[class='holder']{padding:30px 15px 20px !important;} td[class='nav']{ padding:20px 0 0 !important; text-align:center !important; } td[class='h-auto']{height:auto !important;} td[class='description']{padding:30px 20px !important;} td[class='i-120'] img{ width:120px !important; height:auto !important; } td[class='footer']{padding:5px 20px 20px !important;} td[class='footer'] td[class='aligncenter']{ line-height:25px !important; padding:20px 0 0 !important; } tr[class='table-holder']{ display:table !important; width:100% !important; } th[class='thead']{display:table-header-group !important; width:100% !important;} th[class='tfoot']{display:table-footer-group !important; width:100% !important;} } </style> </head>"+
		" <body style='margin:0; padding:0;' bgcolor='#eaeced'> <table style='min-width:320px;' width='100%' cellspacing='0' cellpadding='0' bgcolor='#eaeced'> <!-- fix for gmail --> <tr> <td class='hide'> <table width='600' cellpadding='0' cellspacing='0' style='width:600px !important;'> <tr> <td style='min-width:600px; font-size:0; line-height:0;'> </td> </tr> </table> </td> </tr> <tr> <td class='wrapper' style='padding:0 10px;'> <!-- module 1 --> <table data-module='module-1' data-thumb='thumbnails/01.png' width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-module' bgcolor='#eaeced'> <table class='flexible' width='600' align='center' style='margin:0 auto;' cellpadding='0' cellspacing='0'> <tr> <td style='padding:29px 0 30px;'> <table width='100%' cellpadding='0' cellspacing='0'> <tr> <th class='flex' width='113' align='left' style='padding:0;'> <table class='center' cellpadding='0' cellspacing='0'> <tr> <td style='line-height:0;'> <a target='_blank' style='text-decoration:none;' href='https://www.psd2html.com/'>MoneyABCs</a> </td> </tr> </table> </th> <th class='flex' align='left' style='padding:0;'> <table width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-color='text' data-size='size navigation' data-min='10' data-max='22' data-link-style='text-decoration:none; color:#888;' class='nav' align='right' style='font:bold 13px/15px Arial, Helvetica, sans-serif; color:#888;'> </td> </tr> </table> </th> </tr> </table> </td> </tr> </table> </td> </tr> </table> <!-- module 2 --> <table data-module='module-2' data-thumb='thumbnails/02.png' width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-module' bgcolor='#eaeced'> <table class='flexible' width='600' align='center' style='margin:0 auto;' cellpadding='0' cellspacing='0'> <tr> <td class='img-flex'>"+
		"<a href=http://www.moneyabcs.org/loadEmail/" + emailArticle.title.replace(/ /g,"%20") + " target='_blank'>"+
		"<img src='"+ emailArticle.imgUrl + "' style='vertical-align:top;' width='600' height='306' alt='' /></a></td> </tr> <tr> <td data-bgcolor='bg-block' class='holder' style='padding:58px 60px 52px;' bgcolor='#f9f9f9'> <table width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-color='title' data-size='size title' data-min='25' data-max='45' data-link-color='link title color' data-link-style='text-decoration:none; color:#292c34;' class='title' align='center' style='font:35px/38px Arial, Helvetica, sans-serif; color:#292c34; padding:0 0 24px;'>"+
		 emailArticle.title +"</td> </tr> <tr> <td data-color='text' data-size='size text' data-min='10' data-max='26' data-link-color='link text color' data-link-style='font-weight:bold; text-decoration:underline; color:#40aceb;' align='center' style='font:bold 16px/25px Arial, Helvetica, sans-serif; color:#888; padding:0 0 23px;'>"+
		emailArticle.snippet + "</td> </tr> <tr> <td style='padding:0 0 20px;'> <table width='134' align='center' style='margin:0 auto;' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-button' data-size='size button' data-min='10' data-max='16' class='btn' align='center' style='font:12px/14px Arial, Helvetica, sans-serif; color:#f8f9fb; text-transform:uppercase; mso-padding-alt:12px 10px 10px; border-radius:2px;' bgcolor='#7bb84f'> <a target='_blank' style='text-decoration:none; color:#f8f9fb; display:block; padding:12px 10px 10px;' href='#'>Learn More</a> </td> </tr> </table> </td> </tr> </table> </td> </tr> <tr><td height='28'></td></tr> </table> </td> </tr> </table> <!-- module 6 --> <table data-module='module-6' data-thumb='thumbnails/06.png' width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-module' bgcolor='#eaeced'> <table class='flexible' width='600' align='center' style='margin:0 auto;' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-block' class='holder' style='padding:64px 60px 50px;' bgcolor='#f9f9f9'> <table width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-color='title' data-size='size title' data-min='20' data-max='40' data-link-color='link title color' data-link-style='text-decoration:none; color:#292c34;' class='title' align='center' style='font:30px/33px Arial, Helvetica, sans-serif; color:#292c34; padding:0 0 23px;'> Be a part of our Team </td> </tr> <tr> <td data-color='text' data-size='size text' data-min='10' data-max='26' data-link-color='link text color' data-link-style='font-weight:bold; text-decoration:underline; color:#40aceb;' align='center' style='font:16px/29px Arial, Helvetica, sans-serif; color:#888; padding:0 0 21px;'> Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy </td> </tr> <tr> <td style='padding:0 0 20px;'> <table width='232' align='center' style='margin:0 auto;' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-button' data-size='size button' data-min='10' data-max='20' class='btn' align='center' style='font:bold 16px/18px Arial, Helvetica, sans-serif; color:#f9f9f9; text-transform:uppercase; mso-padding-alt:22px 10px; border-radius:3px;' bgcolor='#e02d74'> <a target='_blank' style='text-decoration:none; color:#f9f9f9; display:block; padding:22px 10px;' href='http://www.moneyabcs.org/'>Sign up now on MoneyABCs</a> </td> </tr> </table> </td> </tr> </table> </td> </tr> <tr><td height='28'></td></tr> </table> </td> </tr> </table> <!-- module 7 --> <table data-module='module-7' data-thumb='thumbnails/07.png' width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-bgcolor='bg-module' bgcolor='#eaeced'> <table class='flexible' width='600' align='center' style='margin:0 auto;' cellpadding='0' cellspacing='0'> <tr> <td class='footer' style='padding:0 0 10px;'> <table width='100%' cellpadding='0' cellspacing='0'> <tr class='table-holder'> <th class='tfoot' width='400' align='left' style='vertical-align:top; padding:0;'> <table width='100%' cellpadding='0' cellspacing='0'> <tr> <td data-color='text' data-link-color='link text color' data-link-style='text-decoration:underline; color:#797c82;' class='aligncenter' style='font:12px/16px Arial, Helvetica, sans-serif; color:#797c82; padding:0 0 10px;'> MoneyABCs 2016.   All Rights Reserved. <a target='_blank' style='text-decoration:underline; color:#797c82;' href='sr_unsubscribe'>Unsubscribe.</a> </td> </tr> </table> </th> <th class='thead' width='200' align='left' style='vertical-align:top; padding:0;'> <table class='center' align='right' cellpadding='0' cellspacing='0'> <tr> <td class='btn' valign='top' style='line-height:0; padding:3px 0 0;'> <a target='_blank' style='text-decoration:none;' href='#'><img src='images/ico-facebook.png' border='0' style='font:12px/15px Arial, Helvetica, sans-serif; color:#797c82;' align='left' vspace='0' hspace='0' width='6' height='13' alt='fb' /></a> </td> <td width='20'></td> <td class='btn' valign='top' style='line-height:0; padding:3px 0 0;'> <a target='_blank' style='text-decoration:none;' href='#'><img src='images/ico-twitter.png' border='0' style='font:12px/15px Arial, Helvetica, sans-serif; color:#797c82;' align='left' vspace='0' hspace='0' width='13' height='11' alt='tw' /></a> </td> <td width='19'></td> <td class='btn' valign='top' style='line-height:0; padding:3px 0 0;'> <a target='_blank' style='text-decoration:none;' href='#'><img src='images/ico-google-plus.png' border='0' style='font:12px/15px Arial, Helvetica, sans-serif; color:#797c82;' align='left' vspace='0' hspace='0' width='19' height='15' alt='g+' /></a> </td> <td width='20'></td> <td class='btn' valign='top' style='line-height:0; padding:3px 0 0;'> <a target='_blank' style='text-decoration:none;' href='#'><img src='images/ico-linkedin.png' border='0' style='font:12px/15px Arial, Helvetica, sans-serif; color:#797c82;' align='left' vspace='0' hspace='0' width='13' height='11' alt='in' /></a> </td> </tr> </table> </th> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr> <!-- fix for gmail --> <tr> <td style='line-height:0;'><div style='display:none; white-space:nowrap; font:15px/1px courier;'>                                                                 </div></td> </tr> </table> </body> </html>"
    }*/
    var mailOptions = {
        from: "moneyabcsorg@gmail.com",
        to: "moneyabcsorg@gmail.com",
        subject: "Hi, Your user " + req.body.name + " has sent you a message regarding subject: " + req.body.subject + " ",
        generateTextFromHTML: true,
        html: "<html><head><title></title></head><body>" + req.body.message + "</body></html>"
    };


    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log(response);
        }
        smtpTransport.close();
    });
});

/*contactMailer - End */
/* google drive - Start */


/**app.get("/googleDrive", function (req,res){

var SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
/* var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/'; */
/**var TOKEN_PATH = 'auth.json';

 // Load client secrets from a local file.
 fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Drive API.
  authorize(JSON.parse(content), listFiles);
});

 /**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
/**function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
	//token = {"access_token":"ya29.Ci-KA2EV0ICQtGtbO63dVFDyXFEvF8jj4Dg3_6OBsRmev9db1jvMH5ESCv8IDmktnA","refresh_token":"1/bmRW7svuOskUSPdWb1jTAnepTEfOHHP4ubE25OhvXk8","token_type":"Bearer","expiry_date":1478021005005};
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
		console.log("hi")
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

 /**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
/**function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  //rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
	code = "4/Z0AMRs8SrSRCsJCeuk5U4QnQ6eIHiH1EBuSGUcgwQUs";
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  //});
} **/

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
/** function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

 /**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
/** function listFiles(auth) {
  var service = google.drive('v3');
  service.files.list({
    auth: auth,
	pageSize: 10,
    fields: "nextPageToken, files(id, name)"
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var files = response.files;
    if (files.length == 0) {
      console.log('No files found.');
    } else {
      console.log('Files:');
	  var arrFiles = [];
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        console.log('%s (%s)', file.name, file.id);
		service.files.get({
			auth: auth,
			fileId : file.id,
			fields : "appProperties,capabilities,contentHints,createdTime,description,explicitlyTrashed,fileExtension,folderColorRgb,fullFileExtension,headRevisionId,iconLink,id,imageMediaMetadata,isAppAuthorized,kind,lastModifyingUser,md5Checksum,mimeType,modifiedByMeTime,modifiedTime,name,originalFilename,ownedByMe,owners,parents,permissions,properties,quotaBytesUsed,shared,sharedWithMeTime,sharingUser,size,spaces,starred,thumbnailLink,trashed,version,videoMediaMetadata,viewedByMe,viewedByMeTime,viewersCanCopyContent,webContentLink,webViewLink,writersCanShare"
			}, function(err, response) {
			if (err) {
				console.log('The API returned an error: ' + err);
				return;
				}
				var files = response;
				arrFiles.push(response);
                console.log(files.name);
				console.log(files.thumbnailLink);
				console.log(files.webViewLink);
                console.log(files.id);
		});
      }

	  var mySearchVar  = setInterval(function () {
          clearInterval(mySearchVar);
		res.json(arrFiles);
          clearInterval(mySearchVar);
	}, 9000); //9 seconds
    }
  });
}

 })
 **/

/* google drive - End */


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// error handling
app.use(function (err, req, res, next) {
    res.status(500).send('Something bad happened!');
});

initDb(function (err) {
    console.log('Error connecting to Mongo. Message:\n' + err);
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;
