import React, { Component } from 'react'
import './todoCompCSS.css'
import ItemComp from './ItemComp'
import data from './Data'


class TodoComp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            todoList: data
        }
    }

    renderItems = () => {
        const { viewCompleted } = this.state;
        const newItems = this.state.todoList.filter(
            item => item.completed == false
        );
        console.log(newItems)
        console.log("im empty")
        return newItems.map(item => (
            <ItemComp task={item}/>
        ));
    };


    render() {
        return (
            <div className='container'>

                <div>
                    <div>
                        <button className='add-item'>Add Task</button>
                    </div>
                    <div>
                        <button className='comp-button complete'>Completed</button>
                        <button className='comp-button incomplete'>Incomplete</button>
                    </div>
                    {this.renderItems()}
                </div>
            </div>
        );
    }
}

export default TodoComp
