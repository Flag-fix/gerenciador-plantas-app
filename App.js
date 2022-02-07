import React, { useEffect, useState} from "react";
import AppLoading from "expo-app-loading";
import * as Notifications from 'expo-notifications';
import * as SQLite from 'expo-sqlite';
import Firebase from "./src/firebase"
import Routes from "./src/routes";
import { StyleSheet, Text, View } from "react-native";

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold

}from '@expo-google-fonts/jost'
import { PlantProps } from "./src/libs/storage";
import DatabaseInit from "./src/services/database/database-init";
import AnimalService from "./src/services/plant.service";

export default function App() {

  const [dados, setDados] = useState([]);

useEffect(() => {
  Firebase.firestore()
  .collection("gerenciador-plantas")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      setDados([doc.data()]);
    });
});
},[]);

// useEffect(() => {
//   Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//       shouldShowAlert: true,
//       shouldPlaySound: false,
//       shouldSetBadge: false,
//     }),
//   });

//   const subscription = Notifications.addNotificationReceivedListener(
//     async notification => {
//       const data = notification.request.content.data.plant as PlantProps;
//     }
//   );
//   return () => subscription.remove();

//   /*     async function notifications() {
//         await Notifications.cancelAllScheduledNotificationsAsync();
  
//         const data = await Notifications.getAllScheduledNotificationsAsync();
//         console.log("------------ NOTIFICAÇÕES AGENDADAS ---------")
//         console.log(data);
//       }
  
//       notifications(); */

// }, [])

  // useEffect(() => {
  //   console.log("useEffect")
  //   new DatabaseInit
  // })

  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  if(!fontsLoaded){
    return <AppLoading/>
  }

  return (
    <><Routes />
    {/* <View>
      {dados.map((item) => {
        return <Text>{item.nome}</Text>;
      })}
    </View> */}
    
    </>
  );
}