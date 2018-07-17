import * as React from 'react';

import './activity.component.less';
import Constants from '../../constants';
import { Markers } from './markers/markers.component';

export class Activity extends React.Component {

    state: {
        sentences: string[],
        selectedOption: string,
        markerStates: any[],
        attemptCount: number,
        correctMarkers: {
            type: string,
            idx: any[]
        }[],
        tickCrossStates: string[],
        hasTickCross: boolean
    };
    props: {
        questionSets: {
            sentences: string[],
            correctMarkers: {
                type: string,
                idx: any[]
            }[]
        }[],
        currentPageIdx: number,
        enableNextQuestion: Function
    };
    question: string = 'Highlight the proper nouns';
    activityDone: boolean = false;

    constructor(props: any) {
        super(props);

        this.state = {
            sentences: this.props.questionSets[this.props.currentPageIdx].sentences,
            selectedOption: 'word-highlight',
            markerStates: this.resetMarkers(this.props.questionSets[this.props.currentPageIdx].sentences),
            correctMarkers: this.props.questionSets[this.props.currentPageIdx].correctMarkers,
            tickCrossStates: [],
            attemptCount: 0,
            hasTickCross: false
        };
        this.setSelectedOption = this.setSelectedOption.bind(this);
        this.markWord = this.markWord.bind(this);
        this.markChar = this.markChar.bind(this);
        this.validateMarkers = this.validateMarkers.bind(this);
        this.clearMarkers = this.clearMarkers.bind(this);
    }

    componentWillReceiveProps(newProps: {
        currentPageIdx: number,
        questionSets: {
            correctMarkers: any[],
            sentences: string[]
        }[]
    }) {
        if (this.props.currentPageIdx !== newProps.currentPageIdx) {
            this.activityDone = false;
            this.setState({
                sentences: newProps.questionSets[newProps.currentPageIdx].sentences,
                markerStates: this.resetMarkers(newProps.questionSets[newProps.currentPageIdx].sentences),
                tickCrossStates: [],
                attemptCount: 0,
                correctMarkers: newProps.questionSets[newProps.currentPageIdx].correctMarkers
            });
        }
    }

    resetMarkers(sentences: string[]) {
        let structure: any[][] = [];
        sentences.map((item: string) => {
            structure.push([]);
        });
        return structure;
    }

    clearMarkers() {
        this.setState({
            markerStates: this.resetMarkers(this.props.questionSets[this.props.currentPageIdx].sentences),
            tickCrossStates: [],
            hasTickCross: false
        });
    }

    setSelectedOption(value: string) {
        this.setState({
            selectedOption: value
        });
    }

    findExistingMarker(currentStatementStates: any, currentDOM: HTMLSpanElement, markerToSet?: string) {
        return currentStatementStates.findIndex((obj: {
            wordIdx: string,
            charIdx: string,
            type: string
        }) => {
            if (typeof obj.charIdx !== 'undefined') {
                return (obj.wordIdx === currentDOM.parentElement.getAttribute('word-index') && obj.charIdx === currentDOM.getAttribute('char-index') && (typeof markerToSet !== 'undefined' ? obj.type === markerToSet : true));
            } else {
                return (obj.wordIdx === currentDOM.getAttribute('word-index') && (typeof markerToSet !== 'undefined' ? obj.type === markerToSet : true));
            }
        });
    }

    markWord(currentDOM: HTMLSpanElement) {
        let markerToSet = '';
        if (this.state.selectedOption === 'word-highlight') {
            markerToSet = 'highlighted';
        } else if (this.state.selectedOption === 'word-underline') {
            markerToSet = 'underlined';
        }
        this.setState((state: any) => {
            let currentStamentStates = state.markerStates[parseInt(currentDOM.parentElement.getAttribute('statement-index'))];
            if (this.findExistingMarker(currentStamentStates, currentDOM, markerToSet) === -1) {
                currentStamentStates.push({
                    type: markerToSet,
                    wordIdx: currentDOM.getAttribute('word-index')
                });
                return {
                    markerStates: state.markerStates
                };
            }
        });
    }

    markChar(event: React.MouseEvent<HTMLSpanElement>) {
        event.stopPropagation();
        let markerToSet = '',
            currentDOM = event.target as HTMLSpanElement;
        if (this.state.selectedOption === 'eraser') {
            this.eraseMark(currentDOM, this.state.markerStates[parseInt(currentDOM.parentElement.parentElement.getAttribute('statement-index'))]);
            return;
        } else if (this.state.selectedOption === 'letter-highlight') {
            markerToSet = 'colored';
        } else if (this.state.selectedOption === 'letter-divide') {
            markerToSet = 'divider';
        }
        markerToSet ? this.setState((state: any) => {
            let currentStamentStates = state.markerStates[parseInt(currentDOM.parentElement.parentElement.getAttribute('statement-index'))];
            if (this.findExistingMarker(currentStamentStates, currentDOM, markerToSet) === -1) {
                currentStamentStates.push({
                    type: markerToSet,
                    wordIdx: currentDOM.parentElement.getAttribute('word-index'),
                    charIdx: currentDOM.getAttribute('char-index')
                });
                return {
                    markerStates: state.markerStates
                };
            }
        }) : this.markWord(currentDOM.parentElement);
    }

