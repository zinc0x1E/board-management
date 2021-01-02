<template>
  <div>
    <div id="myPageTop">
      <table>
        <tr>
          <td>
            <label>请输入关键字：</label>
          </td>
        </tr>
        <tr>
          <td>
            <input id="tipinput">
          </td>
        </tr>
      </table>
    </div>
    <div id="map-container" style="width: 100%; height: 840px" />
  </div>
</template>

<script>
import { getPoints } from '@/api/map'
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      // Amap: null,
      list: null,
      listLoading: true,
      map: null,
      auto: null,
      placeSearch: null,
      points: [],
      cluster: null,
      massMarks: null
    }
  },
  created() {
    this.fetchData()
    // new Promise(() => {
    //   console.log('fetch data')
    //   this.fetchData()
    //   console.log('fetch data done')
    // })
    //   .then(data => {
    //     console.log('Promise fetch data is a success')
    //     console.log(data)
    //     this.initMap()
    //   })
    //   .catch(e => {
    //     console.error(e)
    //   })
  },
  mounted() {
    // this.initMapProps()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getPoints()
        .then(response => {
          // console.log(response)
          this.points = response.data.points
        })
        .then(() => {
          // console.log('~~then~~')
          // console.log('1. this.points = ')
          // console.log(this.points)
          // console.log('\\--- this.points ---/')
          this.initMap()
          this.listLoading = false
        })
    },

    initMap() {
      AMapLoader.load({
        key: '88e27a80654c17e8d4b25f594dea3fd8',
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          'AMap.Scale',
          'AMap.ToolBar',
          'AMap.AutoComplete',
          'AMap.PlaceSearch',
          'AMap.MarkerClusterer'
        ] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then(AMap => {
          // console.log('Amap')
          // console.log(AMap)
          // this.Amap = AMap
          this.map = new AMap.Map('map-container')

          this.map.setZoom(11)
          this.map.setCenter([121.498586, 31.239637])

          this.map.addControl(new AMap.Scale())
          this.map.addControl(new AMap.ToolBar())

          // console.log(this.map.getCenter())

          this.auto = new AMap.AutoComplete({
            input: 'tipinput'
          })
          this.placeSearch = new AMap.PlaceSearch({
            map: this.map
          }) // 构造地点查询类
          this.auto.on('select', e => {
            this.placeSearch.setCity(e.poi.adcode)
            this.placeSearch.search(e.poi.name) // 关键字查询查询
          }) // 注册监听，当选中某条记录时会触发
          // JSAPI 2.0 支持显示设置 zIndex, zIndex 越大约靠前，默认按顺序排列
          const style = [
            {
              url: 'https://webapi.amap.com/images/mass/mass0.png',
              anchor: new AMap.Pixel(6, 6),
              size: new AMap.Size(11, 11),
              zIndex: 3
            },
            {
              url: 'https://webapi.amap.com/images/mass/mass1.png',
              anchor: new AMap.Pixel(4, 4),
              size: new AMap.Size(7, 7),
              zIndex: 2
            },
            {
              url: 'https://webapi.amap.com/images/mass/mass2.png',
              anchor: new AMap.Pixel(3, 3),
              size: new AMap.Size(5, 5),
              zIndex: 1
            }
          ]
          // 创建 MassMarkers 层及其标注

          // 创建 MassMarks 实例
          // console.log('2. this.points = ')
          // console.log(this.points)
          // console.log('\\--- this.points ---/')
          var massMarks = new AMap.MassMarks(this.points, {
            opacity: 1,
            zIndex: 111,
            cursor: 'pointer',
            style: style
          })
          // 将海量点实例添加到地图上
          massMarks.setMap(this.map)
        })
        .catch(e => {
          console.error(e)
        })
    }
  }
}
</script>
