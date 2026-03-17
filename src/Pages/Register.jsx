import React, { useState } from "react";

function Register() {

const [form,setForm] = useState({
name:"",
email:"",
password:"",
branch:"",
year:"",
role:"MEMBER"
})

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value})
}

const handleRegister = async () => {
try{

await axios.post("http://localhost:8080/auth/register",form)

alert("OTP Sent to Email")

}catch(err){
alert("Registration Failed")
}
}

return (
<div className="container d-flex justify-content-center align-items-center vh-100">

<div className="card p-4 shadow register-card">

<h3 className="text-center text-danger mb-3">Register</h3>

<input name="name" placeholder="Name" className="form-control mb-2" onChange={handleChange}/>
<input name="email" placeholder="Email" className="form-control mb-2" onChange={handleChange}/>
<input name="password" type="password" placeholder="Password" className="form-control mb-2" onChange={handleChange}/>

{/* Branch */}
<select name="branch" className="form-control mb-2" onChange={handleChange}>
<option>Select Branch</option>
<option>CSE</option>
<option>IT</option>
<option>ECE</option>
<option>ME</option>
</select>

{/* Year */}
<select name="year" className="form-control mb-2" onChange={handleChange}>
<option>Select Year</option>
<option>FIRST</option>
<option>SECOND</option>
<option>THIRD</option>
<option>FOURTH</option>
</select>

<button className="btn btn-danger w-100 mt-2" onClick={handleRegister}>
Register
</button>

</div>

</div>
);
}

export default Register;