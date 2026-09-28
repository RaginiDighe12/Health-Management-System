import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-content">

                <div>
                    <h2>HealthCare</h2>
                    <p>
                        Making healthcare simple, accessible
                        and convenient.
                    </p>
                </div>

                <div>
                    <h3>Quick Links</h3>

                    <Link to="/">Home</Link>
                    <Link to="/doctors">Doctors</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </div>

                <div>
                    <h3>Contact</h3>
                    <p>Email: healthcare@gmail.com</p>
                    <p>Phone: +91 9876543210</p>
                    <p>Nashik, Maharashtra</p>
                </div>

            </div>

            <div className="copyright">
                © 2026 Healthcare Management System
            </div>

        </footer>
    );
}

export default Footer;