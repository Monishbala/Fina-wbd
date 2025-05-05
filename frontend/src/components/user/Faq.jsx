import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of purchase. The books must be in their original condition. Contact our support team to initiate a return.",
    },
    {
      question: "Do you offer discounts on bulk purchases?",
      answer: "Yes, we offer special discounts for bulk purchases of 10 or more books. Please reach out to our sales team for more details.",
    },
    {
      question: "How can I track my order?",
      answer: "You can track your order using the tracking link provided in your order confirmation email.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit cards, debit cards, PayPal, and UPI payments. More payment options may be available at checkout.",
    },
    {
      question: "Do you have a mobile app?",
      answer: "Yes, our mobile app is available for both Android and iOS platforms. Download it from the Google Play Store or Apple App Store.",
    },
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Frequently Asked Questions</h1>
      <div style={styles.faqList}>
        {faqs.map((faq, index) => (
          <div key={index} style={styles.faqItem}>
            <div
              style={styles.question}
              onClick={() => toggleAnswer(index)}
            >
              {faq.question}
              <span style={styles.toggleIcon}>
                {activeIndex === index ? '-' : '+'}
              </span>
            </div>
            {activeIndex === index && (
              <div style={styles.answer}>{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  faqList: {
    margin: '10px 0',
  },
  faqItem: {
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  question: {
    padding: '10px 15px',
    backgroundColor: '#f8f9fa',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  answer: {
    padding: '10px 15px',
    backgroundColor: '#fff',
    borderTop: '1px solid #ddd',
  },
  toggleIcon: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#007bff',
  },
};

export default FAQ;