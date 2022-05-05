import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type StudentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChapterMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Student {
  readonly id: string;
  readonly officialName?: string | null;
  readonly preferredName?: string | null;
  readonly studentID?: string | null;
  readonly country?: string | null;
  readonly city?: string | null;
  readonly zipCode?: string | null;
  readonly phone?: string | null;
  readonly major?: string | null;
  readonly interest?: string | null;
  readonly peerMentor?: string | null;
  readonly meetingTime?: string | null;
  readonly EOP_Scholar?: string | null;
  readonly units?: string | null;
  readonly gpa?: string | null;
  readonly documentUpload?: string | null;
  readonly email: string;
  readonly membership?: string | null;
  readonly payment?: string | null;
  readonly vivo?: string | null;
  readonly chapterInvolvement?: string | null;
  readonly committeeCredit?: string | null;
  readonly meetingAttendance?: string | null;
  readonly socials?: string | null;
  readonly workshops?: string | null;
  readonly negative?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Student, StudentMetaData>);
  static copyOf(source: Student, mutator: (draft: MutableModel<Student, StudentMetaData>) => MutableModel<Student, StudentMetaData> | void): Student;
}

export declare class Chapter {
  readonly id: string;
  readonly signupForm?: string | null;
  readonly officers?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Chapter, ChapterMetaData>);
  static copyOf(source: Chapter, mutator: (draft: MutableModel<Chapter, ChapterMetaData>) => MutableModel<Chapter, ChapterMetaData> | void): Chapter;
}