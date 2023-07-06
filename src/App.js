import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";

class Queue extends Array {
    enqueue(val) {
        this.push(val);
    }

    dequeue() {
        return this.shift();
    }

    peek() {
        return this[0];
    }

    isEmpty() {
        return this.length === 0;
    }
}

const App = () => {

    const [input, setInput] = useState("");
    const [result, setResult] = useState("10+20*5-20");

    useEffect(() => {

        if(input == "") return;

        if(input.includes('*')){
            findAndEvaluateOperation('*');
        }
        else if(input.includes('/')) {
            findAndEvaluateOperation('/');
        }
        else if(input.includes('+')){
            findAndEvaluateOperation('+');
        }
        else if(input.includes('-')){
            findAndEvaluateOperation('-');
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

        alert(operationPattern)
        alert(operationPatternResult)

        let replacedInput = input.replace(operationPattern, operationPatternResult);
        setInput(replacedInput);
    }

    const handleClick = () => {
setInput("10+20*5-20");
    }
    function split(str, index) {
        const result = [str.slice(0, index), str.slice(index)];

        return result;
    }
    function getSubstring(string, char1, char2) {
        return string.slice(
            string.indexOf(char1) + 1,
            string.lastIndexOf(char2),
        );
    }


    return (
        <div>
            <Container>
                <Row className="justify-content-center">
                    <Col>
                        <h1>{result}</h1>
                        <h1>{input}</h1>
                        <Button variant="primary" onClick={handleClick}>Calculate</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default App;