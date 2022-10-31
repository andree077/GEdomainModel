import {gql} from '@apollo/client'

export const LOAD_SH_DATA = gql`
query Result {
  sensorData {
    timestamp
    sensor_01
    sensor_02
    sensor_03
    sensor_04
    sensor_05
    sensor_06
    sensor_07
    sensor_08
    sensor_09
    sensor_10
    machine_status
  }
}
`
