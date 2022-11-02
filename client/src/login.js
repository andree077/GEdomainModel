import { useState } from "react";
import Dashboard from "./dashboard";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );
  const users = [{ username: "DataScientist", password: "graphql123" }];
  const handleSubmit = (e) => {
    e.preventDefault();
    const account = users.find((user) => user.username === username);
    if (account && account.password === password) {
      localStorage.setItem("authenticated", true);
      navigate("/dashboard");
    }
  };

return (
    <html>
      <header><h1>Project Domain Model</h1></header>
    <head>
    <link rel="stylesheet" href="index.css"/>
    </head>
    <body>
    <div class="container">
    <div class="main">
    <h2>DATA SCIENTIST LOGIN </h2>
    <form id="form_id" method="post" name="myform" onSubmit={handleSubmit}>
      <br></br>
    <label>User Name :</label>
    <input type="text" name="username" id="username" onChange={(e) => setusername(e.target.value)}/>
    <label>Password :</label>
    <input type="password" name="password" id="password" onChange={(e) => setpassword(e.target.value)}/>
    <input type="submit" value="Submit"/>
    </form>
    <span><b class="note">Note : </b>For this demo use following username and password. <br/><b class="valid">User Name : DataScientist<br/>Password : graphql123</b></span>
    </div>
    </div>
    </body>
    </html>
)
}

export default Login;
