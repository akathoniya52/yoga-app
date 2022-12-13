import React, { useContext, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { adddata } from './context/ContextProvider';

const Register = () => {

    const { udata, setUdata } = useContext(adddata);
    console.log(udata)

    const history = useHistory();

    const [inpval, setINP] = useState({
        name: "",
        email: "",
        age: "",
        gender: "",
        mobile: "",
        batchTime: "",
        address: "",
        card: "",
        amount: "500"
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, type, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
        console.log(inpval)
    }


    const addinpdata = async (e) => { 
        e.preventDefault();

        const { name, email, age, gender, address, mobile, batchTime, card , amount } = inpval;


        if (name === "") {
            alert("Name is required")
        } else if (email === "") {
            alert("Email is required")
        } else if (!email.includes("@")) {
            alert("Enter valid email")
        } else if (age === "") {
            alert("Age is required")
        } else if (parseInt(age)<18 || parseInt(age)>65) {
            alert("Age should between 18 to 65 years..!")
        } else if (gender==="") {
            alert("Gender is required")
        } else if (mobile === "") {
            alert("Mobile number is required")
        } 
        // else if (mobile.length) {
        //     alert("Mobile number is invalid")
        // } 
        else if (batchTime === "") {
            alert("Batch Time is required")
        } else if (address === "") {
            alert("Address is required")
        } else if (card === "") {
            alert("Card is required")
        } 
        else if (card.length<11) {
            console.log("A")
            alert("Card number invalid...!")
        } else if (card.length> 16) {
            console.log("B")
            alert("Card number invalid...!")
        }  
        else {

            const res = await fetch("/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, age, gender, mobile, address, card, batchTime , amount
                })
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 422 || !data) {
                console.log("error ");
                alert("error");

            } else {
                history.push("/register")
                setUdata(data)
                console.log("data added");

            }
        }

    }

    return (
        <>
        {
            
                udata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{udata.name}</strong>  added succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }

        <div className="container">
            <h1 className='text-center'>Regitration Form</h1>
            <NavLink to="/payment">Already user ? Pay monthly fee</NavLink>
            <form className="mt-4">
                <div className="row">
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">Name</label>
                        <input type="text" value={inpval.name} onChange={setdata} name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>

                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">email</label>
                        <input type="email" value={inpval.email} onChange={setdata} name="email" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">age</label>
                        <input type="number" value={inpval.age} onChange={setdata} name="age" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">gender</label>
                        {/* <input type="text" value={inpval.gender} onChange={setdata} name="age" class="form-control" id="exampleInputPassword1" /> */}
                        <div className="select-box" >
                            <select onChange={setdata} name="gender" required>
                            <option hidden >Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                                <option>Prefer not to say</option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Mobile</label>
                        <input type="number" value={inpval.mobile} onChange={setdata} name="mobile" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Batch time</label>
                        <div className="select-box" >
                            <select onChange={setdata}  name="batchTime" required>
                                <option hidden >Choose batch time</option>
                                <option>6 AM - 7 AM</option>
                                <option>7 Am - 8 AM</option>
                                <option>8 AM - 9 AM</option>
                                <option>5 PM - 6 PM</option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Address</label>
                        <input type="text" value={inpval.address} onChange={setdata} name="address" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Debit/Credit Card</label>
                        <input type="number" value={inpval.card} placeholder="12XX-XXXX-XXXX-XX34" onChange={setdata} name="card" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <label for="exampleInputPassword1" class="form-label">Registration fee 500 </label>
                    <button type="submit" onClick={addinpdata} class="btn btn-primary">Pay and Register</button>
                </div>
            </form>
        </div>
        </>
    )
}
export default Register;
