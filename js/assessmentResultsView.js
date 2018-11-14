setupInviewCompletiondefine([
    'core/js/adapt',
    'core/js/views/componentView'
], function(Adapt, ComponentView) {

    var AssessmentResultsView = ComponentView.extend({

        events: {
            'click .results-retry-button button': 'onRetryClicked'
        },

        preRender: function () {
            this.model.setLocking('_isVisible', false);

            this.listenTo(Adapt, 'preRemove', function () {
                this.model.unsetLocking('_isVisible');
            });

            this.listenTo(this.model, {
                'change:_feedbackBand': this.addClassesToArticle,
                'change:body': this.render
            });

            this.model.checkIfAssessmentComplete();
        },

        postRender: function() {
            this.setReadyStatus();
            this.setupInviewCompletion('.component-inner', this.model.checkCompletion.bind(this.model));
        },

        onRetryClicked: function() {
            var assessmentId = this.model.get('_state').id;
            Adapt.assessment.get(assessmentId).reset();
        },

        /**
         * If there are classes specified for the feedback band, apply them to the containing article
         * This allows for custom styling based on the band the user's score falls into
         */
        addClassesToArticle: function(model, value) {
            if (!value._classes) return;

            this.$el.parents('.article').addClass(value._classes);
        }

    }, {
        template: 'assessmentResults'
    });

    return AssessmentResultsView;
});
