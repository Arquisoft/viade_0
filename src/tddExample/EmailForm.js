import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function EmailForm(props) {
 const [state, setState] = useState(
     {email: '', remail: '', enabled: false, welcomeMsg: ''}
 );

function changeEmail(e) {
     const email = e.target.value ;
     setState({...state, email: email, enabled: email === state.remail});
}

function changeRemail(e) {
     const remail = e.target.value ;
     setState({...state, remail: remail, enabled: remail === state.email});
}

//Simulate user registration. 
// In a real application this will call an api.
// We can mock the call using jest.mock
function registerUser(email) {
   if (email==='foo@test.com') //This user is already registered
      return false
   else
      return true //Everything went smooth
} 

const handleSubmit = (e) => {
    e.preventDefault()
    //Add the user to the database
    if (registerUser(state.email))
        setState({welcomeMsg:'User '+state.email+' has been registered!'})
    else
        setState({welcomeMsg:'ERROR: User '+state.email+' is already registered!'})
}


return (
   <Form name="register" onSubmit={handleSubmit}>
     <Form.Control type="text" name="email" placeholder="Input email" aria-label="email-input"
                   onChange={changeEmail} value={state.email}/>
     <Form.Control type="text" name="remail" placeholder="Input remail" aria-label="remail-input"
                   onChange={changeRemail} value={state.remail}/>
     <Button variant="primary" type="submit" disabled={!state.enabled}>Submit</Button>
     <div>
       <span hidden={state.welcomeMsg===''}>{state.welcomeMsg}</span>
     </div>
   </Form>
 )
}