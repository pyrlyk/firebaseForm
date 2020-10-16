import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import EmailIcon from '@material-ui/icons/Email';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CallIcon from '@material-ui/icons/Call';
import PublicIcon from '@material-ui/icons/Public';
import MessageIcon from '@material-ui/icons/Message';
import FormHelperText from '@material-ui/core/FormHelperText';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';





class App extends Component{
  constructor(){
    super();
    this.state = {
        userName : '',
        country : '',
        email : '',
        message : '',
        number : [],
        items : []
    }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }
    handleChange(e){
      this.setState({
        [e.target.name] : e.target.value
      });
    }

    handleSubmit(e){
      e.preventDefault();
      const itemRef = firebase.database().ref('items');
      const item = {
        userName : this.state.userName,
        country : this.state.country,
        email : this.state.email,
        message: this.state.message,
        number : this.state.number
      }
      itemRef.push(item);
      this.setState({
        userName : '',
        country : '',
        email : '',
        message : '',
        number : []
      });
    }

    componentDidMount(){
      const itemRef = firebase.database().ref('items');
      itemRef.on('value', (snapshot) => {
        let items = snapshot.val();
        let newState = [];
        for(let item in items){
          newState.push({
            id : item,
            userName : items[item].userName,
            country : items[item].country,
            email : items[item].email,
            message : items[item].message,
            number : items[item].number
          });
        }
        this.setState({
          items : newState
        });
      });
     
    }

    removeItem(itemId){
      const itemRef = firebase.database().ref(`/items/${itemId}`);
      itemRef.remove();
    }

   render(){
    return(
  <div className = 'userName'>
        <form onSubmit={this.handleSubmit}>
          <div className="">
          <Grid container alignItems="flex-end">
          <Grid item>
            <AccountCircle />
            </Grid>
            <Grid item>
            <TextField type='text' name = "userName" 
            onChange={this.handleChange} value = {this.state.userName} label="Enter your name" />
          </Grid>
        </Grid>
</div>

<div className= 'email'>
          <Grid container alignItems="flex-end">
          <EmailIcon/>
          <TextField type='email' name = 'email' 
            onChange={this.handleChange} value = {this.state.email} label="Enter your e-mail" />
          </Grid>
</div>
<div className = 'number'>
             <Grid container alignItems="flex-end">
               <CallIcon/>
             <FormControl>
              <InputLabel htmlFor="">Number phone</InputLabel>
                <Input type='tel' name = 'number'
                   onChange={this.handleChange} value = {this.state.number}/>
               </FormControl>
               </Grid>

</div>

<div className = 'country'>
<Grid container alignItems="flex-end">
              <PublicIcon/>
<FormControl className=''>
        <InputLabel>Country</InputLabel>
        <Select name = 'country' onChange={this.handleChange} value = {this.state.country} >
        <MenuItem value='Australia'>Australia</MenuItem>
        <MenuItem value='USA'>USA</MenuItem>
        <MenuItem value='Sweden'>Sweden</MenuItem>
        <MenuItem value='UK'>UK</MenuItem>
        <MenuItem value='Germany'>Germany</MenuItem>
        <MenuItem value='Ukraine'>Ukraine</MenuItem>
        <MenuItem value='Canada'>Canada</MenuItem>
        </Select>
        <FormHelperText>Select your country</FormHelperText>
      </FormControl>
       
      </Grid>
 </div>

<div className = 'message'>
<Grid container alignItems="flex-end">
  <MessageIcon/>
 <TextareaAutosize
      name = 'message'
      rowsMax={5}
      aria-label="maximum height"
      placeholder="Message to us"
      onChange={this.handleChange} value = {this.state.message} />
      </Grid>
</div>

<div className = 'button'>
<Button
        onClick={this.handleSubmit} 
        variant="contained" 
        color="primary"
        endIcon={<Icon></Icon>}>Send</Button>
        </div>
 </form>

        <div className = 'container'>
            
            <section className='displayItem'>
              <div className="wrapper">
                <ul>
                  {this.state.items.map((item) => {
                    return (
                      <li key={item.id}>
                        <h3>Your name: {item.userName}</h3>
                        <h3>Your country: {item.country}</h3>
                        <h3>Your email: {item.email}</h3>
                        <h3>Your message to us: {item.message}</h3>
                        <h3>Your number phone: {item.number}</h3>
                        <p>
                          <Button onClick={() => this.removeItem(item.id)}
                           variant="contained" 
                           color="secondary"
                           startIcon={<DeleteIcon />}>Remove Data 
                           </Button>
                        </p>
                      </li>
                    )
                  })}
                </ul>
              </div>
          </section>
        </div>
        </div>

    )
  }}

  export default App;
  
/*
<div className = 'button'>
<Button onClick={this.handleSubmit} variant="contained" color="primary">Send</Button>
</div>*/