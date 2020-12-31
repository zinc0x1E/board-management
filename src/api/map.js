import request from '@/utils/request'

export function getPoints(params) {
  return request({
    url: '/vue-admin-template/map/points',
    method: 'get',
    params
  })
}
