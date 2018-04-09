// TaskItem.js -*- js-jsx -*-
import React from 'react';
import { Text, View, CheckBox, TouchableOpacity, StyleSheet,Picker, } from 'react-native';
import hdate from 'human-date';
import Icon from 'react-native-vector-icons/Feather';

export default class TaskItem extends React.Component {
  constructor(props) {
    super(props);
   // this.state = {done: props.done, priority: props.priority};
    this.state ={
      PickerValue: '*****'.substring(5 - props.priority),
      priority: props.priority
    };

    // Make sure "this" is defined
    this.changePriority.bind(this)
  }

 // adjustPriority(delta) {
   // this.setState(prev => {
     // var p = prev.priority + delta
      //if(p < 1) p = 1;
      //else if(p > 5) p = 5;
      //console.log("TASKITEM sending new priority", p, this.props.id)
      //this.props.onAdjustPriority(p, this.props.id) // Send to parent
      //return {...prev, priority: p}
    //})
  //}

  changePriority(itemValue, itemIndex) {
    console.log("CHANGE PRIORITY", itemValue, itemIndex)
    this.setState(prev => {
      this.props.onAdjustPriority(itemValue.length, this.props.id)
      return {...prev, PickerValue: itemValue, priority: itemValue.length}
    })
  }

  toggleDone() {
    this.setState(prev => {
      var d = prev.done == null? new Date() : null
      return {...prev, done: d}
    })
  }

  render() {
    var due = '';
    if(this.props.deadline != null) {
      due = ' due ' + hdate.relativeTime(this.props.deadline)
    }
    const isDone = this.state.done != null
    // These styles will be customized based on current state
    let descStyle = {fontSize:20, fontWeight: 'bold'}
    let dueStyle = {fontSize:18}
    let priStyle = {
      flexDirection: 'row',
    }
    if(isDone) {
      descStyle.textDecorationLine = 'line-through'
      descStyle.textDecorationStyle = 'solid'
      descStyle.color = '#aaaaaa'
    }
    else {                      // Otherwise task is not done
      switch(this.state.priority) {
      case 1:
        priStyle.backgroundColor = '#4ba3da'; break;
      case 2:
        priStyle.backgroundColor = '#abdda4'; break;
      case 3:
        priStyle.backgroundColor = '#ffffbf'; break;
      case 4:
        priStyle.backgroundColor = '#fdae61'; break;
      case 5:
        priStyle.backgroundColor = '#f7797c'; break;
      }
    }
    const tags = this.props.tags? this.props.tags : []
    return (
      
      <View style={styles.item}>
        <CheckBox style={styles.checkbox} value={isDone}
                  onValueChange={()=>this.toggleDone()}/>
        <View style={styles.info}>
          <Text style={descStyle}>{this.props.description}</Text>

          
          <View style={styles.middleRow}>
          <View style={styles.pickerView}>
            <Picker
            style={{width:'80%'}}


            selectedValue={this.state.PickerValue}
            onValueChange = {(v,i) => this.changePriority(v,i)}
           >
            <Picker.Item label="Choose Priority" value=" " />
            <Picker.Item label="*****" value="*****" />
            <Picker.Item label="****" value="****" />
            <Picker.Item label="***" value="***" />
            <Picker.Item label="**" value="**" />
            <Picker.Item label="*" value="*" />


            </Picker>

            
            <Text style={dueStyle}>{due}</Text>
          </View>
          <View style={styles.bottomRow}>
            <Text style={{color:"red"}}>{tags.join(' ')}</Text>
            </View>
          </View>
        </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  bottomRow: {
    borderWidth:2,
    borderColor:"red"
  },
  info: {
    marginTop: 4,
  },
  item: {
    flexDirection: 'row',
  },

  checkbox: {
    marginLeft: 10,
    marginRight: 10,
  },
  middleRow: {
    flexDirection: 'row',
    borderWidth:2,
    borderColor:"green",
  },
  pickerView: {
    borderWidth:2,
    borderColor:"blue",
    width:"60%",
  }
})
