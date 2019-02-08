const http = require('http');
const _ = require('underscore');
const URL = "http://worldcup.sfg.io/matches";

module.exports = {
    filtrarEquipos: (req, res) => {
        http.get(URL,(resp) => {
          let data = '';
          let equipos = [];
      
        // Una parte de los datos han sido recibidos
        resp.on('data', (chunk) => {
          data += chunk;
        }); 
      
      
        // La respuesta completa y final ha sido recibida en variable data
        resp.on('end', () => {
          let dataJson = JSON.parse(data);
      
          dataJson.forEach((datos,i) => {
            equipos.push({
              "nombreEquipo": datos.home_team.country,
              "codigoEquipo": datos.home_team.code
            });
          });
        //remueve valores duplicados de un arreglo
        var equiposFiltrados = _.uniq(equipos, 'codigoEquipo');
      
        res.send(equiposFiltrados);
      
        });
      
      }).on("error", (err) => {
          
        console.log("Error: " + err.message);
        })
      },

      jugadoresEquipos: (req,res) => {

        const {id} = req.params;

        console.log("parametro enviado", id);

          http.get(URL,(resp) => {
              let data = '';
              let jugadoresPorEquipo = [];

              resp.on('data', (chunk) => {
                  data += chunk;
              });

              resp.on('end', () => {
                  var dataJson = JSON.parse(data);

                  dataJson.forEach((datos,i) =>{
                      jugadoresPorEquipo.push(
                        {
                            "nombreEquipo": datos.home_team.country,
                            "codigoEquipo": datos.home_team.code,
                            "jugadores": datos.home_team_statistics.starting_eleven
                        }
                      );

                      var newArr = _.map(jugadoresPorEquipo.jugadores, (o) => { 
                          return _.pick(o, 'name'); 
                        });

                    

                  });
                  var equiposFiltrados = _.uniq(jugadoresPorEquipo, 'codigoEquipo');    

                  console.log(typeof equiposFiltrados);
                  
                  var resultadoFinal = _.where(equiposFiltrados, {'codigoEquipo': id});

                  res.send(resultadoFinal);
              });
            
          }).on("error", (err) => {
          
            console.log("Error: " + err.message);
            });
      }  
}