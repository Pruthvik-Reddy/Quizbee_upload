//const create_question= require("../server/");

const chai = require("chai");
const chaiHttp = require("chai-http");

const assert=chai.assert;
chai.use(chaiHttp);
describe("Question", () => {
  
  it("Creating Question", done => {
    chai
      .request('http://localhost:4000/api')
      .post("/create-question")
      .send({ category:"Testing Category",
        sub_categories:["Testing Sub Category"],
        question:"TESTING QUESTION I",
        created_by:"6040be01faa8e699fcd696b6",
        answers:["Test Option 1","Test Option 2","Test Option 3"],
         correct_answers:["Test OPtion 1"],
         difficulty:"easy",
         answer_type:"Multiple Choice Questions"
        })
      .end((err, res) => {
        assert.equal(res.status,"200");
        assert.equal(res.body.new_question,"question added successfully")
        done();
      });
  });

  it("Get QUestions In a Category",done=>{
      main_category_name="Testing Category";
      sub_category_name="Testing Sub Category";
        chai.request('http://localhost:4000/api')

        .get(`/questions-filtered-by-category/${main_category_name}/${sub_category_name}`)
        .end((err,res)=>{
            //console.log(res.body)
            assert.equal(res.status,"200");
            assert.equal(res.body[0].question_description,"TESTING QUESTION I"),
            assert.equal(res.body[0].category_id_array[1],"Testing Category")
            assert.equal(res.body[0].category_id_array[0],"Testing Sub Category")
            done();
        });


  })


});