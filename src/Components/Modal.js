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

    if (name == 'completed') {
      value = event.target.checked
    }

    const temp = {...this.state.activeItem, [name]: value}

    console.log(name, value)
    this.setState({
      activeItem: temp
    })
  }

  render() {
    const { toggle } = this.props;
    console.log(this.state.activeItem.completed)
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Todo Item </ModalHeader>

        <ModalBody>
          <Form >
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="text" name="title" value={this.state.activeItem.title} onChange={this.handleChange} placeholder="Enter Todo Title" />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input type="text" name="description" value={this.state.activeItem.description} onChange={this.handleChange} placeholder="Enter Todo Description" />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" name="completed" value={true} onChange={this.handleChange}  />
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

