import React from 'react';
import { useState,useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Each_question from './Each_question';
import axios from "axios";
import './panel.css';

import { 
  Page, Panel, View, Block, Navbar, Row, Col, Button, Link,Icon,
  List,
  ListInput,
  ListItem,
  f7,
  Card,
  CardContent
,NavLeft,NavRight,NavTitle

} from 'framework7-react';


function TestResult(props) {
    return (
        <div>
            <Card>
                <CardContent>
                <div  style={{ height: '500px',width:'1000px' }}>
                    <Row style={{fontSize:"57px"}}>
                    
                 Test Name:{props.testresdata["test_name"]}
                 
                    </Row>
                    <Row style={{fontSize:"57px"}}>
                        Number of Questions:{props.testresdata["number_of_questions"]}
                    </Row>
                    <Row style={{fontSize:"57px"}}>
                        Number of Correct Answers:{props.testresdata["number_of_correct_answers"]}
                    </Row>
                    <Row style={{fontSize:"57px"}}>
                        Percentage:{props.testresdata["percent_scored"]}
                    </Row>
                    <Row style={{fontSize:"57px"}}>
                        Result:{props.testresdata["result"]}
                    </Row>
                    </div>
                </CardContent>
            </Card>
            
        </div>
    )
}

export default TestResult
