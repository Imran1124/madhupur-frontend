import React from 'react';
import Layout from './Layout';
import Hero from './Hero';
import Features from './Features';
import Event from './Event';
import NewPost from './NewPost';
import Testomonials from './Testomonials';
import Gallery from './Gallery';
import AboutUs from './AboutUs';
import Starts from './Starts';

export default function LandingPage() {
  return (
    <Layout>
      <Hero />
      <div className="mx-auto px-6 lg:px-24">
        <div className="mt-16" />
        <Features />
        <div className="mt-10" />
        <AboutUs />
        <div className="mt-10" />
        <Event />

        <div className="mt-10" />
        <NewPost />
        <div className="mt-10" />
        <Testomonials />
        {/* <div className="mt-10" />
        <Gallery /> */}
      </div>
    </Layout>
  );
}
