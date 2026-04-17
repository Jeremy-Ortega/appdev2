import * as React from 'react';
import { View, Text } from 'react-native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Link } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';

function HomeScreen() {
    const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button onPress={() => 
        // navigation.navigate('Details')
        navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          })
        }>
        Go to Details
      </Button>

      {/* <Link screen="Details">Go to Details</Link>
      <Button screen="Details">Go to Details</Button> */}

    </View>
  );
}

function DetailsScreen({route}) {
    const navigation = useNavigation();
    const { itemId, otherParam } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap:4}}>
        <Text>Details Screen</Text>
      
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>


        <Button onPress={() => 
            // navigation.push('Details')
             navigation.push('Details', {
              // Randomly generate an ID for demonstration purposes
              itemId: Math.floor(Math.random() * 100),
            })
            }>
        Go to Details... again
        </Button>

        <Button onPress={() => navigation.goBack()}>Go back</Button>
        <Button onPress={() => navigation.popTo('Home')}>Go to Home</Button>
        <Button onPress={() => navigation.popToTop()}>
        Go back to first screen in stack
        </Button>

    </View>
  );
}

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions:{
    headerStyle:{backgroundColor:'tomato'},
  },
  screens: {
    Home: {
        screen : HomeScreen,
        options:{
            title: 'Overview',
        },
    },
    Details: {
        screen : DetailsScreen,
        initialParams: { itemId: 42 },

    }
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
