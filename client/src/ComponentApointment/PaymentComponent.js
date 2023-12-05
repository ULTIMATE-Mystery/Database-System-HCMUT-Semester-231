// import React, { Component } from 'react';
// import { Container, Row, Col, Button, Table, ModalFooter } from 'reactstrap';
// import {Modal, ModalBody} from 'reactstrap';
// import { Switch, Redirect } from 'react-router-dom'
// import HeaderDefine from '../5.Share Component/Context';

// class Payment extends Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             show: false,
//             isModalPayment: false
//         }

//         this.showModal = this.showModal.bind(this);
//         this.hideModal = this.hideModal.bind(this);
//         this.onToggleModalPayment = this.onToggleModalPayment.bind(this);
//     }
//     onToggleModalPayment() {
//         this.setState({isModalPayment: !this.state.isModalPayment});
//     }
//     showModal = () => {
//         this.setState({ show: true });
//     };
    
//     hideModal = () => {
//         this.setState({ show: false });
//     };

    

//     render(){
//         let dem=0;
//         const showHideClassName = this.state.show ? "modal display-block" : "modal display-none";

//         let total = 0;
//         const cart = JSON.parse(localStorage.getItem('IS_cart'));
//         console.log(cart);
//         for (let i = 0; i < cart.length; i++) {
//             console.log(cart[i].number);
//             total += (cart[i].number)*(cart[i].item.price);
//         }

//         const list = cart.map(detail => {
//             return(
//                 <tr>
//                 <th scope="row" style={{textAlign: 'center'}}>
//                     {cart.indexOf(detail) + 1}
//                 </th>
//                 <td>
//                     {detail.item.drug_name}
//                 </td>
//                 <td style={{textAlign: 'center'}}>
//                     {detail.item.unit}
//                 </td>
//                 <td style={{textAlign: 'center'}}>
//                     {(detail.item.price).toLocaleString('vi-VN')}đ
//                 </td>
//                 <td style={{textAlign: 'center'}}>
//                     {detail.number}
//                 </td>
//                 <td style={{textAlign: 'right'}}>
//                     {(detail.item.price * detail.number).toLocaleString('vi-VN')}đ
//                 </td>
//                 </tr>
//             );
//         })
//         if (this.context.role !== "Patient") return <Switch> <Redirect to={`/${this.context.role}`} /></Switch>
//         return(
//         <Container>
//             <Row>
//                 <Col md="12" style={{textAlign: 'center', fontWeight: 'bold', 
//                 textTransform: 'uppercase', fontSize: '30px', margin: '20px 0px 20px 0px'}}> Thanh toán </Col>
//             </Row>
//             {/* <Row>
//                 <h4>1. Thuốc theo đơn của bác sĩ:</h4>
//                 <Table hover>
//                     <thead>
//                         <tr>
//                             <th>
//                                 STT
//                             </th>
//                             <th>
//                                 Tên thuốc/hàm lượng
//                             </th>
//                             <th>
//                                 Đơn vị tính
//                             </th>
//                             <th>
//                                 Đơn giá
//                             </th>
//                             <th>
//                                 Số lượng
//                             </th>
//                             <th>
//                                 Thành tiền
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                         <th scope="row">
//                             {++dem}
//                         </th>
//                         <td>
//                             Efferalgan 500mg
//                         </td>
//                         <td>
//                             Viên
//                         </td>
//                         <td>
//                             3.000đ
//                         </td>
//                         <td>
//                             5
//                         </td>
//                         <td>
//                             15.000đ              
//                         </td>
//                     </tr>
//                     <tr>
//                         <th scope="row">
//                             {++dem}
//                         </th>
//                         <td>
//                             Efferalgan 500mg
//                         </td>
//                         <td>
//                             Viên
//                         </td>
//                         <td>
//                             3.000đ
//                         </td>
//                         <td>
//                             5
//                         </td>
//                         <td>
//                             15.000đ              
//                         </td>
//                     </tr>
//                     <tr>
//                         <th scope="row" colspan="5">
//                             Tổng cộng
//                         </th>
                        
