import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

describe('adapt-contrib-assessmentResults - v2.3.0 > v3.0.0', async () => {
  let assessmentResults;

  whereFromPlugin('adapt-contrib-assessmentResults - from v2.3.0', { name: 'adapt-contrib-assessmentResults', version: '<3.0.0' });

  whereContent('adapt-contrib-assessmentResults - where assessmentResult', async content => {
    assessmentResults = content.filter(({ _component }) => _component === 'assessmentResult');
    return assessmentResults.length
  });

  /**
   * * Add JSON field to component and set attribute.
   */
  mutateContent('adapt-contrib-assessmentResults - add assessmentResult._resetType', async () => {
    assessmentResults.forEach(assessmentResult => {
      assessmentResult._resetType = 'inherit';
    });
    return true;
  });

  checkContent('adapt-contrib-assessmentResults - check assessmentResult._resetType atrribute', async () => {
    const isValid = assessmentResults.every(({ _resetType }) => _resetType === 'inherit');
    if (!isValid) throw new Error('adapt-contrib-assessmentResults - _resetType not added to every instance of assessmentResult');
    return true;
  });

  /**
   * * Add JSON field to component and set attribute.
   */
  mutateContent('adapt-contrib-assessmentResults - add assessmentResult._routeToAssessment', async () => {
    assessmentResults.forEach(assessmentResult => {
      assessmentResult._routeToAssessment = false;
    });
    return true;
  });

  checkContent('adapt-contrib-assessmentResults - check assessmentResult._routeToAssessment atrribute', async () => {
    const isValid = assessmentResults.every(({ _routeToAssessment }) => _routeToAssessment === false);
    if (!isValid) throw new Error('adapt-contrib-assessmentResults - _routeToAssessment not added to every instance of assessmentResult');
    return true;
  });

  updatePlugin('adapt-contrib-assessmentResults - update to v3.0.0', { name: 'adapt-contrib-assessmentResults', version: '3.0.0', framework: '>=3.3.0' });
});
