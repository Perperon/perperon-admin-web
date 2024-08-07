import list from 'china-location/dist/location.json'
import chinaLocation from 'china-location'

function loadLocationOptions() {
  // 使用 china-location 的 JSON 数据获取省市区数据
  return processLocationData(list)

}

function processLocationData(data) {
  return Object.keys(data).map(key => {
    const province = data[key]
    return {
      code: province.code,
      name: province.name,
      children: processCities(province.cities)
    }
  })
}

function processCities(cities) {
  return Object.keys(cities).map(key => {
    const city = cities[key]
    return {
      code: city.code,
      name: city.name,
      children: processDistricts(city.districts)
    }
  })
}

function processDistricts(districts) {
  return Object.keys(districts).map(key => ({
    code: key,
    name: districts[key]
  }))
}

export default loadLocationOptions
