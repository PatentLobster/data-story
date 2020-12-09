import React from 'react';
import { inject, observer } from "mobx-react"

import StoryWorkbenchControl from './controls/StoryWorkbenchControl';
import InspectorsControl from './controls/InspectorsControl';
import RunControl from './controls/RunControl';
import AddNodeControl from './controls/AddNodeControl'

@inject('store') @observer
export default class Toolbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            progressTick: 0
        }
    }

    render() {
        let navigation = [
            "fas fa-project-diagram",
            "fas fa-table",  
            "fas fa-cog",
        ];

        let controls = [
            "fas fa-play",
            "fas fa-plus",       
            "fas fa-folder-open",       
            "fab fa-github",        
        ]

        return (
            <div className={this.style()}>
                <div className="flex flex-1 w-full px-2 py-2">
                    <StoryWorkbenchControl />
                    <InspectorsControl />
                    <RunControl />
                    <AddNodeControl />                                       
                </div>
                {this.props.store.metadata.running ? (
                    <div className="ml-12 w-full">
                        <div className="relative pt-1">
                            <div className="h-6 mb-4 text-xs flex rounded bg-malibu-600">
                                <div style={this.progressWidth()} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-malibu-700"></div>
                            </div>
                        </div>                    
                    </div>) : ''
                }

            </div>
        );
    }

    style() {
        let style = "flex w-full bg-gray-600 border-t-2 border-gray-500 shadow shadow-xl"

        return style
    }

    componentDidMount() {
        setInterval(() => {
            let newTick = (this.state.progressTick + 1) % 100

            this.setState({
                progressTick: newTick
            })

        }, 10)
    }

    progressWidth() {
        return {
            width: this.state.progressTick + '%'
        }
    }
}