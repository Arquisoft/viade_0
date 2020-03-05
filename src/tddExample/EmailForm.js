import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function EmailForm(props) {
 const [state, setState] = useState({email: '', remail: '', enabled: false});

 function changeEmail(e) {
     const email = e.target.value ;
     setState({...state, email: email, enabled: email === state.remail});
 }

 function changeRemail(e) {
     const remail = e.target.value ;
     setState({...state, remail: remail, enabled: remail === state.email});
  }

 return (
   <Form>
       <Form.Control type="text" name="email"
                     placeholder="Input email"
                     aria-label="email-input"
                     onChange={changeEmail} value={state.email}/>
       <Form.Control type="text"
                     name="remail"
                     placeholder="Input remail"
                     aria-label="remail-input"
                     onChange={changeRemail} value={state.remail}/>
       <Button variant="primary" type="submit" disabled={!state.enabled}>Submit</Button>
   </Form>
 )
}