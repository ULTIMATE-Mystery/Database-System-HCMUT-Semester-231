import React, {Component} from 'react';
import { Container } from 'reactstrap';
import axios from 'axios';

class Fetch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            work_schedules:{},
            treatment_turns:[],
            work_schedules:[],
            system_users:[]
        }
    }

    componentDidMount() {
        axios.get('/api/get/treatment_turns')
             .then(res => {
                const treatment_turns = res.data;
                this.setState({ treatment_turns: treatment_turns.treatment_turns});
              })
             .catch(error => console.log(error));


             axios.get('/api/get/work_schedules')
             .then(res => {
                const work_schedules = res.data;
                this.setState({ work_schedules: work_schedules.work_schedules});
              })
             .catch(error => console.log(error));


             axios.get('/api/get/system_users')
             .then(res => {
                const system_users = res.data;
                this.setState({ system_users: system_users.system_users});
              })
             .catch(error => console.log(error));
    };

      render(){
          const work_schedule_T2_S = this.state.work_schedules.filter(w=>w.work_day==2)
          const key = <ul>{this.state.work_schedules.map(turn=><li>{turn.work_day}</li>)}</ul>
          return(
            <Container>
            <h1>Heelllo</h1>
            {key}
            <ul>{work_schedule_T2_S.map(x=><li>{x.doctor_phone}</li>)}</ul>
            </Container>
            )
      }
}

export default Fetch;
