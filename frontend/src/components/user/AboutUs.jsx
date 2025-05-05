import React from 'react';

function AboutUs() {
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
            margin-bottom: 40px;
          }
          .title {
            font-size: 2.5rem;
            color: #333;
            margin-bottom: 10px;
          }
          .subtitle {
            font-size: 1.2rem;
            color: #666;
          }
          .content {
            display: flex;
            flex-direction: column;
            gap: 40px;
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
            list-style-type: none;
            padding: 0;
          }
          .listItem {
            font-size: 1rem;
            line-height: 1.6;
            color: #555;
            margin-bottom: 10px;
            padding-left: 20px;
            position: relative;
          }
          .listItem::before {
            content: "";
            position: absolute;
            left: 0;
            top: 8px;
            width: 6px;
            height: 6px;
            background-color: #007bff;
            border-radius: 50%;
          }
          .imageContainer {
            text-align: center;
            margin-top: 30px;
          }
          .image {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>

      <div className="container">
        <header className="header">
          <h1 className="title">About Book Bank</h1>
          <p className="subtitle">Your Gateway to Literary Adventures</p>
        </header>

        <div className="content">
          <section className="section">
            <h2 className="sectionTitle">Our Story</h2>
            <p className="paragraph">
              Founded in 2010, Book Bank emerged from a passion for literature and a desire to make great books accessible to everyone. What started as a small, local bookshop has grown into a leading online destination for book lovers across the country.
            </p>
            <p className="paragraph">
              Our journey has been one of continuous growth, driven by our commitment to connecting readers with their next favorite book. We've expanded our collection, embraced technology, and built a community of avid readers, all while maintaining the personal touch and expertise of a neighborhood bookstore.
            </p>
          </section>

          <section className="section">
            <h2 className="sectionTitle">Our Mission</h2>
            <p className="paragraph">
              At Book Bank, our mission is simple: to ignite and nurture a love for reading in people of all ages. We believe that books have the power to educate, inspire, and transform lives. Our goal is to:
            </p>
            <ul className="list">
              <li className="listItem">Provide a diverse and carefully curated selection of books</li>
              <li className="listItem">Offer expert recommendations and personalized reading suggestions</li>
              <li className="listItem">Create a welcoming online space for book discussions and discovery</li>
              <li className="listItem">Support emerging authors and independent publishers</li>
              <li className="listItem">Promote literacy and a culture of reading in our communities</li>
            </ul>
          </section>

          <section className="section">
            <h2 className="sectionTitle">What Sets Us Apart</h2>
            <p className="paragraph">
              In the vast sea of online bookstores, Book Bank stands out for several reasons:
            </p>
            <ul className="list">
              <li className="listItem">
                <strong>Expertly Curated Selection:</strong> Our team of bibliophiles handpicks every book in our catalog, ensuring a high-quality and diverse collection.
              </li>
              <li className="listItem">
                <strong>Personalized Recommendations:</strong> Our advanced algorithm, combined with human expertise, provides tailored book suggestions based on your reading preferences.
              </li>
              <li className="listItem">
                <strong>Community Engagement:</strong> We foster a vibrant community of readers through book clubs, author events, and interactive forums.
              </li>
              <li className="listItem">
                <strong>Exceptional Customer Service:</strong> Our dedicated team is always ready to assist you, whether you're searching for a specific title or need help choosing your next read.
              </li>
              <li className="listItem">
                <strong>Giving Back:</strong> A portion of every purchase goes towards literacy programs and supporting local libraries.
              </li>
            </ul>
          </section>

          <section className="section">
            <h2 className="sectionTitle">Join Our Community</h2>
            <p className="paragraph">
              Whether you're a casual reader or a dedicated bibliophile, Book Bank is your home for all things literary. Join our community of book lovers, explore our vast collection, and embark on countless adventures through the pages of our books.
            </p>
            <p className="paragraph">Thank you for being a part of our story. Happy reading!</p>
          </section>

          <div className="imageContainer">
            <img
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Books in a library"
              className="image"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
