import Layout from "@/app/components/Layout";
import AdminAccessMessage from "../components/Admincomponents/AdminAccessMessage";
import AppointmentsTable from "../components/Admincomponents/AppointmentsTable";
import SearchAppointments from "../components/Admincomponents/Searchappointments";

export default function AdminPage() {
  return (
    <Layout>
      <div className="p-6">
        <AdminAccessMessage/>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <AppointmentsTable/>
        <SearchAppointments/>
        <p className="mt-2 text-gray-700">Welcome to the admin panel!</p>
      </div>
    </Layout>
  );
}