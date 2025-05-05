import Header from './Header'
import Navbar from './Navbar'
import TopDeals from './TopDeals'
import DeliveryFeatures from './DeliveryFeature'
import BestSeller from './BestSeller'
import Footer from './Footer'
import { useParams } from 'react-router-dom'
export default function Homepage() {
 const {id}=useParams()
 console.log(id);
 
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Navbar id={id} />
      <main className="container mx-auto px-4 py-8">
        <TopDeals id={id} />
        <DeliveryFeatures />
        <BestSeller id={id} />
      </main>
      <Footer />
    </div>
  )
}

