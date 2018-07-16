import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Issue from './models/issue';

const app = express();

const router = express.Router();
//Take care of this dump function
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/mean");

const { connection } = mongoose; 

connection.once('open', ()=>{
    console.log("Connection established.");
});

router.route('/issues').get((req,res)=>{
    Issue.find((err, issues)=>{
        if(err)
            console.log("Issues not found!!!");
        else
            res.json(issues);
    });
})

router.route("/issues/:id").get((req,res)=>{
    Issue.findById(req.params.id, (err, issues)=>{
        if(err)
            console.log("Incorrect ID of issue");
        else
            res.json(issues);
    });
});

router.route("/issues/add").post((req,res)=>{
    let issue = new Issue(req.body);
    issue.save()
        .then(issue=>{
            res.status(200).json({'title':'Added Successfully'});
        })
        .catch(err => {
            res.status(400).json('Failed to create a record');
        });
});

router.route("/issues/update/:id").post((req, res)=>{
    Issue.findById(req.params.id, (err, issue)=>{
        if(!issue)
            return next(new Error("Couldn't load document"));
        else{
            issue.title = req.body.title;
            // issue.responsible = req.body.responsible;
            // issue.description = req.body.description;
            // issue.severity = req.body.severity;
            // issue.status = req.body.status;

            issue.save().then(issue=>{
                res.status(200).json({'title':'Issue updated successfully'})
            })
            .catch(err=>{
                res.status(400).json('Failed to update');
            });
        }
    });
});

router.route("/issues/delete/:id").get((req,res)=>{
    Issue.findByIdAndRemove({_id: req.params.id}, (err, issue)=>{
        if(err)
            res.json(err);
        else
            res.json("Removed Successfully");
    });
});

app.use('/',router);
app.listen(4000 ,()=> console.log("Express Server running on port: 4000"));

