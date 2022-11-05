import userService from '../../services/userService';
import {React, useState, useEffect, useParams} from 'react'
import {Button,Table} from 'react-bootstrap';
import faultyUserService from '../../services/faultyUserService';
import axios from 'axios';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function Home() {
  const [isChecked, setIsChecked]=useState(false);
  const [userInfo, setUserInfo]=useState([]);
  const [faultyUserInfo, setFaultyUserInfo]=useState([]);
  const [id, setId]=useState("");
  const [realId, setRealid]=useState();

  function handleCheck(){
    setIsChecked(!isChecked);
  }

  
    
      const fetchFaultyUsers=async()=>{
        try {
          //const response= await axios.get(`http://localhost:3001/api/v1/user/${id}`)
            const response= await faultyUserService.get(`/${id}`);
            setFaultyUserInfo(response.data.data);
        }
        catch (error) {
          console.log(error.message);  
        }
      }
      
    
  
    
      const fetchUser=async()=>{
        try{
            //const response= await axios.get(`http://localhost:3001/api/v1/userInfo/${realId}`);
            const response= await userService.get(`/${realId}`);
            setUserInfo(response.data.data);
      }
        catch(error){
          console.log(error.message);
        }
        
      }
    
    function handleChange(e){
      setId(e.target.value);
      setRealid(e.target.value);
    }
    function handleClick(e){
        if(isChecked===false){
        fetchFaultyUsers();
    }
        if(isChecked===true){
            fetchUser();
        }
    }


  return (
    <div>
    <h1>SQL Injection example</h1>
        <br></br>
        
        <input type="text" placeholder='enter developer id here' value={id} onChange={handleChange}></input>
        <br></br>
        <button type='submit' onClick={handleClick}>Search</button>
        <br></br>
        <label htmlFor='injectionSwitch'>Turn off SQL injection</label>
        <input type="checkbox" name="injectionSwitch" onClick={handleCheck}></input>
        <table style={{textAlign:'center'}}>
          <thead>
            <th scope='col'>Name</th>
            <th scope='col'>Company Mail</th>
            <th scope='col'>Wage</th>
            <th scope='col'>Position</th>
            <th scope='col'>Years of Experience</th>
          </thead>
       {(isChecked===false) &&(
          <div>
            {
          faultyUserInfo.map((faultyUser)=>{
            return(<tr key={faultyUser.prog_id}>
              <td>{faultyUser.name}</td>
              <td>{faultyUser.company_mail}</td>
              <td>{faultyUser.wage}</td>
              <td>{faultyUser.position}</td>
              <td>{faultyUser.years_of_experience}</td>
            </tr>)
          })
        }
          </div>
        )}

        {(isChecked===true)&&(
          <div>
             {
          userInfo.map((user)=>{
            return(<tr key={user.prog_id}>
              <td>{user.name}</td>
              <td>{user.company_mail}</td>
              <td>{user.wage}</td>
              <td>{user.position}</td>
              <td>{user.years_of_experience}</td>
            </tr>)
          })
        }
          </div>
        )}   

        </table>
        </div>
  )
}

export default Home
