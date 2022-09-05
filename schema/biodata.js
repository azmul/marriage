import S from "fluent-json-schema";

/** General Information */
const generalInfoBodyJsonSchema = S.object()
  .prop("name", S.string().required())
  .prop("gender", S.number().required())
  .prop("maritalStatus", S.number().required())
  .prop("parmanentDistrict", S.number().required())
  .prop("parmanentDivision", S.number().required())
  .prop("presentDistrict", S.number().required())
  .prop("presentDivision", S.number().required())
  .prop("birthYear", S.number().required())
  .prop("age", S.number().required())
  .prop("color", S.number().required())
  .prop("height", S.number().required())
  .prop("weight", S.number().required())
  .prop("bloodGroup", S.number().required())
  .prop("occupation", S.number().required())
  .prop("occupationDetails", S.string().required())
  .prop("monthlyIncome", S.string());

const generalInfoSchema = {
  body: generalInfoBodyJsonSchema,
};

/** Address */
const addressBodyJsonSchema = S.object()
  .prop("permanentAddress", S.string().required())
  .prop("presentAddress", S.string().required())
  .prop("childhoodPlace", S.string().required());

const addressSchema = {
  body: addressBodyJsonSchema,
};

/** Family */
const familyBodyJsonSchema = S.object()
  .prop("fatherName", S.string().required())
  .prop("motherName", S.string().required())
  .prop("fatherOccupation", S.string().required())
  .prop("motherOccupation", S.string().required())
  .prop("sisters", S.number().required())
  .prop("brothers", S.number().required())
  .prop("uncleOccupation", S.string())
  .prop("brotherSisterOccupation", S.string().required())
  .prop("socialStatus", S.string().required());

const familySchema = {
  body: familyBodyJsonSchema,
};

/** Personal Information */

const personalBodyJsonSchema = S.object()
  .prop("namaz", S.string().required())
  .prop("regularNamazTime", S.string().required())
  .prop("mahram", S.string().required())
  .prop("quran", S.string().required())
  .prop("mahzab", S.string().required())
  .prop("cinema", S.string().required())
  .prop("disease", S.string().required())
  .prop("islamicActivities", S.string().required())
  .prop("pir", S.string().required())
  .prop("mazar", S.string().required())
  .prop("islamicBook", S.string().required())
  .prop("alemsName", S.string().required())
  .prop("quality", S.string().required())
  .prop("yourslef", S.string().required());

const personalSchema = {
  body: personalBodyJsonSchema,
};

/** Marriage Information */

const marriageBodyJsonSchema = S.object()
  .prop("gurdianAggree", S.string().required())
  .prop("opinion", S.string().required());

const marriageSchema = {
  body: marriageBodyJsonSchema,
};

/** Other Information */
const otherBodyJsonSchema = S.object()
  .prop("otherInfo", S.string().required());

const otherSchema = {
  body: otherBodyJsonSchema,
};

/** Lifepartner Information */

const lifePartnerBodyJsonSchema = S.object()
  .prop("age", S.string().required())
  .prop("color", S.string().required())
  .prop("minimumHeight", S.string().required())
  .prop("minimumEducation", S.string().required())
  .prop("district", S.number().required())
  .prop("division", S.number().required())
  .prop("maritalStatus", S.number().required())
  .prop("occupation", S.string().required())
  .prop("economicalStatus", S.string().required())
  .prop("familyStatus", S.string().required())
  .prop("quality", S.string().required());

const lifepartnerSchema = {
  body: lifePartnerBodyJsonSchema,
};

/** Gurdian Permission */

const authorityJsonSchema = S.object()
  .prop("gurdianPermission", S.boolean().required())
  .prop("trueInformation", S.boolean().required())
  .prop("informationResponsibility", S.boolean().required());

const authoritySchema = {
  body: authorityJsonSchema,
};

/** Contact Information */
const contactBodyJsonSchema = S.object()
  .prop("gurdianContactNumber", S.string().required())
  .prop("relation", S.string().required())
  .prop("email", S.string().required())
  .prop("contactNumber", S.string().required());

const contactMarriageSchema = {
  body: contactBodyJsonSchema,
};

/** Eduction Information */
const educationBodyJsonSchema = S.object()
  .prop("eductionMedium", S.number().required())
  .prop("otherEduction", S.string())
  .prop("maximumEduction", S.string())
  .prop("hafez", S.boolean())
  .prop("doaraHadith", S.number())
  .prop("doaraHadithPassingYear", S.number())
  .prop("doaraHadithNatija", S.number())
  .prop("doaraHadithTakhasuk", S.boolean())
  .prop("doaraHadithRunningYear", S.number())
  .prop("isSSC", S.number())
  .prop("minimumSscClass", S.number())
  .prop("sscResult", S.string())
  .prop("sscDivision", S.number())
  .prop("sscPassingYear", S.string())
  .prop("isHSC", S.number())
  .prop("minimumHscClass", S.number())
  .prop("hscResult", S.string())
  .prop("hscDivision", S.number())
  .prop("hscPassingYear", S.string())
  .prop("diplomaSubject", S.string())
  .prop("diplomaInstitution", S.string())
  .prop("diplomaPassingYear", S.string())
  .prop("isDegree", S.number())
  .prop("degreeName", S.string())
  .prop("degreeInstitution", S.string())
  .prop("degreePassingYear", S.string());

const educationSchema = {
  body: educationBodyJsonSchema,
};

export {
  generalInfoSchema,
  addressSchema,
  familySchema,
  personalSchema,
  marriageSchema,
  otherSchema,
  lifepartnerSchema,
  authoritySchema,
  contactMarriageSchema,
  educationSchema,
};
