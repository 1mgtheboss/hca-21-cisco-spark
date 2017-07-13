/*

Botkit Studio Skill module to enhance the "curated_drug_information" script

*/
var request = require("request");


module.exports = function(controller) {
    // define a before hook
    // you may define multiple before hooks. they will run in the order they are defined.
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudiobefore
    controller.studio.before('curated_drug_information', function(convo, next) {

        // do some preparation before the conversation starts...
        // for example, set variables to be used in the message templates
        // convo.setVar('foo','bar');

        console.log('BEFORE: curated_drug_information');
        // don't forget to call next, or your conversation will never continue.
        next();

    });

    /* Validators */
    // Fire a function whenever a variable is set because of user input
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudiovalidate
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    // Validate user input: question_1
    controller.studio.validate('curated_drug_information', 'question_1', function(convo, next) {

        var value = convo.extractResponse('question_1');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: curated_drug_information VARIABLE: question_1');

        // always call next!
        next();

    });

    // Validate user input: question_2
    controller.studio.validate('curated_drug_information', 'question_2', function(convo, next) {

        var value = convo.extractResponse('question_2');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: curated_drug_information VARIABLE: question_2');

        // always call next!
        next();

    });

    // Validate user input: question_3
    controller.studio.validate('curated_drug_information', 'question_3', function(convo, next) {

        var value = convo.extractResponse('question_3');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: curated_drug_information VARIABLE: question_3');

        // always call next!
        next();

    });

    /* Thread Hooks */
    // Hook functions in-between threads with beforeThread
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudiobeforethread
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    // Before the default thread starts, run this:
    controller.studio.beforeThread('curated_drug_information', 'default', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *curated_drug_information*, about to start the thread *default*');

        // always call next!
        next();
    });

    // Before the on_timeout thread starts, run this:
    controller.studio.beforeThread('curated_drug_information', 'on_timeout', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *curated_drug_information*, about to start the thread *on_timeout*');

        // always call next!
        next();
    });

    // Before the end thread starts, run this:
    controller.studio.beforeThread('curated_drug_information', 'end', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *curated_drug_information*, about to start the thread *end*');

        try {

            var responses = convo.extractResponses();
            // do something with the responses
            var requestURLAFDAG = "https://api.fda.gov/drug/label.json?api_key=REDACTED&search=brand_name:";
            // building request url for api.fda.gov

            if (responses.question_1 != null)
                requestURLAFDAG += "%22" + encodeURIComponent(responses.question_1) + "%22";

            console.log(requestURLAFDAG);
            request({
                uri: requestURLAFDAG,
                method: "GET",
                timeout: 10000,
                followRedirect: true,
                maxRedirects: 10
            }, function(error, response, body) {
                //console.log(body);

                var o = JSON.parse(body);
                var resultAFDAG = "";
                if (o.results != null && o.results.length != 0) {
                    resultAFDAG += "Here is the drug information of **" + responses.question_1 + "**:<br><br>**Dosage forms and strengths: **";

                    if (o.results[0].dosage_forms_and_strengths != null && o.results[0].dosage_forms_and_strengths.length != 0)
                        resultAFDAG += o.results[0].dosage_forms_and_strengths.join(" ");
                    resultAFDAG += "<br>**Storage and handling: **";
                    if (o.results[0].storage_and_handling != null && o.results[0].storage_and_handling.length != 0)
                        resultAFDAG += o.results[0].storage_and_handling.join(" ");
                    resultAFDAG += "<br>**Brand name: **";
                    if (o.results[0].openfda != null && o.results[0].openfda.brand_name != null && o.results[0].openfda.brand_name.length != 0)
                        resultAFDAG += o.results[0].openfda.brand_name.join(" ");
                    resultAFDAG += "<br>**Manufacturer name: **";
                    if (o.results[0].openfda != null && o.results[0].openfda.manufacturer_name != null && o.results[0].openfda.manufacturer_name.length != 0)
                        resultAFDAG += o.results[0].openfda.manufacturer_name.join(" ");
                    resultAFDAG += "<br>**Substance name: **";
                    if (o.results[0].openfda != null && o.results[0].openfda.substance_name != null && o.results[0].openfda.substance_name.length != 0)
                        resultAFDAG += o.results[0].openfda.substance_name.join(" ");
                    resultAFDAG += "<br>**Product type: **";
                    if (o.results[0].openfda != null && o.results[0].openfda.product_type != null && o.results[0].openfda.product_type.length != 0)
                        resultAFDAG += o.results[0].openfda.product_type.join(" ");
                    resultAFDAG += "<br>**Route: **";
                    if (o.results[0].openfda != null && o.results[0].openfda.route != null && o.results[0].openfda.route.length != 0)
                        resultAFDAG += o.results[0].openfda.route.join(" ");
                    resultAFDAG += "<br>**Application no: **";
                    if (o.results[0].openfda != null && o.results[0].openfda.application_number != null && o.results[0].openfda.application_number.length != 0)
                        resultAFDAG += o.results[0].openfda.application_number.join(" ");


                    resultAFDAG += "<br>";
                    convo.say(resultAFDAG);
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
    controller.studio.after('curated_drug_information', function(convo, next) {

        console.log('AFTER: curated_drug_information');

        // handle the outcome of the convo
        if (convo.successful()) {

            var responses = convo.extractResponses();
            // do something with the responses

        }

        // don't forget to call next, or your conversation will never properly complete.
        next();
    });
}