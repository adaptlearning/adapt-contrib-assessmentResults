import components from 'core/js/components';
import AssessmentResultsModel from './assessmentResultsModel';
import AssessmentResultsView from './assessmentResultsView';

export default components.register('assessmentResults', {
  model: AssessmentResultsModel,
  view: AssessmentResultsView
});
