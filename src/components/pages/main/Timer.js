/*
Error Log

1: Warning: Can't call setState on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the Timer component. console.<computed> @ index.js:1 r @ react_devtools_backend.js:6 printWarning @ react.development.js:315 error @ react.development.js:287 warnNoop @ react.development.js:342 enqueueSetState @ react.development.js:413 push../node_modules/react/cjs/react.development.js.Component.setState @ react.development.js:471 Timer.onKeyUp @ Timer.js:70 dispatch @ jquery.js:5428 elemData.handle @ jquery.js:5232
    - Most likely something to do with using setState in setInterval.status-line


2: Need to fix double keyboard input.
*/

import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import PropTypes from 'prop-types';
import $ from 'jquery';
import './Main.css';

class Timer extends Component {
    DEFAULT = 0;
    RELEASED = 1;
    PRESSED = 2;

    constructor(props) {
        super(props);
        this.onSolved = this.props.onSolved;
        this.state = {
            time: 0,
            start: 0,
            isOn: false,
            spaceStatus: this.DEFAULT
        }
        this.timer = -1;

        this.getFormattedTime = this.getFormattedTime.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        $(document).on('keydown', this.onKeyDown);
        $(document).on('keyup', this.onKeyUp);
    }

    componentWillUnmount() {
        if (this.timer != -1) {
            clearInterval(this.timer);
        }
    }

    onKeyDown = e => {
        console.log('Down');
        let key = e.keyCode || e.charCode || 0;

        if (key === 32) {
            if (this.state.isOn) {
                if (this.state.registerSpace) {
                    clearInterval(this.timer);
                    this.timer = -1;
    
                    let state = this.state;
                    state.isOn = false;
                    state.registerSpace = true;
                    this.setState(state);
                    this.forceUpdate();
                    this.props.onSolved();
                }
            }
            else {
                $('#time').css('color', 'green');
            }
        }
    }

    onKeyUp = e => {
        console.log('Up');
        let key = e.keyCode || e.charCode || 0;

        if (key === 32 && !this.state.isOn) {
            if (this.state.spaceBuffer) {
                let state = this.state;
                state.spaceBuffer = false;
                state.endRegistered = false;
                this.setState(state);
            }
            else {
                $('#time').css('color', 'black');
                
                let state = this.state;
                state.time = 0;
                state.start = Date.now();
                state.isOn = true;
                this.setState(state);

                this.timer = setInterval(() => {
                    let state = this.state;
                    state.time = Date.now() - state.start;
                    this.setState(state);
                }, 10);
            }
        }
    };

    getFormattedTime() {
        let secs = this.state.time / 1000;
        let mins = Math.floor(secs / 60);

        if (mins === 0) {
            return secs.toFixed(2);
        }
        else {
            secs -= 60 * mins;
            return `${mins}:${secs.toFixed(2)}`;
        }
    }

    render() {
        return (
            <Jumbotron id='timer-container' fluid>
            <h1 id='time'>{this.getFormattedTime()}</h1>
            </Jumbotron>
        );
    }
}

Timer.propTypes = {
    onSolved: PropTypes.func.isRequired
};

export default Timer;