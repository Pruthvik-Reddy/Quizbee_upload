let Category = require('../server/models/category')

let chai = require('chai');
let chaiHttp = require('chai-http');

// let should = chai.should();
var expect = require('chai').expect;

chai.use(chaiHttp);


describe("POST /add-category", () => {

	it("should return status 200", async () => {
    	let res = await chai
        	.request('http://localhost:4000/api')
        	.post('/add-category')
        	.send({category_name: "General Knowledge", parent_category: "main"})
       
    	expect(res.status).to.equal(200)
        // console.log("deleting the newly created document")
        
        // console.log("Deleted")
       
	})

    // it("deleting the entry",()=>{
    //     Category.deleteMany({category_name:"General Knowledge"})
    //     .then(function(){ 
    //         console.log("Data deleted"); // Success 
    //     }).catch(function(error){ 
    //         console.log(error); // Failure 
    //     });
    // })

	
    // afterEach(async () => {
    // 	await Category.deleteOne({category_name:"General Knowledge"})
	// })
})