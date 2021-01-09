import { createServer, Model, Factory } from "miragejs"
import faker from "faker"

faker.locale = "zh_CN";

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function makeServer({ environment = "test" } = {}) {
  console.log("start make server")
  let server = createServer({
    models: {
      point: Model,
    },

    factories: {
      point: Factory.extend({
        code() {
          return 200;
        },
        msg() {
          return "success";
        },
        advId() {
          return "" + getRandomInteger(1000, 100000)
        },
        latitude() {
          return getRandomArbitrary(30.8, 31.5);
        },
        longtitude() {
          return getRandomArbitrary(121.1515, 121.7667);
        },
        // lnglat() {
        //   let lnglat = [getRandomArbitrary(121.1515, 121.7667), getRandomArbitrary(30.8, 31.5)];
        //   return lnglat;
        // },
        // style() {
        //   return getRandomInteger(0, 3);
        // },
        advertisement() {
          return {
            advId: this.advId,
            name: faker.address.streetAddress(),
            theme: faker.address.streetAddress(),
            master: faker.address.streetAddress(),
            price: getRandomInteger(10000, 100000),
            date: faker.date.past(),
            img: faker.image.image(),
            location: faker.address.streetAddress(),
            latitude: this.latitude,
            longtitude: this.longtitude,
            conditionkey: faker.random.uuid(),
          }
        },
      })
    },
    
    seeds(server) {
      server.createList('point', 3000)
    },
    
    routes() {
      this.namespace = "api";

      this.get("/points", (schema) => {
        return schema.points.all();
      });

      this.get("/queryForAdvId", (schema, request) => {
        // console.log(request.queryParams)
        // console.log("request = ")
        // console.log(request.queryParams)
        return schema.db.points;
      });

      this.get("/queryForAdv", (schema, request) => {
        return schema.db.points.findBy({advId: request.queryParams.advId});
      });

      this.passthrough();
      this.passthrough("https://vdata.amap.com/**");
      this.passthrough("https://528b344a-cd47-4ea0-92ee-01281b90c46c.mock.pstmn.io/**")
    }
  });
  
  console.log("return server")
  return server;
}
