import React, { Component } from 'react'
import {ModalBody, Modal, ModalHeader, ModalFooter, Button} from 'reactstrap'

class DeletaModel extends Component {
    render() {
        const { toggle } = this.props;
        return (
          <Modal isOpen={true} toggle={toggle}>
            
          <ModalHeader toggle={toggle}> Delete Item </ModalHeader>
            
            <ModalBody>
            Are you sure ?
            </ModalBody>
            
            <ModalFooter>
              <Button color="danger" onClick={() => this.props.onDelete(this.props.task)}> Delete </Button>
            </ModalFooter>
          </Modal>
        );
    }
}

export default DeletaModel
