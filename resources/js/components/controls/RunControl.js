import React from 'react';
import { inject, observer } from "mobx-react"
import BaseControl from './BaseControl'
import axios from 'axios';
import {nonCircularJsonStringify} from '../../utils/nonCircularJsonStringify'
import { ToastContainer, toast, Slide } from 'react-toastify';
import Toaster from '../Toaster';


@inject('store') @observer
export default class RunControl extends BaseControl {
    constructor(props) {
        super(props);
        this.title = 'Run story'
        this.icon = 'fas fa-play'
    }

    onClick()
    {
        this.props.store.setRunning()

        axios.post('/datastory/api/run', {
                model: nonCircularJsonStringify(
                    this.props.store.diagram.engine.model.serialize()
                )
          })
          .then((response) => {
                response.data.diagram.nodes.filter(phpNode => {
                    return phpNode.features
                }).forEach(phpNode => {
                    let reactNode = this.props.store.diagram.engine.model.getNode(phpNode.id)
                    reactNode.features = phpNode.features;
                })

                // this.props.store.setInspectables(
                //     inspectables
                // )
                
                this.showSuccessToast();

                this.props.store.setNotRunning()
          })
          .catch(function (error) {

            this.props.store.setNotRunning()
            console.log(error);
          });
    }

    componentDidMount() {
        
        Mousetrap.bind(
            '?', // shift+plus 
            (e) => {
                e.preventDefault()   
                this.onClick()
            }
        );

        Mousetrap.bind(
            'shift+r',
            (e) => {
                this.onClick()
            }
        );        
    }

    showSuccessToast()
    {
        toast.info('Successfully ran story!', {
            position: "bottom-right",
            transition: Slide,
            autoClose: 3500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }
}