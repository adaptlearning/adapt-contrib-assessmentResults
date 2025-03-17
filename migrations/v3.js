import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin, getCourse, getComponents, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('adapt-contrib-assessmentResults - v2.4.0 > v3.0.0', async () => {
  let course, courseAssessmentResultsGlobals, assessmentResults;
  const newAriaRegion = 'Assessment results.';

  whereFromPlugin('adapt-contrib-assessmentResults - from v2.4.0', { name: 'adapt-contrib-assessmentResults', version: '<3.0.0' });

  whereContent('adapt-contrib-assessmentResults - where assessmentResult', async content => {
    assessmentResults = getComponents('assessmentResults');
    course = getCourse();
    return assessmentResults.length;
  });

  mutateContent('adapt-contrib-assessmentResults - add globals ariaRegion attribute', async (content) => {
    if (!_.has(course, '_globals._components._assessmentResults')) _.set(course, '_globals._components._assessmentResults', {});
    courseAssessmentResultsGlobals = course._globals._components._assessmentResults;
    courseAssessmentResultsGlobals.ariaRegion = newAriaRegion;
    return true;
  });

  checkContent('adapt-contrib-assessmentResults - modify globals ariaRegion attribute', async (content) => {
    const isValid = courseAssessmentResultsGlobals.ariaRegion === newAriaRegion;
    if (!isValid) throw new Error('adapt-contrib-assessmentResults globals ariaRegion attribute not modified.');
    return true;
  });

  updatePlugin('adapt-contrib-assessmentResults - update to v3.0.0', { name: 'adapt-contrib-assessmentResults', version: '3.0.0', framework: '>=3.3.0' });

  testSuccessWhere('correct version with empty assessmentResults components/course', {
    fromPlugins: [{ name: 'adapt-contrib-assessmentResults', version: '2.4.0' }],
    content: [
      { _id: 'c-100', _component: 'assessmentResults' },
      { _id: 'c-105', _component: 'assessmentResults' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('correct version with/without assessmentResults._retry and empty globals', {
    fromPlugins: [{ name: 'adapt-contrib-assessmentResults', version: '2.4.0' }],
    content: [
      { _id: 'c-100', _component: 'assessmentResults', retry: {} },
      { _id: 'c-105', _component: 'assessmentResults' },
      { _type: 'course', _globals: { _components: { _assessmentResults: {} } } }
    ]
  });

  testStopWhere('no assessmentResults components', {
    fromPlugins: [{ name: 'adapt-contrib-assessmentResults', version: '2.4.0' }],
    content: [{ _component: 'other' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-assessmentResults', version: '3.0.0' }]
  });
});
