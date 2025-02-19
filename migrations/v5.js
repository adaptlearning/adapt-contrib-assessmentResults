import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

describe('adapt-contrib-assessmentResults - v3.0.0 > v5.1.2', async () => {
  let course, courseAssessmentResultsGlobals, assessmentResults;

  whereFromPlugin('adapt-contrib-assessmentResults - from v3.0.0', { name: 'adapt-contrib-assessmentResults', version: '<5.1.2' });

  whereContent('adapt-contrib-assessmentResults - where assessmentResult', async content => {
    assessmentResults = content.filter(({ _component }) => _component === 'assessmentResult');
    return assessmentResults.length;
  });

  mutateContent('adapt-contrib-assessmentResults - add globals retryText attribute', async (content) => {
    course = content.find(({ _type }) => _type === 'course');
    if (!_.has(course, '_globals._components._assessmentResults')) _.set(course, '_globals._components._assessmentResults', {});
    courseAssessmentResultsGlobals = course._globals._components._assessmentResults;

    courseAssessmentResultsGlobals.retryText = 'Retry';
    return true;
  });

  checkContent('adapt-contrib-assessmentResults - check globals retryText attribute', async () => {
    const isValid = courseAssessmentResultsGlobals.retryText === 'Retry';
    if (!isValid) throw new Error('adapt-contrib-assessmentResults globals retryText attribute not added.');
    return true;
  });

  updatePlugin('adapt-contrib-assessmentResults - update to v5.1.2', { name: 'adapt-contrib-assessmentResults', version: '5.1.2', framework: '>=5.19.1' });
});

describe('adapt-contrib-assessmentResults - v5.1.2 > v5.1.7', async () => {
  let assessmentResults;

  whereFromPlugin('adapt-contrib-assessmentResults - from v5.1.2', { name: 'adapt-contrib-assessmentResults', version: '<5.1.7' });

  whereContent('adapt-contrib-assessmentResults - where assessmentResult', async content => {
    assessmentResults = content.filter(({ _component }) => _component === 'assessmentResult');
    return assessmentResults.length;
  });

  mutateContent('adapt-contrib-assessmentResults - modify assessmentResult._completionBody default', async () => {
    assessmentResults.forEach(assessmentResult => {
      if (assessmentResult._completionBody === '') {
        assessmentResult._completionBody = 'This component you\'re reading is a results component.<br>You have finished the assessment.<br>You scored {{{score}}} out of {{{maxScore}}}. {{{feedback}}}';
      }
    });
    return true;
  });

  checkContent('adapt-contrib-assessmentResults - check assessmentResult._completionBody atrribute', async () => {
    const isValid = assessmentResults.every(({ _completionBody }) => _completionBody !== undefined);
    if (!isValid) throw new Error('adapt-contrib-assessmentResults - _completionBody not modified in every instance of assessmentResult');
    return true;
  });

  updatePlugin('adapt-contrib-assessmentResults - update to v5.1.7', { name: 'adapt-contrib-assessmentResults', version: '5.1.7', framework: '>=5.19.1' });
});

describe('adapt-contrib-assessmentResults - v5.1.7 > v5.2.0', async () => {
  let assessmentResults;

  whereFromPlugin('adapt-contrib-assessmentResults - from v5.1.7', { name: 'adapt-contrib-assessmentResults', version: '<5.2.0' });

  whereContent('adapt-contrib-assessmentResults - where assessmentResultInstance', async content => {
    assessmentResults = content.filter(({ _component }) => _component === 'assessmentResults');
    return assessmentResults.length;
  });

  mutateContent('adapt-contrib-assessmentResults - add assessmentResultInstance._bands.feedbackNotFinal attribute', async () => {
    assessmentResults.forEach(assessmentResultInstance => {
      assessmentResultInstance._bands.forEach(item => {
        item.feedbackNotFinal = '';
      });
    });
    return true;
  });

  checkContent('adapt-contrib-assessmentResults - check add assessmentResultInstance._bands.feedbackNotFinal atrribute', async () => {
    const isValid = assessmentResults.every(assessmentResultInstance =>
      assessmentResultInstance._bands.every(item =>
        item && item.feedbackNotFinal !== undefined
      )
    );
    if (!isValid) throw new Error('adapt-contrib-assessmentResults - feedbackNotFinal not added to every instance of assessmentResultInstance._bands');
    return true;
  });

  updatePlugin('adapt-contrib-assessmentResults - update to v5.2.0', { name: 'adapt-contrib-assessmentResults', version: '5.2.0', framework: '>=5.19.1' });
});

describe('adapt-contrib-assessmentResults - v5.2.0 > v5.2.1', async () => {
  let assessmentResults;

  whereFromPlugin('adapt-contrib-assessmentResults - from v5.2.0', { name: 'adapt-contrib-assessmentResults', version: '<5.2.1' });

  whereContent('adapt-contrib-assessmentResults - where assessmentResult', async content => {
    assessmentResults = content.filter(({ _component }) => _component === 'assessmentResult');
    return assessmentResults.length;
  });

  mutateContent('adapt-contrib-assessmentResults - modify assessmentResult._completionBody default', async () => {
    assessmentResults.forEach(assessmentResult => {
      if (assessmentResult._completionBody === 'This component you\'re reading is a results component.<br>You have finished the assessment.<br>You scored {{{score}}} out of {{{maxScore}}}. {{{feedback}}}') {
        assessmentResult._completionBody = 'This component you\'re reading is a results component.<br>You have finished the assessment.<br>You scored {{score}} out of {{maxScore}}. {{{feedback}}}';
      }
    });
    return true;
  });

  checkContent('adapt-contrib-assessmentResults - check assessmentResult._completionBody atrribute', async () => {
    const isValid = assessmentResults.every(({ _completionBody }) => _completionBody !== undefined);
    if (!isValid) throw new Error('adapt-contrib-assessmentResults - _completionBody not modified in every instance of assessmentResult');
    return true;
  });

  updatePlugin('adapt-contrib-assessmentResults - update to v5.2.1', { name: 'adapt-contrib-assessmentResults', version: '5.2.1', framework: '>=5.19.1' });
});
