import React, { Component } from 'react';
//import { Media } from 'reactstrap';

import { Control, LocalForm, Errors } from 'react-redux-form';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Row, Col, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label
} from 'reactstrap';
import { Link } from 'react-router-dom';



function RenderDish({ dish }) {
    if (dish != null)
        return (

            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>

        );
    else
        return (
            <div></div>
        );
}

function RenderComments({ comments }) {
    if (comments != null){
        const amir = comments.map((sarb) => {
            return (
                <ul class="list-unstyled">
                    <li> name : {sarb.author} </li>
                    <li> comment : {sarb.comment} </li>
                    <li> date : {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(sarb.date)))}</li>
                </ul>
            )
        });
return(
    <div>
    {amir}
    <ComponentForm />
    </div>
);}
    else
    return (
        <div></div>
    );
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class ComponentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rate: '',
            name: '',
            comment: '',
            email: '',
            agree: false,
            contactType: 'Tel.',
            message: '',
            touched: {
                firstname: false,
                lastname: false,
                comment: false,
                email: false
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.toggleModal = this.toggleModal.bind(this);



    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin(event) {
        this.toggleModal();
        alert("Username: " + this.username.value + " Password: " + this.password.value
            + " Remember: " + this.remember.checked);
        event.preventDefault();

    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
    }





    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }

    render() {

        return (


            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal} >Login</ModalHeader>
                    <ModalBody>

                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">

                                <Col md={12}>
                                    <label md={3} htmlFor="rate">Rating</label>


                                    <Control.select model=".rate" id="rate" className="form-control" md={9}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>



                                </Col>

                            </Row>
                            <Row className="form-group">

                                <Col md={12}>
                                    <Label htmlFor="name" md={3}>Your Name</Label>
                                    <Control.text model="name" id="name" name="name" md={9}
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model="name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>

                            </Row>
                            <Row className="form-group">

                                <Col md={12}>
                                    <Label htmlFor="comment" md={1}>Comment</Label>
                                    <Control.textarea model="comment" id="comment" name="comment" rows="6" md={11}
                                        placeholder=""
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15),
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 12 }}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>



                    </ModalBody>
                </Modal>

            </div>




        );
    }
}


const DishDetail = (props) => {
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />

                    

                </div>
            </div>
        </div>
    );
}





export default DishDetail;