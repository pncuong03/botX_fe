import React, { useState } from 'react';
import Sociall from '../section/Sociall';
import Image from '../section/Image';
import Logo from '../section/Logo';
import Choose from '../section/Choose';
import Network from '../section/Network';
import FAQ from '../section/FAQ';
import Join from '../section/Join';

const Social: React.FC = () => {
  return (
    <div className="sociall">
      <Sociall />
      <Image />
      <Logo />
      <Choose />
      <Network />
      <FAQ />
      <Join />
    </div>
  );
};

export default Social;
