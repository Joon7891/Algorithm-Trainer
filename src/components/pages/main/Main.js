import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Timer from './Timer';
import ScrambleContainer from './ScrambleContainer';

import './Main.css';

class Main extends Component {
    state = {}

    constructor() {
        super();
        this.scrambleContainer = React.createRef();
        this.onSolved = this.onSolved.bind(this);
    }

    onSolved() {
        // Add to times and recalculate average, etc...

        // Updating scramble
        this.scrambleContainer.current.onSolved();
    }

    render() {
        return (
            <Container fluid>
                <ScrambleContainer ref={this.scrambleContainer}/>
                <Row className="no-margin-row">
                    <Col md="auto">
                        <Container fluid>
                            <Row>
                                <Container>
                                    <h1>Selector stuff</h1>
                                </Container>
                            </Row>
                            <Row>
                                <Container>
                                    <h1>Actual Times</h1>
                                </Container>
                            </Row>
                        </Container>
                    </Col>
                    <Col>
                        <Timer onSolved={this.onSolved}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Main;