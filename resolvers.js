import { createRequire } from "module";
const require = createRequire(import.meta.url);

const data = require('./data.json');

const resolvers = {
    Query : {
        allAttributes : () => {
            return data.findAll()
        },
    },
    /*Course : {
        subjects : (Course) => {
            return SubjectData.findById(coursesData.subjectid);
        }
    }*/
}

export default resolvers;