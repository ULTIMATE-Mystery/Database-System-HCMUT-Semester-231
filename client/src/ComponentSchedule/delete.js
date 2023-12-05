import '../App.css';
// import { NavLink } from 'react-router-dom';
// import {Nav} from 'reactstrap';

const Deleted = ({ handleClose, deleted, children }) => {
  const deleteHideClassName = deleted ? "modal display-block" : "modal display-none";

  return (
    <div className={deleteHideClassName}>
      <section className="modal-main">
        <div class='dung-logomini'>
            <img src='assets/images/logo_modal.png' height="60px" width="230px" alt='HealthCare' />
        </div>
        {children}
        <button type="button" onClick={handleClose}>
          Hủy
        </button>
          
        <button type="button" onClick={handleClose}>
          Xác nhận
        </button>
            
      </section>
    </div>
  );
};

export default Deleted;