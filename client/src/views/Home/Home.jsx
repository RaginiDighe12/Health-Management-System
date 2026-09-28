import { Link } from "react-router-dom";
import {
    Search,
    CalendarCheck,
    UserRound,
    HeartPulse,
    ShieldCheck,
    Clock
} from "lucide-react";

import "./Home.css";

function Home() {
    return (
        <div className="home">

            {/* Hero */}
            <section className="hero">

                <div className="hero-content">

                    <span className="hero-tag">
                        Your Health, Our Priority
                    </span>

                    <h1>
                        Find the Right Doctor
                        <br />
                        <span>For Your Health</span>
                    </h1>

                    <p>
                        Search for experienced doctors, check their
                        availability and book appointments easily.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/doctors" className="primary-btn">
                            Find a Doctor
                        </Link>

                        <Link to="/register" className="secondary-btn">
                            Get Started
                        </Link>
                    </div>

                </div>

                <div className="hero-card">
                    <HeartPulse size={90} />
                    <h2>Complete Healthcare</h2>
                    <p>
                        Connect with trusted healthcare professionals.
                    </p>
                </div>

            </section>


            {/* Search */}
            <section className="search-section">

                <h2>Find a Doctor</h2>

                <div className="search-box">

                    <Search size={22} />

                    <input
                        type="text"
                        placeholder="Search doctor or specialization..."
                    />

                    <button>Search</button>

                </div>

            </section>


            {/* Services */}
            <section className="services">

                <h2>Our Services</h2>

                <p className="section-subtitle">
                    Everything you need for better healthcare
                </p>

                <div className="service-grid">

                    <div className="service-card">
                        <Search size={40} />
                        <h3>Find Doctors</h3>
                        <p>
                            Search doctors according to specialization.
                        </p>
                    </div>

                    <div className="service-card">
                        <CalendarCheck size={40} />
                        <h3>Book Appointment</h3>
                        <p>
                            Book an appointment at your convenient time.
                        </p>
                    </div>

                    <div className="service-card">
                        <UserRound size={40} />
                        <h3>Patient Dashboard</h3>
                        <p>
                            Manage appointments and your profile.
                        </p>
                    </div>

                    <div className="service-card">
                        <ShieldCheck size={40} />
                        <h3>Secure Platform</h3>
                        <p>
                            Your healthcare information stays protected.
                        </p>
                    </div>

                </div>

            </section>


            {/* How it works */}
            <section className="how-section">

                <h2>How It Works</h2>

                <div className="steps">

                    <div>
                        <span>01</span>
                        <h3>Create Account</h3>
                        <p>Register as a patient.</p>
                    </div>

                    <div>
                        <span>02</span>
                        <h3>Find Doctor</h3>
                        <p>Search for a suitable doctor.</p>
                    </div>

                    <div>
                        <span>03</span>
                        <h3>Book Appointment</h3>
                        <p>Select date and time.</p>
                    </div>

                    <div>
                        <span>04</span>
                        <h3>Consult Doctor</h3>
                        <p>Visit your doctor.</p>
                    </div>

                </div>

            </section>


            {/* CTA */}
            <section className="cta">

                <Clock size={45} />

                <h2>Take Care of Your Health Today</h2>

                <p>
                    Find a doctor and book your appointment easily.
                </p>

                <Link to="/doctors">
                    Explore Doctors
                </Link>

            </section>

        </div>
    );
}

export default Home;