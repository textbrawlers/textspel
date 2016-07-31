import stats from 'common/json/stats.json'

const round = (num, decimals) => {
  const n = Math.pow(10, decimals)

  return Math.round(num * n)  / n
}

const displayFunctions = {
  plain: value => round(value, 2),
  fixed: value => round(value, 2),
  percent: value => `${round(value * 100, 2)}%`,
  'plus-mult': value => {
    value--
    const niceVal = round(value * 100, 2)
    if (value > 0) {
      return `+${niceVal}%`
    } else {
      return `${niceVal}%`
    }
  }
}

export default class {
  constructor(id, value) {
    const baseStat = stats[id]
    if (!baseStat) {
      console.warn('Stat is not configured', id)
    }
    this.value = value

    this.tooltip = baseStat.tooltip
    this.type = baseStat.type
    this.display = baseStat.display
  }

  render(statWrapper) {
    const replacer = (match, fnName) => {
      let fn = displayFunctions[fnName]

      if (!fn) {
        console.warn('Undefined stat parsing function', fnName)
        fn = displayFunctions.plain
      }

      return statWrapper(fn(this.value))
    }
    return this.tooltip.replace(/\[([a-z0-9-]*)\]/g, replacer)
  }
}
