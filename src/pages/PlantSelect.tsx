import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator
} from 'react-native'
import { EnviromentButton } from "../components/EnviromentButton";

import { Header } from "../components/Header";
import { Load } from "../components/Load";
import { PlantCardPrimary } from "../components/PlantCardPrimary";
import { PlantProps } from "../libs/storage";
import api from "../services/api";
import PlantsService from "../services/plant.service";
import PlantsEnvironmentsService from "../services/plants_environments.service";
import PlantsEnvironmentsPlantsService from "../services/plants_environments_plants.service";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface EnviromentProps {
    key: string;
    title: string;
}

export function PlantSelect() {
    const [environment, setEnviroment] = useState<EnviromentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [enviromentSelected, setEnvironmentSelected] = useState('all');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadeAll, setLoadeAll] = useState(false);

    const navigation = useNavigation();

    function handleEnvironmentSelected(enviroment: string) {
        setEnvironmentSelected(enviroment)

        if (enviroment === 'all')
            return setFilteredPlants(plants)

        const filtered = plants.filter(plant =>
            plant.environments.includes(enviroment)
        )

        setFilteredPlants(filtered)
    }


    async function fetchPlants() {
        var data: any[] = []
            await PlantsService.findAllSortByName()
            .then(async (response: any) => {
                let futureData = {...response._array}
                data = response._array
                console.log("initial")
                console.log(futureData)
                for (var i = 0; i < data.length; i++){
                    await PlantsEnvironmentsPlantsService.findEnvironmentsByPlantId(data[i].id)
                        .then((response: any) => {
                            let arrayOfEnvironments = []
                            for (var i = 0; i < response._array.length; i++) {
                                arrayOfEnvironments.push(response._array[i].key)
                            }
                            futureData[i] = {
                                environments: arrayOfEnvironments,
                                ...futureData[i]
                            }
                            // data[i].environments = arrayOfEnvironments
                        }), (error: any) => {
                            console.log(error);
                        };
                }
                // console.log(data)
                console.log("final")
                console.log(futureData)
            }), (error: any) => {
                console.log(error);
            };
        
        // const { data } = await api.
            // get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

        if (!data)
            return setLoading(true);

        if (page > 1) {
            setPlants(oldValue => [...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data])
        } else {
            setPlants(data);
            setFilteredPlants(data);
        }

        setLoading(false);
        setLoadingMore(false);
    }


    function handleFetchMore(distance: number) {
        if (distance < 1)
            return;

        setLoadingMore(true)
        setPage(oldValue => oldValue + 1)
        fetchPlants();
    }

    function handlePlantSelect(plant: PlantProps) {
        navigation.navigate('PlantSave', { plant });
    }

    useEffect(() => {
        async function fetchEnviroment() {
            await PlantsEnvironmentsService.findAllSortByTitle()
                .then((response: any) => {
                    setEnviroment([
                        {
                            key: 'all'
                            , title: 'Todos'
                        },
                        ...response._array
                    ])
                    }), (error: any) => {
                        console.log(error);
                    };
                    
            // const { data } = await api.
            //     get('plants_environments?_sort=title&_order=asc')
            // setEnviroment([
            //     {
            //         key: 'all'
            //         , title: 'Todos'
            //     },
            //     ...data
            // ])
        }
        fetchEnviroment();
    }, [])


    useEffect(() => {
        fetchPlants();
    }, [])

    if (loading)
        return <Load />

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />

                <Text style={styles.title}>
                    Em qual ambiente
                </Text>
                <Text style={styles.subTitle}>
                    você quer colocar sua planta?
                </Text>
            </View>
            <View>
                <FlatList
                    data={environment}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({ item }) => (
                        <EnviromentButton
                            title={item.title}
                            active={item.key === enviromentSelected}
                            onPress={() => handleEnvironmentSelected(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
                />
            </View>
            <View style={styles.plants}>
                <FlatList
                    data={filteredPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardPrimary 
                            data={item}
                            onPress={() => handlePlantSelect(item)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) =>
                        handleFetchMore(distanceFromEnd)
                    }
                    ListFooterComponent={
                        loadingMore
                            ? <ActivityIndicator color={colors.green} />
                            : <></>
                        //Não separar o desfragments
                    }
                >
                </FlatList>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17
        , color: colors.heading
        , fontFamily: fonts.heading
        , lineHeight: 20
        , marginTop: 15
    },
    subTitle: {
        fontFamily: fonts.text
        , fontSize: 17
        , lineHeight: 20
        , color: colors.heading
    },
    enviromentList: {
        height: 40
        , justifyContent: 'center'
        , paddingBottom: 5
        , marginLeft: 32
        , marginVertical: 32

    }, plants: {
        flex: 1
        , paddingHorizontal: 32
        , justifyContent: "center"
    }
})