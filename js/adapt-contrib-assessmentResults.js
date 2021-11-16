import Adapt from 'core/js/adapt';
import AssessmentResultsModel from './assessmentResultsModel';
import AssessmentResultsView from './assessmentResultsView';

export default Adapt.register('assessmentResults', {
  model: AssessmentResultsModel,
  view: AssessmentResultsView
});
