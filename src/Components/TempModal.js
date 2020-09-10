import React, { Component } from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter,
      Form, FormGroup, Input, Label} from "reactstrap";

    export default class CustomModal extends Component {

      render() {
        const { toggle } = this.props;
        return (
          <Modal isOpen={true} toggle={toggle}>
            
          <ModalHeader toggle={toggle}> Todo Item </ModalHeader>
            
            <ModalBody>
                this is ModalBody like for form
            </ModalBody>
          
            <ModalFooter>
              <Button color="success"> Save </Button>
            </ModalFooter>
          </Modal>
        );
      }
    }