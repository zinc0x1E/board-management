import React from "react";
import ReactDOMServer from "react-dom/server";
import AMapLoader from "@amap/amap-jsapi-loader";
class AMap extends React.Component {
  componentDidUpdate() {
    this.initMap(this.props.points);
  }

  renderClusterMarker = (points, AMap) => (context) => {
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

        let infoWindow = new AMap.InfoWindow();
        cluster.on("click", (e) => {
          infoWindow.setPosition(e.marker._position);

          let promises = this.props.fetechPoints(e.clusterData);
          Promise.all(promises).then((reponses) => {
            let pointsInInfowindow = [];
            reponses.forEach((response) => {
              pointsInInfowindow.push(response.data);
            });

            this.renderInfoWindow(pointsInInfowindow).then((result) => {
              infoWindow.setContent(result);
              infoWindow.setMap(map);

              infoWindow.open();
            })
          });
        });

        map.on("zoomchange", (e) => {
          infoWindow.close();
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  async renderInfoWindow(data) {
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

    if (data.length > 1) {
      result = data.map((item, index) => (
        <div style={styles.amapInfoWindow} key={item.advertisement.advId}>
          {item.advertisement.name}
          <div style={styles.amapInfoSharp}></div>
        </div>
      ));
    } else {
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

    return ReactDOMServer.renderToStaticMarkup(result);
  }

  // render
  render() {
    return (
      <div id={"map-container"} style={{ height: "600px", width: "2000px" }} />
    );
  }
}

export default AMap;
