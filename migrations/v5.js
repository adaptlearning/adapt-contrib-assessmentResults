import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

describe('adapt-contrib-assessmentResults - v3.0.0 > v5.2.0', async () => {
  let assessmentResults;

  whereFromPlugin('adapt-contrib-assessmentResults - from v3.0.0', { name: 'adapt-contrib-assessmentResults', version: '<5.2.0' });

  whereContent('adapt-contrib-assessmentResults - where assessmentResultInstance', async content => {
    assessmentResults = content.filter(({ _component }) => _component === 'assessmentResults');
    return assessmentResults.length
  });

  /**
   * * Add field to each item in a JSON array and set blank.
   */
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
