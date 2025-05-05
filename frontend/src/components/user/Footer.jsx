import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="/aboutus" className="hover:text-red-400 transition duration-300">About Us</a></li>
              <li><a href="/contactus" className="hover:text-red-400 transition duration-300">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Policies</h3>
            <ul className="space-y-2">
              <li><a href="/terms" className="hover:text-red-400 transition duration-300">Terms Of Use</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-red-400 transition duration-300"><FaFacebookF /></a>
              <a href="#" className="hover:text-red-400 transition duration-300"><FaTwitter /></a>
              <a href="#" className="hover:text-red-400 transition duration-300"><FaYoutube /></a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li><a href="/faq" className="hover:text-red-400 transition duration-300">FAQ</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

