import React from 'react'
import { CloseNav } from '../components/CloseNav'
import UserShops from '../components/UserShops'
import BannerWhatsapp from './../components/BannerWhatsapp';
import Footer from './../components/Footer';

const UserHistory = () => {
  return (
    <div>
        <CloseNav />
        <UserShops />
        <BannerWhatsapp />
        
        <Footer />
    </div>
  )
}

export default UserHistory
