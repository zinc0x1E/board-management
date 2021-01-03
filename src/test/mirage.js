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
        lnglat() {
          let lnglat = [getRandomArbitrary(121.1515, 121.7667), getRandomArbitrary(30.8, 31.5)];
          return lnglat;
        },
        name() {
          return faker.address.streetAddress();
        },
        style() {
          return getRandomInteger(0, 3);
        }
      })
    },
    
    seeds(server) {
      server.createList('point', 300000)
    },
    
    routes() {
      this.namespace = "api";

      this.get("/points", (schema) => {
        return schema.points.all();
      });

      this.passthrough();
      this.passthrough("https://vdata.amap.com/**");
      this.passthrough("https://528b344a-cd47-4ea0-92ee-01281b90c46c.mock.pstmn.io/**")
    }
  });
  
  console.log("return server")
  return server;
}
