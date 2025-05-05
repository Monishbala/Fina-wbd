import React from "react";


const features = [
  {
    image: "https://th.bing.com/th/id/OIP.roOe3eLy2s8lhRTS_TrfLgAAAA?w=161&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    title: "Guaranteed Home Delivery",
    description: "We provide express shipping for 27000+ Indian pin codes",
  },
  {
    image:
      "https://th.bing.com/th?q=Premium+Quality+Stamp+Icon&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    title: "Premium Quality Books",
    description: "Get handpicked books at unbelievable rates",
  },
  {
    image:
      "https://th.bing.com/th/id/OIP.Yie_a3518VyYmwN_iUXmIwHaHa?w=192&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    title: "COD Available",
    description: "Along with UPI/Card/Netbanking/Paylate",
  },
  {
    image:
      "https://therightbookstoreindia.com/wp-content/uploads/2023/04/insurance-claim-document-finance-7731980-150x150.png",
    title: "Return/Replacement Available",
    description:
      "WhatsApp customer support to resolve issues at the earliest",
  },
];

export default function DeliveryFeatures() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-none bg-white/50 backdrop-blur-sm rounded-lg p-6"
            >
              <div className="mb-4 relative">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
