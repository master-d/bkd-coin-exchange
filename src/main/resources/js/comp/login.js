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
    if (!input.email || !input.email.match(/^\w+@\w+\.\w{2,4}$/))
      errCtx.addError("invalid email"), valid = false;
    if (!input.password) 
      errCtx.addError("password required"), valid = false;
    if (registering) {
      if (input.password != input.cpassword) 
        errCtx.addError("passwords do not match"), valid = false;
      if (!input.first_name) 
        errCtx.addError("first name is required"), valid = false;
      if (!input.last_name) 
        errCtx.addError("last name is required"), valid = false;
    }
    return valid;
  }
  const handleChange = (e) => {
    const vinput = {...input};
    vinput[e.currentTarget.name] = e.currentTarget.value;
    setInput(vinput);
  }
  const authHandler = () => {
    setLoading(true);
    const vinput = {...input};
    auth.setUser(vinput);
  };
  const register = () => {
    auth.setUser(input);
    /*
    fetch('/orderTypes', { method: 'POST', body: input, headers: {"Content-Type": "application/json"}})
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
              name="first_name"
              placeholder="First Name"
              onChange={handleChange} value={input.first_name}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="last_name" 
              placeholder="Last Name"
              onChange={handleChange} value={input.last_name}
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