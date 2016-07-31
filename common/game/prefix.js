import Stat from 'common/game/stat.js'

export default class {
  constructor(path, prefix) {
    this.path = path

    prefix.characterStats = prefix.characterStats || []
    prefix.attackStats = prefix.attackStats || []
    prefix.empoweredStats = prefix.empoweredStats || []

    this.characterStats = Object.entries(prefix.characterStats).map(([id, value]) => new Stat(id, value))
    this.attackStats = Object.entries(prefix.attackStats).map(([id, value]) => new Stat(id, value))
    
    this.empoweredStats = prefix.empoweredStats.map(empowerConfig => {
      return {
        stats: Object.entries(empowerConfig.stats).map(([id, value]) => new Stat(id, value)),
        category: empowerConfig.category
      }
    })

    this.name = prefix.name
  }
}
