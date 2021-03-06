import { DatabaseConnection } from "./database/database-connection";

const table = "plants";
const db = DatabaseConnection.getConnection();

export default class PlantsService {

  static findAllSortByName() {
    return new Promise((resolve, reject) => db.transaction(tx => {
      tx.executeSql(`select * from ${table} order by name asc`, [], (_, { rows }) => {
        resolve(rows);
      }), (sqlError: any) => {
        console.log(sqlError);
      };
    }, (txError) => {
      console.log(txError);
    }))
  }

}