import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type StudentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Student {
  readonly id: string;
  readonly content?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Student, StudentMetaData>);
  static copyOf(source: Student, mutator: (draft: MutableModel<Student, StudentMetaData>) => MutableModel<Student, StudentMetaData> | void): Student;
}