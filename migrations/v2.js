import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

describe('adapt-contrib-assessmentResults - v2.0.0 > v2.0.3', async () => {
  let assessmentResults;

  whereFromPlugin('adapt-contrib-assessmentResults - from v2.0.0', { name: 'adapt-contrib-assessmentResults', version: '<2.0.3' });

  whereContent('adapt-contrib-assessmentResults - where assessmentResults', async content => {
    assessmentResults = content.filter(({ _component }) => _component === 'assessmentResults');
    return assessmentResults.length;
  });

  /**
   * * Add JSON field to component and set blank.
   */
  mutateContent('adapt-contrib-assessmentResults - add assessmentResults._classes', async () => {
    assessmentResults.forEach(assessmentResultInstance => {
      assessmentResultInstance._classes = '';
    });
    return true;
  });

  checkContent('adapt-contrib-assessmentResults - check assessmentResults._classes atrribute', async () => {
    const isValid = assessmentResults.every(({ _classes }) => _classes !== undefined);
    if (!isValid) throw new Error('adapt-contrib-assessmentResults - _classes not added to every instance of assessmentResults');
    return true;
  });

  updatePlugin('adapt-contrib-assessmentResults - update to v2.0.3', { name: 'adapt-contrib-assessmentResults', version: '2.0.3', framework: '>=2.0.0' });
});

describe('adapt-contrib-assessmentResults - v2.0.3 > v2.3.0', async () => {
  let assessmentResults;

  whereFromPlugin('adapt-contrib-assessmentResults - from v2.0.3', { name: 'adapt-contrib-assessmentResults', version: '<2.3.0' });

  whereContent('adapt-contrib-assessmentResults - where assessmentResult', async content => {
    assessmentResults = content.filter(({ _component }) => _component === 'assessmentResult');
    if (assessmentResults) return true;
  });

  /**
   * * Add JSON field to component and set attribute.
   */
  mutateContent('adapt-contrib-assessmentResults - add assessmentResult._setCompletionOn', async () => {
    assessmentResults.forEach(assessmentResult => {
      assessmentResult._setCompletionOn = 'inview';
    });
    return true;
  });

  checkContent('adapt-contrib-assessmentResults - check assessmentResult._classes atrribute', async () => {
    const isValid = assessmentResults.every(({ _setCompletionOn }) => _setCompletionOn === 'inview');
    if (!isValid) throw new Error('adapt-contrib-assessmentResults - _classes not added to every instance of assessmentResult');
    return true;
  });

  updatePlugin('adapt-contrib-assessmentResults - update to v2.3.0', { name: 'adapt-contrib-assessmentResults', version: '2.3.0', framework: '>=2.1.0' });
});
