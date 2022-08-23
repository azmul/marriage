export const generalInfoPayload = (data) => {
  return {
    name: data.name,
    gender: data.gender,
    maritalStatus: data.maritalStatus,
    parmanentDistrict: data.parmanentDistrict,
    parmanentDivision: data.parmanentDivision,
    presentDistrict: data.presentDistrict,
    presentDivision: data.presentDivision,
    birthYear: data.birthYear,
    age: data.age,
    color: data.color,
    height: data.height,
    weight: data.weight,
    bloodGroup: data.bloodGroup,
    occupation: data.occupation,
    monthlyIncome: data.monthlyIncome
  }
}

export const addressPayload = (data) => {
  return {
    permanentAddress: data.permanentAddress,
    presentAddress: data.presentAddress,
    childhoodPlace: data.childhoodPlace
  }
}

export const familyPayload = (data) => {
  return {
    fatherName: data.fatherName,
    motherName: data.motherName,
    fatherOccupation: data.fatherOccupation,
    motherOccupation: data.motherOccupation,
    sisters: data.sisters,
    brothers: data.brothers,
    brotherSisterOccupation: data.brotherSisterOccupation,
    uncleOccupation: data.uncleOccupation,
    socialStatus: data.socialStatus
  }
}

export const personalPayload = (data) => {
  return {
    namaz: data.namz,
    regularNamazTime: data.regularNamazTime,
    mahram: data.mahram,
    quran: data.quran,
    mahzab: data.mahzab,
    political: data.political,
    cinema: data.cinema,
    disease: data.disease,
    islamicActivities: data.islamicActivities,
    pir: data.pir,
    mazar: data.mazar,
    islamicBook: data.islamicBook,
    alemsName: data.alemsName,
    quality: data.quality,
    yourslef: data.yourslef
  }
}

export const marriagePayload = (data) => {
  return {
    gurdianAggree: data.gurdianAggree,
    opinion: data.opinion
  }
}

export const otherPayload = (data) => {
  return {
    otherInfo: data.otherInfo
  }
}

export const lifePartnerPayload = (data) => {
  return {
    age: data.age,
    color: data.color,
    minimumHeight: data.minimumHeight,
    minimumEducation: data.minimumEducation,
    district: data.district,
    maritalStatus: data.maritalStatus,
    occupation: data.occupation,
    economicalStatus: data.economicalStatus,
    familyStatus: data.familyStatus,
    quality: data.quality
  }
}

export const authorityPayload = (data) => {
  return {
    gurdianPermission: data.gurdianPermission,
    trueInformation: data.trueInformation,
    informationResponsibility: data.informationResponsibility
  }
}

export const contactPayload = (data) => {
  return {
    gurdianContactNumber: data.gurdianContactNumber,
    relation: data.relation,
    email: data.email,
    contactNumber: data.contactNumber
  }
}

export const educationPayload = (data) => {
  return {
    eductionMedium: data.eductionMedium,
    madrasa: { 
      hafez: data.hafez,
      doaraHadith: data.doaraHadith,
      maximumEduction: data.maximumEduction,
    },
    ssc: { 
      isSSC: data.isSSC,
      noSscClass: data.noSscClass,
      result: data.sscResult,
      division: data.sscDivision,
      passingYear: data.sscPassingYear,
    },
    hsc: { 
      isHSC: data.isHSC,
      noHscClass: data.noHscClass,
      result: data.hscResult,
      division: data.hscDivision,
      passingYear: data.hscPassingYear,
    },
    diploma: { 
      subject: data.diplomaSubject,
      institution: data.diplomaInstitution,
      passingYear: data.diplomaPassingYear
    },
    bachelorDegree: { 
      degreeName: data.degreeName,
      institution: data.degreeInstitution,
      passingYear: data.degreePassingYear
    },
    otherEduction: data.otherEduction
  }
}