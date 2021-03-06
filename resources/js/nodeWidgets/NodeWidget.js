import * as React from 'react';
import { PortWidget } from '@projectstorm/react-diagrams';
import Modal from 'react-modal';

import { inject, observer } from "mobx-react"
import NodeWidgetModal from './NodeWidgetModal';

const customStyles = {
    content : {
      'maxWidth': '800px',
      'top': '110px',
      'left': '120px',
      'padding': '0px',
      'backgroundColor': '#F3F4F6',
      //top                   : '25%',
      //left                  : '25%',
      //right                 : 'auto',
      //bottom                : 'auto',
      //marginRight           : '-50%',
      //transform             : 'translate(-50%, -50%)'
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.15)'
    },  
  };

@inject('store')
export default class NodeWidget extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

	render() {
		return (
            <div className={"font-mono text-xxs text-gray-200 " + (this.props.node.isSelected() ? '-ml-3 -mt-3 p-2 border-dashed border-2 border-gray-400' : '')}>
                <div className="flex-grow-0 w-32">
                    {this.renderHeading()}
                    {this.renderInPorts()}                  
                    {this.renderOutPorts()}
                </div>
            </div>
		);
    }

    renderHeading() {
        return (
            <div
                className="flex justify-between items-center pl-4 pr-2 py-1 border border-gray-900 font-bold rounded-lg bg-gray-700"
                onDoubleClick={this.open.bind(this)}
            >
                <span>{this.props.node.getDisplayName()}</span>
                <i className="fas fa-cog"></i>
                {this.renderModal()}
            </div>            
        )
    }
    
    renderInPorts() {
        return Object.values(this.props.node.getInPorts()).map((port) => {
            return (
                <div key={port.options.name} className="flex items-center text-gray-200 mx-2 py-1 border border-gray-900 rounded-lg bg-gray-500">
                    <div className="flex items-center justify-between w-full">
                        <PortWidget className="flex w-4 h-4 hover:bg-gray-400 rounded rounded-full" engine={this.props.engine} port={port} />
                        <span className="flex-1">{port.options.label}</span>
                        <div onClick={e => {this.props.store.setPage('Inspectors')}}>
                            <i className='mr-2 text-malibu-600 fas fa-search hover:cursor'></i>
                        </div>
                    </div>
                </div>                
            )
        })
    }

    renderOutPorts() {
        return Object.values(this.props.node.getOutPorts()).map((port) => {
            return (
                <div key={port.options.name} className="flex items-center text-gray-200 mx-2 py-1 border border-gray-900 rounded-lg bg-gray-500">
                    <div className="flex justify-between w-full">
                        <span className="p-1">{/* just a counter weight */}</span>
                        <span className="pl-2 flex-1">{port.options.label}</span>
                        <PortWidget className="flex w-4 h-4 hover:bg-gray-400 rounded rounded-full" engine={this.props.engine} port={port} />
                    </div>
                </div>                
            )
        })
    }    

    renderModal() {
        return (
            <Modal
                isOpen={this.state.isOpen}
                onRequestClose={this.closeModal.bind(this)}
                style={customStyles}
                contentLabel="HEY EDIT MANIPULATOR"
            >
                    <NodeWidgetModal 
                        node={this.props.node} 
                        closeModal={this.closeModal.bind(this)}
                    />
            </Modal>
        );
    }    

    open() {
        //this.props.store.diagram.engine.model.setLocked(true);

        this.setState({
            isOpen: true
        });
    }

    closeModal() {
        //this.props.store.diagram.engine.model.setLocked(false);

        this.setState({
            isOpen: false
        });
    }    
}

