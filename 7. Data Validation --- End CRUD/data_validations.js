const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')                                             //connection
    .then(() => console.log('Connected to MongoDB...'))                                        //promise resolve
    .catch(err => console.error('Could not connect to MongoDB...', err));                      //promise reject        

    const courseSchema = new mongoose.Schema({                  // creating schema
        name: {
            type:String, 
            required:true,
            minlength:5,
            maxlength:255,
            // match:/pattern/
        },

        category:{
            type:String,
            required:true,
            enum:['web','mobile','network'],
            lowercase:true,
           // uppercase:true,
            trim:true
        },

        author: String,  
                                            
        tags: {
            type:Array,
            validate:{
                isAsync:true,
                validator:function(v,callback){
                    setTimeout(() => {
                        //Do some async work
                        const result = v && v.length>0;
                        callback(result)
                    },4000);
                },
                message:'A Course should have at least one tag'
            }
        },
        date: {type: Date, default: Date.now},
        isPublished: Boolean,

        price:{
            type:Number,
            required:function() {return this.isPublished;},
            min:10,
            max:100,
            get: v => Math.round(v),
            set: v => Math.round(v)
        }
    });

    
    const Course = mongoose.model('Course', courseSchema);  //class

    async function createCourse(){          //Async fun
        const course = new Course({         //object
            name: 'Node Js',    
            category:'Web',       
            author: 'Jefferson',
            tags: ['frontend'],  //Values DB
            isPublished: true,
            price: 12.8
        });
        
    try{
        const result = await course.save(); //save
        console.log(result);
    }
    catch(ex){
       for (field in ex.errors)
       console.log(ex.errors[field].message);      
        }
      
    }

    //Queuing Docs
    async function getCourses(){
        const pageNumber = 2;
        const pageSize = 10;

        const Courses = await Course
        .find({_id: '5ed124c2791fef350020b501'})
       // .find( {author : 'Jefferson', isPublished : true} )   
  
        .sort({name:1})
        .select({name:1, tags:1,price:1});
     
        console.log(Courses[0].price);
    }


//--------------------- ---UPDATE a DOCUMENT---------------------------------------
async function updateCourse(id){
    const course = await Course.findByIdAndUpdate(id, {
        $set:{
           price:14
        }
    }, {new:true});                         // true = Update , false = no changes
            
    console.log(course);

 }
//------------------------------------------------------------------------------------

 async function removeCourse(id){
    //const result = await Course.deleteMany({_id:id});
    const course = await Course.findByIdAndRemove(id);
    console.log(course);

 }


    // removeCourse()             //identify which course

   getCourses();
   
// createCourse();

