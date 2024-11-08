import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Mainlayout from "./components/Layouts/Mainlayout";
import Sidebarcontext from "./context/Sidebarcontext";
import Dashboard from "./components/Dashboard/Dashboard";
import Random from "./components/Random";
import Vehicles from "./components/Vehicles/Vehicles";
import Drivers from "./components/Drivers/Drivers";
import PopupContext from "./context/Popupscontext";
import LiveTracking from "./components/LiveTracking/LiveTracking";
import Authlayout from "./components/Layouts/Authlayout";
import Login from "./components/Login/Login";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import Filtercontext from "./context/Filtercontext";
import { ToastContainer } from "react-toastify";
import PlayBack from "./components/HistoryPlayBack/PlayBack";
import Soon from "./components/Soon";
import Users from "./components/Users/Users";
import Reports from "./components/Reports/Reports";
import Draggablecontext from "./context/Draggablecontext";
import ReportSheets from "./components/Reports/ReportSheets/ReportSheets";
import ReportTypes from "./components/Reports/ReportsTypes/ReportTypes";
import ExportDataContext from "./context/ExportDataContext";
function App() {
	let routes = createBrowserRouter(
		[
			{
				path: "/",
				element: <Mainlayout />,
				children: [
					{
						index: true,
						element: (
							<ProtectedRoutes>
								<Dashboard />
							</ProtectedRoutes>
						),
					},
					{
						path: "dashboard",
						element: (
							<ProtectedRoutes>
								<Dashboard />
							</ProtectedRoutes>
						),
					},
					{
						path: "livetracking",
						element: (
							<ProtectedRoutes>
								<LiveTracking />
							</ProtectedRoutes>
						),
					},
					{
						path: "geofences",
						element: (
							<ProtectedRoutes>
								<LiveTracking />
							</ProtectedRoutes>
						),
					},
					{
						path: "reports",
						element: (
							<ProtectedRoutes>
								<Reports />
							</ProtectedRoutes>
						),
						children: [
							{
								path: "",
								element: (
									<ProtectedRoutes>
										<ReportTypes />
									</ProtectedRoutes>
								),
							},
							{
								path: ":reportType",
								element: (
									<ProtectedRoutes>
										<ReportSheets />
									</ProtectedRoutes>
								),
							},
						],
					},
					{
						path: "historyplayback/:id",
						element: (
							<ProtectedRoutes>
								<PlayBack />
							</ProtectedRoutes>
						),
					},
					{
						path: "historical",
						element: (
							<ProtectedRoutes>
								<PlayBack />
							</ProtectedRoutes>
						),
					},
					{
						path: "fleetmanagement",
						children: [
							{
								path: "vehicles",
								element: (
									<ProtectedRoutes>
										<Vehicles />
									</ProtectedRoutes>
								),
							},
							{
								path: "drivers",
								element: (
									<ProtectedRoutes>
										<Drivers />
									</ProtectedRoutes>
								),
							},
						],
					},
					{
						path: "users&roles",
						element: (
							<ProtectedRoutes>
								<Users />
							</ProtectedRoutes>
						),
					},
					{
						path: "*",
						element: (
							<ProtectedRoutes>
								<Soon />
							</ProtectedRoutes>
						),
					},
				],
			},
			{
				path: "/",
				element: <Authlayout />,
				children: [{ path: "signin", element: <Login /> }],
			},
		],
		{ basename: "/frontend1" } // Setting the basename for all routes
	);

	return (
		<>
			<Sidebarcontext>
				<PopupContext>
					<Filtercontext>
						<Draggablecontext>
							<ExportDataContext>
								<RouterProvider router={routes} />
							</ExportDataContext>
						</Draggablecontext>
					</Filtercontext>
				</PopupContext>
			</Sidebarcontext>
			<ToastContainer theme="colored" />
		</>
	);
}

export default App;
