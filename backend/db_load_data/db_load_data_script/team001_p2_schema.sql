-- Tables

DROP TABLE IF EXISTS Locations  CASCADE;

CREATE TABLE Locations(
	PostalCode VARCHAR(25) NOT NULL,
	City VARCHAR(50) NOT NULL,
	AState VARCHAR(2) NOT NULL,
	Longitude FLOAT NOT NULL,
	Latitude FLOAT NOt NULL,
	PRIMARY KEY (PostalCode)
);

DROP TABLE IF EXISTS Household CASCADE;

CREATE TABLE Household(
	EmailAddress VARCHAR(50) NOT NULL,
	HouseholdType VARCHAR(25) NOT NULL,
	BedroomsCount INT NOT NULL,
	OccupantsCount INT NOT NULL,
	SquareFootage INT NOT NULL,
	PostalCode VARCHAR(25) NOT NULL,
	PRIMARY KEY (EmailAddress)
);

ALTER TABLE Household
ADD CONSTRAINT fk_Household_PostalCode_Location_PostalCode FOREIGN KEY (PostalCode) REFERENCES Locations (PostalCode);

DROP TABLE IF EXISTS Phone CASCADE;

CREATE TABLE Phone(
	AreaCode VARCHAR(25) NOT NULL,
	ANumber VARCHAR(25) NOT NULL,
	PhoneType VARCHAR(25) NOT NULL,
	HouseholdEmail VARCHAR(50) NOT NULL,
	PRIMARY KEY (AreaCode, ANumber)
);

ALTER TABLE Phone
ADD CONSTRAINT fk_Phone_HouseholdEmail_Household_Email FOREIGN KEY (HouseholdEmail) REFERENCES Household (EmailAddress);

DROP TABLE IF EXISTS Bathroom CASCADE;

CREATE TABLE Bathroom(
	HouseholdEmail VARCHAR(50) NOT NULL,
	BathroomOrdinal INT NOT NULL,
	CommodesCount INT NOT NULL,
	SinksCount INT NOT NULL,
	BidetsCount INT NOT NULL,
	PRIMARY KEY (HouseholdEmail, BathroomOrdinal)
);

ALTER TABLE Bathroom
ADD CONSTRAINT fk_Bathroom_HouseholdEmail_Household_Email FOREIGN KEY (HouseholdEmail) REFERENCES Household (EmailAddress);

DROP TABLE IF EXISTS HalfBathroom CASCADE;

CREATE TABLE HalfBathroom(
	HouseholdEmail VARCHAR(50) NOT NULL,
	BathroomOrdinal INT NOT NULL,
	BathroomName VARCHAR(150) NULL,
	PRIMARY KEY (HouseholdEmail, BathroomOrdinal)
);

ALTER TABLE HalfBathroom
ADD CONSTRAINT fk_HalfBathroom_HouseholdEmail_Household_Email FOREIGN KEY (HouseholdEmail, BathroomOrdinal) REFERENCES Bathroom (HouseholdEmail, BathroomOrdinal);

DROP TABLE IF EXISTS FullBathroom CASCADE;

CREATE TABLE FullBathroom(
	HouseholdEmail VARCHAR(50) NOT NULL,
	BathroomOrdinal INT NOT NULL,
	BathtubCount INT NOT NULL,
	ShowerCount INT NOT NULL,
	TubShowerCount INT NOT NULL,
	PrimaryBathroom BOOLEAN NOT NULL,
	PRIMARY KEY (HouseholdEmail, BathroomOrdinal)
);

ALTER TABLE FullBathroom
ADD CONSTRAINT fk_FullBathroom_HouseholdEmail_Ordinal_Bathroom FOREIGN KEY (HouseholdEmail, BathroomOrdinal) REFERENCES Bathroom (HouseholdEmail, BathroomOrdinal);

DROP TABLE IF EXISTS Manufacturer CASCADE;

CREATE TABLE Manufacturer(
	ManufacturerName VARCHAR(50) NOT NULL,
	PRIMARY KEY (ManufacturerName)
);

DROP TABLE IF EXISTS Appliance CASCADE;

CREATE TABLE Appliance(
	HouseholdEmail VARCHAR(50) NOT NULL,
	ApplianceOrder INT NOT NULL,
	ModelName VARCHAR(150) NULL,
	ManufacturerName VARCHAR(50) NOT NULL,
	PRIMARY KEY (HouseholdEmail, ApplianceOrder)
);

ALTER TABLE Appliance
ADD CONSTRAINT fk_Appliance_HouseholdEmail_Household_Email FOREIGN KEY (HouseholdEmail) REFERENCES Household (EmailAddress);

ALTER TABLE Appliance
ADD CONSTRAINT fk_Appliance_ManufacturerName_Manufacturer_Name FOREIGN KEY (ManufacturerName) REFERENCES Manufacturer (ManufacturerName);

DROP TABLE IF EXISTS RefrigiratorFreezer CASCADE;

