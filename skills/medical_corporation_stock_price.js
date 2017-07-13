/*

Botkit Studio Skill module to enhance the "medical_corporation_stock_price" script

*/
var request = require("request");

module.exports = function(controller) {
    // define a before hook
    // you may define multiple before hooks. they will run in the order they are defined.
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudiobefore
    controller.studio.before('medical_corporation_stock_price', function(convo, next) {

        // do some preparation before the conversation starts...
        // for example, set variables to be used in the message templates
        // convo.setVar('foo','bar');

        console.log('BEFORE: medical_corporation_stock_price');
        // don't forget to call next, or your conversation will never continue.
        next();

    });

    /* Validators */
    // Fire a function whenever a variable is set because of user input
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudiovalidate
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    // Validate user input: question_1
    controller.studio.validate('medical_corporation_stock_price', 'question_1', function(convo, next) {

        var value = convo.extractResponse('question_1');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: medical_corporation_stock_price VARIABLE: question_1');

        // always call next!
        next();

    });

    // Validate user input: question_2
    controller.studio.validate('medical_corporation_stock_price', 'question_2', function(convo, next) {

        var value = convo.extractResponse('question_2');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: medical_corporation_stock_price VARIABLE: question_2');

        // always call next!
        next();

    });

    // Validate user input: question_3
    controller.studio.validate('medical_corporation_stock_price', 'question_3', function(convo, next) {

        var value = convo.extractResponse('question_3');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: medical_corporation_stock_price VARIABLE: question_3');

        // always call next!
        next();

    });

    /* Thread Hooks */
    // Hook functions in-between threads with beforeThread
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudiobeforethread
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    // Before the default thread starts, run this:
    controller.studio.beforeThread('medical_corporation_stock_price', 'default', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *medical_corporation_stock_price*, about to start the thread *default*');

        // always call next!
        next();
    });

    // Before the on_timeout thread starts, run this:
    controller.studio.beforeThread('medical_corporation_stock_price', 'on_timeout', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *medical_corporation_stock_price*, about to start the thread *on_timeout*');

        // always call next!
        next();
    });

    // Before the end thread starts, run this:
    controller.studio.beforeThread('medical_corporation_stock_price', 'end', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *medical_corporation_stock_price*, about to start the thread *end*');
        try {


            var responses = convo.extractResponses();
            // do something with the responses
            var requestURLAWAC = "https://api.wolframalpha.com/v1/result?i=What+is+the+stock+price+of+";
            // building request url for api.wolframalpha.com



            if (responses.question_1 != null)
                requestURLAWAC += encodeURIComponent(responses.question_1) + "%3F&appid=REDACTED";

            console.log(requestURLAWAC);
            request({
                uri: requestURLAWAC,
                method: "GET",
                timeout: 10000,
                followRedirect: true,
                maxRedirects: 10
            }, function(error, response, body) {
                //console.log(body);


                if (body.indexOf("dollar") != -1) {


                    convo.say("Here is the stock price of **" + responses.question_1 + "**: <br><br>" + body);
                } else {
                    convo.say("I apologize, the information is not available.");
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
    controller.studio.after('medical_corporation_stock_price', function(convo, next) {

        console.log('AFTER: medical_corporation_stock_price');

        // handle the outcome of the convo
        if (convo.successful()) {

            var responses = convo.extractResponses();
            // do something with the responses

        }

        // don't forget to call next, or your conversation will never properly complete.
        next();
    });
}