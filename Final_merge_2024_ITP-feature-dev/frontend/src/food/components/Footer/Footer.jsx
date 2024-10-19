import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Welcome to Valampuri's online food ordering system, where convenience meets quality. At Valampuri, we strive to bring you the best dining experience with just a few clicks. Our extensive menu offers a variety of dishes, from local favorites to international delights, all prepared with the finest ingredients. Whether you're dining in or ordering for takeaway, our system ensures a seamless and hassle-free experience. Enjoy great food, fast service, and easy ordering from the comfort of your home. Experience the taste of Valampuri today!</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+94-11-745-745</li>
                <li>contact@valampuri.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © Valampuri.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
