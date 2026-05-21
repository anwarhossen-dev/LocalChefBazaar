import React from 'react';

const aboutData = {
    vision: {
        title: "We make a small, intimate, and inviting",
        highlight: "space for an unforgettable meal",
        subtitle: "Convert leads into customers and then turn those customers into loyal fans of your brand by leveraging next-generation automation and AI. Yes, it really can be automated, and no, you're not dreaming."
    },
    mission: {
        title: "Immerse Yourself in an experience that",
        highlight: "transcends the ordinary dining out",
        subtitle: "In a world where the long-and short-term effects of climate change pose major challenges for farmers, the need for regenerative food system has never been more important. That's why we've made a promise to do more for the planet, by taking less."
    }
};

const AboutUsOrchestrator = ({ children }) => {
    // In a real app, this could manage active tabs or content fetching
    return children({ data: aboutData });
};

export default AboutUsOrchestrator;
