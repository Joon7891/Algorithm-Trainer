import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";

import './Main.css';

class Main extends Component {
    state = {

    }

    render() {
        return (
            <Container fluid>
            <Row>
                <Col><ScrambleContainer/></Col>
            </Row>
            </Container>
        );
    }
}

class ScrambleContainer extends Component {
    state = {
        current: 'F2 L B2 D2 L\' U2 L\' R2 D2 F2 U R2 F2 R B\' U F L\' B F',
        prev: [],
        next: [],
    }

    constructor(props){
        super(props);
        this.generateScramble = this.generateScramble.bind(this);
        this.prevScramble = this.prevScramble.bind(this);
        this.nextScramble = this.nextScramble.bind(this);
    }

    generateScramble() {
        return Math.random();
    }

    prevScramble() {
        const prevLength = this.state.prev.length;
        this.setState({
            current: this.state.prev[prevLength - 1],
            prev: this.state.prev.slice(0, prevLength - 1),
            next: [this.state.current].concat(this.state.next)
        });
    }

    nextScramble() {
        const nextLength = this.state.next.length;
        const scramble =  nextLength === 0 ? this.generateScramble() : this.state.next[0];
        this.setState({
            current: scramble,
            prev: this.state.prev.concat([this.state.current]),
            next: nextLength === 0 ? [] : this.state.next.slice(1, nextLength)
        });

        document.getElementById('scramble-back').removeAttribute('disabled');
    }

    render() {
        return (
            <Jumbotron className='scrambleBox'>
                <div>
                <h1>{this.state.current}</h1>
                <Button 
                onClick={this.prevScramble} variant='secondary' id='scramble-back' disabled={this.state.prev.length === 0}>
                    <FontAwesomeIcon icon={faCaretLeft}/>
                </Button>

                <Button onClick={this.nextScramble} variant='secondary'>
                    <FontAwesomeIcon icon={faCaretRight}/>
                </Button>
                </div>
            </Jumbotron>    
        )
    }
}

export default Main;