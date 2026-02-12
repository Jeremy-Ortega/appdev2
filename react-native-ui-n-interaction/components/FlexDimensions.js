import {View} from 'react-native';

const FlexDimensionsBasics = () => {
  return (
    // Try removing the `flex: 1` on the parent View.
    // The parent will not have dimensions, so the children can't expand.

    // What if you add `height: 300` instead of `flex: 1`?
    // - The height of the parent turned into 300px and the child elements occupied the space with "flex:1" being the smallest area occupied and "flex:3" the largest. 
   
   <View style={{height:300}}>
      <View style={{flex: 1, backgroundColor: 'powderblue'}} />
      <View style={{flex: 2, backgroundColor: 'skyblue'}} />
      <View style={{flex: 3, backgroundColor: 'steelblue'}} />
    </View>
  );
};

export default FlexDimensionsBasics;
