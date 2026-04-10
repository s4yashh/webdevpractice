import React, { Component } from 'react';
import { navigationItems, hospitalStats, values, services, doctors } from './data/siteData';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 'Home',
      mobileMenuOpen: false,
      highlightedDoctor: doctors[0].name,
      formMessage: ''
    };
  }

  handleNavClick = (event, page) => {
    event.preventDefault();
    this.setState({ activePage: page, mobileMenuOpen: false, formMessage: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  toggleMobileMenu = () => {
    this.setState((previousState) => ({ mobileMenuOpen: !previousState.mobileMenuOpen }));
  };

  handleDoctorSelect = (doctorName) => {
    this.setState({ highlightedDoctor: doctorName });
  };

  handleContactSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const fullName = formData.get('fullName');

    if (!fullName || String(fullName).trim().length < 2) {
      this.setState({ formMessage: 'Please enter a valid name before submitting.' });
      return;
    }

    this.setState({ formMessage: `Thank you, ${fullName}. Our team will contact you shortly.` });
    event.target.reset();
  };

  renderHome() {
    return (
      <>
        <section className="hero card">
          <div className="hero-text">
            <h2>Welcome to Health Plus Hospital</h2>
            <p>Your trusted partner in health and wellness.</p>
            <p className="subcopy">Advanced care, experienced doctors, and compassionate treatment for every patient.</p>
          </div>
          <img src="/images/hospital.jpg" alt="Health Plus Hospital Building" />
        </section>

        <section className="grid grid-2">
          <article className="card">
            <h3>Why Choose Us?</h3>
            <ul className="icon-list">
              <li>Experienced medical professionals</li>
              <li>Modern equipment and facilities</li>
              <li>Patient-centered care</li>
              <li>24/7 emergency services</li>
            </ul>
          </article>

          <article className="card gradient">
            <h3>Need Medical Assistance?</h3>
            <p>Contact us today to schedule an appointment or for emergency services.</p>
            <p><strong>Emergency Hotline:</strong> +1-800-HOSPITAL</p>
            <p><strong>General Enquiries:</strong> +1-800-123-4568</p>
          </article>
        </section>

        <section className="card">
          <h3>Hospital Statistics</h3>
          <table>
            <thead>
              <tr>
                <th>Metric</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {hospitalStats.map((item) => (
                <tr key={item.metric}>
                  <td>{item.metric}</td>
                  <td>{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </>
    );
  }

  renderAbout() {
    return (
      <>
        <section className="card">
          <h2>About Health Plus Hospital</h2>
          <p>
            Established in 2010, Health Plus Hospital has grown from a small team to one of the most trusted healthcare institutions,
            serving over 50,000 patients annually.
          </p>
        </section>
        <section className="grid grid-2">
          <article className="card">
            <h3>Our Mission</h3>
            <p>To provide comprehensive, compassionate healthcare services meeting the highest standards.</p>
          </article>
          <article className="card">
            <h3>Our Vision</h3>
            <p>To be a leading institution combining modern technology with expert clinical practices.</p>
          </article>
        </section>
        <section className="card">
          <h3>Core Values</h3>
          <div className="value-grid">
            {values.map((value) => (
              <article key={value.title} className="value-item">
                <h4>{value.title}</h4>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </section>
      </>
    );
  }

  renderServices() {
    return (
      <>
        <section className="card">
          <h2>Our Medical Services</h2>
          <p>Comprehensive medical services with experienced doctors and modern facilities.</p>
        </section>
        <section className="service-grid">
          {services.map((service) => (
            <article key={service.name} className="card service-card">
              <h3>{service.name}</h3>
              <p>{service.details}</p>
            </article>
          ))}
        </section>
      </>
    );
  }

  renderDoctors() {
    return (
      <>
        <section className="card">
          <h2>Our Medical Team</h2>
          <p>Our qualified doctors are dedicated to providing excellent patient care.</p>
        </section>
        <section className="doctor-grid">
          {doctors.map((doctor) => {
            const selected = this.state.highlightedDoctor === doctor.name;
            return (
              <article
                key={doctor.name}
                className={`doctor-card card ${selected ? 'doctor-selected' : ''}`}
                onClick={() => this.handleDoctorSelect(doctor.name)}
                onKeyDown={(event) => event.key === 'Enter' && this.handleDoctorSelect(doctor.name)}
                role="button"
                tabIndex={0}
              >
                <img src={doctor.image} alt={doctor.name} />
                <h3>{doctor.name}</h3>
                <p className="specialty">{doctor.specialty}</p>
                <p>{doctor.qualification}</p>
                <p>{doctor.experience}</p>
                <p><strong>Hours:</strong> {doctor.hours}</p>
              </article>
            );
          })}
        </section>
      </>
    );
  }

  renderContact() {
    return (
      <>
        <section className="card">
          <h2>Contact Us</h2>
          <p>123 Medical Lane, Healthcare City, HC 12345</p>
          <p><strong>Emergency (24/7):</strong> +1-800-123-4567</p>
          <p><strong>Appointments:</strong> +1-800-123-4569</p>
        </section>

        <section className="card">
          <h3>Quick Contact Form</h3>
          <form className="contact-form" onSubmit={this.handleContactSubmit}>
            <label htmlFor="fullName">Full Name</label>
            <input id="fullName" name="fullName" type="text" placeholder="Enter your name" />

            <label htmlFor="phone">Phone Number</label>
            <input id="phone" name="phone" type="tel" placeholder="Enter phone number" />

            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="4" placeholder="How can we help?"></textarea>

            <button type="submit">Submit Request</button>
          </form>
          {this.state.formMessage ? <p className="form-message">{this.state.formMessage}</p> : null}
        </section>
      </>
    );
  }

  renderCurrentPage() {
    switch (this.state.activePage) {
      case 'About':
        return this.renderAbout();
      case 'Services':
        return this.renderServices();
      case 'Doctors':
        return this.renderDoctors();
      case 'Contact':
        return this.renderContact();
      case 'Home':
      default:
        return this.renderHome();
    }
  }

  render() {
    const { activePage, mobileMenuOpen } = this.state;

    return (
      <div className="app-shell">
        <header>
          <div className="header-left">
            <h1>Health Plus Hospital</h1>
            <p className="tagline">Quality Healthcare for Everyone</p>
          </div>

          <button type="button" className="menu-toggle" onClick={this.toggleMobileMenu}>
            Menu
          </button>

          <nav className={mobileMenuOpen ? 'header-nav nav-open' : 'header-nav'}>
            <ul>
              {navigationItems.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className={activePage === item ? 'active' : ''}
                    onClick={(event) => this.handleNavClick(event, item)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <main>{this.renderCurrentPage()}</main>

        <footer>
          <p>© 2026 Health Plus Hospital. All rights reserved.</p>
          <p>Emergency Hotline: +1-800-HOSPITAL | Email: info@healthplushospital.com</p>
        </footer>
      </div>
    );
  }
}

export default App;
