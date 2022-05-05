// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Student, Chapter } = initSchema(schema);

export {
  Student,
  Chapter
};