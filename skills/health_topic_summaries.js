/*

Botkit Studio Skill module to enhance the "health_topic_summaries" script

*/
var request = require("request");

module.exports = function(controller) {
    // define a before hook
    // you may define multiple before hooks. they will run in the order they are defined.
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudiobefore
    controller.studio.before('health_topic_summaries', function(convo, next) {

        // do some preparation before the conversation starts...
        // for example, set variables to be used in the message templates
        // convo.setVar('foo','bar');

        console.log('BEFORE: health_topic_summaries');
        // don't forget to call next, or your conversation will never continue.
        next();

    });

    /* Validators */
    // Fire a function whenever a variable is set because of user input
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudiovalidate
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    // Validate user input: question_1
    controller.studio.validate('health_topic_summaries', 'question_1', function(convo, next) {

        var value = convo.extractResponse('question_1');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: health_topic_summaries VARIABLE: question_1');

        // always call next!
        next();

    });

    // Validate user input: question_2
    controller.studio.validate('health_topic_summaries', 'question_2', function(convo, next) {

        var value = convo.extractResponse('question_2');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: health_topic_summaries VARIABLE: question_2');

        // always call next!
        next();

    });

    // Validate user input: question_3
    controller.studio.validate('health_topic_summaries', 'question_3', function(convo, next) {

        var value = convo.extractResponse('question_3');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: health_topic_summaries VARIABLE: question_3');

        // always call next!
        next();

    });

    /* Thread Hooks */
    // Hook functions in-between threads with beforeThread
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudiobeforethread
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    // Before the default thread starts, run this:
    controller.studio.beforeThread('health_topic_summaries', 'default', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *health_topic_summaries*, about to start the thread *default*');

        // always call next!
        next();
    });

    // Before the on_timeout thread starts, run this:
    controller.studio.beforeThread('health_topic_summaries', 'on_timeout', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *health_topic_summaries*, about to start the thread *on_timeout*');

        // always call next!
        next();
    });

    // Before the end thread starts, run this:
    controller.studio.beforeThread('health_topic_summaries', 'end', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *health_topic_summaries*, about to start the thread *end*');

        try {

            var responses = convo.extractResponses();
            // do something with the responses
            var requestURLAWAC = "https://api.wolframalpha.com/v2/query?input=definition%20of%20";
            // building request url for api.wolframalpha.com

            if (responses.question_1 != null)
                requestURLAWAC += encodeURIComponent(responses.question_1) + "&format=plaintext&output=JSON&podtitle=Result&appid=REDACTED";

            console.log(requestURLAWAC);
            request({
                uri: requestURLAWAC,
                method: "GET",
                timeout: 10000,
                followRedirect: true,
                maxRedirects: 10
            }, function(error, response, body) {
                //console.log(body);

                var o = JSON.parse(body);
                var resultAWAC = "";
                if (o.queryresult != null && o.queryresult.success != null && o.queryresult.error != null && o.queryresult.success == true && o.queryresult.error == false) {
                    if (o.queryresult.pods != null && o.queryresult.pods.length != 0 && o.queryresult.pods[0].subpods != null && o.queryresult.pods[0].subpods[0].length != 0 && o.queryresult.pods[0].subpods[0].plaintext != null && o.queryresult.pods[0].subpods[0].plaintext != "") {
                        var summary = o.queryresult.pods[0].subpods[0].plaintext.split(" | ")[1];
                        summary = summary.charAt(0).toUpperCase() + summary.slice(1);
                        resultAWAC += "Here is the summary of **" + responses.question_1 + "**: <br><br>" + summary;
                    } else
                        resultAWAC += "I apologize, but the information is not available.";
                } else {
                    resultAWAC += "I apologize, but the information is not available.";
                }


                convo.say(resultAWAC);



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
    controller.studio.after('health_topic_summaries', function(convo, next) {

        console.log('AFTER: health_topic_summaries');

        // handle the outcome of the convo
        if (convo.successful()) {

            var responses = convo.extractResponses();
            // do something with the responses

        }

        // don't forget to call next, or your conversation will never properly complete.
        next();
    });
}