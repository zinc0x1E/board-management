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
          this.points = response.data.points
          // console.log(this.points)
        })
        .then(() => {
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
          // console.log(AMap)
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

          const styleObject = {
            url: 'https://vdata.amap.com/icons/b18/1/2.png', // 图标地址
            size: new AMap.Size(11, 11), // 图标大小
            anchor: new AMap.Pixel(5, 5) // 图标显示位置偏移量，基准点为图标左上角
          }

          this.massMarks = new AMap.MassMarks({
            zIndex: 5, // 海量点图层叠加的顺序
            zooms: [3, 19], // 在指定地图缩放级别范围内展示海量点图层
            style: styleObject // 设置样式对象
          })

          // console.log(this.points)
          console.log('massMarks start')
          console.log('this.points = ')
          console.log(this.points)
          console.log('massMarks = ')
          this.massMarks.setData(this.points)
          console.log(this.massMarks)
          console.log('massMarks finished')
          this.massMarks.setMap(this.map)
        })
        .catch(e => {
          console.error(e)
        })
    }
  }
}
</script>
