import React, {useState} from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';

function Register () {
        const data = {
            name: "",
            location: "",
            contact: "",
        }
    const [registerData, setRegisterData] = useState(data)
    const [submitted, setSubmitted] = useState(false)
    const {name,location,contact}=registerData
    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name  
         setRegisterData({ ...registerData, [name]: value }) 
    }

    const validateData = (data) => {
        let isValid = true;
        data.forEach((el) => {
          if (!el) {
            isValid = false;
          }
        });
        return isValid;
      };

    const formSubmit = (e) => {
        e.preventDefault()
        console.log('registerData', registerData)
            const isValid = validateData([name,location,contact])
            if (isValid) {
                if(contact.length<10 ||contact.length>10){
                    alert ("please enter 10 digit number")
                }else{
                    axios.post('http://localhost:8080/register', {...registerData})
                    .then(res => console.log(res.data))
                    .catch(err => {
                        console.log(err)
                    });
                    setSubmitted(true)
                }
            }else{
                alert("please enter all fields")
            }
            if(submitted){
                 window.location.replace("/")
            }
    }
    
    
        return (
            <div className="container">
              <h3 className="text-center mt-3">Register </h3>
              <hr/>
              <form >
                <div className="row">
                    <div className="form-group col-md-4 offset-md-4">
                    <label >Name</label>
                    <input type="text" className="form-control" name="name" id="name" value={name} onChange={handleChange}/>
                    </div>
                </div>
               
               <div className="row">
                <div className="form-group col-md-4 offset-md-4">
                <label>Location</label>
                <input type="text" className="form-control" name="location" id="location" value={location} onChange={handleChange}/>
                </div>
               </div>
               
               <div className="row">
                <div className="form-group col-md-4 offset-md-4">
                    <label>Contact Number</label>
                    <input type="text" className="form-control" name="contact" id="contact" value={contact} onChange={handleChange}/>
                </div>
                </div>
 
                <div className="row ml-5 pl-3">
                <button type="submit" className="btn btn-primary col-md-1 offset-md-5" onClick={formSubmit}>Submit</button>
                </div>         
             </form>
            </div>
          );
    }

export default Register;