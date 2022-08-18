import S from "fluent-json-schema";

/** General Information */
const generalInfoBodyJsonSchema = S.object()
  .prop("name", S.string().required())
  .prop("gender", S.number().required())
  .prop("maritalStatus", S.number().required());

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
  .prop("permanentAddress", S.string().required())
  .prop("presentAddress", S.string().required())
  .prop("childhoodPlace", S.string().required());

const createFamilySchema = {
  body: familyBodyJsonSchema,
};

export { createGeneralInfoSchema, createAddressSchema, createFamilySchema };
