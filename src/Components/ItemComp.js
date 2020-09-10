import React, { Component } from 'react'
import './todoCompCSS.css'
import { Button } from 'reactstrap'


class ItemComp extends Component {

    render() {
        var copmleteClass = 'titleBox  completedTask'
        var incompleteClass = "titleBox"
        
        return (
            <div className='itemContainer'>
                <span className={this.props.taskStatus ? copmleteClass : incompleteClass}>{this.props.task.title}</span>
                <div>
                    <Button className='itemButton edit' color='info' onClick={() => this.props.setItem(this.props.task)}>Edit</Button>
                    <Button className='itemButton delete' color='danger' onClick={() => this.props.dltItem(this.props.task)}>Delete</Button>
                </div>

            </div>
        )
    }
}

export default ItemComp

