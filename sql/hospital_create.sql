use hospital;

create table Room (
    RoomNo INT NOT NULL,
    RoomType VARCHAR(50),
	PRIMARY KEY (RoomNo)
);

CREATE TABLE Nurse (
	NurseId INT NOT NULL AUTO_INCREMENT,
    NurseName VARCHAR(60) NOT NULL,
    Gender ENUM ('Male', 'Female', 'Other') NOT NULL,
    Salary DOUBLE,
    PRIMARY KEY (NurseId)
);

CREATE TABLE Doctor (
	DoctorId INT NOT NULL AUTO_INCREMENT,
    DoctorName VARCHAR(60) NOT NULL,
    Gender ENUM ('Male', 'Female', 'Other') NOT NULL,
    Salary DOUBLE,
    PRIMARY KEY (DoctorId)
);

CREATE TABLE Medicine (
	MedicineId INT NOT NULL AUTO_INCREMENT,
    MedicinerName VARCHAR(60) NOT NULL,
    MedicineType VARCHAR(50) NOT NULL,
    CompanyName VARCHAR(50) NOT NULL,
    Cost DOUBLE,
    PRIMARY KEY (MedicineId)
);

CREATE TABLE Patient (
	PatientId INT NOT NULL AUTO_INCREMENT,
    PatientName VARCHAR(60) NOT NULL,
    Gender ENUM ('Male', 'Female', 'Other') NOT NULL,
    Age INT,
    RoomNo INT NULL,
    Disease VARCHAR(50),
    PRIMARY KEY (PatientId),
    CONSTRAINT FK_PatientRoom FOREIGN KEY (RoomNo) REFERENCES Room(RoomNo)
);

create table Bill (
	BillNo INT NOT NULL,
    PatientId INT NOT NULL,
    NoOfDays INT NOT NULL,
    TotalAmount DOUBLE NOT NULL,
    NurseCharge DOUBLE,
    Balance DOUBLE,
    DoctorCharge DOUBLE,
    RoomCharge DOUBLE,
    AdvanceAmount DOUBLE,
    PRIMARY KEY(BillNo),
    CONSTRAINT FK_BillPatient FOREIGN KEY (PatientId) REFERENCES Patient(PatientId)
);


CREATE TABLE Patient_Medicine (
	PatientId INT NOT NULL,
    MedicineId INT NOT NULL,
    FOREIGN KEY (PatientId) REFERENCES Patient(PatientId),
	FOREIGN KEY (MedicineId) REFERENCES Medicine(MedicineId),
	PRIMARY KEY (PatientId, MedicineId)
);

CREATE TABLE Patient_Nurse (
	PatientId INT NOT NULL,
    NurseId INT NOT NULL,
    FOREIGN KEY (PatientId) REFERENCES Patient(PatientId),
	FOREIGN KEY (NurseId) REFERENCES Nurse(NurseId),
	PRIMARY KEY (PatientId, NurseId)
);

CREATE TABLE Patient_Doctor (
	PatientId INT NOT NULL,
    DoctorId INT NOT NULL,
    FOREIGN KEY (PatientId) REFERENCES Patient(PatientId),
	FOREIGN KEY (DoctorId) REFERENCES Doctor(DoctorId),
	PRIMARY KEY (PatientId, DoctorId)
);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';

INSERT INTO Patient (PatientName, Gender, Age, RoomNo, Disease) VALUES ('Chrustkiran', 'Male', '26', NULL, 'Corona');

INSERT INTO Room (RoomNo, RoomType) VALUES ('2', 'Luxury');


INSERT INTO DOCTOR (DoctorName, Gender, Salary) VALUES ('DoctorX', 'Male', '200'), ('DoctorY', 'Female', '300'), ('DoctorZ', 'Male', '400');

INSERT INTO Patient_Doctor VALUES(3, 1);

alter table Patient Modify RoomNo INT;

Select * from Patient;
Select * from Patient_Doctor;


Select * From Doctor WHERE DoctorId Not in (SELECT DoctorId FROM Patient_Doctor where PatientId = '3');

DELETE from Patient_Doctor WHERE (PatientId, DoctorId) IN (('3','2'));