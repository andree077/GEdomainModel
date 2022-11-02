import {gql} from '@apollo/client'

export const LOAD_MAIN_DATA = gql`
query Result($sr: String) {
  result(sr: $sr) {
    ... on HM {
      sensor_01
      sensor_02
      machine_status
    }
    ... on Magnet {
      sensor_03
      sensor_04
      sensor_05
      machine_status
    }
    ... on Detector {
      sensor_06
      sensor_07
      machine_status
    }
    ... on Tube {
      sensor_08
      sensor_09
      sensor_10
      machine_status
    }
  }
}
`
