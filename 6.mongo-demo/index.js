const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')                                             //connection
    .then(() => console.log('Connected to MongoDB...'))                                        //promise resolve
    .catch(err => console.error('Could not connect to MongoDB...', err));                      //promise reject        

    const courseSchema = new mongoose.Schema({                  // creating schema
        name: String,
        author: String,                                         //values and datatypes
        tags: [ String ],
        date: {type: Date, default: Date.now},
        isPublished: Boolean
    });

    //Models
    //Schema
    //Saving to Mongo Compass
    const Course = mongoose.model('Course', courseSchema);  //class

    async function createCourse(){          //Async fun
        const course = new Course({         //object
            name: 'Node Js',           
            author: 'Jefferson',
            tags: ['node', 'Back-End'],  //Values DB
            isPublished: true
        });
    
       const result = await course.save(); //save
       console.log(result);
    }

//------------compairson query operator  --------------------------------------
// eq - equalto
// ne - not equalto
// gt - greater than
// gte - greater than or equalto
// lt - less than
// lte - less than equalto
// in - 
// nin - not in
//-----------------------------------------------------------------------------

//---------------logical query operator----------------------------------------
//or
//And
//-----------------------------------------------------------------------------
    //Queuing Docs
    async function getCourses(){
        const pageNumber = 2;
        const pageSize = 10;

        const Courses = await Course
        .find( {author : 'Jefferson', isPublished : true} )     //filter
        // .find({ price: { $gte: 10}});
        // .find({price:{ $in:[10,20,30] }});
//--------------------operation---------------
        // .or([{author:'Jefferson'}, {isPublished:true}]);
         // .and([{author:'Jefferson'}, {isPublished:true}]);

//------------------Regular Expression------------------------
        //  //starts with Jefferson
        //  .find({ author: /^Jefferson/ })
        //  //Ends with Simon
        //  .find({ author: /Simon$/i })
        //  //Contains Jefferson
        //  .find({ author: /.*Jefferson.*/i })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)   
        .limit(2)
        .sort({name:1})
        .select({name:1})
        .count();
        console.log(Courses);
    }

// updating a document query first----------------------------------------------
    // async function updateCourse(id){
    //     const course = await Course.findById(id);       //finding the docs 
    //     if(!course) return;                             //if not nothing

    //     course.isPublished = true;                      //condition
    //     course.author = 'Another Author';

    //     const result = await course.save();                //save changes
    //     console.log(result);

    //  }
//------------------------------------------------------------------------------

//--------------------- ---UPDATE a DOCUMENT---------------------------------------
async function updateCourse(id){
    const course = await Course.findByIdAndUpdate(id, {
        $set:{
            author:'JSqS',                   // need to be updated  
            isPublished:false
        }
    }, {new:true});                         // true = Update , false = no changes
            
    console.log(course);

 }


 async function removeCourse(id){
    //const result = await Course.deleteMany({_id:id});
    const course = await Course.findByIdAndRemove(id);
    console.log(course);

 }



     removeCourse()             //identify which course

 //  getCourses();
   
// createCourse();

