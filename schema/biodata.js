import S from "fluent-json-schema";

/** General Information */
const generalInfoBodyJsonSchema = S.object()
  .prop("name", S.string().required())
  .prop("gender", S.number().required())
  .prop("maritalStatus", S.number().required())
  .prop("parmanentDistrict", S.string().required())
  .prop("presentDistrict", S.string().required())
  .prop("birthYear", S.string().required())
  .prop("color", S.string().required())
  .prop("height", S.string().required())
  .prop("weight", S.string().required())
  .prop("bloodGroup", S.string().required())
  .prop("occupation", S.string().required())
  .prop("monthlyIncome", S.string());

const createGeneralInfoSchema = {
  body: generalInfoBodyJsonSchema,
};

/** Address */
const addressBodyJsonSchema = S.object()
  .prop("permanentAddress", S.string().required())
  .prop("presentAddress", S.string().required())
  .prop("childhoodPlace", S.string().required());

const createAddressSchema = {
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
  .prop("uncleOccupation", S.string().required())
  .prop("socialStatus", S.string().required());

const createFamilySchema = {
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

const createPersonaSchema = {
  body: personalBodyJsonSchema,
};

/** Marriage Information */

const marriageBodyJsonSchema = S.object()
  .prop("gurdianAggree", S.string().required())
  .prop("opinion", S.string().required());

const createMarriageSchema = {
  body: marriageBodyJsonSchema,
};

/** Other Information */
const otherBodyJsonSchema = S.object()
  .prop("gurdianAggree", S.string().required())
  .prop("opinion", S.string().required());

const createOtherSchema = {
  body: otherBodyJsonSchema,
};

/** Lifepartner Information */

const lifePartnerBodyJsonSchema = S.object()
  .prop("age", S.string().required())
  .prop("color", S.string().required())
  .prop("minimuHeight", S.string().required())
  .prop("minimumEducation", S.string().required())
  .prop("district", S.string().required())
  .prop("maritalStatus", S.string().required())
  .prop("occupation", S.string().required())
  .prop("economicalStatus", S.string().required())
  .prop("familyStatus", S.string().required())
  .prop("quality", S.string().required());

const createLifepartnerSchema = {
  body: lifePartnerBodyJsonSchema,
};

/** Gurdian Permission */

const gurdianPermissionJsonSchema = S.object()
  .prop("gurdianPermission", S.boolean().required())
  .prop("trueInformation", S.boolean().required())
  .prop("informationResponsibility", S.boolean().required());

const createGurdianPermissionSchema = {
  body: gurdianPermissionJsonSchema,
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
  .prop("otherEduction", S.string().required())
  .prop(
    "ssc",
    S.object()
      .prop("isSSC", S.boolean().required())
      .prop("noSscClass", S.string().required())
      .prop("result", S.string().required())
      .prop("division", S.string().required())
      .prop("passingYear", S.string().required())
  )
  .prop(
    "hsc",
    S.object()
      .prop("isHSC", S.boolean().required())
      .prop("noHscClass", S.string().required())
      .prop("result", S.string().required())
      .prop("division", S.string().required())
      .prop("passingYear", S.string().required())
  )
  .prop(
    "diploma",
    S.object()
      .prop("subject", S.string().required())
      .prop("institution", S.string().required())
      .prop("passingYear", S.string().required())
  )
  .prop(
    "bachelorDegree",
    S.object()
      .prop("degreeName", S.string().required())
      .prop("institution", S.string().required())
      .prop("passingYear", S.string().required())
  );

const educationSchema = {
  body: educationBodyJsonSchema,
};

export {
  createGeneralInfoSchema,
  createAddressSchema,
  createFamilySchema,
  createPersonaSchema,
  createMarriageSchema,
  createOtherSchema,
  createLifepartnerSchema,
  createGurdianPermissionSchema,
  contactMarriageSchema,
  educationSchema,
};
