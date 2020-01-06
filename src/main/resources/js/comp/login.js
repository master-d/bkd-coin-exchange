import * as React from "react";
import { Button, Form, FormGroup, Input, Col, Card, CardHeader, ButtonGroup } from "reactstrap";

/** Context */
import { AuthContext } from "../context/auth-context";
import Errors from "./errors";
import { ErrorContext } from "../context/error-context";

function Login() {
  const auth = React.useContext(AuthContext);
  const errCtx = React.useContext(ErrorContext);
  const user = {...auth.user};
  const [input, setInput] = React.useState(user);
  const [loading, setLoading] = React.useState(false);
  const [registering, setRegistering] = React.useState(false);

  const validateLoginForm = () => {
    var valid = true;
    var errors = [];
    if (!input.email || !input.email.match(/^\w+@\w+\.\w{2,4}$/))
      errors.push({ message: "invalid email", severity: "danger"}), valid = false;
    if (!input.password) 
      errors.push({ message: "password required", severity: "danger"}), valid = false;
    if (registering) {
      if (!input.userName) 
        errors.push({ message: "User Name is required", severity: "danger"}), valid = false;
      if (input.password != input.cpassword) 
        errors.push({ message: "passwords do not match", severity: "danger"}), valid = false;
      if (!input.firstName) 
        errors.push({ message: "first name is required", severity: "warning"}), valid = false;
      if (!input.lastName) 
        errors.push({ message: "last name is required", severity: "danger"}), valid = false;
    }
    errCtx.setErrors(errors);
    return valid;
  }
  const handleChange = (e) => {
    const vinput = {...input};
    vinput[e.currentTarget.name] = e.currentTarget.value;
    setInput(vinput);
  }
  const authHandler = () => {
    setLoading(true);
    fetch('/login', { method: 'POST', body: JSON.stringify(input), headers: {"Content-Type": "application/json"}})
		.then(response => {
      setLoading(false);
			if (response.ok)
				return response.json();
			else
				response.text().then(err => {throw err});
		}).then(registeredUser => {
      auth.setUser(registeredUser);
		}).catch(err => {
			errCtx.addError(err);
		});
  };
  const register = () => {
    setLoading(true);
    fetch('/register', { method: 'POST', body: JSON.stringify(input), headers: {"Content-Type": "application/json"}})
		.then(response => {
      setLoading(false);
			if (response.ok)
				return response.json();
			else
        response.text().then(err => {throw err});
		}).then(registeredUser => {
      auth.setAuth(registeredUser);
		}).catch(err => {
			errCtx.addError(err);
		});
  }

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        var formValid = validateLoginForm();
        if (formValid && !registering) {
          authHandler();
        } else if (formValid && registering) {
          register();
        } else {
          // form errors exist
        }
      }}
    >
    <Col sm={8} lg={6} className="mx-auto">
      <Card body inverse color="info">
        <Errors/>
        <CardHeader>BKD Coin Exchange Login</CardHeader>
          <FormGroup>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange} value={input.email}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange} value={input.password}
            />
          </FormGroup>

          { registering && <> 
          <FormGroup>
            <Input
              type="password"
              name="cpassword"
              placeholder="Confirm Password"
              onChange={handleChange} value={input.cpassword}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="userName"
              placeholder="User Name"
              onChange={handleChange} value={input.userName}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange} value={input.firstName}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="lastName" 
              placeholder="Last Name"
              onChange={handleChange} value={input.lastName}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="phone"
              name="phone"
              placeholder="Phone"
              onChange={handleChange} value={input.phone}
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