import * as React from 'react';
import { View, Text,TextInput } from 'react-native';
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp} from '@react-navigation/native'

import type {
  RootStackParamList,
  HomeScreenNavigationProp,
  DetailsProps,
  DetailsScreenNavigationProp,
  CreatePostProps,
  ProfileProps,
  SettingsProps
} from './types';


// type RootStackParamList = {
//   Home: undefined;
//   Details: {
//     itemId: number;
//     otherParam?: string;
//   };
// };

// type HomeScreenNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'Home'
// >;

// type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

// type DetailsProps = {
//   route: DetailsScreenRouteProp;
// };

function HomeScreen({ route }: { route: any }) {
  const navigation = useNavigation<HomeScreenNavigationProp>();


  React.useEffect(() => {
    if (route.params?.post) {
      alert('New post: ' + route.params?.post);
    }
    }, [route.params?.post]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap:4}}>
      <Text>Home Screen</Text>

      {/* Profile */}
       <Button onPress={() => navigation.navigate('Profile')}>
            Profile
        </Button>
     
      {/* Setting */}
     <Button
        onPress={() =>navigation.navigate('Settings', { params : 'jane' }
        )}>
        Go to Settings
      </Button>

      {/* Details */}
      <Button
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}
      >
        Go to Details
      </Button>

      {/* Create Post */}
      <Button onPress={() => navigation.navigate('CreatePost')}>
            Create post

        </Button>


      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>

    </View>
  );
}

function DetailsScreen({ route }: DetailsProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  /* 2. Get the param */
  const { itemId, otherParam } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap:4 }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        onPress={
          () =>
            navigation.push('Details', {
              // Randomly generate an ID for demonstration purposes
              itemId: Math.floor(Math.random() * 100),
            })
        }
      >
        Go to Details... again
      </Button>

      <Button
        onPress={() => {
          navigation.popTo('Home');
        }}>
        Back to Home
      </Button>
    </View>
  );
}


function CreatePostScreen({ route }: CreatePostProps) {

  const navigation = useNavigation<any>();
  const [postText, setPostText] = React.useState('');

  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap:4}}>

      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />

      <Button
        onPress={() => {
          // Pass params back to home screen
          navigation.popTo('Home', { post: postText });
        }}>
        Done
      </Button>
    </View>
  );
}

function SettingsScreen({ route }: SettingsProps) {
  const { userId } = route.params as { userId: string };



  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Text>Settings Screen</Text>

      <Text>User ID: {JSON.stringify(userId)}</Text>

    </View>

  );

}


function ProfileScreen({ route }: ProfileProps) {

  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Text>Profile Screen</Text>

    </View>

  );

}



const RootStack = createNativeStackNavigator<RootStackParamList>({
  screens: {
    Home: HomeScreen,
    Details: DetailsScreen,
    CreatePost: CreatePostScreen, 
    Profile: ProfileScreen,
    Settings: SettingsScreen,
  },

  screenOptions: {
    headerStyle: { 
      backgroundColor: 'tomato' 
    }},
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
