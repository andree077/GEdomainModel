import React, {useEffect, useState} from 'react';
import { useLazyQuery, useQuery, gql } from '@apollo/client';
import {LOAD_MAIN_DATA} from '../GraphQL/Queries'
import {useRef} from 'react';
import Table from './table';

function Result() {
  const [serviceRequest, setServiceRequest] = useState('')
  const [getSensorData, {error, loading, data}] = useLazyQuery(LOAD_MAIN_DATA, {
    variables: {
      sr : serviceRequest
    }
  });
  if (error) return <h1>Error Found!</h1>
  if (data) {
    // console.log(data)
  }

 const column =[]
        

  return (
    <div className='result'>
      <h1>Find Sensor Data for Service Request</h1>
      <input type="text" placeholder='Service request number' onChange={(event) => {setServiceRequest(event.target.value)}}/>
      <button onClick={() => getSensorData()}>Search</button> 
      <div className='data'>
      {data && ( 
        <>
        <h1 className='text-'>Dynamic Table</h1>
        <Table data={data} column={column}/>
        </>
        )}
      </div>
    </div>
  );
}

export default Result;