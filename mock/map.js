const Mock = require('mockjs')

Mock.Random.extend({
  lng() {
    // console.log('lng')
    return Mock.Random.float(120, 123)
  },
  lat() {
    // console.log('lat')
    return Mock.Random.float(30, 33)
  }
})

const data = Mock.mock({
  'points|3000': [
    {
      'id': Mock.Random.integer(1, 10),
      'lnglat': ['@lng', '@lat'],
      'name': Mock.Random.city()
    }
  ]
})

module.exports = [
  {
    url: '/vue-admin-template/map/points',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          points: data.points
        }
      }
    }
  }
]
