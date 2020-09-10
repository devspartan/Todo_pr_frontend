import React, { Component } from 'react'
import axios from 'axios'
import TodoComp from './TodoComp';


export class temp extends Component {

    constructor(props) {
        super(props)

        this.state = {
            viewCompleted: false,
            activeItem: {
                title: "",
                description: "",
                completed: false
            },
            todoList: []
        }
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        axios
            .get("http://127.0.0.1:8000/api/todos/")
            .then(res => this.setState({ todoList: res.data }))
            .catch(err => console.log(err, "i just found error in loading data"));
    };

    handleSubmit = item => {
        this.toggle();
        if (item.id) {
            axios
                .put(`http://127.0.0.1:8000/api/todos/${item.id}/`, item)
                .then(res => this.refreshList());
            return;
        }
        axios
            .post("http://127.0.0.1:8000/api/todos/", item)
            .then(res => this.refreshList());
    };


    handleDelete = item => {
        axios
            .delete(`http://localhost:8000/api/todos/${item.id}`)
            .then(res => this.refreshList());
    };

    createItem = () => {
        const item = { title: "", description: "", completed: false };
        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    editItem = item => {
        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    render() {
        return (
            <div>
              
            </div>
        )
    }
}

export default temp
