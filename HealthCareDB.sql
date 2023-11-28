USE HealthCareDB;

CREATE TABLE NursingCertificates (
    NurseID INT,
    ProgramName VARCHAR(255),
    YearAchieved YEAR,
    Provider VARCHAR(255),
    FOREIGN KEY (NurseID) REFERENCES Nurses(NurseID)
);

CREATE TABLE PrescribedTests (
    TestID INT PRIMARY KEY,
    TestName VARCHAR(255),
    Room INT,
    Price DECIMAL(10, 2),
    DoctorID INT,
    Result TEXT,
    StartTime DATETIME,
    EndTime DATETIME,
    FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID)
);

CREATE TABLE WorkingHours (
    DoctorID INT,
    DayOfWeek VARCHAR(10),
    StartTime TIME,
    EndTime TIME,
    FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID)
);

CREATE TABLE Medications (
    MedicationID INT PRIMARY KEY,
    MedicationName VARCHAR(255),
    Status VARCHAR(50),
    QuantityInStock INT,
    Price DECIMAL(10, 2)
);

CREATE TABLE PrescriptionMedications (
    PrescriptionID INT,
    MedicationID INT,
    Price DECIMAL(10, 2),
    Quantity INT,
    FOREIGN KEY (MedicationID) REFERENCES Medications(MedicationID),
    FOREIGN KEY (PrescriptionID) REFERENCES Prescriptions(PrescriptionID)
);
