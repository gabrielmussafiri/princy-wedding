import Navbar        from '../components/Navbar'
import Hero          from '../components/Hero'
import NotreHistoire from '../components/NotreHistoire'
import Details       from '../components/Details'
import Galerie       from '../components/Galerie'
import RSVP          from '../components/RSVP'
import LivreOr       from '../components/LivreOr'
import Footer        from '../components/Footer'
import ChatBot       from '../components/ChatBot'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <NotreHistoire />
        <Details />
        <Galerie />
        <RSVP />
        <LivreOr />
      </main>
      <Footer />
      <ChatBot />
    </>
  )
}
