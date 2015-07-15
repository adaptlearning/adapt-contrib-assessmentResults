#adapt-contrib-asessmentResults

A component used to display a single assessment's results.

##Installation

First, be sure to install the [Adapt Command Line Interface](https://github.com/adaptlearning/adapt-cli), then from the command line run:-

        adapt install adapt-contrib-asessmentResults

This component can also be installed by adding the component to the adapt.json file before running `adapt install`:
 
        "adapt-contrib-asessmentResults": "*"

##Usage

It can only be used in conjunction with [adapt-contrib-assessment](https://github.com/adaptlearning/adapt-contrib-assessment). Feedback is worked out in this component and should match the scoreToPass variable from the assessment.

##Settings overview

For example JSON format, see [example.json](example.json). A description of the core settings can be found at: [Core model attributes](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes)


####components.json

```json
  {
    "_id":"c-130",
    "_parentId":"b-31",
    "_type":"component",
    "_component":"assessmentResults",
    "_classes":"",
    "_layout":"full",
    "title":"Results",
    "displayTitle":"Results",
    "body":"This component you're reading is a results component.",
    "instruction":"",
    "_pageLevelProgress": {
      "_isEnabled": true
    },
    "_assessmentId": "Assessment 1",
    "_retry": {
      "button": "Retry Assessment",
      "feedback": "Why not have another try? You have used {{attemptsSpent}} of {{attempts}} attempt(s), which means you have {{attemptsLeft}} attempt(s) remaining."
    },
    "_completionBody": "This component you're reading is a results component.<br>You have finished the assessment<br/>You scored {{{score}}} out of {{{maxScore}}}. {{{feedback}}}",
    "_bands": [
      {
        "_score": 0,
        "feedback": "Your score was below 25%.",
        "_allowRetry": true
      },
      {
        "_score": 25,
        "feedback": "Your score was below 50%.",
        "_allowRetry": true
      },
      {
        "_score": 50,
        "feedback": "Good effort, but your score was under 75%.",
        "_allowRetry": true
      },
      {
        "_score": 75,
        "feedback": "Great work. You passed your assessment with {{{scoreAsPercent}}}%.",
        "_allowRetry": false
      }
    ]
  },
```

A description of the attributes is as follows:

| Attribute                 | Type         | Description|
| :-------------------------|:-------------|:-----|
| _completionBody           | string       | This is a string describing the component's body on assessment completion |
| _bands                    | object array | This is an array containing bands of feedback starting at _score |
| _retry                    | object       | This is an object enabling a retry button for the user to retry the assessment. |
| _assessmentId             | string       | This is the unique name of the assessment for which results should be displayed |


The {{{attributes}}} available for string replacement are defined in the [assessment extension](https://github.com/adaptlearning/adapt-contrib-assessment) with the addition of the {{{feedback}}} attribute.

#Limitations
 
To be completed.

##Browser spec

This component has been tested to the standard Adapt browser specification.