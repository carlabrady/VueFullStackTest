
CREATE TABLE dbo.ReportPortalUser
   (ReportPortalUserID int IDENTITY(1,1) PRIMARY KEY NOT NULL,
	Email varchar(128) UNIQUE NOT NULL,
	Password varchar(128) NOT NULL,
	IsUserAdministrator bit NOT NULL,
	IsStoreAdministrator bit NOT NULL)
;

CREATE TABLE dbo.StoreInformation
   (StoreInformationID int IDENTITY(1,1) NOT NULL,
    StoreID int PRIMARY KEY,
	Brand varchar(50) NOT NULL,
	CustomerID int,
	SoftwareVersion varchar(32),
	SquareFootage int,
	PointOfSaleQuantity int)
;

CREATE TABLE dbo.Report
   (ReportID int IDENTITY(1,1) PRIMARY KEY NOT NULL,
    ReportName varchar(128) NOT NULL)
;

CREATE TABLE dbo.ReportPortalUserStoreInformation
   (ReportPortalUserStoreInformationID int IDENTITY(1,1) NOT NULL,
	ReportUser_UserID int FOREIGN KEY
		REFERENCES ReportPortalUser(ReportPortalUserID) ON DELETE CASCADE NOT NULL,
	Store_StoreID int FOREIGN KEY
		REFERENCES StoreInformation(StoreID) ON DELETE CASCADE NOT NULL)
;

CREATE TABLE dbo.ReportAccessConfiguration
   (ReportAccessConfigurationID int IDENTITY(1,1) PRIMARY KEY NOT NULL,
    ReportPortalUserID int FOREIGN KEY
		REFERENCES ReportPortalUser(ReportPortalUserID) NOT NULL,
	ReportID int FOREIGN KEY
		REFERENCES Report(ReportID) NOT NULL,
	CanReceiveEmail bit NOT NULL,
	HasViewAccess bit NOT NULL)
;

CREATE TABLE dbo.ReportPortalUserRelation
   (ReportPortalUserRelationID int IDENTITY(1,1) NOT NULL,
    ParentReportPortalUserID int FOREIGN KEY
		REFERENCES ReportPortalUser(ReportPortalUserID) NOT NULL,
	ChildReportPortalUserID int FOREIGN KEY
		REFERENCES ReportPortalUser(ReportPortalUserID) NOT NULL)
;