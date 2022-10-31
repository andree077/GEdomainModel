import React, {useEffect, useState} from 'react';
import { useQuery, gql } from '@apollo/client';
import {LOAD_SH_DATA} from '../GraphQL/Queries'



function Result() {
    
    const {error, loading, data} = useQuery(LOAD_SH_DATA);
    const [users, setUsers] = useState([]);
    useEffect(() => {
      if(data) {
      setUsers(data.sensorData);
      }
    }, [data])


    return (
      <div> 
      {" "}
      {users.map((val) => {
      return <h1> {val.sensor_10}</h1>;
      })}
      </div>
    );
  }
  
  export default Result;

  