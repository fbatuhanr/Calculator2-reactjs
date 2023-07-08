import React, {useEffect, useState} from 'react';
import {Button, Col, Container, InputGroup, Row, Form} from "react-bootstrap";

const App = () => {

    const [input, setInput] = useState("");
    const [userInput, setUserInput] = useState("");

    useEffect(() => {

        if(input == "") return;

        if(input.includes('*') || input.includes('/')){

            for (let i=0; i<input.length; i++){

                if(input[i].includes('*')) {
                    findAndEvaluateOperation('*');
                    break;
                }
                else if(input[i].includes('/')) {
                    findAndEvaluateOperation('/');
                    break;
                }
            }
        }
        else if(input.includes('+') || input.includes('-')){

            for (let i=0; i<input.length; i++){

                if(input[i].includes('+')) {
                    findAndEvaluateOperation('+');
                    break;
                }
                else if(input[i].includes('-')) {
                    findAndEvaluateOperation('-');
                    break;
                }
            }
        }
    }, [input]);


    const findAndEvaluateOperation = (operationSymbol) => {

        const operationIndex = input.indexOf(operationSymbol);

        let leftPatternCounter;
        for (leftPatternCounter = operationIndex-1; leftPatternCounter>=0; leftPatternCounter--)
            if(/[*/+-]/.test(input[leftPatternCounter]))
                break;
        let leftPatternNumber = parseInt(input.substring(leftPatternCounter+1, operationIndex));

        let rightPatternCounter;
        for (rightPatternCounter = operationIndex+1; rightPatternCounter<input.length; rightPatternCounter++)
            if(/[*/+-]/.test(input[rightPatternCounter]))
                break;

        let rightPatternNumber = parseInt(input.substring(operationIndex+1,rightPatternCounter));

        let operationPattern = input.substring(leftPatternCounter+1, rightPatternCounter);
        let operationPatternResult;
        switch (operationSymbol){
            case '*': operationPatternResult = leftPatternNumber * rightPatternNumber;
                break;
            case '/': operationPatternResult = leftPatternNumber / rightPatternNumber;
                break;
            case '+': operationPatternResult = leftPatternNumber + rightPatternNumber;
                break;
            case '-': operationPatternResult = leftPatternNumber - rightPatternNumber;
                break;
        }

        // alert(operationPattern)
        // alert(operationPatternResult)

        let replacedInput = input.replace(operationPattern, operationPatternResult);
        setInput(replacedInput);
    }

    const updateInput = (val) => setUserInput(val.target.value);
    const handleCalculate = () => setInput(userInput);

    const handleButtonPress = (e) => {

        switch (e.target.innerText){
            case "Clear":
                    setUserInput("");
                    setInput("");
                break;
            case "backspace":
                    setUserInput(userInput.slice(0, -1));
                    setInput("");
                break;
            default:
                    setUserInput(userInput + e.target.innerText);
                break;
        }
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col md={{span:4,offset:4}}>

                        <Row className="mt-2 mb-1">
                            <Col>
                                <InputGroup size="lg">
                                    <Form.Control
                                        placeholder="You can type here... 25/5*6+3"
                                        aria-label="You can type here... 25/5*6+3"
                                        aria-describedby="basic-addon1"
                                        onChange={updateInput}
                                        value={userInput}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="gx-1">
                            <h1>{input && `Result: ${input}`}</h1>
                        </Row>

                        <Row className="gx-1">
                            <Col xs={9} className="d-grid"><Button className="p-2" variant="danger" size="lg" onClick={handleButtonPress}>Clear</Button></Col>
                            <Col className="d-grid"><Button className="p-2" variant="warning" onClick={handleButtonPress}><i className="material-icons" style={{verticalAlign: "middle"}}>backspace</i></Button></Col>
                        </Row>
                        <Row className="gx-1 mt-1">
                            <Col className="d-grid"><Button className="p-4" variant="secondary" size="lg" onClick={handleButtonPress}>7</Button></Col>
                            <Col className="d-grid"><Button className="p-4" variant="secondary" size="lg" onClick={handleButtonPress}>8</Button></Col>
                            <Col className="d-grid"><Button className="p-4" variant="secondary" size="lg" onClick={handleButtonPress}>9</Button></Col>
                            <Col className="d-grid"><Button className="p-4" variant="primary" size="lg" onClick={handleButtonPress}>/</Button></Col>
                        </Row>
                        <Row className="gx-1 mt-1">
                            <Col className="d-grid"><Button className="p-4" variant="secondary" size="lg" onClick={handleButtonPress}>4</Button></Col>
                            <Col className="d-grid"><Button className="p-4" variant="secondary" size="lg" onClick={handleButtonPress}>5</Button></Col>
                            <Col className="d-grid"><Button className="p-4" variant="secondary" size="lg" onClick={handleButtonPress}>6</Button></Col>
                            <Col className="d-grid"><Button className="p-4" variant="primary" size="lg" onClick={handleButtonPress}>*</Button></Col>
                        </Row>
                        <Row className="gx-1 mt-1">
                            <Col className="d-grid"><Button className="p-4" variant="secondary" size="lg" onClick={handleButtonPress}>1</Button></Col>
                            <Col className="d-grid"><Button className="p-4" variant="secondary" size="lg" onClick={handleButtonPress}>2</Button></Col>
                            <Col className="d-grid"><Button className="p-4" variant="secondary" size="lg" onClick={handleButtonPress}>3</Button></Col>
                            <Col className="d-grid"><Button className="p-4" variant="primary" size="lg" onClick={handleButtonPress}>-</Button></Col>
                        </Row>
                        <Row className="gx-1 mt-1">
                            <Col xs={9} className="d-grid"><Button className="p-4" variant="secondary" size="lg" onClick={handleButtonPress}>0</Button></Col>
                            <Col className="d-grid"><Button className="p-4" variant="primary" size="lg" onClick={handleButtonPress}>+</Button></Col>
                        </Row>


                        <Row className="mt-2 mb-1">
                            <Col className="d-grid gap-2">
                                <Button className="p-4" variant="success" size="lg" onClick={handleCalculate}>Calculate</Button>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default App;