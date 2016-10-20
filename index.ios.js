import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing
} from 'react-native';

export default class Flipper extends Component {
  constructor(){
    super()
    this.rotValue = new Animated.Value(0)
  }
  componentDidMount() {
    this.rotValue.addListener(({value}) => {console.log(value, "some valie");});

    this.rot()
  }
//  multiplyMatrix(m1, m2) {
//     var result = [];
//     for(var j = 0; j < m2.length; j++) {
//         result[j] = [];
//         for(var k = 0; k < m1[0].length; k++) {
//             var sum = 0;
//             for(var i = 0; i < m1.length; i++) {
//                 sum += m1[i][k] * m2[j][i];
//             }
//             result[j].push(sum);
//         }
//     }
//     return result;
// }
  rot() {
    this.rotValue.setValue(0)
    Animated.timing(
      this.rotValue,
      {
        toValue: 100,
        duration: 3000,
        easing: Easing.linear
      }
    ).start()
  }
  render() {
    var angx= 60;
    var dist= -100;
    // var rotmat= [[1,0,0,0],
    // [0,Math.cos(angx * (Math.PI / 180)),Math.sin(angx * (Math.PI / 180)),0],
    // [0,-Math.sin(angx * (Math.PI / 180)),Math.cos(angx * (Math.PI / 180)),0],
    // [0,0,0,1]];
    //
    // var tramat= [[1,0,0,0],
    //              [0,1,0,0],
    //              [0,0,1,0],
    //              [0,dist,0,1]];
    //
    //
    //              var tramatinv= [[1,0,0,0],
    //                           [0,1,0,0],
    //                           [0,0,1,0],
    //                           [0,-dist,0,1]];
    //
    //   var mat1= this.multiplyMatrix(tramat,rotmat);
    //   var mat2= this.multiplyMatrix(mat1,tramatinv);
    //   console.log(mat1);
    //   console.log(mat2);
    const rota = this.rotValue.interpolate({
      inputRange: [0,100],
      outputRange:['0deg','180deg']
    })
    const bg = this.rotValue.interpolate({
      inputRange: [0,50,100],
      outputRange: ['red','blue','green']
    })

    console.log(rota._config.outputRange, 'value');
    return (
    <Animated.View style= {{
      top:40,
      left:100,
      width: 200,
      height: 200,
      backgroundColor: bg,
      transform:[
        {
          perspective: 850
        },
        {
          matrix: [
            1,
            0,
            0,
            0,
            0,
            Math.cos(angx * (Math.PI / 180)),
            Math.sin(angx * (Math.PI / 180)),
            0,
            0,
            -Math.sin(angx * (Math.PI / 180)),
            Math.cos(angx * (Math.PI / 180)),
            0,
            0,
            dist*(Math.cos(angx * (Math.PI / 180))-1),
            dist*Math.sin(angx * (Math.PI / 180)),
            1]
        }
      ]
    }} />
    );
  }
}

AppRegistry.registerComponent('Flipper', () => Flipper);
