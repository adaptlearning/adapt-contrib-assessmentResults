adapt-contrib-asessmentResults
==============================

A component used to display a single assessment's results. It can only be used in conjunction with [adapt-contrib-assessment](https://github.com/adaptlearning/adapt-contrib-assessment). Feedback is worked out in this component and should match the scoreToPass variable from the assessment.




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
      "_isEnabled": true,
      "button": "Retry Assessment",
      "feedback": "Why not have another try? You have used {{attemptsSpent}} of {{attempts}} attempt(s), which means you have {{attemptsLeft}} attempt(s) remaining."
    },
    "_completionMessage" : {
      "title" : "You have finished the assessment",
      "message": "You scored {{{score}}} out of {{{maxScore}}}. {{{feedback}}}"
    },
    "_bands": [
      {
        "_score": 0,
        "feedback": "Your score was below 25%.",
        "_isRetryEnabled": true
      },
      {
        "_score": 25,
        "feedback": "Your score was below 50%.",
        "_isRetryEnabled": true
      },
      {
        "_score": 50,
        "feedback": "Good effort, but your score was under 75%.",
        "_isRetryEnabled": true
      },
      {
        "_score": 75,
        "feedback": "Great work. You passed your assessment with {{{scoreAsPercent}}}%.",
        "_isRetryEnabled": false
      }
    ]
  },
```

A description of the attributes is as follows:

| Attribute                 | Type         | Description|
| :-------------------------|:-------------|:-----|
| _completionMessage        | object       | This is an object describing the output feedback |
| _bands                    | object array | This is an array containing bands of feedback starting at _score |
| _retry                    | object       | This is an object enabling a retry button for the user to retry the assessment (_isReloadPageOnRevisit must be *true* on the assessment) |
| _assessmentId             | string       | This is the unique name of the assessment for which results should be displayed |


The {{{attributes}}} available for string replacement are defined in the [assessment extension](https://github.com/adaptlearning/adapt-contrib-assessment) with the addition of the {{{feedback}}} attribute.
