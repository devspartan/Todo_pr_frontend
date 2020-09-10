import React, { Component } from 'react'
import './todoCompCSS.css'
import ItemComp from './ItemComp'
import axios from 'axios'
import Modal from './Modal'
import DeleteModel from './DeleteModel'
import {Button} from 'reactstrap'

class TodoComp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCompleted: false,
            todoList: [],
            modal: false,
            dltModel: false,
            activeItem: {
                title: '',
                description: '',
                completed: false
            }
        }    
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get("http://127.0.0.1:8000/api/todos/")
        .then(res => this.setState({ todoList: res.data})) 
        .catch(err => console.log(err, "Getting error in fetching data"))
    }

    handleSubmitt = (item) => {
        this.resetActiveItem()
        if(item.id) {
            axios.put(`http://127.0.0.1:8000/api/todos/${item.id}`, item)
            .then(res => this.getData())
            return
        }

        axios.post("http://127.0.0.1:8000/api/todos/", item)
        .then(res => this.getData())

    }

    handleDelete = (item) => {
        this.dltModel()

        axios.delete(`http://127.0.0.1:8000/api/todos/${item.id}`)
          .then(res => this.getData())

    }

    renderItems = () => {
        const newItems = this.state.todoList.filter(
            item => item.completed == this.state.isCompleted
        );
        
        return newItems.map(item => (
            <ItemComp task={item}
                      taskStatus={this.state.isCompleted}
                      setItem={this.setActiveItem}
                      dltItem={this.setActiveItemDeletion}/>
        ));
    };


    taskState = (task) => {
        if(task == "completed") {
            this.setState({
                isCompleted: true
            })
        }
        else if(task == "incomplete") {
            this.setState({
                isCompleted: false
            })
        }
    }

    setActiveItem = (item) => {
        this.setState({
            activeItem: item,
            modal: !this.state.modal
        })
    }

    setActiveItemDeletion = (item) => {
        this.setState({
            activeItem: item,
            dltModel: !this.state.dltModel
        })
    }

    resetActiveItem = () => {
        this.setState({
            activeItem: {
                title: '',
                description: '',
                completed: false
            },
            modal: !this.state.modal
        })
    }

    dltModel = () => {
        this.setState({
            dltModel: !this.state.dltModel
        })
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    classNameActive = 'comp_button comp_button_active'
    classNameNonactive = 'comp_button'
    render() {
        return (
            <div className='container'>
                <div>
                    <div>
                        <Button className='add-item' color='primary' onClick={this.resetActiveItem}>Add Task</Button>
                    </div>
                    <div>
                        <Button outline color='secondary' className={this.state.isCompleted? this.classNameNonactive : this.classNameActive} onClick={() => this.taskState("incomplete")}>Incomplete</Button>
                        <Button outline color='secondary' className={this.state.isCompleted? this.classNameActive : this.classNameNonactive } onClick={() => this.taskState("completed")}>Completed</Button>
                    </div>
                    
                    {this.renderItems()}

                </div>
                    {this.state.modal ?
                         <Modal task={this.state.activeItem}
                         toggle={this.toggle}       
                         onSave={this.handleSubmitt}/> : null 
                    }

                    { this.state.dltModel ? <DeleteModel toggle={this.dltModel}
                     onDelete={this.handleDelete} task={this.state.activeItem} /> : null }
            </div>
        );
    }
}

export default TodoComp
