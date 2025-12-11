import React from 'react';
import Container from '../Shared/Container';
import Card from './Card';

const Meal = () => {
    return (
        <Container>
      <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-8'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </Container>
    );
};

export default Meal;