//                         <td>
//                             30.000đ              
//                         </td>
//                     </tr>
//                     </tbody>
//                 </Table>
//             </Row> */}
//             <Row>
//                 <Col>
//                 <Table responsive hover striped bordered>
//                             <thead>
//                                 <tr>
//                                 <th>
//                                     #
//                                 </th>
//                                 <th>
//                                     Tên thuốc
//                                 </th>
//                                 <th style={{textAlign: 'center'}}>
//                                     Đơn vị tính
//                                 </th>
//                                 <th style={{textAlign: 'center'}}>
//                                     Đơn giá
//                                 </th>
//                                 <th style={{textAlign: 'center'}}>
//                                     Số lượng
//                                 </th>
//                                 <th style={{textAlign: 'right'}}>
//                                     Thành tiền
//                                 </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {list}
//                             </tbody>
//                         </Table>
                    
//                 </Col>
//             </Row>
//             <Row>
//                 <Col md="12"style = {{textAlign: 'left', fontWeight: 'bold', fontSize: '20px'}}> 
//                         Tổng chi phí: {(total).toLocaleString('vi-VN')}đ 
//                 </Col>
//             </Row>

//                 {/* <div class='dung-phuongthuc'>
//                 <h4>Phương thức thanh toán</h4>
//                 <input type="radio" id="momo" name="wallet" value="Ví Momo" required />
//                 <label for="momo">Ví Momo</label>
//                 <input type="radio" id="zalopay" name="wallet" value="Ví ZaloPay" required />
//                 <label for="zalopay">Ví ZaloPay</label>
//                 </div>      */}

//             <Row>    
//             {/* <div className={showHideClassName}>
//                                     <section className="modal-main">
//                                         <div class='dung-logomini'>
//                                             <img src='/assets/images/logo_modal.png' height="60px" width="230px" alt='HealthCare' />
//                                         </div>
//                                         <p>Bạn có chắc chắn về sự lựa chọn của mình?</p>
//                                         <button type="button" onClick={this.hideModal}>
//                                             Hủy
//                                         </button>
                                        
//                                         <button type="button" onClick={() => {this.hideModal(); this.onToggleModalPayment()}}>
//                                             Xác nhận                                   
//                                         </button>
                                            
//                                     </section>
//                                 </div>         */}
//                 <Button className="dung cart-button" onClick={this.onToggleModalPayment}> 
//                     Thanh toán 
//                 </Button>
//                 <Modal isOpen={this.state.isModalPayment} toggle={this.onToggleModalPayment} centered>
//                         <ModalBody>
//                             <Container> 
//                             <Row><Col md="12" style={{textAlign: 'center', fontWeight: 'bold', fontSize: '20px'}}> THANH TOÁN MOMO </Col></Row>
//                             <Row> <Col md="12">
//                             <img style={{marginLeft: '70px'}}width="300px" height="300px" src={`https://momosv3.apimienphi.com/api/QRCode?phone=0971083236&amount=${total}& note=${total.toLocaleString('vi-VN')}đ`}></img>
//                             </Col> </Row> </Container>
//                         </ModalBody>
//                         <ModalFooter>
//                             <Button style={{ backgroundColor: '#62AFFC', marginTop: '10px', border: '0px', float: 'left' }}> Đã thanh toán </Button>
//                         </ModalFooter>
//                 </Modal>
//             </Row>

//         </Container>
//         )}
// }
// Payment.contextType = HeaderDefine
// export default Payment;

// {/* <input class='dung-button-vi' type="checkbox" onClick={this.showModal}>Ví Momo</input>    
// <input class='dung-button-vi' type="radio" onClick={this.showModal}>Ví ZaloPay</input>   */}