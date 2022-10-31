import { createRequire } from "module";
const require = createRequire(import.meta.url);
const objects1 = require('./data.json');
const objects2 = require('./sensor.json');
const mri_objects = require('./mri_sensor.json');
const ct_objects = require('./ct_sensor.json');
const _ = require('lodash');
const { graphQlQueryToJson } = require("graphql-query-to-json")


var serviceh_data = Object.values(objects1);
var machine_data = Object.values(objects2);
var mri_machine_data = Object.values(mri_objects);
var ct_machine_data = Object.values(ct_objects);



var mri_mainlst = []
for (var i = 0; i < serviceh_data.length; i++)
{
    var lst = []
    var date1 = new Date(serviceh_data[i].sr_open_date);
    var date2 = new Date(serviceh_data[i].sr_close_date);
    for (var j = 0; j < mri_machine_data.length; j++)
    {
        var date = new Date(mri_machine_data[j].timestamp);
        if ((date1.getTime() < date.getTime()) && (date.getTime() < date2.getTime())) {
            lst.push(machine_data[j]);
        }
    }
    mri_mainlst.push(lst);
}

var ct_mainlst = []
for (var i = 0; i < serviceh_data.length; i++)
{
    var lst = []
    var date1 = new Date(serviceh_data[i].sr_open_date);
    var date2 = new Date(serviceh_data[i].sr_close_date);
    for (var j = 0; j < ct_machine_data.length; j++)
    {
        var date = new Date(ct_machine_data[j].timestamp);
        if ((date1.getTime() < date.getTime()) && (date.getTime() < date2.getTime())) {
            lst.push(machine_data[j]);
        }
    }
    ct_mainlst.push(lst);
}


