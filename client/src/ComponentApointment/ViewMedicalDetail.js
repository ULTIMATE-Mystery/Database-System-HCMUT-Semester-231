import axios from 'axios';
import React, { Component } from 'react';

class ViewMedicalRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            medical_info: {}
        }
    }

    async componentDidMount() {
        await axios.get('/api/get/mytreatment', { params: { phone: this.state.phone } }).then(
            res => { this.setState({ treatment_turn: res.data }); console.log(this.state.treatment_turn) }
        )
            .catch(error => console.log(error));

        await axios.get('/api/get/info', { params: { phonenum: this.state.phone } }).then(res => this.setState({ system_user: res.data.user }))
            .catch(error => console.log(error));
    }
    render() {
        console.log(this.props.medicalID)
        return <span></span>
    }
}

export default ViewMedicalRecord;