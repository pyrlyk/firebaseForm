import React, {useEffect, useState} from 'react';
import firebaseConf from "./firebase";

function Form() {
    useEffect(()=>{
      //  firebaseConf ???
         /*
         ????
          */
    },[])


    const [name, setName] = useState('');
    const [country,setCountry] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [message, setMessage] = useState('');


    const sendData= (event) =>{
        event.preventDefault();
            setName({
                name,
                [event.target.name]:event.target.value
            });
            setEmail({
                email,
                [event.target.email]:event.target.value
            });
            setPhone({
                phone,
                [event.target.phone]: event.target.value
            });
             setMessage({
                 message,
                 [event.target.message]:event.target.value
             });

             if(event.target.name && event.target.emeil && event.target.phone && event.target.message){
                 firebaseConf.add(sendData).then(()=>{
                     alert('Your message was sent successfully');
                 }).catch(()=>{
                     alert('Your message could not be sent');
                 });
             }else {
                 alert('Please fill the form');
             }
   };


    return (
        <div className='form'>
            <form>
            <div className='form-group'>
                <label htmlFor='name'>Name:</label>
                <input type='text'
                       className='form-control'
                       id='name'
                       placeholder='Enter your name'
                       onChange={sendData.name} />
            </div>

            <div className='form-group'>
                <label htmlFor='country'>Country:</label>
                <select className='form-control'
                        id='country'
                        onChange={(event => setCountry(event.target.value))}>
                    <option selected value='Australia'>Australia</option>
                    <option value='Ukraine'>Ukraine</option>
                    <option value='Germany'>Germany</option>
                    <option value='USA'>USA</option>
                    <option value='UK'>UK</option>
                </select>
            </div>

            <div className='form-group'>
                <label htmlFor='exampleInputEmail1'>E-mail:</label>
                <input type='email'
                       className='form-control'
                       id='email'
                       placeholder='Enter your e-mail'
                       onChange={sendData.emeil}/>
            </div>

            <div className='form-group'>
                <label htmlFor='phone'>Phone:</label>
                <input type='number'
                       className='form-control'
                       id='phone'
                       placeholder='Your phone'
                       onChange={sendData.phone}/>
            </div>

            <div className='form-group'>
                <label htmlFor='message'>Message:</label>
                <textarea className='form-control'
                          id='message'
                          rows='3'
                          placeholder='Message to us'
                          onChange={sendData.message}></textarea>
            </div>
            <button type='submit' className='btn-primary'>Send</button>
            <button type='reset' className='btn-primary'>Reset</button>
        </form>


        </div>

    );
}

export default Form;