import { DatabaseConnection } from "./database/database-connection";

const table = "plants_environments";
const db = DatabaseConnection.getConnection();

export default class PlantsEnvironmentsService {

  static findAllSortByTitle() {
    return new Promise((resolve, reject) => db.transaction(tx => {
      tx.executeSql(`select * from ${table} order by title asc`, [], (_, { rows }) => {
        resolve(rows);
      }), (sqlError: any) => {
        console.log(sqlError);
      };
    }, (txError) => {
      console.log(txError);
    }))
  }

}