    eraseMark(currentDOM: HTMLSpanElement, currentElementStates: any[]) {
        this.setState((state: any) => {
            let isFound = false;
            const currentElementStates = state.markerStates[parseInt(currentDOM.parentElement.parentElement.getAttribute('statement-index'))];
            currentElementStates.map((obj: any, idx: number) => {
                if (typeof obj.charIdx !== 'undefined') {
                    if (obj.charIdx === currentDOM.getAttribute('char-index') && obj.wordIdx === currentDOM.parentElement.getAttribute('word-index')) {
                        currentElementStates.splice(idx, 1);
                        isFound = true;
                    }
                } else if (obj.wordIdx === currentDOM.parentElement.getAttribute('word-index')) {
                    currentElementStates.splice(idx, 1);
                    isFound = true;
                }
            });
            if (isFound) {
                return {
                    markerStates: state.markerStates
                };
            }
        });
    }

    setMarker(statementIdx: number, wordIdx: number, charIdx?: number) {
        let classToAdd = '',
            sentenceMarkers = this.state.markerStates[statementIdx];
        if (sentenceMarkers.length) {
            if (typeof charIdx === 'undefined') {
                sentenceMarkers.find((obj: any) => {
                    classToAdd += parseInt(obj.wordIdx) === wordIdx ? ' ' + obj.type : '';
                });
            } else {
                sentenceMarkers.find((obj: any) => {
                    classToAdd += (parseInt(obj.wordIdx) === wordIdx && parseInt(obj.charIdx) === charIdx) ? ' ' + obj.type : '';
                });
            }
        }
        return classToAdd;
    }

    showCorrectMarkers() {
        this.state.attemptCount = 0;
        this.activityDone = true;
        this.state.markerStates = this.resetMarkers(this.props.questionSets[this.props.currentPageIdx].sentences);
        this.state.correctMarkers.map((marker: {
            type: string,
            idx: any[][]
        }, currentIdx: number) => {
            marker.idx.map((idxArr: any[], index: number) => {
                idxArr.map((currentIdx: any) => {
                    this.state.markerStates[index].push((() => {
                        switch (marker.type) {
                            case 'word-highlight':
                                return {
                                    type: 'highlighted',
                                    wordIdx: '' + currentIdx
                                };
                            case 'word-underline':
                                return {
                                    type: 'underlined',
                                    wordIdx: '' + currentIdx
                                };
                            case 'letter-highlight':
                                return {
                                    type: 'colored',
                                    wordIdx: '' + currentIdx.wordIdx,
                                    charIdx: '' + currentIdx.charIdx
                                };
                            case 'letter-divide':
                                return {
                                    type: 'divider',
                                    wordIdx: '' + currentIdx.wordIdx,
                                    charIdx: '' + currentIdx.charIdx
                                };
                        }
                    })());
                });
            });
            this.state.tickCrossStates[currentIdx] = 'correct';
        });
    }

