# async-compute
A tiny utility for efficient execution of asynchronous tasks and their dependencies

## Example
```
(async () => {
  import asyncCompute from 'async-compute'

  log = console.log.bind(console)
  logRet = (...msg) => log(...msg) ?? msg[0]
  defer = (ms, func) => new Promise(d => setTimeout(() => d(func()), ms), ms)
  task = (name) => () =>
      log('starting', name) ??
      defer(Math.random() * 1000, () => logRet(name, 'ready'))
  
  a = task('a')
  b = task('b')
  aAndB = (cache) => compute([a, b], (d) => d, cache)
  c = task('c')
  aAndC = (cache) => compute([a, c], (d) => d, cache)

  console.log(
    await compute([aAndB, aAndC, a, b, c], (d) => d)
  )
})()
```
