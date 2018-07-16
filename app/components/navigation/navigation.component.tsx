import * as React from 'react';

import Constants from '../../constants';
import './navigation.component.less';

export class Navigation extends React.Component {

    questionSets: {}[] = Constants.questionSets;
    props: {
        setNavIdx: Function,
        lastIdx: number,
        currentPageIdx: number
    };

    constructor(props: any) {
        super(props);

        this.setNavIdx = this.setNavIdx.bind(this);
    }

    setNavIdx(event: React.MouseEvent<HTMLButtonElement>) {
        this.props.setNavIdx((event.target as HTMLButtonElement).value);
    }

    render() {
        let className: string = '';
        return (
            <div className="navigation-container">
                <div className="pagination-container">
                    <button className="prev" onClick={this.setNavIdx} value="prev" disabled={this.props.currentPageIdx === 0}>Prev</button>
                    <div className="page-holders">
                        {
                            this.questionSets.map((item: any[], index: number) => {
                                className = 'page ';
                                if (index < this.props.currentPageIdx) {
                                    className += 'completed ';
                                }
                                if (index === this.props.currentPageIdx) {
                                    className += 'active';
                                }
                                return <span className={className} key={"moon" + index}></span>;
                            })
                        }
                    </div>
                    <button className="next" onClick={this.setNavIdx} value="next" disabled={this.props.currentPageIdx === this.props.lastIdx}>Next</button>
                </div>
            </div>
        )
    }
}