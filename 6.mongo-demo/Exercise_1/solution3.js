const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises');

const courseSchema = new mongoose.Schema({
  name: String,
  author: String, 
  tags: [ String ],
  date: Date, 
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
  return await Course
  .find({ isPublished: true })
  // tags: {$in: ['frontend', 'backend']}
  // .or({tags: 'frontend'}, {tags:'backend'} )
   .or([
       {price:{$gte: 15}},  //price <=15
   {name: /.*by.*/i}        //name keyword by
   ]) 
  .sort('-price' )
  .select( 'name author' );
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
