import '../App.css';
import { NavLink } from 'react-router-dom';

const Modall = ({ handleClose, show, add, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div class='dung-logomini'>
            <img src='assets/images/logo_modal.png' height="60px" width="230px" alt='HealthCare' />
        </div>
        {children}
        <button type="button" onClick={handleClose}>
          Hủy
        </button>
          
            <button type="button" onClick={handleClose}>
            <NavLink className="nav-link" to={`/cancelappointment/${JSON.stringify([add])}`} >Xác nhận</NavLink>
    
            </button>
            
      </section>
    </div>
  );
};

export default Modall;

// action="/users/new" method="POST"