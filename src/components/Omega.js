import React from 'react';
import img_1 from '../assets/1.png';
import img_2 from '../assets/2.png';
import img_3 from '../assets/3.png';
import img_4 from '../assets/4.png';
import img_5 from '../assets/5.png';

const Omega = () => {
    return (
        <section>
            <div className='p-10'>
                <h1 className='text-white text-5xl text-center'>5 Rarest NFTs</h1>
            </div>
            <div className='px-10 pb-10'>
                <div className='grid grid-cols-5 gap-5'>
                    <img className='' src={img_1} alt='Willow the Huntress' />
                    <img className='' src={img_2} alt='Sapphire the Android Ecologist' />
                    <img className='' src={img_3} alt='Wendy Revenant' />
                    <img className='' src={img_4} alt='Sandra of New New York' />
                    <img className='' src={img_5} alt='R-12m712 "RIN"' />
                </div>
            </div>
        </section>
    ); 
}

export default Omega;