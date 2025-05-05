export default function Book({ image, name, author, rate, original, discount, link }) {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
        <a href={link} className="block">
          <div className="relative pb-[133%]">
            <img 
              src={image} 
              alt={name} 
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {discount}% OFF
            </div>
          </div>
          <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{name}</h3>
            <p className="text-sm text-gray-600">{author}</p>
             
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-bold text-red-600">{rate}</span>
              <span className="text-sm text-gray-500 line-through">{original}</span>
            </div>
          </div>
        </a>
      </div>
    );
  }
  