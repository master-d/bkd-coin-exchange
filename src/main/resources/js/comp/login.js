import * as React from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";

/** Context */
import { AuthContext } from "../context/auth-context";

function Login() {
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const auth = React.useContext(AuthContext);

  const validateLoginForm = () => {
      if (!userEmail || !userEmail.match(/^\w+@\w+\.\w{2,4}$/))
          console.log("invalid email");
      if (!userPassword) 
          console.log("password required");
  }
  const authHandler = () => {
      setLoading(true);
      auth.setAuthStatus({ id: 1, name: "sample" });
  };

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        if (validateLoginForm(userEmail, userPassword, showError)) {
          authHandler();
        }
      }}
    >
      <Header>Sign in</Header>
      <FormGroup>
        <Input
          type="email"
          name="email"
          value={userEmail}
          placeholder="john@mail.com"
          onChange={e => setUserEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="password"
          name="password"
          value={userPassword}
          placeholder="Password"
          onChange={e => setUserPassword(e.target.value)}
        />
      </FormGroup>
      <Button type="submit" disabled={loading} block={true}>
        {loading ? "Loading..." : "Sign In"}
      </Button>
    </Form>
  );
}

export default Login;