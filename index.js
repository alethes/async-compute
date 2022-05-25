const setRet = (map, k, v) => {map.set(k, v); return v}
const runTask = (t, cache) => setRet(cache, t, t(cache))
const compute = async (deps, run, cache = new Map()) =>
  run(
    await Promise.all(deps.map(async (d) =>
      cache.get(d) ?? runTask(d, cache)
    ))
  )
