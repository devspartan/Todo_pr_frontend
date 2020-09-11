import React, { Component } from 'react'
import './todoCompCSS.css'
import ItemComp from './ItemComp'
import Modal from './Modal'
import DeleteModal from './DeleteModal'
import {Button} from 'reactstrap'
import axios from 'axios'

class TodoComp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCompleted: false,
            todoList: [],
            modal: false,
            dltModalState: false,
            activeItem: {
                title: '',
                description: '',
                completed: false
            }
        }    
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        axios.get("http://127.0.0.1:8000/api/todos/")
        .then(res => this.setState({ todoList: res.data})) 
        .catch(err => console.log(err, "Getting error in fetching data"))
    }

    handleSubmitt = (item) => {
        this.resetActiveItem()
        
        // console.log(item, item.id, `http://127.0.0.1:8000/api/todos/${item.id}`, "item")
        if(item.id) {
            axios.put(`http://127.0.0.1:8000/api/todos/${item.id}/`, item)
            .then(res => this.fetchData())
            .catch(err => console.log(err, "gettingError"))
            return
        }

        axios.post("http://127.0.0.1:8000/api/todos/", item)
        .then(res => this.fetchData())
        .catch(err => console.log(err, "error in posting"))

    }

    handleDelete = (item) => {
        this.setDltModalState()

        axios.delete(`http://127.0.0.1:8000/api/todos/${item.id}`)
          .then(res => this.fetchData())
          .catch(err => console.log(err, "error in deletion"))

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

    // completed or not
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
            dltModalState: !this.state.dltModalState
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

    setDltModalState = () => {
        this.setState({
            dltModalState: !this.state.dltModalState
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

                    { this.state.dltModalState ? 
                        <DeleteModal toggle={this.setDltModalState}
                                     onDelete={this.handleDelete}
                                     task={this.state.activeItem} /> : null
                    }
            </div>
        );
    }
}

export default TodoComp
