import React from 'react'
import data from './Data'
import './todoCompCSS.css'


function ItemComp(props) {

    return (
        <div className='itemContainer'>
            <span className='titleBox'>{props.task.title}</span>
            <div>
                <button className='itemButton edit'>Edit</button>
                <button className='itemButton delete'>Delete</button>
            </div>

        </div>
    )
}

export default ItemComp
