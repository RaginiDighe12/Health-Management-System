import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./views/Home/Home";
import About from "./views/About/About";
import Contact from "./views/Contact/Contact";
import Doctors from "./views/Doctors/Doctors";
import DoctorDetails from "./views/DoctorDetails/DoctorDetails";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";

import PatientDashboard from "./views/Patient/PatientDashboard/PatientDashboard";
import MyAppointments from "./views/Patient/MyAppointments/MyAppointments";
import BookAppointment from "./views/Patient/BookAppointment/BookAppointment";
import PatientProfile from "./views/Patient/PatientProfile/PatientProfile";

import DoctorDashboard from "./views/Doctor/DoctorDashboard/DoctorDashboard";
import DoctorAppointment from "./views/Doctor/DoctorAppointments/DoctorAppointments";
import DoctorPatients from "./views/Doctor/DoctorPatients/DoctorPatients";
import DoctorProfile from "./views/Doctor/DoctorProfile/DoctorProfile";
import ProtectedRouter from "./components/ProtectedRouter/ProtectedRouter";

function App() {
    return (
        <BrowserRouter>
        <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                 <Route path="/about" element={<About />} />
                 <Route path="/contact" element={<Contact />} />
                 <Route path="/doctors" element={<Doctors />} />
                 <Route path="/doctor/details/:id" element={<DoctorDetails />} />
                 <Route path="/login" element={<Login />} />
                 <Route path="/register" element={<Register />} />

                <Route
                    path="/patient/dashboard"
                    element={<ProtectedRouter allowedRoles={["patient"]}><PatientDashboard /></ProtectedRouter>}
                />

                 <Route
                    path="/patient/appointments"
                    element={<ProtectedRouter allowedRoles={["patient"]}><MyAppointments /></ProtectedRouter>}
                />
                 <Route
                    path="/patient/book-appointment"
                    element={<ProtectedRouter allowedRoles={["patient"]}><BookAppointment /></ProtectedRouter>}
                />
                <Route
                    path="/patient/profile"
                    element={<ProtectedRouter allowedRoles={["patient"]}><PatientProfile /></ProtectedRouter>}
                />

                {/* Doctor */}
                <Route
                    path="/doctor/dashboard"
                    element={<ProtectedRouter allowedRoles={["doctor"]}><DoctorDashboard /></ProtectedRouter>}
                />

                <Route path="/doctor/appointments"
                element={<ProtectedRouter allowedRoles={["doctor"]}><DoctorAppointment/></ProtectedRouter>}
                />
               <Route
                    path="/doctor/patients"
                     element={<ProtectedRouter allowedRoles={["doctor"]}><DoctorPatients /></ProtectedRouter>}
                     />

                     <Route path="/doctor/profile"
                     element={<ProtectedRouter allowedRoles={["doctor"]}><DoctorProfile/></ProtectedRouter>}
                     />

            </Routes>

            <Footer/>
        </BrowserRouter>
    );
}

export default App;