import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin, getCourse, getComponents, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('adapt-contrib-assessmentResults - v5.1.1 > v5.1.2', async () => {
  let course, courseAssessmentResultsGlobals, assessmentResults;

  whereFromPlugin('adapt-contrib-assessmentResults - from v5.1.1', { name: 'adapt-contrib-assessmentResults', version: '<5.1.2' });

  whereContent('adapt-contrib-assessmentResults - where assessmentResult', async content => {
    assessmentResults = getComponents('assessmentResults');
    return assessmentResults.length;
  });

  mutateContent('adapt-contrib-assessmentResults - add globals retryText attribute', async (content) => {
    course = getCourse();
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

  testSuccessWhere('correct version with empty assessmentResults components/course', {
    fromPlugins: [{ name: 'adapt-contrib-assessmentResults', version: '5.1.1' }],
    content: [
      { _id: 'c-100', _component: 'assessmentResults' },
      { _id: 'c-105', _component: 'assessmentResults' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('correct version with/without assessmentResults._retry and course with empty globals', {
    fromPlugins: [{ name: 'adapt-contrib-assessmentResults', version: '5.1.1' }],
    content: [
      { _id: 'c-100', _component: 'assessmentResults' },
      { _id: 'c-105', _component: 'assessmentResults' },
      { _type: 'course', _globals: { _components: { _assessmentResults: {} } } }
    ]
  });

  testStopWhere('no assessmentResults components', {
    fromPlugins: [{ name: 'adapt-contrib-assessmentResults', version: '5.1.1' }],
    content: [{ _component: 'other' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-assessmentResults', version: '5.1.2' }]
  });
});

describe('adapt-contrib-assessmentResults - v5.1.7 > v5.2.0', async () => {
  let assessmentResults;

  whereFromPlugin('adapt-contrib-assessmentResults - from v5.1.7', { name: 'adapt-contrib-assessmentResults', version: '<5.2.0' });

  whereContent('adapt-contrib-assessmentResults - where assessmentResultInstance', async content => {
    assessmentResults = getComponents('assessmentResults');
    return assessmentResults.length;
  });

  mutateContent('adapt-contrib-assessmentResults - add assessmentResultInstance._bands.feedbackNotFinal attribute', async () => {
    assessmentResults.forEach(assessmentResultInstance => {
      if (!assessmentResultInstance._bands) return;
      assessmentResultInstance._bands.forEach(item => {
        item.feedbackNotFinal = '';
      });
    });
    return true;
  });

  checkContent('adapt-contrib-assessmentResults - check add assessmentResultInstance._bands.feedbackNotFinal atrribute', async () => {
    const isValid = assessmentResults.every(assessmentResultInstance => {
      if (!assessmentResultInstance._bands) return true;
      return assessmentResultInstance._bands.every(item => item.feedbackNotFinal !== undefined);
    });
    if (!isValid) throw new Error('adapt-contrib-assessmentResults - feedbackNotFinal not added to every instance of assessmentResultInstance._bands');
    return true;
  });

  updatePlugin('adapt-contrib-assessmentResults - update to v5.2.0', { name: 'adapt-contrib-assessmentResults', version: '5.2.0', framework: '>=5.19.1' });

  testSuccessWhere('correct version with/without assessmentResults._bands', {
    fromPlugins: [{ name: 'adapt-contrib-assessmentResults', version: '5.1.7' }],
    content: [
      { _id: 'c-100', _component: 'assessmentResults', _bands: [ { _score: 0 } ] },
      { _id: 'c-105', _component: 'assessmentResults' }
    ]
  });

  testStopWhere('no assessmentResults components', {
    fromPlugins: [{ name: 'adapt-contrib-assessmentResults', version: '5.1.7' }],
    content: [{ _component: 'other' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-assessmentResults', version: '5.2.0' }]
  });
});

describe('adapt-contrib-assessmentResults - v5.2.0 > v5.2.1', async () => {
  let assessmentResults;
  const originalCompletionBody = 'This component you\'re reading is a results component.<br>You have finished the assessment.<br>You scored {{{score}}} out of {{{maxScore}}}. {{{feedback}}}';
  const newCompletionBody = 'This component you\'re reading is a results component.<br>You have finished the assessment.<br>You scored {{score}} out of {{maxScore}}. {{{feedback}}}';

  whereFromPlugin('adapt-contrib-assessmentResults - from v5.2.0', { name: 'adapt-contrib-assessmentResults', version: '<5.2.1' });

  whereContent('adapt-contrib-assessmentResults - where assessmentResult', async content => {
    assessmentResults = getComponents('assessmentResults');
    return assessmentResults.length;
  });

  mutateContent('adapt-contrib-assessmentResults - modify assessmentResult._completionBody default', async () => {
    assessmentResults.forEach(assessmentResult => {
      if (!_.has(assessmentResult, '_completionBody')) return _.set(assessmentResult, '_completionBody', newCompletionBody);
      if (assessmentResult._completionBody !== originalCompletionBody) return;
      assessmentResult._completionBody = newCompletionBody;
    });
    return true;
  });

  checkContent('adapt-contrib-assessmentResults - check assessmentResult._completionBody atrribute', async () => {
    const isValid = assessmentResults.every(({ _completionBody }) => _completionBody !== undefined);
    if (!isValid) throw new Error('adapt-contrib-assessmentResults - _completionBody not modified in every instance of assessmentResult');
    return true;
  });

  updatePlugin('adapt-contrib-assessmentResults - update to v5.2.1', { name: 'adapt-contrib-assessmentResults', version: '5.2.1', framework: '>=5.19.1' });

  testSuccessWhere('correct version with/without/custom/blank assessmentResults._completionBody components', {
    fromPlugins: [{ name: 'adapt-contrib-assessmentResults', version: '5.2.0' }],
    content: [
      { _id: 'c-100', _component: 'assessmentResults', _completionBody: originalCompletionBody },
      { _id: 'c-105', _component: 'assessmentResults', _completionBody: 'Custom _completionBody' },
      { _id: 'c-110', _component: 'assessmentResults', _completionBody: '' },
      { _id: 'c-115', _component: 'assessmentResults' }
    ]
  });

  testStopWhere('no assessmentResults components', {
    fromPlugins: [{ name: 'adapt-contrib-assessmentResults', version: '5.2.0' }],
    content: [{ _component: 'other' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-assessmentResults', version: '5.2.1' }]
  });
});
