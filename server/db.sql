CREATE DATABASE biometricTimeClock;

CREATE TABLE employee (
    id varchar(255) PRIMARY KEY,
    lastname varchar(255),
    firstname varchar(255),
    datecreated date,
    department varchar(255)
); 

CREATE TABLE activity (
    id varchar(255) PRIMARY KEY,
    employee_identifier varchar(255),
    checkin timestamp,
    checkout timestamp,
    comment varchar(255),
    time_difference varchar(255)
); 