CREATE TABLE RefrigiratorFreezer(
	HouseholdEmail VARCHAR(50) NOT NULL,
	ApplianceOrder INT NOT NULL,
	RefrigiratorFreezerType VARCHAR(50) NOT NULL,
	PRIMARY KEY (HouseholdEmail, ApplianceOrder)
);

ALTER TABLE RefrigiratorFreezer
ADD CONSTRAINT fk_RefrigiratorFreezer_Appliance_HouseholdEmail_Order FOREIGN KEY (HouseholdEmail, ApplianceOrder) REFERENCES Appliance (HouseholdEmail, ApplianceOrder);

DROP TABLE IF EXISTS Dryer CASCADE;

CREATE TABLE Dryer(
	HouseholdEmail VARCHAR(50) NOT NULL,
	ApplianceOrder INT NOT NULL,
	HeatSource VARCHAR(25) NOT NULL,
	PRIMARY KEY (HouseholdEmail, ApplianceOrder)
);

ALTER TABLE Dryer
ADD CONSTRAINT fk_Dryer_Appliance_HouseholdEmail_Order FOREIGN KEY (HouseholdEmail, ApplianceOrder) REFERENCES Appliance (HouseholdEmail, ApplianceOrder);


DROP TABLE IF EXISTS Washer CASCADE;

CREATE TABLE Washer(
	HouseholdEmail VARCHAR(50) NOT NULL,
	ApplianceOrder INT NOT NULL,
	LoadingType VARCHAR(25) NOT NULL,
	PRIMARY KEY (HouseholdEmail, ApplianceOrder)
);

ALTER TABLE Washer
ADD CONSTRAINT fk_Washer_Appliance_HouseholdEmail_Order FOREIGN KEY (HouseholdEmail, ApplianceOrder) REFERENCES Appliance (HouseholdEmail, ApplianceOrder);

DROP TABLE IF EXISTS TV CASCADE;

CREATE TABLE TV(
	HouseholdEmail VARCHAR(50) NOT NULL,
	ApplianceOrder INT NOT NULL,
	DisplaySize INT NOT NULL,
	DisplayType VARCHAR(25) NOT NULL,
	MaxResolution VARCHAR(25) NOT NULL,
	PRIMARY KEY (HouseholdEmail, ApplianceOrder)
);

ALTER TABLE TV
ADD CONSTRAINT fk_TV_Appliance_HouseholdEmail_Order FOREIGN KEY (HouseholdEmail, ApplianceOrder) REFERENCES Appliance (HouseholdEmail, ApplianceOrder);

DROP TABLE IF EXISTS Cooker CASCADE;

CREATE TABLE Cooker(
	HouseholdEmail VARCHAR(50) NOT NULL,
	ApplianceOrder INT NOT NULL,
	PRIMARY KEY (HouseholdEmail, ApplianceOrder)
);

ALTER TABLE Cooker
ADD CONSTRAINT fk_Cooker_Appliance_HouseholdEmail_Order FOREIGN KEY (HouseholdEmail, ApplianceOrder) REFERENCES Appliance (HouseholdEmail, ApplianceOrder);


DROP TABLE IF EXISTS Cooktop CASCADE;

CREATE TABLE Cooktop(
	HouseholdEmail VARCHAR(50) NOT NULL,
	ApplianceOrder INT NOT NULL,
	HeatSource VARCHAR(50) NOT NULL,
	PRIMARY KEY (HouseholdEmail, ApplianceOrder)
);

ALTER TABLE Cooktop
ADD CONSTRAINT fk_Cooktop_Cooker_Appliance_HouseholdEmail_Order FOREIGN KEY (HouseholdEmail, ApplianceOrder) REFERENCES Cooker (HouseholdEmail, ApplianceOrder);

DROP TABLE IF EXISTS Oven CASCADE;

CREATE TABLE Oven(
	HouseholdEmail VARCHAR(50) NOT NULL,
	ApplianceOrder INT NOT NULL,
	OvenType VARCHAR(25) NOT NULL,
	PRIMARY KEY (HouseholdEmail, ApplianceOrder)
);

ALTER TABLE Oven
ADD CONSTRAINT fk_Oven_Cooker_Appliance_HouseholdEmail_Order FOREIGN KEY (HouseholdEmail, ApplianceOrder) REFERENCES Cooker (HouseholdEmail, ApplianceOrder);

DROP TABLE IF EXISTS OvenHeatSource CASCADE;

CREATE TABLE OvenHeatSource(
	HouseholdEmail VARCHAR(50) NOT NULL,
	ApplianceOrder INT NOT NULL,
	HeatSource VARCHAR(25) NOT NULL,
	PRIMARY KEY (HouseholdEmail, ApplianceOrder, HeatSource)
);

ALTER TABLE OvenHeatSource
ADD CONSTRAINT fk_OvenHeatSource_Oven_Cooker_Appliance_HouseholdEmail_Order FOREIGN KEY (HouseholdEmail, ApplianceOrder) REFERENCES Oven (HouseholdEmail, ApplianceOrder);
