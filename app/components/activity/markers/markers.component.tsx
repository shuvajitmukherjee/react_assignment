import * as React from 'react';

import './markers.component.less';

export class Markers extends React.Component {

    state: {
        selectedOption: string
    };
    props: {
        setSelectedOption: Function,
        clearMarkers: Function,
        validateMarkers: Function,
        activityDone: boolean
    };

    constructor(props: any) {
        super(props);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleMarkerClearance = this.handleMarkerClearance.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    componentWillMount() {
        this.setState({
            selectedOption: 'word-highlight',
            activityDone: false
        });
    }

    handleOptionChange(event: React.FormEvent<HTMLImageElement>) {
        if (event.type === 'click' || (event.type === 'keyup' && ((event as React.KeyboardEvent<HTMLImageElement>).keyCode === 13) || (event as React.KeyboardEvent<HTMLImageElement>).keyCode === 32)) {
            this.setState({
                selectedOption: (event.target as HTMLImageElement).getAttribute('data-value')
            });
            this.props.setSelectedOption((event.target as HTMLImageElement).getAttribute('data-value'));
        }
    }

    handleMarkerClearance() {
        this.props.clearMarkers();
    }

    handleValidation() {
        this.props.validateMarkers();
    }

    render() {
        return (
            <div className="master-marker-container">
                <div className="markers-container">
                    <div className="highlight">
                        <img className={this.state.selectedOption === 'word-highlight' ? 'img-highlight active' : 'img-highlight'} src="../../../assets/lamp.png" alt="Word Highlight" tabIndex={this.state.selectedOption === 'word-highlight' ? -1 : 0} data-value="word-highlight" onClick={this.handleOptionChange} onKeyUp={this.handleOptionChange} /><br />
                        <span className="img-highlight-lbl" aria-hidden="true">Word Highlight</span>
                    </div>
                    <div className="underline">
                        <img className={this.state.selectedOption === 'word-underline' ? 'img-underline active' : 'img-underline'} src="../../../assets/ruler.png" alt="Word Underline" tabIndex={this.state.selectedOption === 'word-underline' ? -1 : 0} data-value="word-underline" onClick={this.handleOptionChange} onKeyUp={this.handleOptionChange} /><br />
                        <span className="img-underline-lbl" aria-hidden="true">Word Underline</span>
                    </div>
                    <div className="color">
                        <img className={this.state.selectedOption === 'letter-highlight' ? 'img-color active' : 'img-color'} src="../../../assets/paintbrush.png" alt="Letter Highlight" tabIndex={this.state.selectedOption === 'letter-highlight' ? -1 : 0} data-value="letter-highlight" onClick={this.handleOptionChange} onKeyUp={this.handleOptionChange} /><br />
                        <span className="img-color-lbl" aria-hidden="true">Letter Highlight</span>
                    </div>
                    <div className="divide">
                        <img className={this.state.selectedOption === 'letter-divide' ? 'img-divide active' : 'img-divide'} src="../../../assets/saw.png" alt="Letter Divide" data-value="letter-divide" tabIndex={this.state.selectedOption === 'letter-divide' ? -1 : 0} onClick={this.handleOptionChange} onKeyUp={this.handleOptionChange} /><br />
                        <span className="img-divide-lbl" aria-hidden="true">Letter Divide</span>
                    </div>
                    <div className="eraser">
                        <img className={this.state.selectedOption === 'eraser' ? 'img-eraser active' : 'img-eraser'} src="../../../assets/eraser.png" alt="Eraser" data-value="eraser" tabIndex={this.state.selectedOption === 'eraser' ? -1 : 0} onClick={this.handleOptionChange} /><br />
                        <span className="img-eraser-lbl" aria-hidden="true">Eraser</span>
                    </div>
                </div>
                <div className="validators-container">
                    <button className="reset" onClick={this.handleMarkerClearance} disabled={this.props.activityDone}>Reset</button>
                    <button className="ok" onClick={this.handleValidation} disabled={this.props.activityDone}>OK</button>
                </div>
            </div>
        );
    }
}