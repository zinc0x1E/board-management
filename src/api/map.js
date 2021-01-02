import request from '@/utils/request'

export function getPoints(params) {
  return request({
    url: '/vue-admin-template/map/points',
    // url: 'https://a.amap.com/jsapi_demos/static/citys.js',
    method: 'get',
    params
  })
}
