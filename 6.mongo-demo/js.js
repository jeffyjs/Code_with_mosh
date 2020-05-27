const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Jeff')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect', err));

    const trialSchema = new mongoose.Schema({
        name:String,
        person:String,
        tags:[String],
        date:{type:Date, default:Date.now},
        isDone:Boolean
    });

    const Database = mongoose.model('Database',trialSchema);
        async function personOne(){
            const p1 = new Database({
                name:'default',
                person:'Third',
                tags:['female','20'],
                isDone:false
            });
            const result = await p1.save();
            console.log(result);
        }
        // personOne();

        //-------------------------------Creating & Inserting DB----------------------------------------------

    async function updatepersonOne(id){
        const p1 = await Database.findByIdAndUpdate(id,{
            $set:{
                person:'Changed',
                isDone:true
            }
        },{new:true});
        console.log(p1);
    }
    //updatepersonOne('5ece8645dbafac50326ed265')
//------------------------------------------Updading single --------------------------------------------------
    async function removeperson(id){
        const p1 = await Database.findByIdAndRemove(id);
        console.log(p1);
    }
    removeperson('5ece8645dbafac50326ed265')
    //---------------------------------------Deleting single ----------------------------------------------------
