import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex space-x-4">
          <a href="https://facebook.com" className="text-gray-600 hover:text-blue-600" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://twitter.com" className="text-gray-600 hover:text-blue-400" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://youtube.com" className="text-gray-600 hover:text-red-600" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <span>For query:</span>
          <img src="https://dtbtob4osa700.cloudfront.net/images/callRed.png" alt="Call" className="w-4 h-4" />
          <span className="font-semibold">04461343008</span>
        </div>
        <a href="/login" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300" target="_self" rel="noopener noreferrer">
          LOGOUT
        </a>
      </div>
    </header>
  )
}
