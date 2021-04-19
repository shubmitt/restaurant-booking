

import React,{Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle,Breadcrumb,BreadcrumbItem } from 'reactstrap';
import moment from "moment";
import { Link } from 'react-router-dom';
 import { Button,Label,Row,Col,Modal,ModalHeader,ModalBody } from 'reactstrap';
import { Control,Errors,LocalForm,actions } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import {Stagger,FadeTransform,Fade} from 'react-animation-components';
    


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);
    
     function RenderDish({dish}) 
      {

      	
              return(
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                  <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                  <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                  </CardBody>
                </Card>
                </FadeTransform>
                );
                    
           

           

      } 

     function RenderComments({comments,postComment,dishId}) 
      {
      	
      	const commentdetail = comments.map((comment) => {
           	if(comment != null)
           return(
            <Fade in>
            <li key={comment.id}>
                
                <p>{comment.comment}</p>
                <p> -- {comment.author} , {moment(comment.date).format('ll')}</p>
               
            </li>
            </Fade>
            
          );

              else
              	return(<div></div>);

           }); 
            

           return (
          <div>
         <ul className="list-unstyled">
         <Stagger in>
                    {commentdetail}
                    </Stagger>
                </ul>
                <CommentForm dishId={dishId}  postComment={postComment} />
                </div>
 );
      } 	
        

    	

    	
           

   const Dishdetail = (props)  => {
    
   if(props.isLoading){
   	return(
      <div className="container">
      <div className="row">
       <Loading/>
      </div>
      </div>
   	)
   }

   else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }

 else if(props.dish != null)
 	
           return(

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
            <RenderDish dish= {props.dish}/>
              </div>
             <div className="col-12 col-md-5 m-1">

                    <h4>Comments</h4>

                      <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />
                   </div>
                   
               </div>
               </div>

           )
          
          else
          return(<div></div>); 
          } 

          class CommentForm extends Component
{
	constructor(props){
		super(props);
       
       this.toggleModal = this.toggleModal.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
       this.state={
       	isModalOpen:false
       };

	}

	toggleModal()
		{
			 this.setState({
			 	isModalOpen:!this.state.isModalOpen
			 });
		}

		handleSubmit(values)
    {
         this.toggleModal();
    	 this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);   
        
    }

	render(){
		return(
			<React.Fragment>
          <div className="row">
           <div className="col-12">
          <Button outline onClick={this.toggleModal}><span className="fa fa-pencil"></span> Submit Comment</Button>
          </div>
          </div>

          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
           <ModalBody>
           <LocalForm onSubmit={(values) =>  this.handleSubmit(values)}>
           <Row className="FormGroup">
           <Col>
           <Label htmlFor="rating" className="form-control-label">Rating</Label>
           
            <Control.select model=".rating" name="rating" className="form-control">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            </Control.select>
           </Col>
           </Row>

           <Row className="FormGroup">
           <Col>
           <Label htmlFor="name" className="form-control-label">Your Name</Label>
           <Control.text model=".name" id="name"  placeholder="Your Name" className="form-control" 
           validators={{
           	required, minLength: minLength(3), maxLength: maxLength(15)
              }}/>
              <Errors className="text-danger" 
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'}} />
           </Col>
           </Row>
           <Row className="FormGroup">

           <Col>
           <Label htmlFor="comment" className="form-control-label">Comment</Label>
           <Control.textarea model=".comment" rows="10" id="comment" name="comment" className="form-control"></Control.textarea>
           </Col>
           </Row>
           <Row className="FormGroup">
                                <Col>
                                    <Button type="submit" color="primary" className="mt-2">
                                        Submit
                                    </Button>
                                </Col>
                                
                                </Row>
           </LocalForm>
           </ModalBody>
          </Modal>
             </React.Fragment>
			);
	}
}
         
     
    	

    export default Dishdetail;