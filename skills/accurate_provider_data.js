/*

Botkit Studio Skill module to enhance the "accurate_provider_data" script

*/
var request = require("request");

module.exports = function(controller) {
    // define a before hook
    // you may define multiple before hooks. they will run in the order they are defined.
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudiobefore
    controller.studio.before('accurate_provider_data', function(convo, next) {

        // do some preparation before the conversation starts...
        // for example, set variables to be used in the message templates
        // convo.setVar('foo','bar');

        console.log('BEFORE: accurate_provider_data');
        // don't forget to call next, or your conversation will never continue.
        next();

    });

    /* Validators */
    // Fire a function whenever a variable is set because of user input
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudiovalidate
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    // Validate user input: practice_question_2
    controller.studio.validate('accurate_provider_data', 'practice_question_2', function(convo, next) {

        var value = convo.extractResponse('practice_question_2');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: accurate_provider_data VARIABLE: practice_question_2');

        // always call next!
        next();

    });

    // Validate user input: practice_question_1
    controller.studio.validate('accurate_provider_data', 'practice_question_1', function(convo, next) {

        var value = convo.extractResponse('practice_question_1');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: accurate_provider_data VARIABLE: practice_question_1');

        // always call next!
        next();

    });

    // Validate user input: doctor_question_3
    controller.studio.validate('accurate_provider_data', 'doctor_question_3', function(convo, next) {

        var value = convo.extractResponse('doctor_question_3');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: accurate_provider_data VARIABLE: doctor_question_3');

        // always call next!
        next();

    });

    // Validate user input: doctor_question_2
    controller.studio.validate('accurate_provider_data', 'doctor_question_2', function(convo, next) {

        var value = convo.extractResponse('doctor_question_2');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: accurate_provider_data VARIABLE: doctor_question_2');

        // always call next!
        next();

    });

    // Validate user input: doctor_question_1
    controller.studio.validate('accurate_provider_data', 'doctor_question_1', function(convo, next) {

        var value = convo.extractResponse('doctor_question_1');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: accurate_provider_data VARIABLE: doctor_question_1');

        // always call next!
        next();

    });

    // Validate user input: question_1
    controller.studio.validate('accurate_provider_data', 'question_1', function(convo, next) {

        var value = convo.extractResponse('question_1');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: accurate_provider_data VARIABLE: question_1');

        // always call next!
        next();

    });

    // Validate user input: question_2
    controller.studio.validate('accurate_provider_data', 'question_2', function(convo, next) {

        var value = convo.extractResponse('question_2');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: accurate_provider_data VARIABLE: question_2');

        // always call next!
        next();

    });

    // Validate user input: question_3
    controller.studio.validate('accurate_provider_data', 'question_3', function(convo, next) {

        var value = convo.extractResponse('question_3');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: accurate_provider_data VARIABLE: question_3');

        // always call next!
        next();

    });

    /* Thread Hooks */
    // Hook functions in-between threads with beforeThread
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudiobeforethread
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    // Before the default thread starts, run this:
    controller.studio.beforeThread('accurate_provider_data', 'default', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *accurate_provider_data*, about to start the thread *default*');

        // always call next!
        next();
    });

    // Before the on_timeout thread starts, run this:
    controller.studio.beforeThread('accurate_provider_data', 'on_timeout', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *accurate_provider_data*, about to start the thread *on_timeout*');

        // always call next!
        next();
    });

    // Before the doctor thread starts, run this:
    controller.studio.beforeThread('accurate_provider_data', 'doctor', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *accurate_provider_data*, about to start the thread *doctor*');

        // always call next!
        next();
    });

    // Before the practice thread starts, run this:
    controller.studio.beforeThread('accurate_provider_data', 'practice', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *accurate_provider_data*, about to start the thread *practice*');

        // always call next!
        next();
    });

    // Before the end thread starts, run this:
    controller.studio.beforeThread('accurate_provider_data', 'end', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *accurate_provider_data*, about to start the thread *end*');

        try {


            var responses = convo.extractResponses();
            // do something with the responses
            var requestURLABDC = "https://api.betterdoctor.com/2016-03-01/";
            // building request url for api.betterdoctor.com
            if (responses.question_1 == "a") {
                requestURLABDC += "doctors?";
                if (responses.doctor_question_1 != null && responses.doctor_question_1 != "na")
                    requestURLABDC += "name=" + encodeURIComponent(responses.doctor_question_1) + "&";
                if (responses.doctor_question_2 != null && responses.doctor_question_2 != "na")
                    requestURLABDC += "location=" + encodeURIComponent(responses.doctor_question_2) + "&";
                if (responses.doctor_question_3 != null && responses.doctor_question_3 != "na")
                    requestURLABDC += "query=" + encodeURIComponent(responses.doctor_question_3) + "&";

                requestURLABDC += "skip=0&limit=10&user_key=REDACTED";
                console.log(requestURLABDC);
                request({
                    uri: requestURLABDC,
                    method: "GET",
                    timeout: 10000,
                    followRedirect: true,
                    maxRedirects: 10
                }, function(error, response, body) {
                    //console.log(body);
                    var o = JSON.parse(body);
                    var resultABDC = "";
                    if (o.data != null) {
                        var n = o.data.length;
                        if (n != 0) {
                            convo.say("Here is the **doctor** information:<br><br>I have found **" + o.meta.count + "** result(s).<br>");
                            for (var i = 0; i < n; i++) {
                                resultABDC += "<br>**Name: **";
                                if (o.data[i].profile.first_name != null && o.data[i].profile.first_name != "")
                                    resultABDC += o.data[i].profile.first_name + " ";
                                if (o.data[i].profile.middle_name != null && o.data[i].profile.middle_name != "")
                                    resultABDC += o.data[i].profile.middle_name + " ";
                                if (o.data[i].profile.last_name != null && o.data[i].profile.last_name != "")
                                    resultABDC += o.data[i].profile.last_name;
                                if (o.data[i].profile.title != null && o.data[i].profile.title != "")
                                    resultABDC += ", " + o.data[i].profile.title;
                                resultABDC += "<br>**Gender: **";
                                if (o.data[i].profile.gender != null && o.data[i].profile.gender != "")
                                    resultABDC += o.data[i].profile.gender.charAt(0).toUpperCase() + o.data[i].profile.gender.slice(1);
                                resultABDC += "<br>**Languages: **";
                                if (o.data[i].profile.languages != null && o.data[i].profile.languages.length != 0) {

                                    var nl = o.data[i].profile.languages.length;
                                    for (var j = 0; j < nl; j++) {
                                        if (o.data[i].profile.languages[j].name != null && o.data[i].profile.languages[j].name != "")
                                            resultABDC += o.data[i].profile.languages[j].name + ", ";
                                    }
                                    resultABDC = resultABDC.slice(0, resultABDC.length - 2);
                                }
                                resultABDC += "<br>**Bio: **";
                                if (o.data[i].profile.bio != null && o.data[i].profile.bio != "")
                                    resultABDC += o.data[i].profile.bio.split("\n").join(" ");


                                resultABDC += "<br>**Specialties: **";

                                if (o.data[i].specialties != null && o.data[i].specialties.length != 0) {

                                    var ns = o.data[i].specialties.length;
                                    for (var k = 0; k < ns; k++) {
                                        if (o.data[i].specialties[k].name != null && o.data[i].specialties[k].name != "")
                                            resultABDC += o.data[i].specialties[k].name + ", ";
                                    }
                                    resultABDC = resultABDC.slice(0, resultABDC.length - 2);
                                }

                                resultABDC += "<br>**Practices: **";
                                if (o.data[i].practices != null && o.data[i].practices.length != 0) {

                                    var np = o.data[i].practices.length;
                                    for (var l = 0; l < np; l++) {
                                        if (o.data[i].practices[l].name != null && o.data[i].practices[l].name != "")
                                            resultABDC += o.data[i].practices[l].name + ", ";
                                    }
                                    resultABDC = resultABDC.slice(0, resultABDC.length - 2);
                                }

                                resultABDC += "<br>";
                                convo.say(resultABDC);
                                resultABDC = "";
                            }
                        } else {
                            convo.say("I apologize, but the information is not available.");
                        }


                    } else {
                        convo.say("I apologize, but the information is not available.");
                    }

                });


            }

            if (responses.question_1 == "b") {
                requestURLABDC += "practices?";
                if (responses.practice_question_1 != null && responses.practice_question_1 != "na")
                    requestURLABDC += "name=" + encodeURIComponent(responses.practice_question_1) + "&";
                if (responses.practice_question_2 != null && responses.practice_question_2 != "na")
                    requestURLABDC += "location=" + encodeURIComponent(responses.practice_question_2) + "&";

                requestURLABDC += "skip=0&limit=10&user_key=REDACTED";
                console.log(requestURLABDC);
                request({
                    uri: requestURLABDC,
                    method: "GET",
                    timeout: 10000,
                    followRedirect: true,
                    maxRedirects: 10
                }, function(error, response, body) {
                    //console.log(body);
                    var o = JSON.parse(body);
                    var resultABDC = "";
                    var n = o.data.length;
                    if (n != 0) {
                        convo.say("Here is the **practice** information:<br><br>I have found **" + o.meta.count + "** result(s).<br>");
                        for (var i = 0; i < n; i++) {
                            resultABDC += "<br>**Name: **";
                            if (o.data[i].name != null && o.data[i].name != "")
                                resultABDC += o.data[i].name;
                            resultABDC += "<br>**Address: **";
                            if (o.data[i].visit_address != null) {
                                if (o.data[i].visit_address.street != null && o.data[i].visit_address.street != "")
                                    resultABDC += o.data[i].visit_address.street + " ";
                                if (o.data[i].visit_address.street2 != null && o.data[i].visit_address.street2 != "")
                                    resultABDC += o.data[i].visit_address.street2 + ", ";
                                if (o.data[i].visit_address.city != null && o.data[i].visit_address.city != "")
                                    resultABDC += o.data[i].visit_address.city + ", ";
                                if (o.data[i].visit_address.state != null && o.data[i].visit_address.state != "")
                                    resultABDC += o.data[i].visit_address.state + " ";
                                if (o.data[i].visit_address.zip != null && o.data[i].visit_address.zip != "")
                                    resultABDC += o.data[i].visit_address.zip;
                            }
                            resultABDC += "<br>**Languages: **";
                            if (o.data[i].languages != null && o.data[i].languages.length != 0) {

                                var nl = o.data[i].languages.length;
                                for (var j = 0; j < nl; j++) {
                                    if (o.data[i].languages[j].name != null && o.data[i].languages[j].name != "")
                                        resultABDC += o.data[i].languages[j].name + ", ";
                                }
                                resultABDC = resultABDC.slice(0, resultABDC.length - 2);
                            }

                            resultABDC += "<br>**Phones: **";

                            if (o.data[i].phones != null && o.data[i].phones.length != 0) {

                                var np = o.data[i].phones.length;
                                for (var k = 0; k < np; k++) {
                                    if (o.data[i].phones[k].number != null && o.data[i].phones[k].number != "")
                                        resultABDC += o.data[i].phones[k].number + ", ";
                                }
                                resultABDC = resultABDC.slice(0, resultABDC.length - 2);
                            }


                            resultABDC += "<br>";

                            convo.say(resultABDC);
                            resultABDC = "";
                        }

                    } else {
                        convo.say("I apologize, but the information is not available.");
                    }

                });
            }

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
    controller.studio.after('accurate_provider_data', function(convo, next) {

        console.log('AFTER: accurate_provider_data');

        // handle the outcome of the convo
        if (convo.successful()) {

            var responses = convo.extractResponses();
            // do something with the responses

        }

        // don't forget to call next, or your conversation will never properly complete.
        next();
    });
}