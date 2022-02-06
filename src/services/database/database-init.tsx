
import { DatabaseConnection } from './database-connection';

var db: any = null;
export default class DatabaseInit {

  constructor() {
    db = DatabaseConnection.getConnection();
    db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
      console.log('Foreign keys turned on')
    );
    this.InitDb();
  }
  private InitDb() {
    var sql = [
      `DROP TABLE IF EXISTS plants_environments;`,
      `DROP TABLE IF EXISTS plants;`,
      `DROP TABLE IF EXISTS plants_environments_plants;`,

      `create table if not exists plants_environments (
            id integer primary key autoincrement,
            key text,
            title text
            );`,

      `create table if not exists plants (
            id integer primary key autoincrement,
            name text,
            about text,
            water_tips text,
            photo text,
            times integer,
            repeat_every text
            );`,

      `insert into plants_environments(id, key, title) values 
      (1, 'living_room', 'Sala'), 
      (2, 'bedroom', 'Quarto'), 
      (3, 'kitchen', 'Cozinha'), 
      (4, 'bathroom', 'Banheiro');`,

      `insert into plants(id, name, about, water_tips, photo, times, repeat_every) values 
      (
        1, 
        'Aningapara',
        'É uma espécie tropical que tem crescimento rápido e fácil manuseio.',
        'Mantenha a terra sempre húmida sem encharcar. Regue 2 vezes na semana.',
        'https://storage.googleapis.com/golden-wind/nextlevelweek/05-plantmanager/1.svg',
        2,
        'week'
      ),
      (
        2, 
        'Zamioculca',
        'Apesar de florescer na primavera, fica o ano todo bonita e verdinha. ',
        'Utilize vasos com furos e pedras no fundo para facilitar a drenagem. Regue 1 vez no dia.',
        'https://storage.googleapis.com/golden-wind/nextlevelweek/05-plantmanager/2.svg',
        1,
        'day'
      );`,
      
      `create table if not exists plants_environments_plants (
            id integer primary key autoincrement,
            plants_environments_id integer,
            plants_id integer,
            foreign key (plants_environments_id) references plants_environments (id),
            foreign key (plants_id) references plants (id)
            );`,

      `insert into plants_environments_plants(id, plants_environments_id, plants_id) values 
      (1, 1, 1),
      (2, 3, 1),
      (3, 1, 2),
      (4, 2, 2);`
    ];

    db.transaction(
      (tx: any) => {
        for (var i = 0; i < sql.length; i++) {
          // console.log("execute sql : " + sql[i]);
          tx.executeSql(sql[i]);
        }
      }, (error: any) => {
        console.log("error call back : " + JSON.stringify(error));
        console.log(error);
      }, () => {
        // console.log("transaction complete call back ");
      }
    );

  }

}