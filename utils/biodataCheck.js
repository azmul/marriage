export const biodataCheckHandler = (user) => {
  const {
    generalInfo,
    address,
    education,
    family,
    personal,
    marriage,
    lifePartner,
    authority,
    contact,
  } = user;

  let obj = {};

  if (generalInfo) {
    delete generalInfo.monthlyIncome;
    obj = { ...obj, ...generalInfo };
  } else return true;

  if (address) {
    obj = { ...obj, ...address };
  } else return true;

  if(!education) return true;

  if (family) {
    delete family.brotherSisterOccupation;
    delete family.uncleOccupation;
    obj = { ...obj, ...family };
  } else return true;

  if (personal) {
    obj = { ...obj, ...personal };
  } else return true;

  if (marriage) {
    obj = { ...obj, ...marriage };
  } else return true;

  if (lifePartner) {
    delete lifePartner.familyStatus;
    obj = { ...obj, ...lifePartner };
  } else return true;

  if (authority) {
    obj = { ...obj, ...authority };
  } else return true;

  if (contact) {
    obj = { ...obj, ...contact };
  } else return true;

  const count = Object.keys(obj).map((key) => {
    const val = obj[key];
    return val === undefined || val === null || val.length <= 0 ? false : true;
  });

  return count.indexOf(false) > -1 ? false : true;
};
