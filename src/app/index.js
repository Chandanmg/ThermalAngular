const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
})

app.use(bodyParser.json());

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/Thermal_Data", { useNewUrlParser: true });

//it is for list of measurements 2nd page
const ThermalSchema = {
    Sensor_Name : String,
    Thermal_Date : Date,
    Thermal_Value : Array,
    Temp: String,
    Number_Of_People : Number,
    Image_Result : Number,
    Thermal_Image : String,
    Normal_Image : String,
    Processed : String,
};

const ThermalData= mongoose.model("ThermalSchema", ThermalSchema);

app.get("/getdata", (req, res) => {
    var start = new Date();
    start.setHours(0,0,0,0);

    var end = new Date();
    end.setHours(23,59,59,999);


        ThermalData.find({Thermal_Date: {$gte: start, $lt: end}}).then(documents => {

            res.status(200).json({
                message: 'add building data fetched successfully',
                posts: documents
            });
            // console.log(documents)
        })
})

app.get("/getdata1", (req, res) => {
// console.log("documents");


    ThermalData.find().then(documents => {

        res.status(200).json({
            message: 'add building data fetched successfully',
            posts: documents
        });
        // console.log(documents)
    })
})

// for List of Measurements
app.get('/getdata/name/:Sensor_Name', (req,res,next)=>{
    date12 = new Date();
    date12.setDate(date12.getDate() - 1);
    date12.valueOf()

    // ThermalData.find({Sensor_Name: req.params.Sensor_Name})
    ThermalData.aggregate([{$match:{"Thermal_Date":{"$gte":date12},Sensor_Name:req.params.Sensor_Name}},
    ]).then(documents => {
        console.log(documents);
        res.status(200).json({
            message: 'fetched successfully',
            posts: documents,
        });
    })
})

app.get('/getdata/measurement/view/:id', (req,res,next)=>{
    ThermalData.findOne({_id: req.params.id}).then(documents => {
        // console.log("assetname");
        res.status(200).json({
            message: 'fetched successfully',
            posts: documents,
        });
    })
})



app.post('/AddThermal/measurement/view/:id', (req,res,next)=>{
    // console.log("hello");
    var item = {
        Image_Result: req.body.Image_Result,
    };
    ThermalData.updateOne({_id: req.params.id}, {$set: item})
    .then(doc => {
        res.status(201).json({
            message: 'success Updated',
            result: doc,
        })
        // console.log(result);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
})
})

app.post("/AddThermal", (req, res) => {
    var NewDate = Date().valueOf()
// console.log(NewDate)
    var arrData = req.body.v.split(",")
    var arrData1 = arrData.map(Number)
    var sensor_id = req.body.i
    var sensor_temp = req.body.t
    // NewDate = NewDate.toLocaleString('en-GB', {timeZone: 'Asia/Kolkata'});
    const add = new ThermalData({
        Thermal_Date: NewDate,
        Thermal_Value: arrData1,
        Number_Of_People : 0,
        Sensor_Name: sensor_id,
        Temp: sensor_temp,
        Image_Result: 2,
        Thermal_Image: "thermal+image+3.jpg",
        Normal_Image: "group+image.jpg",
        Processed: "N",
    });
    // console.log(add);
    add.save()
        .then(result => {
            res.status(201).json({
                message: 'success add',
                result: result,
            })
            // console.log(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
    })
})











//model for setting customer

const customerSchema = {
    customer : String,
    location : String,
    thermal_sensors : String,
	// Location : String,
};

const customerData= mongoose.model("customerSchema", customerSchema);

//settings screen customer list

app.post("/customerlist", (req, res) => {
    const add = new customerData({
        customer: req.body.customer,
        location: req.body.location,
        thermal_sensors: req.body.thermal_sensors,
    });
    // console.log(sensorList);
    add.save()
        .then(result => {
            res.status(201).json({
                message: 'success add',
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
    })
})

app.get('/customerlist', (req,res)=>{
    customerData.find().then(documents => {
        res.status(200).json({
            message: "success",
            posts: documents
        })
    })
})

// for frontend list of measurement 
app.get("/customerlist/name/:Sensor_Name", (req, res) => {
    var start = new Date();
    start.setHours(0,0,0,0);

    var end = new Date();
    end.setHours(23,59,59,999);


        ThermalData.find({Thermal_Date: {$gte: start, $lt: end},Sensor_Name:req.params.Sensor_Name})
        .then(documents => {

            res.status(200).json({
                message: 'add building data fetched successfully',
                posts: documents
            });
            // console.log(documents)
        })
})
// for frontend list of measurement 
app.get('/Last_Responded/Date', (req,res,next)=>{

    ThermalData.aggregate([{$group:{_id:"$Sensor_Name", Last_Responded: { $max: "$Thermal_Date" }, Total_Images: { $count: {} }}},
    ]).then(documents => {
        // console.log(documents);
        res.status(200).json({
            message: 'fetched successfully',
            posts: documents,
        });
    })
})

app.get('/list/correctWrong', (req,res,next)=>{
    ThermalData.aggregate([
        {
            $project: {
                Sensor_Name: "$Sensor_Name",
                correct: {  // add if image_result = 1
                    $cond: [ { $eq: ["$Image_Result", 1 ] }, 1, 0]
                },
                wrong: {  // add if image_result = 0
                    $cond: [ { $eq: [ "$Image_Result", 0 ] }, 1, 0]
                }
                
            }
        },
        {
            $group: {
                _id:"$Sensor_Name",
                correctCount: { $sum: "$correct" },
                wrongCount: { $sum: "$wrong" },
            }
        }
    ]
        
    ).then(documents => {
        // console.log(documents);
        res.status(200).json({
            message: 'fetched successfully',
            posts: documents,
        });
    })
})


//for measurement page specific date selection
app.get('/customerlist/name/:Sensor_Name/:date', function(req, res) {

    // console.log(req.params.Sensor_Name);
    // console.log(req.params.date);
    // console.log(new Date());

    var d = req.params.date;


    // var dd = d.split("-").reverse().join("-");

    var t = "T05:03:27.379Z";

    var datetime = d+t;

    // start.setHours(0,0,0,0);

    // console.log(start);
    
    let yesterday = new Date(datetime);
    // console.log(yesterday);

    // var start = datetime;
    // console.log(start);
    yesterday.setHours(0,0,0,0);

    var end = new Date(datetime);
    end.setHours(23,59,59,999);


        ThermalData.find({Thermal_Date: {$gte: yesterday, $lt: end}, Sensor_Name:req.params.Sensor_Name})
        .then(documents => {

            res.status(200).json({
                message: 'add building data fetched successfully',
                posts: documents
            });
            // console.log(documents)
        })
});

app.listen(3000, function() {
	console.log("Server started on port 3000");
});
