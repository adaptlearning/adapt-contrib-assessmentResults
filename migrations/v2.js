import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin, getComponents, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('adapt-contrib-assessmentResults - v2.0.0 > v2.0.3', async () => {
  let assessmentResults;

  whereFromPlugin('adapt-contrib-assessmentResults - from v2.0.0', { name: 'adapt-contrib-assessmentResults', version: '<2.0.3' });

  whereContent('adapt-contrib-assessmentResults - where assessmentResults', async content => {
    assessmentResults = getComponents('assessmentResults');
    return assessmentResults.length;
  });

  mutateContent('adapt-contrib-assessmentResults - add assessmentResults._classes', async () => {
    assessmentResults.forEach(assessmentResult => {
      assessmentResult._classes = '';
    });
    return true;
  });

  checkContent('adapt-contrib-assessmentResults - check assessmentResults._classes atrribute', async () => {
    const isValid = assessmentResults.every(({ _classes }) => _classes !== undefined);
    if (!isValid) throw new Error('adapt-contrib-assessmentResults - _classes not added to every instance of assessmentResults');
    return true;
  });

  updatePlugin('adapt-contrib-assessmentResults - update to v2.0.3', { name: 'adapt-contrib-assessmentResults', version: '2.0.3', framework: '>=2.0.0' });

  testSuccessWhere('correct version with empty assessmentResults components', {
    fromPlugins: [{ name: 'adapt-contrib-assessmentResults', version: '2.0.0' }],
    content: [
      { _id: 'c-100', _component: 'assessmentResults' },
      { _id: 'c-105', _component: 'assessmentResults' }
    ]
  });

  testStopWhere('no assessmentResults components', {
    fromPlugins: [{ name: 'adapt-contrib-assessmentResults', version: '2.0.0' }],
    content: [{ _component: 'other' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-assessmentResults', version: '2.0.3' }]
  });
});

describe('adapt-contrib-assessmentResults - v2.0.3 > v2.3.0', async () => {
  let assessmentResults;

  whereFromPlugin('adapt-contrib-assessmentResults - from v2.0.3', { name: 'adapt-contrib-assessmentResults', version: '<2.3.0' });

  whereContent('adapt-contrib-assessmentResults - where assessmentResult', async content => {
    assessmentResults = getComponents('assessmentResults');
    return assessmentResults.length;
  });

  mutateContent('adapt-contrib-assessmentResults - add assessmentResult._setCompletionOn', async () => {
    assessmentResults.forEach(assessmentResult => {
      assessmentResult._setCompletionOn = 'inview';
    });
    return true;
  });

  checkContent('adapt-contrib-assessmentResults - check assessmentResult._setCompletionOn atrribute', async () => {
    const isValid = assessmentResults.every(({ _setCompletionOn }) => _setCompletionOn === 'inview');
    if (!isValid) throw new Error('adapt-contrib-assessmentResults - _setCompletionOn not added to every instance of assessmentResult');
    return true;
  });

  updatePlugin('adapt-contrib-assessmentResults - update to v2.3.0', { name: 'adapt-contrib-assessmentResults', version: '2.3.0', framework: '>=2.1.0' });

  testSuccessWhere('correct version with empty assessmentResults components', {
    fromPlugins: [{ name: 'adapt-contrib-assessmentResults', version: '2.0.3' }],
    content: [
      { _id: 'c-100', _component: 'assessmentResults' },
      { _id: 'c-105', _component: 'assessmentResults' }
    ]
  });

  testStopWhere('no assessmentResults components', {
    fromPlugins: [{ name: 'adapt-contrib-assessmentResults', version: '2.0.3' }],
    content: [{ _component: 'other' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-assessmentResults', version: '2.3.0' }]
  });
});

describe('adapt-contrib-assessmentResults - v2.3.1 > v2.4.0', async () => {
  let assessmentResults;

  whereFromPlugin('adapt-contrib-assessmentResults - from v2.3.0', { name: 'adapt-contrib-assessmentResults', version: '<2.4.0' });

  whereContent('adapt-contrib-assessmentResults - where assessmentResult', async content => {
    assessmentResults = getComponents('assessmentResults');
    return assessmentResults.length;
  });

  mutateContent('adapt-contrib-assessmentResults - add assessmentResult._retry._routeToAssessment', async () => {
    assessmentResults.forEach(assessmentResult => {
      _.set(assessmentResult, '_retry._routeToAssessment', false);
    });
    return true;
  });

  mutateContent('adapt-contrib-assessmentResults - add assessmentResult._resetType', async () => {
    assessmentResults.forEach(assessmentResult => {
      assessmentResult._resetType = 'inherit';
    });
    return true;
  });

  checkContent('adapt-contrib-assessmentResults - check assessmentResult._retry._routeToAssessment atrribute', async () => {
    const isValid = assessmentResults.every(assessmentResult =>
      assessmentResult._retry._routeToAssessment === false
    );
    if (!isValid) throw new Error('adapt-contrib-assessmentResults - _routeToAssessment not added to every instance of assessmentResult');
    return true;
  });

  checkContent('adapt-contrib-assessmentResults - check assessmentResult._resetType atrribute', async () => {
    const isValid = assessmentResults.every(({ _resetType }) => _resetType === 'inherit');
    if (!isValid) throw new Error('adapt-contrib-assessmentResults - _resetType not added to every instance of assessmentResult');
    return true;
  });

  updatePlugin('adapt-contrib-assessmentResults - update to v2.4.0', { name: 'adapt-contrib-assessmentResults', version: '2.4.0', framework: '>=2.1.0' });

  testSuccessWhere('correct version with empty assessmentResults components', {
    fromPlugins: [{ name: 'adapt-contrib-assessmentResults', version: '2.3.1' }],
    content: [
      { _id: 'c-100', _component: 'assessmentResults' },
      { _id: 'c-105', _component: 'assessmentResults' }
    ]
  });

  testSuccessWhere('correct version with/without assessmentResults._retry', {
    fromPlugins: [{ name: 'adapt-contrib-assessmentResults', version: '2.3.1' }],
    content: [
      { _id: 'c-100', _component: 'assessmentResults', retry: {} },
      { _id: 'c-105', _component: 'assessmentResults' }
    ]
  });

  testStopWhere('no assessmentResults components', {
    fromPlugins: [{ name: 'adapt-contrib-assessmentResults', version: '2.3.1' }],
    content: [{ _component: 'other' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-assessmentResults', version: '2.4.0' }]
  });
});
