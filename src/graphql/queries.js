/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStudent = /* GraphQL */ `
  query GetStudent($email: String!) {
    getStudent(email: $email) {
      id
      officialName
      preferredName
      studentID
      country
      city
      zipCode
      phone
      major
      interest
      peerMentor
      meetingTime
      EOP_Scholar
      units
      gpa
      documentUpload
      email
      membership
      payment
      vivo
      chapterInvolvement
      committeeCredit
      meetingAttendance
      socials
      workshops
      negative
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listStudents = /* GraphQL */ `
  query ListStudents(
    $email: String
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listStudents(
      email: $email
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        officialName
        preferredName
        studentID
        country
        city
        zipCode
        phone
        major
        interest
        peerMentor
        meetingTime
        EOP_Scholar
        units
        gpa
        documentUpload
        email
        membership
        payment
        vivo
        chapterInvolvement
        committeeCredit
        meetingAttendance
        socials
        workshops
        negative
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncStudents = /* GraphQL */ `
  query SyncStudents(
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncStudents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        officialName
        preferredName
        studentID
        country
        city
        zipCode
        phone
        major
        interest
        peerMentor
        meetingTime
        EOP_Scholar
        units
        gpa
        documentUpload
        email
        membership
        payment
        vivo
        chapterInvolvement
        committeeCredit
        meetingAttendance
        socials
        workshops
        negative
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
