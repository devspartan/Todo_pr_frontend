import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";


class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.task
    };
  }

  handleChange = (event) => {
    let { name, value } = event.target
    // let {title, description, completed} = this.state.activeItem.
    if (name == 'completed') {
      value = event.target.checked
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });

    // console.log(this.state.activeItem.title, this.state.activeItem.description, this.state.activeItem.completed)
  }

  render() {
    const { toggle } = this.props;
    // console.log(this.state.activeItem.completed)
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Todo Item </ModalHeader>

        <ModalBody>
          <Form >
            
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="text" name="title" value={this.state.activeItem.title}
                     onChange={this.handleChange} placeholder="Enter Todo Title" />
            </FormGroup>
            
            <FormGroup>
              <Label for="description">Description</Label>
              <Input type="text" name="description" value={this.state.activeItem.description}
                     onChange={this.handleChange} placeholder="Enter Todo Description" />
            </FormGroup>
           
            <FormGroup check>
              <Label check>
                <Input type="checkbox" name="completed" value={this.state.activeItem.completed} 
                      onChange={this.handleChange}  />
                Completed
              </Label>
            </FormGroup>
          
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button color="success" onClick={() => this.props.onSave(this.state.activeItem)}> Save </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default CustomModal

