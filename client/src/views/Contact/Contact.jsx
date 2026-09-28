
import React, { useState } from "react";
import "./Contact.css";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        alert("Your message has been sent successfully!");

        setFormData({
            name: "",
            email: "",
            subject: "",
            message: ""
        });
    };

    return (
        <div className="contact-page">

            {/* Header */}
            <section className="contact-header">
                <h1>Contact Us</h1>
                <p>
                    We are here to help you with your healthcare needs.
                </p>
            </section>

            {/* Main Contact Section */}
            <section className="contact-section">

                <div className="contact-container">

                    {/* Contact Information */}
                    <div className="contact-info">

                        <h2>Get In Touch</h2>

                        <p>
                            Have a question about our healthcare services?
                            Feel free to contact us. Our team will be happy
                            to assist you.
                        </p>

                        <div className="contact-detail">
                            <div className="contact-icon">📍</div>

                            <div>
                                <h3>Address</h3>
                                <p>Nashik, Maharashtra, India</p>
                            </div>
                        </div>

                        <div className="contact-detail">
                            <div className="contact-icon">📞</div>

                            <div>
                                <h3>Phone</h3>
                                <p>+91 98765 43210</p>
                            </div>
                        </div>

                        <div className="contact-detail">
                            <div className="contact-icon">✉</div>

                            <div>
                                <h3>Email</h3>
                                <p>healthcare@gmail.com</p>
                            </div>
                        </div>

                        <div className="contact-detail">
                            <div className="contact-icon">⏰</div>

                            <div>
                                <h3>Working Hours</h3>
                                <p>Monday - Saturday</p>
                                <p>9:00 AM - 6:00 PM</p>
                            </div>
                        </div>

                    </div>

                    {/* Contact Form */}
                    <div className="contact-form">

                        <h2>Send Us a Message</h2>

                        <form onSubmit={handleSubmit}>

                            <label>Name</label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <label>Subject</label>

                            <input
                                type="text"
                                name="subject"
                                placeholder="Enter subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />

                            <label>Message</label>

                            <textarea
                                name="message"
                                rows="5"
                                placeholder="Write your message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>

                            <button type="submit">
                                Send Message
                            </button>

                        </form>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Contact;
