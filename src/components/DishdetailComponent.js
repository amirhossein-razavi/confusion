import React, { Component } from 'react';
//import { Media } from 'reactstrap';

import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle
} from 'reactstrap';


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
    if (comments != null)
        return (
            comments.map((sarb) => {
                return (

                    <ul class="list-unstyled">
                        <li> name : {sarb.author} </li>
                        <li> comment : {sarb.comment} </li>
                        <li> date : {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(sarb.date)))}</li>
                    </ul>

                )
            }
            )

        );
    else
        return (
            <div></div>
        );
}

const DishDetail = (props) => {
    if (props.dish != null)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6 col-md-5 m-1">

                        <RenderDish dish={props.dish} />
                    </div>
                    {(() => {
                        if (props.dish.comments != null)
                            return (
                                <div className="col-6 col-md-5 m-1">

                                    <RenderComments comments={props.dish.comments} />
                                </div>
                            );
                        else
                            return (
                                <div></div>
                            );
                    })()}


                </div>
            </div>
        );
    else
        return (
            <div></div>
        );
}



export default DishDetail;