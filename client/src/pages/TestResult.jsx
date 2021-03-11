import React from 'react';
import { useState,useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Each_question from './Each_question';
import axios from "axios";
import './panel.css';
import firebase from 'firebase';
require('firebase/auth');

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

    const [role,setRole] = useState("")

    const Sign_out = () => {
        firebase.auth().signOut().then(() => {
          // Sign-out successful.
          window.localStorage.removeItem('firebase_email');
          console.log('Sign-out successful.');
          //f7router.navigate('/');
          window.location.href = '/'
        }).catch((error) => {
          // An error happened.
          console.log(error);
        });
    
      }
      const Profile = () => {
        window.location.href = '/edit-profile'
      }
      const Create_test = () => {
        window.location.href="/create-test"
      }
      const Add_question = () => {
        //f7.dialog.alert(' add question Page');
        window.location.href='/question-form'
      }
      const Created_test = () => {
        window.location.href = '/created-test'
      }
      // student test
      const All_Test = () => {
        window.location.href="/create-test"
      }
      const Test_summary = () => {
        //f7.dialog.alert('Page is under development');
        window.location.href='/test-summary'
        // f7.dialog.alert('Your already in test Summary Page');
      }

      let session = (JSON.parse(localStorage.getItem("firebase_email")))
      if(session){
          if(role !== "Admin"){
            return(
                <Page id="panel-page">
          
                <Panel left cover themeLight containerEl="#panel-page" id="panel-nested">
                    <Page>
                      <Block strong>
                        <p><br/></p>
                        {/* <p>This is page-nested Panel. User</p> */}
                        <p>
                          <Link onClick={Profile}>Profile</Link>
                        </p>
                        <p>
                          <Link onClick={Sign_out}>Sign Out</Link>
                        </p>
          
                        <p>
                          <Link panelClose>Close me</Link>
                        </p>
                      </Block>
                    </Page>
                  </Panel>
          
                  <Navbar>
                      <NavLeft>
                        {/* <Icon f7="bars" size="44px" color="blue"></Icon> */}
                        <Link icon="menu" panelOpen="#panel-nested"><Icon f7="bars" size="44px" color="blue"></Icon></Link>
                      </NavLeft>
          
                      <NavLeft>
                        <Link onClick={All_Test}>All Tests</Link>
                      </NavLeft>
                      <NavRight>
                        <Link onClick={Test_summary}>Test Summary</Link>
                      </NavRight>
          
          
                  </Navbar>

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
            </Page>
            )}
        }

      
    return (
        <div>
            <p>Not Authorized</p>
        </div>
    )
}

export default TestResult
