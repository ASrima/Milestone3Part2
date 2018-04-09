//TaskItem.js -*- js-jsx -*-
import React from 'react';
import { Text, View, CheckBox, TouchableOpacity, StyleSheet } from 'react-native';
import hdate from 'human-date';
import Icon from 'react-native-vector-icons/Feather';

export default class TaskItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {done: props.done, priority: props.priority};
  }

  adjustPriority(delta) {
    this.setState(prev => {
      var p = prev.priority + delta
      if(p < 1) p = 1;
      else if(p > 5) p = 5;
      console.log("TASKITEM sending new priority", p, this.props.id)
      this.props.onAdjustPriority(p, this.props.id) // Send to parent
      return {...prev, priority: p}
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
            <View style={priStyle}>
              <Text style={{fontSize:18, paddingLeft:10, paddingRight:10}}>{this.state.priority}</Text>
              <TouchableOpacity
                onPress={()=> {if(!isDone) this.adjustPriority(-1)}}>
                <Icon name="chevron-down" size={isDone? 0 : 24} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=> {if(!isDone) this.adjustPriority(+1)}}>
                <Icon name="chevron-up" size={isDone? 0 : 24} />
              </TouchableOpacity>
            </View>
            <Text style={dueStyle}>{due}</Text>
          </View>
          <View style={styles.bottomRow}>
            <Text style={{color:"red"}}>{tags.join(' ')}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomRow: {},
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
  },
})