const resolvers = {
    Query : {
        serviceHistoryData : () => {
            return serviceh_data;
        },
        sensorData : () => {
            return machine_data;
        },
        sr_instance : (root, {activity_id}) => {
            return serviceh_data.filter(sr_instance => {
                return sr_instance.activity_id === activity_id;
        });
        },
        sd_instance : (root, {timestamp}) => {
            return machine_data.filter(sd_instance => {
                return sd_instance.timestamp === timestamp;
            });
        },
        result : (obj, {sr}) => {
            Number(sr);
            if (serviceh_data[sr-1].modality == "MRI" && serviceh_data[sr-1].component_subsystem == "Host machine")
            {
                var hm_array = JSON.parse(JSON.stringify(mri_mainlst));
                const hm_relavant_data = `{
                    sensor_01
                    sensor_02
                    machine_status
                }`
                
                for (var i = 0; i < serviceh_data.length; i++)
                {
                    var count = 0;
                    while (mri_mainlst[i][count])
                    {
                        count++;
                    }
                    for (var k = 0; k < count; k++)
                    {
                        hm_array[i][k] = graphQlQueryToJson(hm_relavant_data).query
                        for (const key of Object.keys(hm_array[i][k])) {
                            // and if that key has a value of "true"...
                            if (hm_array[i][k][key] === true) {
                                // replace "true" with the value from myFridge
                                hm_array[i][k][key] = mri_mainlst[i][k][key]
                            }
                        }
                    }
                }
                return hm_array[sr-1]
            }
            if (serviceh_data[sr-1].modality == "MRI" && serviceh_data[sr-1].component_subsystem == "Magnet")
            {
                var mri_array = JSON.parse(JSON.stringify(mri_mainlst));
                const hm_relavant_data = `{
                    sensor_03
                    sensor_04
                    sensor_05
                    machine_status
                }`
                
                for (var i = 0; i < serviceh_data.length; i++)
                {
                    var count = 0;
                    while (mri_mainlst[i][count])
                    {
                        count++;
                    }
                    for (var k = 0; k < count; k++)
                    {
                        mri_array[i][k] = graphQlQueryToJson(hm_relavant_data).query
                        for (const key of Object.keys(mri_array[i][k])) {
                            // and if that key has a value of "true"...
                            if (mri_array[i][k][key] === true) {
                                // replace "true" with the value from myFridge
                                mri_array[i][k][key] = mri_mainlst[i][k][key]
                            }
                        }
                    }
                }
                return mri_array[sr-1]
            }
            if (serviceh_data[sr-1].modality == "CT" && serviceh_data[sr-1].component_subsystem == "Detector")
            {
                var detector_array = JSON.parse(JSON.stringify(ct_mainlst));
                const detector_relavant_data = `{
                    sensor_06
                    sensor_07
                    machine_status
                }`
                
                for (var i = 0; i < serviceh_data.length; i++)
                {
                    var count = 0;
                    while (mri_mainlst[i][count])
                    {
                        count++;
                    }
                    for (var k = 0; k < count; k++)
                    {
                        detector_array[i][k] = graphQlQueryToJson(detector_relavant_data).query
                        for (const key of Object.keys(detector_array[i][k])) {
                            // and if that key has a value of "true"...
                            if (detector_array[i][k][key] === true) {
                                // replace "true" with the value from myFridge
                                detector_array[i][k][key] = ct_mainlst[i][k][key]
                            }
                        }
                    }
                }
                return detector_array[sr-1]
            }
            if (serviceh_data[sr-1].modality == "CT" && serviceh_data[sr-1].component_subsystem == "Tube")
            {
                var tube_array = JSON.parse(JSON.stringify(ct_mainlst));
                const tube_relavant_data = `{
                    sensor_08
                    sensor_09
                    sensor_10
                    machine_status
                }`
                
                for (var i = 0; i < serviceh_data.length; i++)
                {
                    var count = 0;
                    while (mri_mainlst[i][count])
                    {
                        count++;
                    }
                    for (var k = 0; k < count; k++)
                    {
                        tube_array[i][k] = graphQlQueryToJson(tube_relavant_data).query
                        for (const key of Object.keys(tube_array[i][k])) {
                            // and if that key has a value of "true"...
                            if (tube_array[i][k][key] === true) {
                                // replace "true" with the value from myFridge
                                tube_array[i][k][key] = ct_mainlst[i][k][key]
                            }
                        }
                    }
                }
                return tube_array[sr-1]
            }
        }
    },
    Machine : {
            __resolveType : (obj, {sr}) => {
                if (obj.sensor_01) {
                    return 'HM';
                }
                if (obj.sensor_03) {
                    return 'Magnet';
                }
                if (obj.sensor_06) {
                    return 'Detector';
                }
                if (obj.sensor_09) {
                    return 'Tube';
                }
                return null;
            }
        }

//     MRIsensors : {
//         host_machine : (Machine, {sr}) => {
//             if (serviceh_data[sr-1].modality == "MRI" && serviceh_data[sr-1].component_subsystem == "Host machine")
//             {
//                 var hm_array = JSON.parse(JSON.stringify(mri_mainlst));
//                 const hm_relavant_data = `{
//                     sensor_01
//                     sensor_02
//                     machine_status
//                 }`
                
//                 for (var i = 0; i < serviceh_data.length; i++)
//                 {
//                     var count = 0;
//                     while (mri_mainlst[i][count])
//                     {
//                         count++;
//                     }
//                     for (var k = 0; k < count; k++)
//                     {
//                         hm_array[i][k] = graphQlQueryToJson(hm_relavant_data).query
//                         for (const key of Object.keys(hm_array[i][k])) {
//                             // and if that key has a value of "true"...
//                             if (hm_array[i][k][key] === true) {
//                                 // replace "true" with the value from myFridge
//                                 hm_array[i][k][key] = mri_mainlst[i][k][key]
//                             }
//                         }
//                     }
//                 }
//                 return hm_array[sr-1]
//             }
//         },
//         magnet : (Machine, {sr}) => {
//             if (serviceh_data[sr-1].modality == "MRI" && serviceh_data[sr-1].component_subsystem == "Magnet")
//             {
//                 var mri_array = JSON.parse(JSON.stringify(mri_mainlst));
//                 const hm_relavant_data = `{
//                     sensor_03
//                     sensor_04
//                     sensor_05
//                     machine_status
//                 }`
                
//                 for (var i = 0; i < serviceh_data.length; i++)
//                 {
//                     var count = 0;
//                     while (mri_mainlst[i][count])
//                     {
//                         count++;
//                     }
//                     for (var k = 0; k < count; k++)
//                     {
//                         mri_array[i][k] = graphQlQueryToJson(hm_relavant_data).query
//                         for (const key of Object.keys(mri_array[i][k])) {
//                             // and if that key has a value of "true"...
//                             if (mri_array[i][k][key] === true) {
//                                 // replace "true" with the value from myFridge
//                                 mri_array[i][k][key] = mri_mainlst[i][k][key]
//                             }
//                         }
//                     }
//                 }
//                 return mri_array[sr-1]
//             }
//         }

//     },

//     CTsensors : {
//         detector : (Machine, {sr}) => {
//             if (serviceh_data[sr-1].modality == "CT" && serviceh_data[sr-1].component_subsystem == "Detector")
//             {
//                 var detector_array = JSON.parse(JSON.stringify(ct_mainlst));
//                 const detector_relavant_data = `{
//                     sensor_06
//                     sensor_07
//                     machine_status
//                 }`
                
//                 for (var i = 0; i < serviceh_data.length; i++)
//                 {
//                     var count = 0;
//                     while (mri_mainlst[i][count])
//                     {
//                         count++;
//                     }
//                     for (var k = 0; k < count; k++)
//                     {
//                         detector_array[i][k] = graphQlQueryToJson(detector_relavant_data).query
//                         for (const key of Object.keys(detector_array[i][k])) {
//                             // and if that key has a value of "true"...
//                             if (detector_array[i][k][key] === true) {
//                                 // replace "true" with the value from myFridge
//                                 detector_array[i][k][key] = ct_mainlst[i][k][key]
//                             }
//                         }
//                     }
//                 }
//                 return detector_array[sr-1]
//             }
//         },
//         tube : (Machine, {sr}) => {
//             if (serviceh_data[sr-1].modality == "CT" && serviceh_data[sr-1].component_subsystem == "Tube")
//             {
//                 var mri_array = JSON.parse(JSON.stringify(ct_mainlst));
//                 const tube_relavant_data = `{
//                     sensor_09
//                     sensor_10
//                     machine_status
//                 }`
                
//                 for (var i = 0; i < serviceh_data.length; i++)
//                 {
//                     var count = 0;
//                     while (mri_mainlst[i][count])
//                     {
//                         count++;
//                     }
//                     for (var k = 0; k < count; k++)
//                     {
//                         mri_array[i][k] = graphQlQueryToJson(tube_relavant_data).query
//                         for (const key of Object.keys(mri_array[i][k])) {
//                             // and if that key has a value of "true"...
//                             if (mri_array[i][k][key] === true) {
//                                 // replace "true" with the value from myFridge
//                                 mri_array[i][k][key] = ct_mainlst[i][k][key]
//                             }
//                         }
//                     }
//                 }
//                 return mri_array[sr-1]
//             }
//         }

//     }
}



export default resolvers;