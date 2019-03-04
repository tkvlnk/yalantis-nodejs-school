memo._caches = [];

console.log(
  memo(sum)(1, 2),
  memo(sum)(3, 4),
  memo(sum)(1, 2),
);

function memo(func) {
  return function (...args) {
    const candidate = [
      func,
      ...args,
    ];

    const cached = getCache(candidate);

    if (cached && cached.length) {
      const [result] = cached;

      console.log(`cached: ${result}`);

      return result;
    }

    const result = func(...args);

    memo._caches.push([result, func, ...args]);

    console.log(`evaluated: ${result}`);

    return result;
  };

  function getCache(candidate) {
    return memo._caches.find(compareWithCandidate);

    function compareWithCandidate([result, ...cache]) {
      return cache.length === candidate.length
        && cache.every((val, ind) => val === candidate[ind])
    }
  }
}

function sum(...args) {
  if (!args || args.length < 2) {
    throw 'Requires at least two numbers';
  }

  if (args.some(num => typeof num !== 'number' || isNaN(num))) {
    throw 'All args should be numbers';
  }

  return args.reduce((sum, num) => sum + num, 0)
}
