define([
    'core/js/adapt',
    'core/js/views/componentView'
], function(Adapt, ComponentView) {

    var AssessmentResultsView = ComponentView.extend({

        events: {
            'inview': 'onInview',
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
        },

        onInview: function(event, visible, visiblePartX, visiblePartY) {
            if (!visible) return;

            if (visiblePartY === 'top') {
                this._isVisibleTop = true;
            } else if (visiblePartY === 'bottom') {
                this._isVisibleBottom = true;
            } else {
                this._isVisibleTop = true;
                this._isVisibleBottom = true;
            }

            if (this._isVisibleTop || this._isVisibleBottom) {
                this.model.checkCompletion();
                // Sometimes (with mobile and virtual keyboards) inview can be triggered
                // but the component is not _visible = true, so it does not get marked
                // complete. Delay the unbinding of the inview listener until complete
                if (this.model.get('_isComplete')) {
                    this.$el.off('inview');
                }
            }
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
