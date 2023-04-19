
import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Button } from '@rneui/base';
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { Header } from '@rneui/base';
import { Card, LinearProgress, BottomSheet } from '@rneui/themed';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function StudyScreen ({route, navigation}) {
  const { title, cards} = route.params.studyCards
  
  let [progress, setProgress] = useState(0)

  let [index, setIndex] = useState(0)
  const increaseIndex = () => {
    setProgress(progress + .50)
    if (cards.length-1 === index ) {
      setIndex(0)
    } else {
     setIndex(index + 1) 
    }
  }
  const decreaseIndex = () => {
    setProgress(progress - .50)
    if (index === 0) {
      setIndex(cards.length-1)
    }else {
      setIndex(index - 1)
    }
    
  }

  let [card, setCard] = useState(false)
  let termDef = useCallback(() => {
    setCard(!card)
  }, [card])

  let [isVisible, setIsVisible] = useState(false)

  return (
    <View>
      <Header leftComponent={{ text: title }} rightComponent={{text: `Terms: ${cards.length}`}}/>
      <Text>Terms: {index+1} / {cards.length}</Text>
      <LinearProgress value={progress} variant="determinate"/>
      <Card>
        <Card.Title>{card ? cards[index].definition : cards[index].term }</Card.Title>
        <View>
          <Button icon={() => (
              <MaterialCommunityIcons name="arrow-right" />) }
              onPress={increaseIndex}>
          </Button>
          <Button icon={() => (
              <MaterialCommunityIcons name="arrow-left" />) }
              onPress={decreaseIndex}>
          </Button>
          <Button icon={() => (
              <MaterialCommunityIcons name="arrow-u-right-bottom" />) }
              onPress={termDef}>
          </Button>
        </View>
      </Card>
      <Button title={"View List"} onPress={() => setIsVisible(true)}/>
      <BottomSheet isVisible={isVisible}>
        <View>
          <Text>{title}</Text>
          {cards.map((card, index) => (
            <View key={index}>
              <Text>{card.term} : {card.definition}</Text>
          </View>
          ))}
          <Button title={"Close"} onPress={() => setIsVisible(false)}/>
        </View>
      </BottomSheet>
    </View>
  )
}

function AddScreen ({}) {
  return(
    <View>
      <Text>add </Text>
    </View>
  )
}

function CardScreen ({route, navigation}) {
  const { studyCards } = route.params
  const Item = ({item}) => (
    <View style={styles.item}>
      <Button
       title={item.title}
       titleStyle={{color: 'black'}} 
       buttonStyle={styles.button}
       onPress={() => {
        navigation.navigate("Study",{
          studyCards: {
            title: item.title,
            cards: item.cards
          } 
        }
      )}}
      ></Button>
    </View>
  )
  return (
    <View>
      <Text>Your Cards:</Text>
      <FlatList 
      data={studyCards}
      renderItem={Item}
      numColumns={2}
      keyExtractor={(item) => item.title}
      />
    </View>
    
  )
}

function Home() {
  const studyCards = [
    {
      "title": "Spanish",
        "cards": [
          {
            "term": "Yo",
            "definition" : "I"
          },
          {
            "term" : "Tu",
            "definition" : "You"
          }
        ]
      },
      {
        "title": "Emotions",
        "cards": [
          {
            "term": "happy",
            "definition" : "feeling or showing pleasure or contentment"
          },
          {
            "term" : "sad",
            "definition" : "feeling or showing sorrow"
          }
        ]
      }
    ]
  return (
    <Tab.Navigator initialRouteName='Cards' screenOptions={{ tabBarActiveTintColor: '#FD8C24'}}>
          <Tab.Screen
            name="Cards"
            component={CardScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
            initialParams={{studyCards: studyCards}}
          />
          <Tab.Screen
            name="Add"
            component={AddScreen}
            options={{
              tabBarLabel: 'Add',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="card-plus" color={color} size={size} />
              ),
            }}
          />
      </Tab.Navigator>
  );
}


export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Study" component={StudyScreen}/>
      </Stack.Navigator>
    
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 10
  },
  button: {
    backgroundColor: "#FFC086",
    width: 164,
    height: 164
  }
});
