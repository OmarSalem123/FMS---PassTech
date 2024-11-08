const vehicleReportsTypes = [
	{
		name: "Vehicles Trips Report",
		shortname: "vehiclestrips",
		description:
			"This report will provide you with the vehicles current location, distances traveled, and alerts.",
		reportType: "Vehicles",
	},
	{
		name: "Speed Report",
		shortname: "speed",
		description:
			"This report will provide you with the vehicles speed average, highest speed and number of speed alerts.",
		reportType: "Vehicles",
	},
	/*{
    name: "Alarms Report",
    shortname: "alarm",
    description:
      "This report will provide information on the alarms for each vehicle.",
    reportType: "Vehicles",
  },*/
	{
		name: "Stop Report",
		shortname: "stop",
		description:
			"This report will provide details on the stops made by vehicles and the duration of each stop.",
		reportType: "Vehicles",
	},
	{
		name: "Distance Report",
		shortname: "distance",
		description:
			"This report will provide the traveled distances for each vehicle, along with the odometer readings at the start and end.",
		reportType: "Vehicles",
	},
	/**  {
     name: "Ignition Report",
     shortname: "ignition",
     description:
       "This report will provide the history of vehicle ignition events.",
     reportType: "Vehicles",
   },*/
	/**  {
     name: "Door Open Report",
     shortname: "door",
     description:
       "This report will provide the history of vehicle door openings.",
     reportType: "Vehicles",
   },*/
	{
		name: "Route Report",
		shortname: "route",
		description:
			"This report will provide detailed movement information for each vehicle.",
		reportType: "Vehicles",
	},
	{
		name: "Fuel Report",
		shortname: "fuel",
		description:
			"This report will provide details on the distance traveled by vehicles, fuel consumption, and fuel costs.",
		reportType: "Vehicles",
	},
	/** {
     name: "Engine Control Log",
     description: "This report will provide a log of engine control activities.",
     reportType: "Vehicles",
   },
   {
     name: "Idle Report",
     description: "This report will provide the idle times for all vehicles.",
     reportType: "Vehicles",
   },*/
	{
		name: "Odometer Report",
		shortname: "odometer",
		description:
			"This report will provide the odometer readings for all vehicles.",
		reportType: "Vehicles",
	},
	/** {
     name: "Vehicles Documents Report",
     description:
       "This report will provide all the official documents of the vehicles along with their expiration dates.",
     reportType: "Vehicles",
   },
   {
     name: "Temperature Report",
     description:
       "This report will give you complete temperature data updated every minute.",
     reportType: "Vehicles",
   },
   {
     name: "Weight Report",
     description:
       "This report will give you complete weight data updated every minute.",
     reportType: "Vehicles",
   },*/
];

const maintenanceReportsypes = [
	{
		name: "Maintenance Report",
		description:
			"This report will provide you with information about the latest maintenance, upcoming maintenance, its type, and other information.",
		reportType: "Maintenance",
	},
	{
		name: "Cost Report",
		description:
			"This report will compare the costs of all vehicles against each other.",
		reportType: "Maintenance",
	},
	{
		name: "Parts Report",
		description:
			"This report will provide details of the parts used in previous maintenance, along with their costs.",
		reportType: "Maintenance",
	},
];

export { vehicleReportsTypes, maintenanceReportsypes };
