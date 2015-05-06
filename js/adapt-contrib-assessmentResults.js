/*
* adapt-contrib-assessmentResults
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Daryl Hedley <darylhedley@hotmail.com>, "Oliver Foster <oliver.foster@kineo.com>"
*/
define(function(require) {

    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');

    var AssessmentResults = ComponentView.extend({

        events: {
            'inview': 'onInview',
            'click .results-retry-button button': 'onRetry'
        },

        preRender: function () {
            this.setupEventListeners();

            this.model.set('_isVisible', false);
        
            this.setupModelResetEvent();
            
        },

        setupModelResetEvent: function() {
            if (this.model.onAssessmentsReset) return;
            this.model.onAssessmentsReset = function(state) {
                if (this.get("_assessmentId") === undefined || 
                    this.get("_assessmentId") != state.id) return;

                this.reset('hard', true);
            };
            this.model.listenTo(Adapt, 'assessments:reset', this.model.onAssessmentsReset);
        },

        postRender: function() {
            this.setReadyStatus();
        },

        setupEventListeners: function() {
            this.listenTo(Adapt, 'assessments:complete', this.onAssessmentsComplete);
            this.listenToOnce(Adapt, 'remove', this.onRemove);
        },

        removeEventListeners: function() {;
            this.stopListening(Adapt, 'assessments:complete', this.onAssessmentsComplete);
            this.stopListening(Adapt, 'remove', this.onRemove);
        },

        onAssessmentsComplete: function(state) {
            if (this.model.get("_assessmentId") === undefined || 
                this.model.get("_assessmentId") != state.id) return;

            this.model.set("_state", state);
            this.setFeedback();

            //show feedback component
            if(!this.model.get('_isVisible')) this.model.set('_isVisible', true, {pluginName: '_results'});
            this.render();
        },

        onAssessmentComplete: function(state) {
            this.model.set("_state", state);
            this.setFeedback();

             //show feedback component
            if(!this.model.get('_isVisible')) this.model.set('_isVisible', true, {pluginName: '_results'});
            this.render();
        },

        onInview: function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                if (visiblePartY === 'top') {
                    this._isVisibleTop = true;
                } else if (visiblePartY === 'bottom') {
                    this._isVisibleBottom = true;
                } else {
                    this._isVisibleTop = true;
                    this._isVisibleBottom = true;
                }
                
                if (this._isVisibleTop || this._isVisibleBottom) {
                    this.setCompletionStatus();
                    this.$el.off("inview");
                }
            }
        },

        onRetry: function() {
            var state = this.model.get("_state");
            var assessmentModel = Adapt.assessment.get(state.id);

            assessmentModel.reset();
        },

        setFeedback: function() {

            var completionBody = this.model.get("_completionBody");
            var feedbackBand = this.getFeedbackBand();

            var state = this.model.get("_state");
            state.feedbackBand = feedbackBand;
            state.feedback = feedbackBand.feedback;

            this.checkRetryEnabled();

            completionBody = this.stringReplace(completionBody, state);

            this.model.set("body", completionBody);

        },

        getFeedbackBand: function() {
            var state = this.model.get("_state");

            var bands = this.model.get("_bands");
            var scoreAsPercent = state.scoreAsPercent;
            
            for (var i = (bands.length - 1); i >= 0; i--) {
                if (scoreAsPercent >= bands[i]._score) {
                    return bands[i];
                }
            }

            return "";
        },

        checkRetryEnabled: function() {
            var state = this.model.get("_state");

            var assessmentModel = Adapt.assessment.get(state.id);
            if (!assessmentModel.canResetInPage()) return false;

            var isRetryEnabled = state.feedbackBand._allowRetry !== false;

            var isAttemptsLeft = (state.attempts === 0 || state.attemptsLeft);

            var showRetry = isRetryEnabled && isAttemptsLeft;
            this.model.set("_isRetryEnabled", showRetry);

            if (showRetry) {
                var retryFeedback =  this.model.get("_retry").feedback;
                retryFeedback = this.stringReplace(retryFeedback, state);
                this.model.set("retryFeedback", retryFeedback);
            } else {
                this.model.set("retryFeedback", "");
            }
        },

        stringReplace: function(string, context) {
            //use handlebars style escaping for string replacement
            //only supports unescaped {{{ attributeName }}} and html escaped {{ attributeName }}
            //will string replace recursively until no changes have occured

            var changed = true;
            while (changed) {
                changed = false;
                for (var k in context) {
                    var contextValue = context[k];

                    switch (typeof contextValue) {
                    case "object":
                        continue;
                    case "number":
                        contextValue = Math.floor(contextValue);
                        break;
                    }

                    var regExNoEscaping = new RegExp("((\\{\\{\\{){1}[\\ ]*"+k+"[\\ ]*(\\}\\}\\}){1})","g");
                    var regExEscaped = new RegExp("((\\{\\{){1}[\\ ]*"+k+"[\\ ]*(\\}\\}){1})","g");

                    var preString = string;

                    string = string.replace(regExNoEscaping, contextValue);
                    var escapedText = $("<p>").text(contextValue).html();
                    string = string.replace(regExEscaped, escapedText);

                    if (string != preString) changed = true;

                }
            }

            return string;
        },

        onRemove: function() {
            this.removeEventListeners();
        }
        
    });
    
    Adapt.register("assessmentResults", AssessmentResults);
    
});
