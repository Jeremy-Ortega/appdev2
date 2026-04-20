import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: { post?: string } |undefined;
  Details: {
    itemId: number;
    otherParam?: string;
  };
  CreatePost: undefined;
  Profile: undefined;
  Settings:{ params?: string } | undefined;
  
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type DetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;

export type DetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'Details'
>;

export type CreatePostScreenRouteProp = RouteProp<
  RootStackParamList,
  'CreatePost'
>;

export type ProfileScreenRouteProp = RouteProp<
  RootStackParamList,
  'Profile'
>;

export type SettingsScreenRouteProp = RouteProp<
  RootStackParamList,
  'Settings'
>;
// ------------------

export type DetailsProps = {
  route: DetailsScreenRouteProp;
};

export type CreatePostProps = {
    route: CreatePostScreenRouteProp;
}

export type ProfileProps = {
    route: ProfileScreenRouteProp;
}

export type SettingsProps = {
    route: SettingsScreenRouteProp;
}