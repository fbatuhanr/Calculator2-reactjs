import React, {useState} from 'react';
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

    const [input, setInput] = useState("10+20*5-20");
    const [result, setResult] = useState();

    const queue = new Queue();
    queue.enqueue(2);
    queue.isEmpty();
    queue.dequeue();

    const handleClick = () => {


        if(input.includes('*')){

            let multiplicationIndex = input.indexOf('*');

            let leftCounter;
            for (leftCounter = multiplicationIndex-1; leftCounter>0; leftCounter--){

                if(input[leftCounter].includes('*') || input[leftCounter].includes('/') || input[leftCounter].includes('+') || input[leftCounter].includes('-'))
                    break;
            }
            let leftNumber = input.substring(leftCounter+1, multiplicationIndex);

           let rightCounter;
           for (rightCounter = multiplicationIndex+1; rightCounter<input.length; rightCounter++){

               if(input[rightCounter].includes('*') || input[rightCounter].includes('/') || input[rightCounter].includes('+') || input[rightCounter].includes('-'))
                   break;
           }
           let rightNumber = input.substring(multiplicationIndex+1,rightCounter);


           let multiplicationResult = leftNumber*rightNumber;
           alert(multiplicationResult);

            let multiplicationOperation = input.substring(leftCounter+1, rightCounter);
            alert(multiplicationOperation)

            setInput(input.replace(multiplicationOperation, multiplicationResult));
        }
        else if(input.includes('/')) {

        }
        else if(input.includes('+')){

        }
        else if(input.includes('-')){

        }




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
                <Row>
                    <Col>
                        <h1>{input}</h1>
                        <Button variant="primary" onClick={handleClick}>Calculate</Button>
                        <h2>Result:{result}</h2>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default App;