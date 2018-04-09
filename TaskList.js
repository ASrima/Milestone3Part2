import React from 'react'; // -*- js-jsx -*-
import { Button, FlatList, Text, View } from 'react-native';
import TaskItem from './TaskItem'

function randomDay(y, m) {
  const d = Math.floor(Math.random()*28+1)
  return new Date(y,m,d)
}

export default class TaskList extends React.Component {
  constructor(props) {
    super(props)
    const today = new Date()
    const yy = today.getFullYear()
    const mm = today.getMonth()

    this.state = {
      taskList: [
        {description: "Feed cat",
         key: "3298745",
         priority: 4,
         done: null,
         tags: ["home", "pet"],
         deadline: randomDay(yy,mm)},
        {description: "Buy milk",
         key: "398657",
         priority: 2,
         done: null,
         tags: ["errand", "grocery"]},
        {description: "Do assignment",
         key: "968744",
         priority: 5,
         done: null,
         tags: ["focus", "school"],
         deadline: randomDay(yy,mm)},
        {description: "Plan vacation",
         key: "38576387",
         priority: 1,
         done: null,
         tags: ["fun"],
         deadline: randomDay(yy,mm)},
        {description: "Call doctor's office",
         key: "875684762",
         priority: 3,
         done: null,
         tags: ["phone"],
         deadline: randomDay(yy,mm)},
      ]}
  }

  adjustPriority(newPriority, itemId) {
    this.setState(prev => {
      var newList = prev.taskList.map(task => {
        if(task.key == itemId) {
          return {...task, priority: newPriority}
        } else {
          return task
        }
      })
      return {...prev, taskList: newList}
    })
  }

  renderItem(item) {
    return (
      <TaskItem
        key={item.item.key}
        id={item.item.key}
        description={item.item.description}
        done={item.item.done}
        priority={item.item.priority}
        deadline={item.item.deadline}
        tags={item.item.tags}
        onAdjustPriority={
        (newPriority, itemId) => this.adjustPriority(newPriority, itemId)}
        />
    )
  }

  sortItems() {
    this.setState(prev => {
      prev.taskList.sort(function(a,b) {
      if(a.description < b.description) {
        return -1;
      } else if(b.description < a.description) {
        return 1;
      } else {
        return 0;
      }
      })
      return prev
    })
  }

  sortByPriority() {
    this.setState(prev => {
      prev.taskList.sort(function(a,b) {
      if(a.priority < b.priority) {
        return 1;
      } else if(b.priority < a.priority) {
        return -1;
      } else {
        return 0;
      }
      })
      return prev
    })
  }

  render() {
    return (
      <View style={{paddingTop:20}}>
          <Button
            onPress={() => this.sortItems()}
            title="Sort by description"/>
                      <Button
                        onPress={() => this.sortByPriority()}
                        title="Sort by priority"/>
        <FlatList
          style={{}}
          data={this.state.taskList}
          renderItem={item => this.renderItem(item)}
          />
          <Text>Hello</Text>
      </View>
    )
  }
}
