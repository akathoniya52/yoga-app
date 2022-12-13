import React, { useContext, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { adddata } from './context/ContextProvider';
export default function Payment() {
    const { udata, setUdata } = useContext(adddata);
    console.log(udata)
    console.log(adddata)

    const history = useHistory();

    const [inpval, setINP] = useState({
        name: "",
        email: "",
        mobile: "",
        card: "",
        amount: ""
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: (name=="age" || name=="mobile" || name=="amount" ) ? parseInt(value): value
            }
        })
        console.log(inpval)
    }



    const addinpdata = async (e) => { 
        e.preventDefault();

        const { name, email,  mobile,  card, amount  } = inpval;


        if (name === "") {
            alert("Name is required")
        } else if (email === "") {
            alert("Email is required")
        } else if (!email.includes("@")) {
            alert("Enter valid email")
        } else if (mobile === "") {
            alert("Mobile number is required")
        } else if (amount <= 0) {
            alert("Enter payable amount")
        } else if (card === "") {
            alert("Card is required")
        } 
        else if (card.length<11) {
            // console.log("A")
            alert("Card number invalid...!")
        } else if (card.length> 16) {
            // console.log("B")
            alert("Card number invalid...!")
        }  
        else {
            // console.log("adf")

            const res = await fetch("/check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name ,email , amount , mobile, card
                }) 
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 422 || !data) {
                console.log("error ");
                alert("User not exist please go through the registration field..!");

            } else { 
                history.push("/payment")
                setUdata(data)
                alert("Payment Successfull...!");

            }
        }

    }
  return (
    <>
        {
                udata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong></strong>  payment succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }

        <div className="container">
        <h1 className='text-center'>Make a Payment</h1>
            <NavLink to="/register">Not registered ? </NavLink>
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
                        <label for="exampleInputPassword1" class="form-label">Mobile</label>
                        <input type="number" value={inpval.mobile} onChange={setdata} name="mobile" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Amount</label>
                        <input type="number"  value={inpval.amount} placeholder="Enter payable amount" onChange={setdata} name="amount" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Debit/Credit Card</label>
                        <input type="number" value={inpval.card} placeholder="12XX-XXXX-XXXX-XX34" onChange={setdata} name="card" class="form-control" id="exampleInputPassword1" />
                    </div>

                    <button type="submit" onClick={addinpdata} class="btn btn-primary">Make Payment</button>
                </div>
            </form>
        </div>
        </>
  )
}
