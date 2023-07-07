import React, {useEffect, useState} from 'react';
import {Button, Col, Container, InputGroup, Row, Form} from "react-bootstrap";

const App = () => {

    const [input, setInput] = useState("");
    const [userInput, setUserInput] = useState(0);

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


    return (
        <div>
            <Container>
                <Row className="justify-content-center">
                    <Col>
                        <InputGroup className="mb-3 mt-3" size="lg">
                            <Form.Control
                                placeholder="Type here... 25/5*6+3"
                                aria-label="Type here... 25/5*6+3"
                                aria-describedby="basic-addon1"
                                onChange={updateInput}
                            />
                        </InputGroup>
                        <h1>{input && `Result: ${input}`}</h1>
                    </Col>
                    <Col xs="12" className={"d-grid gap-2"}>
                        <Button variant="primary" size="lg" onClick={handleCalculate}>Calculate</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default App;