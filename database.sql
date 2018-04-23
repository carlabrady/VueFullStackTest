
CREATE TABLE dbo.ReportPortalUser
   (
	ReportPortalUserID int IDENTITY(1,1) PRIMARY KEY NOT NULL,
	Email varchar(128) UNIQUE NOT NULL,
	Password varchar(128) NOT NULL,
	IsUserAdministrator bit NOT NULL,
	)
;

CREATE TABLE dbo.Report
   (
	ReportID int IDENTITY(1,1) PRIMARY KEY NOT NULL,
    ReportName varchar(256) NOT NULL
	)
;

CREATE TABLE dbo.ReportPortalUserStore
   (
	ReportPortalUserStoreID int IDENTITY(1,1) PRIMARY KEY NOT NULL,
	ReportPortalUserID int FOREIGN KEY
		REFERENCES ReportPortalUser(ReportPortalUserID) ON DELETE CASCADE NOT NULL,
	StoreID int NOT NULL
   )
;

CREATE TABLE dbo.ReportAccessConfiguration
   (
	ReportAccessConfigurationID int IDENTITY(1,1) PRIMARY KEY NOT NULL,
    ReportPortalUserStoreID int FOREIGN KEY
		REFERENCES ReportPortalUserStore(ReportPortalUserStoreID) NOT NULL,
	ReportID int FOREIGN KEY
		REFERENCES Report(ReportID) NOT NULL,
	CanReceiveEmail bit NOT NULL,
	HasViewAccess bit NOT NULL)
;

CREATE TABLE dbo.ReportPortalUserChild
   (
	ReportPortalUserChildID int IDENTITY(1,1) NOT NULL,
    ReportPortalUserID int FOREIGN KEY
		REFERENCES ReportPortalUser(ReportPortalUserID) NOT NULL,
	ChildID int FOREIGN KEY
		REFERENCES ReportPortalUser(ReportPortalUserID) NOT NULL
	)
;