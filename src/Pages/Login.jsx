import React, { useState } from "react";

function Login() {

const [form,setForm] = useState({
email:"",
password:""
})

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value})
}

const handleLogin = async () => {
try{

const res = await axios.post("http://localhost:8080/auth/login",form)

alert("Login Success")

localStorage.setItem("token",res.data.token)

}catch(err){
alert("Login Failed")
}
}

return (
<div className="container d-flex justify-content-center align-items-center vh-100">

<div className="card p-4 shadow login-card">

<h3 className="text-center text-danger mb-3">Login</h3>

<input
type="email"
name="email"
placeholder="Email"
className="form-control mb-3"
onChange={handleChange}
/>

<input
type="password"
name="password"
placeholder="Password"
className="form-control mb-3"
onChange={handleChange}
/>

<button className="btn btn-danger w-100" onClick={handleLogin}>
Login
</button>

</div>

</div>
);
}

export default Login;