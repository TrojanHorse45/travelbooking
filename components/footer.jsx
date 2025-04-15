import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-12 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">TravelVerse</h3>
            <p className="mb-4 text-white/70">
              Discover the world with our seamless booking experience. Find the best hotels, flights, and travel
              packages.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-white/70 hover:text-cyan-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-white/70 hover:text-cyan-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-white/70 hover:text-cyan-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-white/70 hover:text-cyan-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/hotels" className="text-white/70 hover:text-white transition-colors">
                  Hotels
                </Link>
              </li>
              <li>
                <Link href="/flights" className="text-white/70 hover:text-white transition-colors">
                  Flights
                </Link>
              </li>
              <li>
                <Link href="/trains" className="text-white/70 hover:text-white transition-colors">
                  Trains
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-white/70 hover:text-white transition-colors">
                  Packages
                </Link>
              </li>
              <li>
                <Link href="/itinerary" className="text-white/70 hover:text-white transition-colors">
                  Itinerary Planner
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-white/70 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/70 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/70 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-white/70 hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 shrink-0 text-cyan-400" />
                <span>123 Travel Street, City, Country</span>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Phone className="w-5 h-5 shrink-0 text-cyan-400" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Mail className="w-5 h-5 shrink-0 text-cyan-400" />
                <span>info@travelverse.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 text-center border-t border-white/10">
          <p className="text-white/70">&copy; {new Date().getFullYear()} TravelVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
