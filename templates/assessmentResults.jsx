import React from 'react';
import { compile, templates } from 'core/js/reactHelpers';

export default function AssessmentResults (props) {
  const {
    _globals,
    _retry,
    retryFeedback,
    _isRetryEnabled
  } = props;

  return (
    <div className="component__inner assessmentresults__inner">

      <templates.header {...props} />

      <div className="component__widget assessmentresults__widget">

        {_isRetryEnabled &&
          <div className="component__feedback assessmentresults__feedback">
            <div className="component__feedback-inner assessmentresults__feedback-inner">

              {retryFeedback &&
                <div className="assessmentresults__retry-feedback">
                  <div className="assessmentresults__retry-feedback-inner" dangerouslySetInnerHTML={{ __html: compile(retryFeedback, props) }} />
                </div>
              }

              <button className="btn-text assessmentresults__retry-btn js-assessment-retry-btn">
                <span>
                  {_retry.button || _globals._components._assessmentResults.retryText}
                </span>
              </button>

            </div>
          </div>
        }

      </div>
    </div>

  );
}
