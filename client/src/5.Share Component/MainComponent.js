import React, { Component, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './Main UI/HomeComponent';
import Patient from './Main UI/PatientComponent';
import BuyDrug from '../ComponentDrug/Buy Drug/BuyDrugComponent';
import ViewCart from '../ComponentDrug/Buy Drug/ViewCartComponent';
import ManageDrug from '../ComponentDrug/Nurse Manage/Manage Drug/ManageDrug';
import StatisticOrder from '../ComponentDrug/Nurse Manage/Manage Order/StatisticOrder';
import ViewOrder from '../ComponentDrug/Nurse Manage/Manage Order/ViewOrder';
import ViewOrderDetail from '../ComponentDrug/Nurse Manage/Manage Order/ViewOrderDetail';
import Payment from '../ComponentDrug/Buy Drug/PaymentComponent';
import PaymentMoMo from '../ComponentDrug/Buy Drug/PaymentMoMoComponent';
import ViewMedicalDetail from '../ComponentApointment/ViewMedicalDetail';
import Prescribe from '../ComponentDrug/Doctor/PrescribeComponent';
import ViewPrescribe from '../ComponentDrug/Doctor/ViewPrescribeMedicine';
import StatisticTreatmentTurn from '../ComponentDrug/Nurse Manage/Manage Treatment/StatisticTreatmentTurnComponent';
import ViewOrderPrescribeDetail from '../ComponentDrug/Nurse Manage/Manage Order/ViewOrderPrescribeDetail';
import ViewDoctor from '../ComponentDrug/Patient/ViewDoctorComponent';
import ViewTreatmentTurn from '../ComponentDrug/Doctor/ViewTreatmentTurnComponent';

// DUNG
import Doctor from './Main UI/DoctorComponent';
import Appointment from '../ComponentApointment/AppointmentComponent';
import CancelAppointment from '../ComponentApointment/CancelAppointmentComponent';
// import Payment from '../ComponentApointment/PaymentComponent';
import CreateAnAppointment from '../ComponentApointment/CreateAnAppointmentComponent';
import Re_examinationSchedule from '../ComponentApointment/Re-examinationScheduleComponent';
import MedicalRecord from '../ComponentApointment/VIewMedicalRecordComponent';
import ViewMedicalRecord from '../ComponentApointment/MedicalRecordComponent';
import InstantAppointment from '../ComponentApointment/InstantAppointmentComponent';

//PHUC
import LoginPane from '../ComponentProFile/loginPaneComponent';
import Profile from '../ComponentProFile/profile';
import SignUp from '../ComponentProFile/Signup';
import { HeaderProvider } from './Context';
import HR from '../ComponentProFile/HR';
import PrescribeDetail from '../ComponentDrug/Nurse Manage/Manage Order/PrescibeMed';


//CHANH
import Nurse from './Main UI/NurseComponent';
import axios from 'axios';
import SaveSchedule from '../ComponentSchedule/SaveSchedule';
import View from '../ComponentSchedule/View';
import ScheduleTable from '../ComponentSchedule/ViewSchedule';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect_page: 'home'
    }
    this.updatePage = this.updatePage.bind(this);
  }

  async componentDidMount() {
    await axios.get('/api/get/session')
    axios.get('/api/get/session').then(res => {
      console.log(res.data.role);
      if (res.data !== undefined)
        this.updatePage(res.data.role === "Guest" ? 'home' : res.data.role)
    })
  }

  updatePage(page) {
    this.setState({ redirect_page: page })
  }

  render() {
    const Treatment = ({match}) => {
      return (
        <ViewTreatmentTurn phone = {parseInt(JSON.parse(match.params.id))} />
      )
    }
    const Prescribe_Medicine = ({match}) => {
      return (
        <Prescribe treatment_id = {parseInt(JSON.parse(match.params.id))} />
      )
    }

    const View_Prescribe = ({match}) => {
      return (
        <ViewPrescribe treatment_id = {parseInt(JSON.parse(match.params.id))} />
      )
    }

    const MedicalDetail = ({match}) => {
      return (
        <ViewMedicalDetail medicalID = {parseInt(JSON.parse(match.params.id))} />
      )
    }
    const ViewDetails = ({ match }) => {
      return (
        <ViewOrderDetail orderID={parseInt(JSON.parse(match.params.orderID))} />
      )
    }

    const ViewPrescribeDetails = ({ match }) => {
      return (
        <ViewOrderPrescribeDetail orderID={parseInt(JSON.parse(match.params.orderID))} />
      )
    }

    const Info = ({ match }) => {
      return (
        <Profile phone={parseInt(JSON.parse(match.params.phone))} />
      )
    }

    const Login = () => {
      return (
        <LoginPane updatePage={this.updatePage} />
      )
    }

    const Record = ({match}) => {
      return <ViewMedicalRecord phone={parseInt(JSON.parse(match.params.phone))} />
    }

    const role = 2;
    return (
      <HeaderProvider>
        <div>
          <Header updatePage={this.updatePage} />
          <div className="content-container">
            <Switch>
              {/*---------------------------------Cat------------------------------------*/}
              <Route exact path='/home' component={Home} />
              <Route path='/buydrug' component={BuyDrug} />
              <Route path='/patient' component={Patient} />
              <Route path='/view_cart' component={ViewCart} />
              <Route path='/manage_drug' component={ManageDrug} />
              <Route path='/view_order' component={ViewOrder} />
              <Route path='/statistic_order' component={StatisticOrder} />
              <Route path='/view_order_details/:orderID' component={ViewDetails} />
              <Route path='/view_order_prescribe_details/:orderID' component={ViewPrescribeDetails} />
              <Route path='/payment' component={Payment} />
              <Route path='/payment_momo' component={PaymentMoMo} />
              <Route path="/view_medical_detail/:id" component={MedicalDetail} />
              <Route path="/prescribe/:id" component={Prescribe_Medicine} />
              <Route path="/view_prescribe/:id" component={View_Prescribe} />
              <Route path='/statistic_treatment' component={StatisticTreatmentTurn} />
              <Route path='/view_doctor' component={ViewDoctor} />
              <Route path='/view_treatment/:id' component={Treatment} />

              {/*---------------------------------Dung------------------------------------*/}
              <Route path='/doctor' component={Doctor} />
              <Route path='/appointment' component={Appointment} />
              <Route path='/cancelappointment' component={CancelAppointment} />
              <Route path='/createanappointment' component={CreateAnAppointment} />
              <Route path='/view_medical_record' component={MedicalRecord} />
              <Route path='/re-examination_schedule' component={Re_examinationSchedule} />
              <Route path='/instant_appointment' component={InstantAppointment} />
              <Route path='/medical_record/:phone' component={Record} />

              {/*---------------------------------Phuc------------------------------------*/}
              <Route path='/login' component={Login} />
              <Route path='/signup' component={SignUp} />
              <Route path='/profile/:phone' component={Info} />
              <Route path='/HR' component={HR} />
              <Route path='/prescribe-med' component={PrescribeDetail} />
              {/* <Route path='/myorder'component={MyListOrder}/> */}

              {/*---------------------------------Chanh------------------------------------*/}
              <Route path='/nurse' component={Nurse} />
              <Route path='/saveSchedule' component={SaveSchedule} />
              <Route path='/view' component={View} />
              <Route path='/scheduleTable' component={ScheduleTable} />
              
              <Redirect to={`/${this.state.redirect_page}`} />
            </Switch>
          </div>
          <Footer />
        </div>
      </HeaderProvider>
    );
  }
}

export default Main;

