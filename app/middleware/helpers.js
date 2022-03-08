export function trimInputData(reqBody = {}) {
  for (let key in reqBody) {
    if (!Array.isArray(reqBody[key])) {
      reqBody[key] = reqBody[key].trim();
    }
    // if(key === 'images') {
    //   reqBody[key] = reqBody[key].split(',');
    // }
  }
  return reqBody;
}

export function setUserInfo(request) {
  return {
    _id: request._id,
    email: request.email,
    role: request.role
  };
}
