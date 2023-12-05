import React, {Component} from 'react';
import { Container} from 'reactstrap';
class SaveSchedule extends Component {
  constructor() {
    super();
    this.state = {

      patient:[],
      treatment_turn:[],
      work_schedule:[],         
      system_user:[],

      patient:[],
      treatment_turns:[],
      work_schedules:[],
      system_users:[],
    }
  }
    render(){
      return(
        <Container>
            Tên bệnh nhân:
            <div>{this.state.system_user.map(turn=>{if(this.state.patient.phone==turn.phone) {return turn.firstname+' '+turn.lastname}})}</div>
            <br />
            Tiền sử bệnh án:
            <div>{this.state.patient.medical_history}</div>
            <br />
            Thời gian khám:
            <div>{this.state.treatment_turn.start_time}</div>
            <br />
            Thời gian kết thúc:
            <div>{this.state.treatment_turn.end_time}</div>
            <br />
            <label>
            Nhắc nhở trước:  
            <select>
                <option >Không</option>
                <option >10 phút</option>
                <option >20 phút</option>
            </select>
            </label>
            <br />
          </Container>
        )
    }
}
export default SaveSchedule;