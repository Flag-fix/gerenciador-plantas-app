import { DatabaseConnection } from "./database/database-connection";

const table = "plants_environments_plants";
const db = DatabaseConnection.getConnection();

export default class PlantsEnvironmentsPlantsService {

  static findEnvironmentsByPlantId(plantId: number) {
    return new Promise((resolve, reject) => db.transaction(tx => {
      tx.executeSql(
        `select pe.key from ${table} 
        inner join plants_environments pe on pe.id = ${table}.plants_environments_id 
        where plants_id = ${plantId}`
      , [], (_, { rows }) => {
        resolve(rows);
      }), (sqlError: any) => {
        console.log(sqlError);
      };
    }, (txError) => {
      console.log(txError);
    }))
  }

}