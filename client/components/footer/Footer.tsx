import Link from "next/link";
import {
  MdOutlineMailOutline,
  MdOutlinePhone,
  MdOutlineMap,
} from "react-icons/md";
import { footerLinks } from "../constants";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto lg:px-16 px-8">
        <div className="flex flex-wrap lg:justify-between justify-center gap-10 mb-8">
          <div className="lg:basis-[30%] md:basis-[45%] basis-full md:text-left text-center">
            <h2 className="text-2xl font-bold mb-5">Cars</h2>
            <p className=" text-gray-300">
              Your trusted partner in finding the perfect vehicle. Quality cars,
              exceptional service.
            </p>
          </div>
          <div className="lg:basis-[30%] md:basis-[45%] basis-full md:text-left text-center">
            <h3 className="text-xl font-semibold mb-5">Quick Links</h3>
            <ul className=" text-gray-300 flex flex-col gap-3">
              {footerLinks.map((foot: any, i: number) => (
                <li key={i}>
                  <Link href={foot.link} className="hover:text-gray-400">
                    {foot.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:basis-[30%] md:basis-[45%] basis-full md:text-left text-center">
            <h3 className="text-xl font-semibold mb-5">Contact Us</h3>
            <ul className="flex flex-col gap-3">
              <li className=" text-gray-300">
                <MdOutlineMailOutline className="inline mr-2" />
                <a
                  href="mailto:zakib2316@gmail.com"
                  className="hover:text-gray-400"
                >
                  zakib2316@gmail.com
                </a>
              </li>
              <li className=" text-gray-300">
                <MdOutlinePhone className="inline mr-2" />
                <a href="tel:+1234567890" className="hover:text-gray-400">
                  +123 456 7890
                </a>
              </li>
              <li className=" text-gray-300">
                <MdOutlineMap className="inline mr-2" />
                <a
                  href="https://www.google.com/maps/place/ain abid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400"
                >
                  123 Main St, City, Country
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center border-t border-secondary pt-4">
          <div className="text-lg font-semibold mb-4 lg:mb-0">
            &copy; {new Date().getFullYear()} Cars. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              Facebook
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
