import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type StudentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Student {
  readonly id: string;
  readonly officialName?: string;
  readonly preferedName?: string;
  readonly studentID?: string;
  readonly country?: string;
  readonly city?: string;
  readonly zipCode?: string;
  readonly phone?: string;
  readonly major?: string;
  readonly interest?: string;
  readonly peerMentor?: string;
  readonly meetingTime?: string;
  readonly EOP_Scholar?: string;
  readonly units?: string;
  readonly gpa?: string;
  readonly documentUpload?: string;
  readonly email?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Student, StudentMetaData>);
  static copyOf(source: Student, mutator: (draft: MutableModel<Student, StudentMetaData>) => MutableModel<Student, StudentMetaData> | void): Student;
}