    validateMarkers() {
        this.state.tickCrossStates = [];
        if (++this.state.attemptCount == 2) {
            this.showCorrectMarkers();
        } else {
            let isIncorrect: boolean[] = [],
                wordCheckerByUserInput = (sentenceIdx: number, entryIdx: number, currentIdx: string) => {
                    if (this.state.correctMarkers[sentenceIdx].idx[entryIdx].indexOf(parseInt(currentIdx)) === -1) {
                        isIncorrect.push(true);
                    }
                },
                charCheckerByUserInput = (sentenceIdx: number, entryIdx: number, currentWordIdx: string, currentCharIdx: string) => {
                    if (this.state.correctMarkers[sentenceIdx].idx[entryIdx].findIndex((item: {
                        wordIdx: number,
                        charIdx: number
                    }) => {
                        return (item.wordIdx === parseInt(currentWordIdx) && (item.charIdx === parseInt(currentCharIdx)));
                    }) === -1) {
                        isIncorrect.push(true);
                    }
                },
                checkByCorrectAnswers = (sentence: any, idxArr: any[], type: string) => {
                    idxArr.map((correctIdx: any) => {
                        if (sentence.findIndex((currentObj: {
                            type: string,
                            wordIdx: string,
                            charIdx: string
                        }) => {
                            if (typeof correctIdx === 'number') {
                                return (currentObj.type === type && parseInt(currentObj.wordIdx) === correctIdx);
                            } else {
                                return (currentObj.type === type && parseInt(currentObj.wordIdx) === correctIdx.wordIdx && parseInt(currentObj.charIdx) === correctIdx.charIdx);
                            }
                        }) === -1) {
                            isIncorrect.push(true);
                        }
                    });
                };

            this.state.markerStates.map((sentence: any, idx: number) => {
                sentence.map((obj: {
                    type: string,
                    wordIdx: string,
                    charIdx: string
                }) => {
                    if (typeof obj.charIdx === 'undefined') {
                        (obj.type === 'highlighted') ? wordCheckerByUserInput(0, idx, obj.wordIdx) : (obj.type === 'underlined') ? wordCheckerByUserInput(1, idx, obj.wordIdx) : '';
                    } else {
                        (obj.type === 'colored') ? charCheckerByUserInput(2, idx, obj.wordIdx, obj.charIdx) : (obj.type === 'divider') ? charCheckerByUserInput(3, idx, obj.wordIdx, obj.charIdx) : '';
                    }
                });

                this.state.correctMarkers.map((correctObj: {
                    type: string,
                    idx: any[]
                }) => {
                    switch (correctObj.type) {
                        case 'word-highlight':
                            checkByCorrectAnswers(sentence, (typeof correctObj.idx[idx] !== 'undefined' ? correctObj.idx[idx] : []), 'highlighted');
                            break;
                        case 'word-underline':
                            checkByCorrectAnswers(sentence, (typeof correctObj.idx[idx] !== 'undefined' ? correctObj.idx[idx] : []), 'underlined');
                            break;
                        case 'letter-highlight':
                            checkByCorrectAnswers(sentence, (typeof correctObj.idx[idx] !== 'undefined' ? correctObj.idx[idx] : []), 'colored');
                            break;
                        case 'letter-divide':
                            checkByCorrectAnswers(sentence, (typeof correctObj.idx[idx] !== 'undefined' ? correctObj.idx[idx] : []), 'divider');
                            break;
                        default:
                            return;
                    }
                });

                (!this.state.markerStates[idx].length || isIncorrect.length) ? this.state.tickCrossStates.push('incorrect') : this.state.tickCrossStates.push('correct');
                isIncorrect = [];
            });
        }

        if (this.state.tickCrossStates.length && this.state.tickCrossStates.indexOf('incorrect') === -1) {
            this.activityDone = true;
            this.props.enableNextQuestion();
        }

        this.setState({
            hasTickCross: true,
            markerStates: this.state.markerStates,
            attemptCount: this.state.attemptCount,
            tickCrossStates: this.state.tickCrossStates
        });
    }

    render() {
        let tickCrossDOM: Function;
        if (this.state.hasTickCross) {
            tickCrossDOM = (idx1: number) => <img src={this.state.tickCrossStates[idx1] === 'correct' ? '../../assets/tick.png' : this.state.tickCrossStates[idx1] === 'incorrect' ? '../../assets/red-cross-button.png' : ''} />;
        } else {
            tickCrossDOM = () => { };
        }
        console.log(this.state.markerStates);
        return (
            <div className="activity-container" >
                <h2 className="question">
                    {this.question}
                </h2>
                <div className="statements-container">
                    {
                        this.state.sentences.map((item: string, idx1: number) => {
                            let wordCount = item.split(' ').length;
                            return <React.Fragment key={'moon2' + idx1}><span className="tick-cross">{tickCrossDOM(idx1)}</span><p className="sentence" key={'moon' + idx1} statement-index={idx1}>{item.split(' ').map((item, idx2) => {
                                let letterCount = item.split('').length,
                                    selectedOptionClass = `word${this.state.selectedOption === 'word-highlight' ? ' highlight' : this.state.selectedOption === 'word-underline' ? ' underline' : ''}${this.setMarker(idx1, idx2)}`;
                                return <React.Fragment key={'moon2' + idx2}>
                                    <span className={selectedOptionClass} tabIndex={(this.state.selectedOption === 'word-highlight' || this.state.selectedOption === 'word-underline') ? 0 : -1} word-index={idx2}>{item.split('').map((item, idx3) => {
                                        let classNames = `${item !== ' ' ? 'character' : ''}${this.state.selectedOption === 'letter-highlight' ? ' highlight' : this.state.selectedOption === 'letter-divide' ? ' divide' : ''}${idx3 === letterCount - 1 ? ' last' : ''}${this.setMarker(idx1, idx2, idx3)}`;
                                        return <span className={classNames} key={'moon' + idx3} tabIndex={(this.state.selectedOption === 'letter-highlight' || this.state.selectedOption === 'letter-divide' || this.state.selectedOption === 'eraser') ? 0 : -1} onClick={this.markChar} char-index={idx3}>{item}</span>;
                                    })}</span>
                                    {idx2 !== wordCount - 1 ? <span>&nbsp;</span> : ''}
                                </React.Fragment>;
                            })}</p><br /></React.Fragment>;
                        })
                    }
                </div>
                <Markers validateMarkers={this.validateMarkers} setSelectedOption={this.setSelectedOption} clearMarkers={this.clearMarkers} activityDone={this.activityDone} />
            </div>
        );
    }
}