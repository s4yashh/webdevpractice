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
    this.navigateToPage(page);
  };

  navigateToPage = (page) => {
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

  renderPageBanner = (title, subtitle) => (
    <section className="page-banner card">
      <p className="page-banner-chip">Health Plus Hospital</p>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </section>
  );

  renderHome() {
    return (
      <>
        <section className="hero-main">
          <div className="hero-content">
            <h2 className="hero-title">Modern Healthcare with Human Compassion</h2>
            <p className="hero-subtitle">Health Plus Hospital delivers quality treatment, emergency response, and specialist consultation under one roof.</p>
            <p className="hero-description">We combine cutting-edge medical technology with personalized patient care to ensure the best outcomes for your family.</p>
            
            <div className="hero-cta-group">
              <button type="button" className="primary-action btn-lg" onClick={() => this.navigateToPage('Contact')}>
                Book Appointment
              </button>
              <button type="button" className="secondary-action btn-lg" onClick={() => this.navigateToPage('Services')}>
                View Services
              </button>
            </div>

            <div className="hero-info-row">
              <div className="info-item">
                <p className="info-label">Emergency Hotline</p>
                <p className="info-value">+1-800-HOSPITAL</p>
              </div>
              <div className="info-item">
                <p className="info-label">Available 24/7</p>
                <p className="info-value">For Critical Care</p>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <img src="/images/hospital.jpg" alt="Health Plus Hospital" />
          </div>
        </section>

        <section className="stats-section">
          <div className="stats-container">
            {hospitalStats.slice(0, 4).map((item) => (
              <div key={item.metric} className="stat-item">
                <p className="stat-value">{item.value}</p>
                <p className="stat-label">{item.metric}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="features-section">
          <h2 className="section-title">Why Choose Health Plus Hospital</h2>
          <div className="features-grid">
            <article className="feature-card">
              <h3>Expert Specialists</h3>
              <p>Over 150+ experienced doctors across all major specialties.</p>
            </article>
            <article className="feature-card">
              <h3>24/7 Emergency Care</h3>
              <p>Round-the-clock emergency services with immediate response.</p>
            </article>
            <article className="feature-card">
              <h3>Modern Facilities</h3>
              <p>Latest medical technology and equipment for precise diagnosis.</p>
            </article>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Experience Quality Care?</h2>
            <p>Schedule your appointment today or visit our emergency department</p>
            <button type="button" className="primary-action btn-lg" onClick={() => this.navigateToPage('Contact')}>
              Get in Touch
            </button>
          </div>
        </section>
      </>
    );
  }

  renderAbout() {
    return (
      <>
        {this.renderPageBanner(
          'About Health Plus Hospital',
          'Established in 2010, we have grown into one of the most trusted healthcare institutions, serving 50,000+ patients every year.'
        )}
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
        {this.renderPageBanner(
          'Our Medical Services',
          'Comprehensive treatment options delivered by experienced specialists with modern facilities.'
        )}
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
        {this.renderPageBanner(
          'Our Medical Team',
          'Meet our qualified doctors dedicated to safe, compassionate, and effective patient care.'
        )}
        
        <section className="doctors-intro">
          <p>Our team of highly experienced and compassionate doctors are committed to providing exceptional care and treatment.</p>
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
                <div className="doctor-image-wrapper">
                  <img src={doctor.image} alt={doctor.name} />
                </div>
                <div className="doctor-info">
                  <h3>{doctor.name}</h3>
                  <p className="specialty">{doctor.specialty}</p>
                  <p className="qualification">{doctor.qualification}</p>
                  <p className="experience">{doctor.experience}</p>
                  <p className="hours"><strong>Hours:</strong> {doctor.hours}</p>
                </div>
              </article>
            );
          })}
        </section>

        <section className="doctors-cta">
          <h2>Ready to Book an Appointment?</h2>
          <p>Our doctors are available for consultation throughout the week. Schedule your appointment now.</p>
          <button type="button" className="primary-action btn-lg" onClick={() => this.navigateToPage('Contact')}>
            Book Appointment
          </button>
        </section>
      </>
    );
  }

  renderContact() {
    return (
      <>
        {this.renderPageBanner(
          'Contact Us',
          'Get in touch with our hospital team for appointments, emergency support, and general enquiries.'
        )}

        <section className="card">
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
