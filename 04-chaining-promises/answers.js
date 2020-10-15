/**
 * 
 * EXERCISE 1
 * 
 * @param {Promise} promise 
 * @param {function} asyncTransformer 
 */
function flatMapPromise(promise, asyncTransformer){
  return new Promise((resolve, reject) => {
    promise
      .then(result => resolve(asyncTransformer(result)), reason => reject(reason));
  });
}

/**
 * 
 * EXERCISE 2
 * 
 * @param {Promise} firstPromise 
 * @param {function} slowAsyncProcess 
 */
function chainTwoAsyncProcesses(firstPromise, slowAsyncProcess){
  return firstPromise.then(slowAsyncProcess)
}

/**
 * 
 * EXERCISE 3
 * 
 * @param {function} getUserById 
 * @param {function} getOrganizationById 
 */
function makeGetUserByIdWithOrganization(getUserById, getOrganizationById){
  return function getUserByIdWithOrganization(userId){
    return getUserById(userId)
      .then(userObj => {
        if (userObj == undefined) {
          throw new Error(`Could not find user with ID ${userId}`)
        }
        return userObj
      })
      .then(userObj => {
        return getOrganizationById(userObj.organizationId)
          .then(orgObj => {
            userObj['organization'] = orgObj
            return userObj
          })
      })
      .catch(() => undefined)
  };
}

module.exports = {
  flatMapPromise,
  chainTwoAsyncProcesses,
  makeGetUserByIdWithOrganization,
};