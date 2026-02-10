import { registerRootComponent } from 'expo';

import HelloWorldDemo from './HelloWordDemo.js';
import ProfileDemo from './ProfileDemo.js';


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(ProfileDemo);
