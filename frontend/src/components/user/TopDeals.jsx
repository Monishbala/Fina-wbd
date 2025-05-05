import Book from './Book'

export default function TopDeals({ id }) {
  
  const books = [
    {
      image: "https://d2g9wbak88g7ch.cloudfront.net/productimages/images200/561/9780241647561.jpg",
      name: "Percy Jackson and the Olympians",
      author: "Rick Riordan",
      rate: "₹425",
      original: "₹599",
      discount: "29",
      link:`/book/65f9d425daef5e08b881752d/${id}`
    },
    {
      image: "https://d2g9wbak88g7ch.cloudfront.net/productimages/images200/254/9788171826254.jpg",
      name: "Chanakya Neeti with Chanakya Sutra Sahit",
      author: "Dr Ashwini Parashar",
      rate: "₹1,131",
      original: "₹1,271",
      discount: "31",
      link:`/book/65f9d655daef5e08b881752f/${id}`
    },
    {
      image: "https://d2g9wbak88g7ch.cloudfront.net/productimages/images200/254/9788171826254.jpg",
      name: "Teachings from the Ramayana on Family & Life",
      author: "Shantanu Gupta",
      rate: "₹239",
      original: "₹450",
      discount: "40",
      link:`/book/65f9d971daef5e08b8817535/${id}`
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Top Deals
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {books.map((book, index) => (
            <Book key={index} {...book} />
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href={`/allbooks/${id}`}
            className="inline-block bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            View All TopDeals
          </a>
        </div>
      </div>
    </section>
  );

}

