import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin, getCourse, getComponents } from 'adapt-migrations';
import _ from 'lodash';

describe('adapt-contrib-assessmentResults - v2.4.0 > v3.0.0', async () => {
  let course, courseAssessmentResultsGlobals, assessmentResults;

  whereFromPlugin('adapt-contrib-assessmentResults - from v2.4.0', { name: 'adapt-contrib-assessmentResults', version: '<3.0.0' });

  whereContent('adapt-contrib-assessmentResults - where assessmentResult', async content => {
    assessmentResults = getComponents('assessmentResults');
    return assessmentResults.length;
  });

  mutateContent('adapt-contrib-assessmentResults - modify globals ariaRegion attribute', async (content) => {
    course = getCourse();
    if (!_.has(course, '_globals._components._assessmentResults')) _.set(course, '_globals._components._assessmentResults', {});
    courseAssessmentResultsGlobals = course._globals._components._assessmentResults;

    courseAssessmentResultsGlobals.ariaRegion = 'Assessment results.';
    return true;
  });

  checkContent('adapt-contrib-assessmentResults - modify globals ariaRegion attribute', async (content) => {
    const isValid = courseAssessmentResultsGlobals.ariaRegion === 'Assessment results.';
    if (!isValid) throw new Error('adapt-contrib-assessmentResults globals ariaRegion attribute not modified.');
    return true;
  });

  updatePlugin('adapt-contrib-assessmentResults - update to v3.0.0', { name: 'adapt-contrib-assessmentResults', version: '3.0.0', framework: '>=3.3.0' });
});
