export const innerJoin = (xs, ys, sel) =>
  xs.reduce(
    (zs, x) =>
      ys.reduce(
        (
          zs,
          y // cartesian product - all combinations
        ) => zs.concat(sel(x, y) || []), // filter out the rows and columns you want
        zs
      ),
    []
  );

/**
 * Util function to return a promise which is resolved in provided milliseconds
 */
export const waitFor = (millSeconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, millSeconds);
  });
};

export const retryPromiseWithDelay = async (promise, nthTry, delayTime) => {
  try {
    const res = await promise;
    return res;
  } catch (e) {
    if (nthTry === 1) {
      return Promise.reject(e);
    }
    console.log("retrying", nthTry, "time");
    // wait for delayTime amount of time before calling this method again
    await waitFor(delayTime);
    return retryPromiseWithDelay(promise, nthTry - 1, delayTime);
  }
};
