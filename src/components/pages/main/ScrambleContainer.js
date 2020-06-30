import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import './ScrambleContainer.css';
import './Main.css';

class ScrambleContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            current: this.getScramble(),
            prev: [],
            next: [],
        }

        this.currentScramble = this.currentScramble.bind(this);
        this.getScramble = this.getScramble.bind(this);
        this.prevScramble = this.prevScramble.bind(this);
        this.nextScramble = this.nextScramble.bind(this);
        this.onSolved = this.onSolved.bind(this);
    }

    currentScramble() {
        return this.state.current;
    }

    getScramble() {
        let moves = ['U', 'D', 'R', 'L', 'F', 'B'];
        let scramble = '';
        for (let i = 0; i < 20; i++) {
            let code = Math.floor(Math.random() * 12);
            scramble += moves[Math.floor(code / 2)];

            if (code % 2 === 1) scramble += '\'';
            scramble += ' ';
        }

        return scramble;
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
        const scramble =  nextLength === 0 ? this.getScramble() : this.state.next[0];
        this.setState({
            current: scramble,
            prev: this.state.prev.concat([this.state.current]),
            next: nextLength === 0 ? [] : this.state.next.slice(1, nextLength)
        });

        document.getElementById('scramble-back').removeAttribute('disabled');
    }

    onSolved() {
        console.log('asd')

        let { scramble, prev, next } = this.state;

        prev.push(scramble);
        for (let i = 0; i < next.length; i++) {
            prev.push(next[i]);
        }

        scramble = this.getScramble();
        this.setState({ scramble, prev, next });
    }

    render() {
        return (
            <Jumbotron id='scrambleBox' fluid>
                <Container>
                    <Row>
                        <Col id="leftCol">
                            <Button 
                            onClick={this.prevScramble} variant='secondary' id='scramble-back' disabled={this.state.prev.length === 0}>
                                <FontAwesomeIcon icon={faCaretLeft}/>
                            </Button>
                        </Col>
                        <Col id="midCol">
                            <h1>{this.state.current}</h1>
                        </Col>
                        <Col id="rightCol">
                            <Button onClick={this.nextScramble} variant='secondary'>
                                <FontAwesomeIcon icon={faCaretRight}/>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>    
        )
    }
}

export default ScrambleContainer;