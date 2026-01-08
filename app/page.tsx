import CheckAppointments from "./components/CheckAppointment";
//import AddAppointment from "./components/AddAppointments";
import DeleteAppointment from "./components/DeleteAppointment";
import FullCalendarComponent from "./components/FullCalendarComponent";
import UpdateAppointment from "./components/UpdateAppointment";
import Layout from "./components/Layout";
import MyImage from "./components/ExampleImg";
import NVPAlert from "./components/NVPAlert";

export default function Home() {
  

  return <>
  <Layout>
  <NVPAlert/> 
   <MyImage/>
   
   <h1 className="text-1l md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 mt-6">Please select a date to start booking an appointment</h1>
  <CheckAppointments/>
  <FullCalendarComponent/>
  <UpdateAppointment/>
  <DeleteAppointment/>
  </Layout>
  
  
  </>
  ;
}
