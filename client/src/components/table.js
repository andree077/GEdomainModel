import React, {useEffect, useState} from 'react';
import './table.css';
import Rows from './row'


const Table = ({data, column}) => {
  return (
    <table>
      <thead>
        <tr>
        {data.result[0].sensor_01 && (column = [{heading : 'Sensor 1', value: 'sensor_01'}, {heading : 'Sensor 2', value: 'sensor_02'}],
            <>
            <th className='text-pink-500'>Sensor 1</th>
            <th className='text-pink-500'>Sensor 2</th>
            </>)
          }
          {data.result[0].sensor_03 && (column = [{heading : 'Sensor 3', value: 'sensor_03'}, {heading : 'Sensor 4', value: 'sensor_04'}, {heading : 'Sensor 5', value: 'sensor_05'}],
            <>
            <th className='text-pink-500'>Sensor 3</th>
            <th className='text-pink-500'>Sensor 4</th>
            <th>Sensor 5</th>
            </>
          )}
          {data.result[0].sensor_06 && (column = [{heading : 'Sensor 6', value: 'sensor_06'}, {heading : 'Sensor 7', value: 'sensor_07'}],
            <>
            <th>Sensor 6</th>
            <th>Sensor 7</th>
            </>
          )}
          {data.result[0].sensor_08 && (column = [{heading : 'Sensor 8', value: 'sensor_08'}, {heading : 'Sensor 9', value: 'sensor_09'}, {heading : 'Sensor 10', value: 'sensor_10'}],
            <>
            <th>Sensor 8</th>
            <th>Sensor 9</th>
            <th>Sensor 10</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        <Rows data={data} column ={column}/>
        {/* {Object.values(data).map((item, index) => <TableRow item={item[0]} column={column}/>)}
        {Object.values(data).map((item, index) => <TableRow item={item[1]} column={column}/>)} */}
      </tbody>
    </table>
  )

}




export default Table