# HCA-21
## Introduction
HCA-21 redefines healthcare. The US national health expenditure (NHE) in 2015 was [$3.2 T](https://www.cms.gov/research-statistics-data-and-systems/statistics-trends-and-reports/nationalhealthexpenddata/nhe-fact-sheet.html), $9,990 per person. It accounted for 17.8% of Gross Domestic Product (GDP). In 2016-25, the NHE is projected to grow at an average rate of 5.6% per year and will reach close to [20%](https://www.advisory.com/daily-briefing/2017/02/16/spending-growth) of GDP by 2025. In 2009-14, the personal healthcare spending in the US grew at an average rate of 3.9% per year. A principle reason behind the continuing rise in healthcare expenditure is inefficent, limited, and fragmented use of ground-breaking technologies such as, artificial intelligence, natural language processing, automation. Perhaps the healthcare industry has been a little bit hesitant in taking full advantage of the wonders of 21st century. HCA-21 aims to change that.

## Usage
The user can add HCA-21 to a cisco spark space through its username, hca-21@sparkbot.io. When added to a space, the bot will introduce itself and explain its capabilities. In order to access its capabilities, the user needs to use specific commands. The commands are explained below. 
1. `help`: This command displays the list and summaries of 5 main commands, idi-1, apd-2, hts-3, cdi-4, & msp-5.
2. `idi-1`: This command allows the user to access intelligent diagnostic insights feature. 
3. `apd-2`: This command allows the user to retrieve healthcare provider information, both doctors' and practices'.
4. `hts-3`: This command provides a summary of a health topic, for instance a disease.
5. `cdi-4`: This command allows the user to retrieve curated drug information.
6. `msp-5`: This command allows the user to get a medical corporation's stock price.

HCA-21 replies to standard comments such as, `hello`, `thanks`, & `goodbye` and welcomes new users. In addition to that, it supports `uptime` or `debug` command that provides uptime, triggers, and conversations statistics. For detailed testing instructions with sample input and received output please go through the Testing section. 

All the 5 main commands mentioned above have their respective long forms and they are mentioned below.
1. idi-1: intelligent_diagnostic_insights
2. apd-2: accurate_provider_data
3. hts-3: health_topic_summaries
4. cdi-4: curated_drug_information
5. msp-5: medical_corporation_stock_price

## Operation
### Operation: idi-1: intelligent diagnostic insights
This command uses infermedica.com API's `/parse` & `/diagnosis` endpoints. The `/parse` endpoint uses Natural Language Processing (NLP). The command requests the user to enter their sex, male or female, and then their age. Then it requests the user to express what they are feeling. This question accepts plain text input in English with a limit of 1,024 characters. The spelling error in the Testing section in the answer to this question is intentional and demonstrates the command's capability to deal with spelling errors. The command can also interpret some negated mentions and that is also demonstrated in the answer to this question. The command extracts the symptom mentions from the plain text input and sends those to the `/diagnosis` endpoint as evidence along with sex and age. The endpoint returns a followup question along with an array of conditions with their respective probabilities. The command then asks the followup question to the user. The user can answer in `yes` or `no` and anything else is treated as `i don't know`. The user response is used to determine another symptom which is pushed into the evidence array and resent to the `/diagnosis` endpoint along with sex and age. The endpoint is stateless so the new symptom must be sent to the endpoint along with all previously submitted symptoms. The endpoint again returns a followup question and an array of conditions with their respective probabilities. This process is repeated untill the first condition returned has a probability more than 90% or the interview reaches the 10th question, including the `What are you feeling?` question. In the end of the diagnosis, the user receives the result of the diagnosis, a list of possible conditions with their respective probabilities.

### Operation: apd-2: accurate provider data
This command uses the betterdoctor.com API to retrieve accurate provider information. The command begins by requesting the user to enter his choice, `a` for doctor information and `b` for practice information. If the user enters anything else the question will be repeated. If the user chooses `a`, the command will request the user to enter doctor name, US state postal code, and keyword. The keyword is for narrowing down the search. If the user is searching for doctors who specialize in family medicine, the key word can be `family`. The command will return a list of dcotors who match the specified criteria. For each doctor, the user will get, Name, Gender, Languages, Bio, Specialties, & Practices. If the user chooses `b`, the command will request the user to enter practice name and US state postal code. The command will return a list of practices matching the specified criteria. For each practice, the user will get, Name, Address, Languages, & Phones. If you see repetition in phone numbers, that's because it's a common practice to use the same number for landline and fax. This command also support "not applicable or available" input. To indicate that an input is not applicable or available, the user needs to enter `na`. It should be use on a limitd basis as the command cannot search for providers if all inputs are `na`. For retrieving doctor information, `/doctors` endpoint, and for retrieving practice information, `/practices` endpoint is used.

### Operation: hts-3: health topic summaries
This command uses wolframalpha.com Full Results API for presenting the user a brief description of a health topic, for instance, bronchitis. The command requests the user to enter the topic. The command then presents the user the summary.

### Operation: cdi-4: curated drug information
This command uses the `/drug` endpoint of fda.gov API. The command requests the user the brand name of the drug, for instance, Nexium and returns dosage forms and strengths, storage and handling information, brand name, manufacturer name, substance name, product type, route, and application no. The application no. can be used for searching the drug in [National Drug Code Directory](https://www.accessdata.fda.gov/scripts/cder/ndc/) (Search Type: Application Number) to get more information about the drug.

### Operation: msp-5: stock price of a medical corporation
This command uses wolframalpha.com Short Answers API. The command requests the user the name of the medical corporation and returns the current stock price of the medical corporation. 

## Audience
HCA-21 is for patients, doctors, pharmacists, nurses, students, and general masses. Patients can use it to get intelligent diagnostics regarding their health conditions, to search a provider for making an appointment, & to learn about a disease. Doctors can use the diagnosis feature of HCA-21 for prescreening, the provider data for partnerships and recommendations, & the summaries for teaching a patient about a disease. Pharmacists can search a drug's storage and handling information through HCA-21. Nurses can learn about a drug's dosage forms and strengths from the bot. Medical students can use the diagnosis feature for perfecting their diagnosis. In short, people in all areas healthcare will benefit from HCA-21. People who are exploring investment opportunities in the healthcare sector can search a healthcare corporation's stock price on HCA-21.

## Business Model
HCA-21 will be a paid bot. Users will be able to access the features of the bot on a subscription basis. This is the most suitable business model as the bot uses premium APIs.

## Testing
If you are about to test HCA-21 please make sure you have basic understanding of its command structure. If you haven't already, please go through the Usage & Operations sections first. It is assumed that you have successfully added the bot and received the introductory message. Testing instructions have been provided in a conversational format for convenience in understanding. Information available in the public domain has been used as sample input. It is recommended that HCA-21 is tested in 1:1 environment i.e. direct message mode for convenience.  

### Testing: idi-1: intelligent diagnostic insights
```
You
idi-1

HCA-21
In order to provide you intelligent diagnostic insights, I need some information. 
Please enter your sex, male or female.

You
male

HCA-21
Please enter your age.

You
30

HCA-21
What are you feeling?

You
i feel smoach pain but no couoghing today

HCA-21
Do you have sudden abdominal pain?

You
no

HCA-21
Do you have abnormally loose or watery stools?

You
yes

HCA-21
Do you have an elevated body temperature or fever?

You
no

HCA-21
Do symptoms occur within a short time after consuming foods that contain lactose (including but not limited to dairy products such as milk, ice cream, and cheese)?

You
no

HCA-21
Do you have abdominal pain that gets worse after eating?

You
yes

HCA-21
Do you have hypertension?

You
yes

HCA-21
Have you noticed that you've lost weight?

You
yes

HCA-21
Do you have a high level of cholesterol?

You
yes

HCA-21
Have you lost weight without any change in your appetite?

You
yes

HCA-21
Here is the result of the diagnosis: 

Chronic intestinal ischemia: Probability: 81.05%
Peptic ulcer: Probability: 13.49%
Gastritis: Probability: 12.00%
```

### Testing: apd-2: accurate provider data
```
You
apd-2

HCA-21
In order to provide you accurate provider data, I need some information. 
Please enter your choice. Do you want a. doctor information or b. practice information?

You
a

HCA-21
You have selected a. doctor information.
Please enter doctor name.

You
Henry Leung

HCA-21
Please enter state postal code.

You
ca

HCA-21
Please enter keyword.

You
family

HCA-21
Here is the doctor information:

I have found 1 result(s).

Name: Henry Leung, DO
Gender: Male
Languages: English
Bio: Dr. Henry Leung, DO treats patients in Laguna hills, California, Los angeles, California, Newport beach, California, Irvine, California, Pasadena, California, Ontario, California, La palma, California, Aliso viejo, California, Fountain valley, California, Addison, Texas, Anaheim, California, Rancho cucamonga, California, and Placentia, California, specializing in family medicine.  Dr. Leung is licensed to treat patients in California.  In addition to having active medical licenses, Dr. Leung has been found during an automated background check to be clear of any malpractice history and holds one or more active medical licenses.
Specialties: Family Medicine
Practices: Coastal Family Medicine Inc, Concentra Health Services, Inc., Christina Duong, NP
```

```
You
apd-2

HCA-21
In order to provide you accurate provider data, I need some information. 
Please enter your choice. Do you want a. doctor information or b. practice information?

You
b

HCA-21
You have selected b. practice information.
Please enter practice name.

You
Central Park South Physicians

HCA-21
Please enter state postal code.

You
ny

HCA-21
Here is the practice information:

I have found 1 result(s).

Name: 128 Central Park South Physicians PLLC
Address: 128 Central Park S New York, NY 10019
Languages: English
Phones: 2122652724, 2122652735, 2122652724, 2122652735
```

### Testing: hts-3: health topic summaries
```
You
hts-3

HCA-21
In order to provide you health topic summaries, I need some information. 
Please enter your topic.

You
cancer

HCA-21
You have entered cancer.
Here is the summary of cancer: 

Any malignant growth or tumor caused by abnormal and uncontrolled cell division; it may spread to other parts of the body through the lymphatic system or the blood stream
```

### Testing: cdi-4: curated drug information
```
You
cdi-4

HCA-21
In order to provide you curated drug information, I need some information. 
Please enter the drug's brand name.

You
Norvasc

HCA-21
You have entered Norvasc.
Here is the drug information of norvasc:

Dosage forms and strengths: 3 DOSAGE FORMS AND STRENGTHS 2.5, 5, and 10 mg Tablets 2.5 mg, 5 mg, and 10 mg Tablets (3)
Storage and handling: 16.4 Storage Store bottles at controlled room temperature, 59° to 86°F (15° to 30°C) and dispense in tight, light-resistant containers (USP).
Brand name: Norvasc
Manufacturer name: Lake Erie Medical DBA Quality Care Products LLC
Substance name: AMLODIPINE BESYLATE
Product type: HUMAN PRESCRIPTION DRUG
Route: ORAL
Application no: NDA019787
```

### Testing: msp-5: stock price of a medical corporation
```
You
msp-5

HCA-21
In order to provide you the stock price of a medical corporation, I need some information. 
Please enter the corporation name.

You
medtronic

HCA-21
You have entered medtronic.
Here is the stock price of medtronic: 

87.37 US dollars
```





## Troubleshooting
The bot has been tested rigorously against fair use. If the bot does not behave in the expected manner, which is highly unlikely, feel free to get in touch. The bot is hosted on [Glitch](https://glitch.com). The bot uses studio feature. The bot also uses Cisco Spark APIs, and five other apis, infermedica.com, betterdoctor.com, wolframalpha.com (full results), open.fda.gov, & wolframalpha.com (short answers). If you plan to get in touch please make sure all the APIs the bot uses are operational. You can do that by going to the status pages of the APIs/ platforms. The available status pages are listed in the Status Pages section. For the APIs that do not have a dedicated status page, the blog pages have been mentioned as API issues are announced on official blogs. API status research can also be done on social media. Unexpected behavior can also be caused if API limits have been exceeded. The API limits have been listed in Limits section. 

## Known Issues
HCA-21 is hosted on [Glitch](https://glitch.com). If you are going to interact with the bot for the first time or after a long time, please give it 30 seconds to wake up. In most cases, the bot will wake up in much less than 30 seconds. The waiting time for an average person to see a doctor in the US is [24](http://www.healthline.com/health-news/why-you-have-to-wait-longer-to-get-a-doctors-appointment) days.

It has been observed that on web.ciscospark.com (Browser: Chrome, OS: Windows 7 Professional), a botkit bot fails to process direct mentions in the expected manner. This is due to [#749](https://github.com/howdyai/botkit/issues/749). The issue is not observed in the Windows 7 Professional native client. It is recommended that the bot is communicated to in direct message mode in the above-mentioned case.

## Status Pages
Cisco Spark: [status.ciscospark.com](https://status.ciscospark.com)  
Glitch: [status.glitch.com](http://status.glitch.com)  
Studio: [blog.howdy.ai](https://blog.howdy.ai)  
Infermedica: [status.infermedica.com](http://status.infermedica.com)  
BetterDoctor: [betterdoctor.com/health](https://betterdoctor.com/health)  
Wolfram|Alpha (Full Results): [blog.wolframalpha.com](https://blog.wolframalpha.com)  
openFDA: [open.fda.gov/api/status  ](https://open.fda.gov/api/status)  
Wolfram|Alpha (Short Answers): [blog.wolframalpha.com](https://blog.wolframalpha.com)  

## Limits
Studio: 500  
Infermedica: 1,000  
BetterDoctor: 2,160,000  
Wolfram|Alpha (Full Results): 2,000  
openFDA: 3,600,000  
Wolfram|Alpha (Short Answers): 2,000  

## Conclusion
HCA-21 has been built to improve collaboration in healthcare by addressing the key pain points in the sector. Medical errors are [the third leading cause of death](https://www.usnews.com/news/articles/2016-05-03/medical-errors-are-third-leading-cause-of-death-in-the-us) in the US. Most of these errors are preventable, through better coordination, faster screening, and systematic operations. HCA-21 puts a weapon the stakeholders in healthcare need to fight this menace and ensure high-quality medical care for everyone while bringing down the costs at the same time. HCA-21 would not come into existence without Cisco Spark & Botkit. The tireless efforts of engineers at Cisco Spark has made it a unique platform which has the power to revolutionize healthcare at its core. During development of HCA-21, wonderful support was received from the Cisco Spark Developer Support Team. Botkit is now a bot developer's first choice for building a Cisco Spark bot due to its modular and simple architecture and lucid documentation. The effort the Howdy Team has put into Botkit & Botkit Studio is admirable without a doubt. HCA-21 puts highly valuable information from reputed sources within the reach of all stakeholders in healthcare, and that has the potential to change the US healthcare for the better.
