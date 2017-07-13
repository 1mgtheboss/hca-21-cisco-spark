/*

Botkit Studio Skill module to enhance the "intelligent_diagnostic_insights" script

*/
var request = require("request");

module.exports = function(controller) {
    // define a before hook
    // you may define multiple before hooks. they will run in the order they are defined.
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudiobefore
    controller.studio.before('intelligent_diagnostic_insights', function(convo, next) {

        // do some preparation before the conversation starts...
        // for example, set variables to be used in the message templates
        // convo.setVar('foo','bar');

        console.log('BEFORE: intelligent_diagnostic_insights');
        // don't forget to call next, or your conversation will never continue.
        next();

    });

    /* Validators */
    // Fire a function whenever a variable is set because of user input
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudiovalidate
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    // Validate user input: question_1
    controller.studio.validate('intelligent_diagnostic_insights', 'question_1', function(convo, next) {

        var value = convo.extractResponse('question_1');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: intelligent_diagnostic_insights VARIABLE: question_1');

        // always call next!
        next();

    });

    // Validate user input: question_2
    controller.studio.validate('intelligent_diagnostic_insights', 'question_2', function(convo, next) {

        var value = convo.extractResponse('question_2');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: intelligent_diagnostic_insights VARIABLE: question_2');

        // always call next!
        next();

    });

    // Validate user input: question_3
    controller.studio.validate('intelligent_diagnostic_insights', 'question_3', function(convo, next) {

        var value = convo.extractResponse('question_3');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: intelligent_diagnostic_insights VARIABLE: question_3');

        // always call next!
        next();

    });

    /* Thread Hooks */
    // Hook functions in-between threads with beforeThread
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudiobeforethread
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    // Before the default thread starts, run this:
    controller.studio.beforeThread('intelligent_diagnostic_insights', 'default', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *intelligent_diagnostic_insights*, about to start the thread *default*');

        // always call next!
        next();
    });

    // Before the on_timeout thread starts, run this:
    controller.studio.beforeThread('intelligent_diagnostic_insights', 'on_timeout', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *intelligent_diagnostic_insights*, about to start the thread *on_timeout*');

        // always call next!
        next();
    });

    // Before the end thread starts, run this:
    controller.studio.beforeThread('intelligent_diagnostic_insights', 'end', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *intelligent_diagnostic_insights*, about to start the thread *end*');

        try {

            var responses = convo.extractResponses();
            // do something with the responses
            var requestURLAIMCP = "https://api.infermedica.com/v2/parse";
            // building request url for api.infermedica.com /parse endpoint

            // data for /parse endpoint
            var requestURLAIMCPD = {
                "text": responses.question_3
            };

            //result variable
            var resultAIMC = "";

            request({
                uri: requestURLAIMCP,
                method: "POST",
                json: requestURLAIMCPD,
                headers: {
                    "App-Id": "REDACTED",
                    "App-Key": "REDACTED",
                    "Content-Type": "application/json"
                },
                timeout: 10000,
                followRedirect: true,
                maxRedirects: 10
            }, function(error, response, body) {

                var o = body;
                //console.log(o);
                var resultAIMC = "";
                if (o.mentions != null && o.mentions.length != 0) {

                    var n = o.mentions.length;
                    for (var i = 0; i < n; i++) {
                        delete o.mentions[i].common_name;
                        delete o.mentions[i].type;
                        delete o.mentions[i].name;
                        delete o.mentions[i].orth;

                    }



                    var requestURLAIMCD = "https://api.infermedica.com/v2/diagnosis";
                    // building request url for api.infermedica.com /diagnosis endpoint

                    // data for /diagnosis endpoint
                    var requestURLAIMCDD = {
                        "sex": responses.question_1,
                        "age": responses.question_2,
                        "evidence": o.mentions,
                        "extras": {
                            "ignore_groups": true
                        }
                    };
                    //console.log(requestURLAIMCDD);
                    request({
                        uri: requestURLAIMCD,
                        method: "POST",
                        json: requestURLAIMCDD,
                        headers: {
                            "App-Id": "REDACTED",
                            "App-Key": "REDACTED",
                            "Content-Type": "application/json"
                        },
                        timeout: 10000,
                        followRedirect: true,
                        maxRedirects: 10
                    }, function(error, response, body) {
                        o = body;
                        //console.log(o);
                        if (o.question != null) {
                            if (o.conditions != null && o.conditions.length != 0) {
                                if (parseFloat(o.conditions[0].probability) > .9) {
                                    printAIMCDR(o.conditions, convo);
                                } else {
                                    convo.ask(o.question.text, function(response, convo) {

                                        var item = {
                                            "id": o.question.items[0].id
                                        };
                                        switch (response.text) {

                                            case "yes":
                                                item["choice_id"] = "present";
                                                break;
                                            case "no":
                                                item["choice_id"] = "absent";
                                                break;
                                            default:
                                                item["choice_id"] = "unknown";
                                                break;

                                        }
                                        requestURLAIMCDD["evidence"].push(item);
                                        //l3-start
                                        //console.log(requestURLAIMCDD);
                                        request({
                                            uri: requestURLAIMCD,
                                            method: "POST",
                                            json: requestURLAIMCDD,
                                            headers: {
                                                "App-Id": "REDACTED",
                                                "App-Key": "REDACTED",
                                                "Content-Type": "application/json"
                                            },
                                            timeout: 10000,
                                            followRedirect: true,
                                            maxRedirects: 10
                                        }, function(error, response, body) {
                                            o = body;
                                            //console.log(o);
                                            if (o.question != null) {
                                                if (o.conditions != null && o.conditions.length != 0) {
                                                    if (parseFloat(o.conditions[0].probability) > .9) {
                                                        convo.next();
                                                        printAIMCDR(o.conditions, convo);
                                                    } else {
                                                        convo.next();
                                                        convo.ask(o.question.text, function(response, convo) {


                                                            var item = {
                                                                "id": o.question.items[0].id
                                                            };
                                                            switch (response.text) {

                                                                case "yes":
                                                                    item["choice_id"] = "present";
                                                                    break;
                                                                case "no":
                                                                    item["choice_id"] = "absent";
                                                                    break;
                                                                default:
                                                                    item["choice_id"] = "unknown";
                                                                    break;

                                                            }
                                                            requestURLAIMCDD["evidence"].push(item);
                                                            //l4-start
                                                            //console.log(requestURLAIMCDD);
                                                            request({
                                                                uri: requestURLAIMCD,
                                                                method: "POST",
                                                                json: requestURLAIMCDD,
                                                                headers: {
                                                                    "App-Id": "REDACTED",
                                                                    "App-Key": "REDACTED",
                                                                    "Content-Type": "application/json"
                                                                },
                                                                timeout: 10000,
                                                                followRedirect: true,
                                                                maxRedirects: 10
                                                            }, function(error, response, body) {
                                                                o = body;
                                                                //console.log(o);
                                                                if (o.question != null) {
                                                                    if (o.conditions != null && o.conditions.length != 0) {
                                                                        if (parseFloat(o.conditions[0].probability) > .9) {
                                                                            convo.next();
                                                                            printAIMCDR(o.conditions, convo);
                                                                        } else {
                                                                            convo.next();
                                                                            convo.ask(o.question.text, function(response, convo) {


                                                                                var item = {
                                                                                    "id": o.question.items[0].id
                                                                                };
                                                                                switch (response.text) {

                                                                                    case "yes":
                                                                                        item["choice_id"] = "present";
                                                                                        break;
                                                                                    case "no":
                                                                                        item["choice_id"] = "absent";
                                                                                        break;
                                                                                    default:
                                                                                        item["choice_id"] = "unknown";
                                                                                        break;

                                                                                }
                                                                                requestURLAIMCDD["evidence"].push(item);
                                                                                //l5-start
                                                                                //console.log(requestURLAIMCDD);
                                                                                request({
                                                                                    uri: requestURLAIMCD,
                                                                                    method: "POST",
                                                                                    json: requestURLAIMCDD,
                                                                                    headers: {
                                                                                        "App-Id": "REDACTED",
                                                                                        "App-Key": "REDACTED",
                                                                                        "Content-Type": "application/json"
                                                                                    },
                                                                                    timeout: 10000,
                                                                                    followRedirect: true,
                                                                                    maxRedirects: 10
                                                                                }, function(error, response, body) {
                                                                                    o = body;
                                                                                    //console.log(o);
                                                                                    if (o.question != null) {
                                                                                        if (o.conditions != null && o.conditions.length != 0) {
                                                                                            if (parseFloat(o.conditions[0].probability) > .9) {
                                                                                                convo.next();
                                                                                                printAIMCDR(o.conditions, convo);
                                                                                            } else {
                                                                                                convo.next();
                                                                                                convo.ask(o.question.text, function(response, convo) {


                                                                                                    var item = {
                                                                                                        "id": o.question.items[0].id
                                                                                                    };
                                                                                                    switch (response.text) {

                                                                                                        case "yes":
                                                                                                            item["choice_id"] = "present";
                                                                                                            break;
                                                                                                        case "no":
                                                                                                            item["choice_id"] = "absent";
                                                                                                            break;
                                                                                                        default:
                                                                                                            item["choice_id"] = "unknown";
                                                                                                            break;

                                                                                                    }
                                                                                                    requestURLAIMCDD["evidence"].push(item);
                                                                                                    //l6-start
                                                                                                    //console.log(requestURLAIMCDD);
                                                                                                    request({
                                                                                                        uri: requestURLAIMCD,
                                                                                                        method: "POST",
                                                                                                        json: requestURLAIMCDD,
                                                                                                        headers: {
                                                                                                            "App-Id": "REDACTED",
                                                                                                            "App-Key": "REDACTED",
                                                                                                            "Content-Type": "application/json"
                                                                                                        },
                                                                                                        timeout: 10000,
                                                                                                        followRedirect: true,
                                                                                                        maxRedirects: 10
                                                                                                    }, function(error, response, body) {
                                                                                                        o = body;
                                                                                                        //console.log(o);
                                                                                                        if (o.question != null) {
                                                                                                            if (o.conditions != null && o.conditions.length != 0) {
                                                                                                                if (parseFloat(o.conditions[0].probability) > .9) {
                                                                                                                    convo.next();
                                                                                                                    printAIMCDR(o.conditions, convo);
                                                                                                                } else {
                                                                                                                    convo.next();
                                                                                                                    convo.ask(o.question.text, function(response, convo) {


                                                                                                                        var item = {
                                                                                                                            "id": o.question.items[0].id
                                                                                                                        };
                                                                                                                        switch (response.text) {

                                                                                                                            case "yes":
                                                                                                                                item["choice_id"] = "present";
                                                                                                                                break;
                                                                                                                            case "no":
                                                                                                                                item["choice_id"] = "absent";
                                                                                                                                break;
                                                                                                                            default:
                                                                                                                                item["choice_id"] = "unknown";
                                                                                                                                break;

                                                                                                                        }
                                                                                                                        requestURLAIMCDD["evidence"].push(item);
                                                                                                                        //l7-start
                                                                                                                        //console.log(requestURLAIMCDD);
                                                                                                                        request({
                                                                                                                            uri: requestURLAIMCD,
                                                                                                                            method: "POST",
                                                                                                                            json: requestURLAIMCDD,
                                                                                                                            headers: {
                                                                                                                                "App-Id": "REDACTED",
                                                                                                                                "App-Key": "REDACTED",
                                                                                                                                "Content-Type": "application/json"
                                                                                                                            },
                                                                                                                            timeout: 10000,
                                                                                                                            followRedirect: true,
                                                                                                                            maxRedirects: 10
                                                                                                                        }, function(error, response, body) {
                                                                                                                            o = body;
                                                                                                                            //console.log(o);
                                                                                                                            if (o.question != null) {
                                                                                                                                if (o.conditions != null && o.conditions.length != 0) {
                                                                                                                                    if (parseFloat(o.conditions[0].probability) > .9) {
                                                                                                                                        convo.next();
                                                                                                                                        printAIMCDR(o.conditions, convo);
                                                                                                                                    } else {
                                                                                                                                        convo.next();
                                                                                                                                        convo.ask(o.question.text, function(response, convo) {


                                                                                                                                            var item = {
                                                                                                                                                "id": o.question.items[0].id
                                                                                                                                            };
                                                                                                                                            switch (response.text) {

                                                                                                                                                case "yes":
                                                                                                                                                    item["choice_id"] = "present";
                                                                                                                                                    break;
                                                                                                                                                case "no":
                                                                                                                                                    item["choice_id"] = "absent";
                                                                                                                                                    break;
                                                                                                                                                default:
                                                                                                                                                    item["choice_id"] = "unknown";
                                                                                                                                                    break;

                                                                                                                                            }
                                                                                                                                            requestURLAIMCDD["evidence"].push(item);
                                                                                                                                            //l8-start
                                                                                                                                            //console.log(requestURLAIMCDD);
                                                                                                                                            request({
                                                                                                                                                uri: requestURLAIMCD,
                                                                                                                                                method: "POST",
                                                                                                                                                json: requestURLAIMCDD,
                                                                                                                                                headers: {
                                                                                                                                                    "App-Id": "REDACTED",
                                                                                                                                                    "App-Key": "REDACTED",
                                                                                                                                                    "Content-Type": "application/json"
                                                                                                                                                },
                                                                                                                                                timeout: 10000,
                                                                                                                                                followRedirect: true,
                                                                                                                                                maxRedirects: 10
                                                                                                                                            }, function(error, response, body) {
                                                                                                                                                o = body;
                                                                                                                                                //console.log(o);
                                                                                                                                                if (o.question != null) {
                                                                                                                                                    if (o.conditions != null && o.conditions.length != 0) {
                                                                                                                                                        if (parseFloat(o.conditions[0].probability) > .9) {
                                                                                                                                                            convo.next();
                                                                                                                                                            printAIMCDR(o.conditions, convo);
                                                                                                                                                        } else {
                                                                                                                                                            convo.next();
                                                                                                                                                            convo.ask(o.question.text, function(response, convo) {


                                                                                                                                                                var item = {
                                                                                                                                                                    "id": o.question.items[0].id
                                                                                                                                                                };
                                                                                                                                                                switch (response.text) {

                                                                                                                                                                    case "yes":
                                                                                                                                                                        item["choice_id"] = "present";
                                                                                                                                                                        break;
                                                                                                                                                                    case "no":
                                                                                                                                                                        item["choice_id"] = "absent";
                                                                                                                                                                        break;
                                                                                                                                                                    default:
                                                                                                                                                                        item["choice_id"] = "unknown";
                                                                                                                                                                        break;

                                                                                                                                                                }
                                                                                                                                                                requestURLAIMCDD["evidence"].push(item);
                                                                                                                                                                //l9-start
                                                                                                                                                                //console.log(requestURLAIMCDD);
                                                                                                                                                                request({
                                                                                                                                                                    uri: requestURLAIMCD,
                                                                                                                                                                    method: "POST",
                                                                                                                                                                    json: requestURLAIMCDD,
                                                                                                                                                                    headers: {
                                                                                                                                                                        "App-Id": "REDACTED",
                                                                                                                                                                        "App-Key": "REDACTED",
                                                                                                                                                                        "Content-Type": "application/json"
                                                                                                                                                                    },
                                                                                                                                                                    timeout: 10000,
                                                                                                                                                                    followRedirect: true,
                                                                                                                                                                    maxRedirects: 10
                                                                                                                                                                }, function(error, response, body) {
                                                                                                                                                                    o = body;
                                                                                                                                                                    //console.log(o);
                                                                                                                                                                    if (o.question != null) {
                                                                                                                                                                        if (o.conditions != null && o.conditions.length != 0) {
                                                                                                                                                                            if (parseFloat(o.conditions[0].probability) > .9) {
                                                                                                                                                                                convo.next();
                                                                                                                                                                                printAIMCDR(o.conditions, convo);
                                                                                                                                                                            } else {
                                                                                                                                                                                convo.next();
                                                                                                                                                                                convo.ask(o.question.text, function(response, convo) {


                                                                                                                                                                                    var item = {
                                                                                                                                                                                        "id": o.question.items[0].id
                                                                                                                                                                                    };
                                                                                                                                                                                    switch (response.text) {

                                                                                                                                                                                        case "yes":
                                                                                                                                                                                            item["choice_id"] = "present";
                                                                                                                                                                                            break;
                                                                                                                                                                                        case "no":
                                                                                                                                                                                            item["choice_id"] = "absent";
                                                                                                                                                                                            break;
                                                                                                                                                                                        default:
                                                                                                                                                                                            item["choice_id"] = "unknown";
                                                                                                                                                                                            break;

                                                                                                                                                                                    }
                                                                                                                                                                                    requestURLAIMCDD["evidence"].push(item);
                                                                                                                                                                                    //l10-start
                                                                                                                                                                                    //console.log(requestURLAIMCDD);
                                                                                                                                                                                    request({
                                                                                                                                                                                        uri: requestURLAIMCD,
                                                                                                                                                                                        method: "POST",
                                                                                                                                                                                        json: requestURLAIMCDD,
                                                                                                                                                                                        headers: {
                                                                                                                                                                                            "App-Id": "REDACTED",
                                                                                                                                                                                            "App-Key": "REDACTED",
                                                                                                                                                                                            "Content-Type": "application/json"
                                                                                                                                                                                        },
                                                                                                                                                                                        timeout: 10000,
                                                                                                                                                                                        followRedirect: true,
                                                                                                                                                                                        maxRedirects: 10
                                                                                                                                                                                    }, function(error, response, body) {
                                                                                                                                                                                        o = body;
                                                                                                                                                                                        //console.log(o);
                                                                                                                                                                                        if (o.question != null) {
                                                                                                                                                                                            if (o.conditions != null && o.conditions.length != 0) {
                                                                                                                                                                                                if (parseFloat(o.conditions[0].probability) > .9) {
                                                                                                                                                                                                    convo.next();
                                                                                                                                                                                                    printAIMCDR(o.conditions, convo);
                                                                                                                                                                                                } else {
                                                                                                                                                                                                    convo.next();
                                                                                                                                                                                                    convo.ask(o.question.text, function(response, convo) {


                                                                                                                                                                                                        var item = {
                                                                                                                                                                                                            "id": o.question.items[0].id
                                                                                                                                                                                                        };
                                                                                                                                                                                                        switch (response.text) {

                                                                                                                                                                                                            case "yes":
                                                                                                                                                                                                                item["choice_id"] = "present";
                                                                                                                                                                                                                break;
                                                                                                                                                                                                            case "no":
                                                                                                                                                                                                                item["choice_id"] = "absent";
                                                                                                                                                                                                                break;
                                                                                                                                                                                                            default:
                                                                                                                                                                                                                item["choice_id"] = "unknown";
                                                                                                                                                                                                                break;

                                                                                                                                                                                                        }
                                                                                                                                                                                                        requestURLAIMCDD["evidence"].push(item);
                                                                                                                                                                                                        //l11-start
                                                                                                                                                                                                        //console.log(requestURLAIMCDD);
                                                                                                                                                                                                        request({
                                                                                                                                                                                                            uri: requestURLAIMCD,
                                                                                                                                                                                                            method: "POST",
                                                                                                                                                                                                            json: requestURLAIMCDD,
                                                                                                                                                                                                            headers: {
                                                                                                                                                                                                                "App-Id": "REDACTED",
                                                                                                                                                                                                                "App-Key": "REDACTED",
                                                                                                                                                                                                                "Content-Type": "application/json"
                                                                                                                                                                                                            },
                                                                                                                                                                                                            timeout: 10000,
                                                                                                                                                                                                            followRedirect: true,
                                                                                                                                                                                                            maxRedirects: 10
                                                                                                                                                                                                        }, function(error, response, body) {
                                                                                                                                                                                                            o = body;
                                                                                                                                                                                                            //console.log(o);
                                                                                                                                                                                                            if (o.question != null) {
                                                                                                                                                                                                                if (o.conditions != null && o.conditions.length != 0) {

                                                                                                                                                                                                                    convo.next();
                                                                                                                                                                                                                    printAIMCDR(o.conditions, convo);

                                                                                                                                                                                                                } else {

                                                                                                                                                                                                                }

                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                if (o.conditions != null && o.conditions.length != 0) {
                                                                                                                                                                                                                    convo.next();
                                                                                                                                                                                                                    printAIMCDR(o.conditions, convo);
                                                                                                                                                                                                                }

                                                                                                                                                                                                            }


                                                                                                                                                                                                        });
                                                                                                                                                                                                        //l11-end



                                                                                                                                                                                                    });
                                                                                                                                                                                                }
                                                                                                                                                                                            } else {

                                                                                                                                                                                            }

                                                                                                                                                                                        } else {
                                                                                                                                                                                            if (o.conditions != null && o.conditions.length != 0) {
                                                                                                                                                                                                convo.next();
                                                                                                                                                                                                printAIMCDR(o.conditions, convo);
                                                                                                                                                                                            }

                                                                                                                                                                                        }


                                                                                                                                                                                    });
                                                                                                                                                                                    //l10-end



                                                                                                                                                                                });
                                                                                                                                                                            }
                                                                                                                                                                        } else {

                                                                                                                                                                        }

                                                                                                                                                                    } else {
                                                                                                                                                                        if (o.conditions != null && o.conditions.length != 0) {
                                                                                                                                                                            convo.next();
                                                                                                                                                                            printAIMCDR(o.conditions, convo);
                                                                                                                                                                        }

                                                                                                                                                                    }


                                                                                                                                                                });
                                                                                                                                                                //l9-end



                                                                                                                                                            });
                                                                                                                                                        }
                                                                                                                                                    } else {

                                                                                                                                                    }

                                                                                                                                                } else {
                                                                                                                                                    if (o.conditions != null && o.conditions.length != 0) {
                                                                                                                                                        convo.next();
                                                                                                                                                        printAIMCDR(o.conditions, convo);
                                                                                                                                                    }

                                                                                                                                                }


                                                                                                                                            });
                                                                                                                                            //l8-end




                                                                                                                                        });
                                                                                                                                    }
                                                                                                                                } else {

                                                                                                                                }

                                                                                                                            } else {
                                                                                                                                if (o.conditions != null && o.conditions.length != 0) {
                                                                                                                                    convo.next();
                                                                                                                                    printAIMCDR(o.conditions, convo);
                                                                                                                                }

                                                                                                                            }


                                                                                                                        });
                                                                                                                        //l7-end



                                                                                                                    });
                                                                                                                }
                                                                                                            } else {

                                                                                                            }

                                                                                                        } else {
                                                                                                            if (o.conditions != null && o.conditions.length != 0) {
                                                                                                                convo.next();
                                                                                                                printAIMCDR(o.conditions, convo);
                                                                                                            }

                                                                                                        }


                                                                                                    });
                                                                                                    //l6-end



                                                                                                });
                                                                                            }
                                                                                        } else {

                                                                                        }

                                                                                    } else {
                                                                                        if (o.conditions != null && o.conditions.length != 0) {
                                                                                            convo.next();
                                                                                            printAIMCDR(o.conditions, convo);
                                                                                        }

                                                                                    }


                                                                                });
                                                                                //l5-end




                                                                            });
                                                                        }
                                                                    } else {

                                                                    }

                                                                } else {
                                                                    if (o.conditions != null && o.conditions.length != 0) {
                                                                        convo.next();
                                                                        printAIMCDR(o.conditions, convo);
                                                                    }

                                                                }


                                                            });
                                                            //l4-end




                                                        });
                                                    }
                                                } else {

                                                }

                                            } else {
                                                if (o.conditions != null && o.conditions.length != 0) {
                                                    convo.next();
                                                    printAIMCDR(o.conditions, convo);
                                                }

                                            }


                                        });
                                        //l3-end


                                    });
                                }
                            } else {

                            }

                        } else {
                            if (o.conditions != null && o.conditions.length != 0)
                                printAIMCDR(o.conditions, convo);

                        }


                    });


                } else {
                    convo.say("I apologize, but the information is not available.");
                }

            });


        } catch (e) {
            console.log(e);
            convo.say("I apologize, I encountered a technical error.");


        }

        // always call next!
        next();
    });


    // define an after hook
    // you may define multiple after hooks. they will run in the order they are defined.
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudioafter
    controller.studio.after('intelligent_diagnostic_insights', function(convo, next) {

        console.log('AFTER: intelligent_diagnostic_insights');

        // handle the outcome of the convo
        if (convo.successful()) {

            var responses = convo.extractResponses();
            // do something with the responses

        }

        // don't forget to call next, or your conversation will never properly complete.
        next();
    });

    //function to print api.infermedica.com diagnosis result
    function printAIMCDR(conditions, convo) {
        try {
            var nc = conditions.length,
                resultAIMC = "";
            for (var j = 0; j < nc; j++) {
                resultAIMC += "<br>**" + conditions[j].name + ":** Probability: " + (parseFloat(conditions[j].probability) * 100).toFixed(2) + "%"
            }
            convo.say("Here is the **result** of the diagnosis: <br>" + resultAIMC);
        } catch (e) {
            console.log(e);
            convo.say("I apologize, I encountered a technical error.");


        }
    }
}