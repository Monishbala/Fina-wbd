import React from 'react';

function TermsOfUse() {
  return (
    <>
      <style>
        {`
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
            font-family: Arial, sans-serif;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .title {
            font-size: 2.5rem;
            color: #333;
            margin-bottom: 10px;
          }
          .section {
            margin-bottom: 30px;
          }
          .sectionTitle {
            font-size: 1.8rem;
            color: #444;
            margin-bottom: 15px;
          }
          .paragraph {
            font-size: 1rem;
            line-height: 1.6;
            color: #555;
            margin-bottom: 15px;
          }
          .list {
            list-style-type: disc;
            margin-left: 20px;
          }
          .listItem {
            font-size: 1rem;
            line-height: 1.6;
            color: #555;
            margin-bottom: 10px;
          }
        `}
      </style>

      <div className="container">
        <header className="header">
          <h1 className="title">Terms of Use</h1>
        </header>

        <div className="content">
          <section className="section">
            <h2 className="sectionTitle">Introduction</h2>
            <p className="paragraph">
              Welcome to Book Bank! By accessing or using our website, you agree to comply with and be bound by these Terms of Use. Please read them carefully before using our services.
            </p>
          </section>

          <section className="section">
            <h2 className="sectionTitle">Eligibility</h2>
            <p className="paragraph">
              You must be at least 18 years old or have parental/guardian permission to use our website. By using Book Bank, you confirm that you meet these requirements.
            </p>
          </section>

          <section className="section">
            <h2 className="sectionTitle">User Responsibilities</h2>
            <ul className="list">
              <li className="listItem">Provide accurate and up-to-date information when creating an account.</li>
              <li className="listItem">Keep your account credentials secure and notify us immediately of any unauthorized access.</li>
              <li className="listItem">Use the website only for lawful purposes and in compliance with applicable laws.</li>
            </ul>
          </section>

          <section className="section">
            <h2 className="sectionTitle">Prohibited Activities</h2>
            <ul className="list">
              <li className="listItem">Engaging in any fraudulent or deceptive practices.</li>
              <li className="listItem">Uploading or sharing harmful or malicious content.</li>
              <li className="listItem">Violating the intellectual property rights of others.</li>
              <li className="listItem">Using the website to distribute spam or unauthorized advertisements.</li>
            </ul>
          </section>

          <section className="section">
            <h2 className="sectionTitle">Intellectual Property</h2>
            <p className="paragraph">
              All content on Book Bank, including but not limited to text, images, logos, and graphics, is the property of Book Bank or its licensors. Unauthorized use of this content is prohibited.
            </p>
          </section>

          <section className="section">
            <h2 className="sectionTitle">Pricing and Payments</h2>
            <p className="paragraph">
              All prices on our website are displayed in [currency] and are subject to change without notice. Payments must be made using the methods specified at checkout.
            </p>
          </section>

          <section className="section">
            <h2 className="sectionTitle">Limitation of Liability</h2>
            <p className="paragraph">
              Book Bank is not responsible for any direct, indirect, or incidental damages arising from your use of the website or its services. This includes, but is not limited to, data loss or unauthorized access to your account.
            </p>
          </section>

          <section className="section">
            <h2 className="sectionTitle">Changes to Terms</h2>
            <p className="paragraph">
              We reserve the right to update or modify these Terms of Use at any time. Changes will be posted on this page, and it is your responsibility to review them periodically.
            </p>
          </section>

          <section className="section">
            <h2 className="sectionTitle">Termination</h2>
            <p className="paragraph">
              We may suspend or terminate your access to Book Bank if you violate these Terms of Use. Termination does not affect your obligation to comply with any applicable terms.
            </p>
          </section>

          <section className="section">
            <h2 className="sectionTitle">Contact Us</h2>
            <p className="paragraph">
              If you have any questions about these Terms of Use, please contact us at support@bookbank.com.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

export default TermsOfUse;
