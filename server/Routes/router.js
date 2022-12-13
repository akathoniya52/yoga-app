const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");


// register user data
router.post("/create", (req, res) => {

    // console.log(req.body);

    const { name, email, age, mobile, gender, batchTime ,address,card, amount } = req.body;

    if (!name || !email || !age || !mobile || !batchTime || !address || !gender || !card) {
        res.status(422).json("plz fill the all data");
    }

    try {
        conn.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
            if (result.length) {
                res.status(422).json("This Data is Already Exist")
            } else {
                // console.log(card)
                conn.query("INSERT INTO users SET ?", { name, email, age, mobile, gender, batchTime ,address , card , amount}, (err, result) => {
                    if (err) {
                        console.log("err" + err );
                    } else {
                        res.status(201).json(req.body); 
                    }
                })
            } 
        })
    } catch (error) {
        res.status(422).json(error);
    }

});

router.post("/check",(req,res) => {
    const {name, email, mobile, amount } = req.body
    console.log(req.body)
    if(!name || !email || !mobile){
        res.status(422).json("plz fill the all data");
    }
    try {
        conn.query("SELECT * FROM users WHERE email = ? ", email , (err, result) => {
            console.log(result)
            if(err){
                console.log("err"+err);
                res.status(422).json("Please registered first");
            }
            else if(result.length===0){
                console.log("Unregistered user..!") 
                res.status(422).json("Please registered first");
            }
            else{
                // console.log(typeof result[0].amount)
                let x = (parseInt(amount)+parseInt(result[0].amount)).toString()
                conn.query("UPDATE users SET amount = ? WHERE email = ? ;",[x, email], (err,r)=>{
                    if(err){
                        console.log("err "+err)
                    }
                    else{
                        res.status(201).json("Payment successfull"); 
                    }
                })
            }
        })
        // res.status(201).json(result); 
    } catch (error) {
        res.status(422).json(error);
    }  
})





module.exports = router;



