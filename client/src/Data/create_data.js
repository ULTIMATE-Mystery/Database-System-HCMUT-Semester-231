const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'pharmacy'
  });
  
connection.connect(function(err){
    (err) ? console.log(err) : console.log(connection);
  });

const user = require('./users.json');

var sql = "INSERT INTO SYSTEM_USER(phone, firstname, lastname, dateOfbirth, address, email,pwd) VALUES "

for (let i = 0; i < user.length; i++) {
    sql += "(" + user[i].phone.toString() + "," + 
        "'" + user[i].firstname.toString() + "'" + "," + "'" + user[i].lastname.toString() + "'" + "," + 
        "'" + user[i].dateOfbirth.toString() + "'" + "," + "'" + user[i].address.toString() +"'" + "," + 
        "'" + user[i].email.toString() + "'" +"'" + user[i].pwd.toString() + "'" + ")";
    if (i !== user.length - 1) sql += ", ";
}
console.log(sql);
connection.query(sql, function(err, results) {
    if (err) throw err;
});

const doctor = require('./doctors.json');

sql = "INSERT INTO DOCTOR(phone, specialism, experience_year) VALUES "

for (let i = 0; i < doctor.length; i++) {
    sql += "(" + doctor[i].phone + "," + "'" + doctor[i].specialism.toString() + "'" +
    "," + "'" + doctor[i].experience_year.toString() + "'" + ")";
    if (i !== doctor.length - 1) sql += ", ";
}

connection.query(sql, function(err, results) {
        if (err) throw err;
    });

const nurse = require('./nurses.json'); 
sql = "INSERT INTO NURSE(phone) VALUES";

for (let i = 0; i < nurse.length; i++) {
    sql += "(" + nurse[i].phone + ")";
    if (i !== nurse.length - 1) sql += ", ";
}

connection.query(sql, function(err, results) {
    if (err) throw err;
});

const works = require('./work_schedules.json');
sql = "INSERT INTO WORK_SCHEDULE(doctor_phone, work_day, work_session) VALUES ";

for (let i = 0; i < works.length; i++) {
    sql += "(" + works[i].doctor_phone + "," + works[i].day + ", " + "'" + works[i].session + "'" + ")";
    if (i !== works.length - 1) sql += ", ";
}

connection.query(sql, function(err, results) {
    if (err) throw err;
});

const patient = require('./patients.json');
sql = "INSERT INTO PATIENT(phone, height, weight, blood_type) VALUES";

for (let i = 0; i < patient.length; i++) {
    sql += "(" + patient[i].phone + "," + patient[i].height + "," + patient[i].weight + ",'" + patient[i].blood_type + "')";
    if (i !== patient.length - 1) sql += ", ";
}

connection.query(sql, function(err, results) {
    if (err) throw err;
});

const treat = require('./treatment_turn.json');

sql = "INSERT INTO TREATMENT_TURN(id, turn_time, health_issue, blood_pressure, heart_beat, therapy, diagnose, start_time, end_time, patient_phone, doctor_phone) VALUE";

for (let i = 0; i < treat.length; i++) {
    sql += "(" + treat[i].id + ", " + "'" + treat[i]['turn-time'] + "'" + "," + "'" + treat[i].health_issue +
    "'," + treat[i].blood_pressure + "," + treat[i].heart_beat + ",'" + treat[i].therapy + "','" + treat[i].diagnose +
    "','" + treat[i].start_time + "','" + treat[i].end_time + "'," + treat[i].patient_phone + "," + treat[i].doctor_phone + ")";
    if (i !== treat.length - 1) sql += ", ";
}

connection.query(sql, function(err, results) {
    if (err) throw err;
});

const drug = require('./drugs.json');
sql = "INSERT INTO DRUG(drug_name, price, unit, remain) VALUES";
for (let i = 0; i < drug.length; i++) {
    sql += "('" + drug[i].name + "'," + drug[i].price + ",'" + drug[i].unit + "','" + drug[i].remain.toString() + "')";
    if (i !== drug.length - 1) sql += ", "; 
}
connection.query(sql, function(err, results) {
    if (err) throw err;
});
const medicine = require('./medicine.json');

sql = "INSERT INTO MEDICINE(id, created_date) VALUES";

for (let  i = 0; i < medicine.length; i++) {
    sql += "(" + medicine[i].id + ",'" + medicine[i].create_date + "')";
    if (i !== medicine.length - 1) sql += ", ";
}

connection.query(sql, function(err, results) {
    if (err) throw err;
});

const prescribe = require('./prescriptive_medicine.json');

sql = "INSERT INTO PRESCRIPTIVE_MEDICINE(prescribe_id, treatment_id) VALUES";

for (let  i = 0; i < prescribe.length; i++) {
    sql += "(" + prescribe[i].prescribe_id + "," + prescribe[i].treatment_id + ")";
    if (i !== prescribe.length - 1) sql += ", ";
}

connection.query(sql, function(err, results) {
    if (err) throw err;
});

const purchase = require('./purchase_medicine.json');

sql = "INSERT INTO PURCHASE_MEDICINE(purchase_id, patient_phone) VALUES";

for (let i = 0; i < purchase.length; i++) {
    sql += "(" + purchase[i].purchase_id + ", " + purchase[i].patient_phone + ")";
    if (i !== purchase.length - 1) sql += ", ";
}

connection.query(sql, function(err, results) {
    if (err) throw err;
});

const payment = require('./payment.json');
sql = "INSERT INTO PAYMENT(id, nurse_phone, medicine_id) VALUES";

for (let i = 0; i < payment.length; i++) {
    let x = payment[i].nurse_phone;
    if (x === "") x = "null";
    sql += "(" + payment[i].id + "," + x + "," + payment[i].medicine_id + ")";
    if (i !== payment.length - 1) sql += ", ";
}
connection.query(sql, function(err, results) {
    if (err) throw err;
});

const detail = require('./medicine_details.json');
sql = "INSERT INTO INCLUDE(medicine_id, drug_name, quantity) VALUES";

for (let i = 0; i < detail.length; i++) {
    sql += "(" + detail[i].medicine_id + ",'" + detail[i].drug_name + "'," + detail[i].quantity + ")";
    if (i !== detail.length - 1) sql += ", ";
}

connection.query(sql, function(err, results) {
    if (err) throw err;
});