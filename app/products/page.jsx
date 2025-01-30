"use client"
import CallToHelper from '@/components/detailical/callToHelper';
import CoffeeShop from '@/components/main/coffeeShop';
import SidebarMain from '@/components/main/sidebarMain';
import React from 'react';

const Page = () => {
    return (
        <div className=' bg-custom-coffeeShop-img bg-cover'>
            
            <CoffeeShop/>
            <CallToHelper/>
       
        </div>
    );
}

export default Page;
