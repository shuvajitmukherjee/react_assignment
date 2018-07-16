import * as React from 'react';

import './app.less';
import Constants from '../constants';
import { Activity } from './activity/activity.component';
import { Navigation } from './navigation/navigation.component';

export class App extends React.Component {

    title: string = 'Grammar: Common and proper nouns';
    questionSets: any[] = Constants.questionSets;
    state: {
        currentPageIdx: number,
        lastIdx: number
    };

    constructor(render: any) {
        super(render);

        this.state = {
            currentPageIdx: 0,
            lastIdx: 0
        };

        this.setNavIdx = this.setNavIdx.bind(this);
        this.enableNextQuestion = this.enableNextQuestion.bind(this);
    }

    setNavIdx(direction: string) {
        this.setState({
            currentPageIdx: direction === 'prev' ? this.state.currentPageIdx - 1 : this.state.currentPageIdx + 1
        });
    }

    enableNextQuestion() {
        if (this.state.currentPageIdx === this.state.lastIdx) {
            this.setState({
                lastIdx: ++this.state.lastIdx
            });
        }
    }

    render() {
        return (
            <div className="master-container">
                <div className="title-container">
                    <h2 className="title">{this.title}</h2>
                    <div className="buttons-container">
                        <button className="help">
                            <i className="fa fa-question-circle"></i></button>
                        <button className="close">
                            <i className="fa fa-times-circle"></i>
                        </button>
                    </div>
                </div>
                <Activity currentPageIdx={this.state.currentPageIdx} questionSets={this.questionSets} enableNextQuestion={this.enableNextQuestion} />
                <Navigation setNavIdx={this.setNavIdx} currentPageIdx={this.state.currentPageIdx} lastIdx={this.state.lastIdx} />
            </div>
        );
    }
}