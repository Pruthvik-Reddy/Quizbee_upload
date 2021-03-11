import React from 'react';
import { useState,useEffect,useRef } from 'react';
import axios from "axios";
import { 
  Page,
  List,
  ListInput,
  Button,
  Radio,
  ListItem,
  f7,
  View,
    App,
    Navbar,
    NavLeft,
    NavTitle,
    NavTitleLarge,
    NavRight,
    Link,
    Preloader,
    Toolbar,
    Block,
    BlockTitle,
    LoginScreen,
    LoginScreenTitle,
    ListButton,
    Row,
    Col,
    BlockFooter,
    Card

} from 'framework7-react';
import firebase from 'firebase';
require('firebase/auth');


export default function Questions(props) {

   const [inputList, setInputList] = useState([""]);
   const [question_description,setQuestion_description]=useState("");

   const [questiontype,setQuestiontype]=useState("Multiple Choice Questions");

   const [selectedoption,setSelectedoption]=useState([]);
   const [correct_answer_component,setCorrect_answer_component]=useState([]);


   const [flag,setFlag]=useState(0);
   const [choosingcorrectanswers_flag,setChoosingcorrectanswers_flag]=useState(0);
   

   const [category,setCategory]=useState("");
   const [cat_lis,setCat_lis]=useState([]);
  // const cat_lis=[{id:"",category_name:"Technical"},{id:"",category_name:"Aptitude"},{id:"",category_name:"Sports"}];
   const [category_id,setCategory_id] = useState('')
  
  const [sub_cat_lis,setSub_cat_lis]=useState({"":[]});  
  /*
   const sub_cat_lis={"":[],"Technical":["Java1","Java2","Java3","Java4","Java5","Java6","Java 7","Java 8"],"Aptitude":["C++1","C++2","C++3","C++4","C++5","C++6","C++7","C++8"],
                        "Sports":["Cricket","Football","Hockey"]};
  */
   const [selected_sub_cats_2,setSelected_sub_cats_2]=useState([]);
   
   const [sub_Cat_key,setSub_cat_key]=useState(0);
   const get_email=JSON.parse(localStorage.getItem("firebase_email"));
    useEffect(() => {

    /*
   var dat1=[{_id:"1",category_name:"Technical"},{_id:"2",category_name:"Aptitude"},{_id:"3",category_name:"Sports"}];
   var sub_cate=[{id:"4",category_name:"OOPS",parent_category_id:"1"},{id:"5",category_name:"Logic",parent_category_id:"2"},{id:"6",category_name:"Cricket",parent_category_id:"3"}];
   
   var parent_cat_names={};

    setCat_lis(dat1.map(val=>{
      parent_cat_names[val._id]=val.category_name;
      return{
          id: val._id,
          category_name:val.category_name

      }
  }));

        var temp={"":[]}
        sub_cate.map((ele)=>{ 
            
          var sub_cat_name=ele.category_name;
          var main_cat_name=parent_cat_names[ele.parent_category_id];
          if (main_cat_name in temp){
            var temp2=temp[main_cat_name];
            console.log(sub_cat_name);
            temp2.push(sub_cat_name);
            temp[main_cat_name]=temp2;
          } 
          else{
            console.log(main_cat_name);
            console.log(sub_cat_name);
            temp[main_cat_name]=[sub_cat_name];
            console.log(temp);
          }

        })
        console.log(temp);
        setSub_cat_lis(temp);


*/
    var parent_cat_names={};

    axios.get('http://localhost:4000/api/get-main-categories').then(
      data=>{
          //console.log(data)
          let main_cate = data.data;
          var new_ele={_id:12,category_name:"Select"};
          main_cate.unshift(new_ele);
          console.log("Main Cat");
          console.log(main_cate)
          setCat_lis(main_cate.map(val=>{
            parent_cat_names[val._id]=val.category_name;
            
              return{
                  id: val._id,
                  category_name:val.category_name

              }
          }))
        
      }
  )

  axios.get('http://localhost:4000/api/get-all-sub-categories').then(
    data=>{
        //console.log(data)
        let sub_cate = data.data;
        //setSub_cate(data.data);
        var temp={"":[]}
        
        sub_cate.map((ele)=>{ 
            
          var sub_cat_name=ele.category_name;
          var main_cat_name=parent_cat_names[ele.parent_category_id];
          if (main_cat_name in temp){
            var temp2=temp[main_cat_name];
            console.log(sub_cat_name);
            temp2.push(sub_cat_name);
            temp[main_cat_name]=temp2;
          } 
          else{
            console.log(main_cat_name);
            console.log(sub_cat_name);
            temp[main_cat_name]=[sub_cat_name];
            console.log(temp);
          }
          
        })
        setSub_cat_lis(temp);
        
  }
  
)


  }, [])



  
  
  const sub_cat_change=(e)=>{
    
    var options_1 = e.target.options;
    var temp=[]
    for (var i = 0, l = options_1.length; i < l; i++) {
      if (options_1[i].selected) {
        //console.log(options_1[i]);
        console.log(options_1[i].text) ;
        temp.push(options_1[i].text);
      }
    }
    console.log(temp);
    setSelected_sub_cats_2(temp);
  }

   


  const Sub_categorychildfunc=(sub_category_data)=>{
    setSelected_sub_cats_2(sub_category_data);
  }

   const handleCheckboxchange=(ele,e)=>{
    if(choosingcorrectanswers_flag==1){
          setChoosingcorrectanswers_flag(0);
          var temp=[];
        if (e.target.checked){
          temp.push(ele);
          setSelectedoption(temp);
        }
        else{
          var temp=selectedoption;
          const index = temp.indexOf(ele);
          if (index > -1) {
            temp.splice(index, 1);
          }
          setSelectedoption(temp);
        }

        //props.correctoptionschildfunc(selectedoption);
    }
    else{
            var temp=selectedoption;
            if (e.target.checked){
              temp.push(ele);
              setSelectedoption(temp);
            }
            else{
              var temp=selectedoption;
              const index = temp.indexOf(ele);
              if (index > -1) {
                temp.splice(index, 1);
              }
              setSelectedoption(temp);
            }

            //props.correctoptionschildfunc(selectedoption);
        }

    }


   const onChangeCategory=(e)=>{
     setCategory(e.target.value);
     var cat=String(e.target.value);
     var id;
     for(var i=0;i<cat_lis.length;i++){
       if (cat_lis[i].category_name===cat){
         setCategory_id(cat_lis[i].id);
         break;
       }
     }
     setSelected_sub_cats_2([]);
     //setSub_cat_key(prevkey=>prevkey+1);
    // props.categorychildfunction(e.target.value);
   }

   const onChangeQuestiontype=(e)=>{
    setQuestiontype(e.target.value);
   // props.questiontypechildfunc(e.target.value);
  }

   
  
   const removeTag = (i) => {
    const newTags = tags;
    newTags.splice(i, 1);
    setTags(newTags);
  }

  const handleQuestionChange =(e)=>{
   // props.questionchildfunc(e.target.value);
    setQuestion_description(e.target.value);
  }

  const handleInputChange = (e, index) => {
    const  value  = e.target.value;
    const list = [...inputList];
    list[index] = value;
   // props.optionchildfunc(list);
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    //props.optionchildfunc(list);
    setInputList(list);
    
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, "" ]);
  };


  const onGobacktoQuestion=()=>{
    setFlag(0);
    setChoosingcorrectanswers_flag(0);
    setSelectedoption([]);
  }


  const myQuestionSubmitfunc=()=>{
    axios.get(`http://localhost:4000/route/get-user-id/${get_email}`).then(data12=>{
      console.log(data12.data)
      const current_user_id = data12.data; 
    
    console.log('current user id',current_user_id)

    console.log(inputList);
    console.log(question_description);
    console.log(category);
    console.log(questiontype);
    console.log(selectedoption);
    //console.log(sub_categories);
    console.log(selected_sub_cats_2);
    console.log('post in current user id',current_user_id);
    //phani work 603895679d04c0a200039d0c
    let sub_categories = selected_sub_cats_2;
    let question = question_description
    let created_by = current_user_id
    let answers = inputList
    let correct_answers = selectedoption
    let difficulty_level = "easy"
    let answer_type = questiontype




    let data = {
        category,
        sub_categories,
        question,
        created_by,
        answers, correct_answers,difficulty_level,answer_type


    }
    axios.post("http://localhost:4000/api/create-question",data).then(
       d =>{
        console.log(d)
        
       } 
    ).catch(err=>{
        alert(err)
    })
    //end
    props.flagchildfunc();
  })





  }


  const answerFeedback=()=>{


    if(!category){
      f7.dialog.alert('Please select category ');  
    }

    else if(!selected_sub_cats_2){
      f7.dialog.alert('Please select sub category ');  
    }
    else if(!questiontype){
      f7.dialog.alert('Please select question type');  
    }
    else if(!question_description){
      f7.dialog.alert('Please enter question ');  
    }
    
    else if(!inputList){
      f7.dialog.alert('Please add options ');  

    }
    else{



    setChoosingcorrectanswers_flag(1);
    var temp=[];
    
    if(questiontype=="Checkbox"){
    var temp=<div>
      <p>Choose the Correct Answer for the given options</p>
    <form>
    {inputList.map((ele)=>{
        return <div class="List">
          <Card>
          <List>
         <ListItem
        checkbox
        name="checkbox"
        value={ele}
        onChange={(e) => {
          handleCheckboxchange(ele,e)
          // props.correctoptionschildfunc(selectedoption);
    
        }}


      >{ele}</ListItem></List></Card>
      </div>

      
      })}
      
    {/* {inputList.map((ele)=>{return (<div class="List"><Card><List><ListItem><input type="checkbox" onChange={(e)=>handleCheckboxchange(ele,e)} ></input>{ele}</ListItem></List></Card></div>)})} */}
    
    </form>
    
    </div>
    }
    else{
      var temp=<div>
        <p>Choose the Correct Answer for the given options</p>
      <form>
      {inputList.map((ele)=>{
        return <div class="List">
          <Card>
          <List>
         <ListItem
        radio
        name="radio"
        value={ele}
        onClick={() => {
          var temp=[ele];
          setSelectedoption(temp);
         // props.correctoptionschildfunc(selectedoption);
    
        }}

      >{ele}</ListItem></List></Card>
      </div>

      
      })}
      </form>
      
      </div>
        
    }
    setCorrect_answer_component([temp]);
    setSub_cat_key(prevkey=>prevkey+1);
    setFlag(1);

  }
  };



  var ret_lis;
  if (flag ==0)
  {
    //setSelectedoption([]);
    return (<div>
    <h1>Create Question</h1>
      
    

    <div class="list">
  <ul>
    <li>
      <a class="item-link smart-select" data-open-in="popup">
        <select name="category" onChange={onChangeCategory} value={category}>
          {cat_lis.map((ele)=>{
            
            return <option value={ele.category_name} key={ele.category_name}>{ele.category_name}</option>})}
          </select>
        <div class="item-content">
          <div class="item-inner">
            <div class="item-title">Category</div>
            </div>
        </div>
      </a>
    </li>
    </ul>
</div>

{category!=="Select"?
<div>
<List>
    <ul>
      <li>
        <a class="item-link smart-select smart-select-init" data-open-in="popup" data-searchbar="true"
          data-searchbar-placeholder="Search SUB Category">
          <select  multiple onClick={(e)=>{console.log(e.target.value);console.log("Clicked")}}
                onChange={sub_cat_change}
                key={sub_Cat_key}
                
               >
            <optgroup label="SUB CATEGORIES" 
            
              >
              {
              sub_cat_lis[category].map((ele)=>{
                
                return (<option value={ele} 
                   key={ele}
              >{ele}</option>)})}
              </optgroup>
            </select>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title">{ category===""?"Please Choose a Category":category }</div>
            </div>
          </div>
        </a>
      </li>
      
      
    </ul>
    </List>

                  

    <div class="list">
    <ul>
      <li>
        <a class="item-link smart-select" data-open-in="popup">
          <select name="questiontype" onChange={onChangeQuestiontype} value={questiontype}>
          <option value="Multiple Choice Questions" selected>Multiple Choice Questions</option>
              <option value="Checkbox">Checkbox</option>
              
            </select>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title">SELECT QUESTION TYPE</div>
              </div>
          </div>
        </a>
      </li>
      </ul>
  </div>
  
  
  
        <div class="block-title" >Question Description</div>
        <div class="list no-hairlines-md">
          <ul>
            <li class="item-content item-input item-input-outline">
              <div class="item-media">
                <i class="icon demo-list-icon"></i>
              </div>
              <div class="item-inner">
                <div class="item-title item-floating-label">Question Description</div>
                <div class="item-input-wrap" style={{position:"relative",right:"5%"}} >
                  <input type="text" placeholder="Enter Question Description" 
                  value={question_description}
            
          onChange={handleQuestionChange} />
                  <span class="input-clear-button"></span>
                </div>
              </div>
            </li>
          </ul>
          </div>
          
  
      <div class="block-title">Enter Options</div>
      <div className="App">
            {inputList.map((x, i) => {
                return (
                 

                <div className="box">
                    
                    
                    
                    <input
                    name="option"
                    placeholder="Enter the option"
                    value={x}
                    onChange={e => handleInputChange(e, i)}
                    />&nbsp;&nbsp;&nbsp;
                    
                    {inputList.length !== 1 &&
                    
                     <Button style={{width:"10%",display:"inline-block"}}
                        
                        onClick={() => handleRemoveClick(i)}>Remove</Button>}
                    {inputList.length - 1 === i && <Button onClick={handleAddClick} style={{position:"absolute",left:"25%",top:"78%"}}>Add Option</Button>}
                    
                </div>
                );
            })}
            
        </div>
  
        <Button onClick={answerFeedback}>Choose the Correct Answer</Button>
</div>

:<div>Please Choose A Category</div>}

    
     

 

      </div>)

  }
  else{

    return(
    <div>
    {correct_answer_component}
    <Button onClick={myQuestionSubmitfunc} >Save the Question </Button>
    <Button onClick={onGobacktoQuestion}>Go Back to the Question</Button>
    </div>);
  }
      
   
  
  
  
  
}