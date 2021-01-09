import React from "react";
import ReactDOMServer from "react-dom/server";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import AMapLoader from "@amap/amap-jsapi-loader";
import axios from "axios";

const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";
const brandDanger = getStyle("danger") || "#f86c6b";

class AMap extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //   points: null,
  //   // };

  //   // this.fetchPointsAbstract = this.fetchPointsAbstract.bind(this);
  // }

  componentDidUpdate() {
    this.initMap(this.props.points);
  }
  // componentDidMount() {
  //   // axios.get('https://528b344a-cd47-4ea0-92ee-01281b90c46c.mock.pstmn.io/songs')
  //   this.fetchPointsAbstract()
  //     .then((response) => {
  //       // this.setState({ points: this.processPoints(response.data) });
  //       let points = this.processPoints(response.data);
  //       console.log(points);
  //       this.initMap(points);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  // fetchPointsAbstract() {
  //   return axios.get("/api/queryForAdvId", {
  //     params: {
  //       maxLat: 31.5,
  //       minLat: 30.8,
  //       maxLng: 121.7667,
  //       minLng: 121.1515,
  //       precise: 20,
  //       conditionKey: this.props.condi,
  //     },
  //   });
  // }

  // processPoints(points) {
  //   for (let point of points) {
  //     point.lnglat = [point.longtitude, point.latitude];
  //     point.longtitude = null;
  //     point.latitude = null;
  //     point.style = 1;
  //   }
  //   return points;
  // }

  // fetechPoint(advId) {
  //   return axios.get("/api/queryForAdv", {
  //     params: {
  //       advId: advId,
  //     },
  //   });
  // }

  // fetechPoints(points) {
  //   console.log("fetchPoints() -- param -- points = ");
  //   console.log(points);
  //   for (let item of points) {
  //     this.fetechPoint(item.advId).then((responce) => {
  //       item.advertisement = responce.data.advertisement;
  //     });
  //   }

  //   console.log("fetchPoints() -- return -- points = ");
  //   console.log(points);
  //   return points;
  // }

  renderClusterMarker = (points, AMap) => (context) => {
    console.log(points);
    console.log(points.length);
    var factor = Math.pow(context.count / points.length, 1 / 18);
    var div = document.createElement("div");
    var Hue = 180 - factor * 180;
    var bgColor = "hsla(" + Hue + ",100%,40%,0.7)";
    var fontColor = "hsla(" + Hue + ",100%,90%,1)";
    var borderColor = "hsla(" + Hue + ",100%,40%,1)";
    var shadowColor = "hsla(" + Hue + ",100%,90%,1)";
    div.style.backgroundColor = bgColor;
    var size = Math.round(
      30 + Math.pow(context.count / points.length, 1 / 5) * 20
    );
    div.style.width = div.style.height = size + "px";
    div.style.border = "solid 1px " + borderColor;
    div.style.borderRadius = size / 2 + "px";
    div.style.boxShadow = "0 0 5px " + shadowColor;
    div.innerHTML = context.count;
    div.style.lineHeight = size + "px";
    div.style.color = fontColor;
    div.style.fontSize = "14px";
    div.style.textAlign = "center";
    context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
    context.marker.setContent(div);
  }; // 自定义聚合点样式

  initMap(points) {
    AMapLoader.load({
      key: "88e27a80654c17e8d4b25f594dea3fd8",
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [
        "AMap.Scale",
        "AMap.ToolBar",
        "AMap.AutoComplete",
        "AMap.PlaceSearch",
        "AMap.MarkerClusterer",
      ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
        let map = new AMap.Map("map-container");

        map.setZoom(11);
        map.setCenter([121.498586, 31.239637]);

        map.addControl(new AMap.Scale());
        map.addControl(new AMap.ToolBar());

        let auto = new AMap.AutoComplete({
          input: "tipinput",
        });
        let placeSearch = new AMap.PlaceSearch({
          map: map,
        }); // 构造地点查询类
        auto.on("select", (e) => {
          placeSearch.setCity(e.poi.adcode);
          placeSearch.search(e.poi.name); // 关键字查询查询
        }); // 注册监听，当选中某条记录时会触发
        // JSAPI 2.0 支持显示设置 zIndex, zIndex 越大约靠前，默认按顺序排列
        const style = [
          {
            url: "https://webapi.amap.com/images/mass/mass0.png",
            anchor: new AMap.Pixel(6, 6),
            size: new AMap.Size(11, 11),
            zIndex: 3,
          },
          {
            url: "https://webapi.amap.com/images/mass/mass1.png",
            anchor: new AMap.Pixel(4, 4),
            size: new AMap.Size(7, 7),
            zIndex: 2,
          },
          {
            url: "https://webapi.amap.com/images/mass/mass2.png",
            anchor: new AMap.Pixel(3, 3),
            size: new AMap.Size(5, 5),
            zIndex: 1,
          },
        ];

        let cluster = new AMap.MarkerCluster(map, points, {
          gridSize: 60, // 设置网格像素大小
          renderClusterMarker: this.renderClusterMarker(points, AMap), // 自定义聚合点样式
          renderMarker: (context) => {
            var content =
              '<div style="background-color: hsla(180, 100%, 50%, 0.3); height: 18px; width: 18px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 3px;"></div>';
            var offset = new AMap.Pixel(-9, -9);
            context.marker.setContent(content);
            context.marker.setOffset(offset);
          }, // 自定义非聚合点样式
        });

        // let marker = new AMap.Marker();
        let infoWindow = new AMap.InfoWindow();
        cluster.on("click", (e) => {
          // console.log(e);
          infoWindow.setPosition(e.marker._position);
          infoWindow.setContent(this.renderInfoWindow(e.clusterData));
          infoWindow.setMap(map);

          infoWindow.open();
        });

        map.on("zoomchange", (e) => {
          infoWindow.close();
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  renderInfoWindow(srcData) {
    const styles = {
      amapInfoWindow: {
        position: "relative",
        width: "150px",
        background: "#fff",
        borderRadius: "3px",
        padding: "3px 7px",
        boxShadow: "0 2px 6px 0 rgba(114, 124, 245, .5)",
      },
      amapInfoSharp: {
        position: "absolute",
        top: "21px",
        bottom: "0",
        left: "50%",
        marginLeft: "-8px",
        borderLeft: "8px solid transparent",
        borderRight: "8px solid transparent",
        borderTop: "8px solid #fff",
      },
    };

    let result = "";
    let data = this.fetechPoints(srcData);

    if (data.length > 1) {
      result = data.map((item, index) => (
        <div style={styles.amapInfoWindow} key={item.advertisement.advId}>
          ${item.advertisement.name}
          <div style={styles.amapInfoSharp}></div>
        </div>
      ));
    } else {
      // console.log("data[0] = ");
      // console.log(data[0]);
      // console.log("data[0].advertisement = ");
      // console.log(data[0].advertisement);
      result = (
        <>
          <img src={data[0].advertisement.img} alt=""></img>
          <div style={styles.amapInfoWindow}>
            <p>advId: {data[0].advertisement.advId}</p>
            <p>name: {data[0].advertisement.name}</p>
            <p>theme: {data[0].advertisement.theme}</p>
            <p>master: {data[0].advertisement.master}</p>
            <p>price: {data[0].advertisement.price}</p>
            <p>date: {data[0].advertisement.date}</p>
            <p>location: {data[0].advertisement.location}</p>
            <div style={styles.amapInfoSharp}></div>
          </div>
        </>
      );
    }

    result = ReactDOMServer.renderToStaticMarkup(result);
    console.log(result);
    return result;
  }

  // render
  render() {
    return (
      <div id={"map-container"} style={{ height: "600px", width: "2000px" }} />
    );
  }
}

export default AMap;
