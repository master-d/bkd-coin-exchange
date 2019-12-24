import * as React from "react";
import { Button, Form, FormGroup, Input, Col, Card, CardHeader, ButtonGroup } from "reactstrap";

/** Context */
import { AuthContext } from "../context/auth-context";

function Login() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [registering, setRegistering] = React.useState(false);
  const auth = React.useContext(AuthContext);

  const validateLoginForm = () => {
    var valid = true;
    if (!user.email || !user.email.match(/^\w+@\w+\.\w{2,4}$/))
      console.log("invalid email"), valid = false;
    if (!user.password) 
      console.log("password required"), valid = false;
    if (registering) {
      if (user.password != user.cpassword) 
        console.log("passwords do not match"), valid = false;
      if (!user.first_name) 
        console.log("first name is required"), valid = false;
      if (!user.last_name) 
        console.log("last name is required"), valid = false;
    }
    return valid;
  }
  const authHandler = () => {
      setLoading(true);
      auth.setAuth({ id: 1, first_name: "logged in" });
  };
  const register = () => {
    auth.setAuth({ id: 1, first_name: "registered" });
    /*
    fetch('/orderTypes', { method: 'POST', body: user, headers: {"Content-Type": "application/json"}})
		.then(response => {
			if (response.ok)
				return response.json();
			else
				return response.json().then(err => { throw err });
		}).then(registeredUser => {
      auth.setAuth(registeredUser);
		}).catch(err => {
			setErrors(err);
		});
*/
  }

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        var formValid = validateLoginForm();
        if (formValid && !registering) {
          authHandler();
        } else {
          register();
        }
      }}
    >
    <Col sm={8} lg={6} className="mx-auto">
      <Card body inverse color="info">
        <CardHeader>BKD Coin Exchange Login</CardHeader>
          <FormGroup>
            <Input
              type="email"
              name="email"
              value={user.email}
              placeholder="Email"
              onChange={e => { user.email = e.target.value; setUser(user) }}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              value={user.password}
              placeholder="Password"
              onChange={e => { user.password = e.target.value; setUser(user) }}
            />
          </FormGroup>

          { registering && <> 
          <FormGroup>
            <Input
              type="password"
              name="confirm-password"
              value=""
              placeholder="Confirm Password"
              onChange={e => { user.cpassword = e.target.value; setUser(user) }}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="first-name"
              value=""
              placeholder="First Name"
              onChange={e => { user.first_name = e.target.value; setUser(user) }}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="last-name"
              value=""
              placeholder="Last Name"
              onChange={e => { user.last_name = e.target.value; setUser(user) }}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="phone"
              name="phone"
              value=""
              placeholder="Phone"
              onChange={e => { user.phone = e.target.value; setUser(user) }}
            />
          </FormGroup>
          </> }

          <div>
          <Button type="submit" color="success" disabled={loading} className="w200">
            {registering ? "Register" : loading ? "Loading..." : "Sign In"}
          </Button>{' '}
          <Button color={registering ? "danger" : "warning"} className="w200" onClick={ () => setRegistering(!registering) }>
            {registering ? "Cancel" : "Register"}
          </Button>
          </div> 
      </Card>
    </Col>
    </Form>
  );
}

export default Login;