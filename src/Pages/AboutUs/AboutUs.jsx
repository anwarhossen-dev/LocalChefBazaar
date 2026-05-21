import React from "react";
import MissionSection from "../../Components/Shared/MissionSection";
import MissionSection2 from "../../Components/Shared/MissionSuccess2";
import FoodProcessSection from "../../Components/Shared/FoodProcessSection";
import SectionHeader from "../../Components/UI/Primitives/SectionHeader";
import AboutUsOrchestrator from "../../Components/Dashboard/AboutUs/AboutUsOrchestrator";
import Container from "../../Components/Shared/Container";
import { motion as Motion } from "framer-motion";

const AboutUs = () => {
    return (
        <AboutUsOrchestrator>
            {({ data }) => (
                <div className="min-h-screen bg-white">
                    {/* Hero Header */}
                    <div className="bg-slate-50 py-16 md:py-24 mb-16">
                        <Container>
                            <SectionHeader 
                                title="Our Culinary" 
                                highlight="Journey & Vision" 
                                subtitle="At Local Chef Bazaar, we're not just about food; we're about the people, the passion, and the community that makes every meal a masterpiece."
                            />
                        </Container>
                    </div>

                    <Container className="space-y-24 pb-24">
                        {/* Vision Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="order-2 lg:order-1">
                                <SectionHeader 
                                    align="left"
                                    title={data.vision.title}
                                    highlight={data.vision.highlight}
                                    subtitle={data.vision.subtitle}
                                />
                            </div>
                            <Motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="order-1 lg:order-2 rounded-[3rem] overflow-hidden shadow-2xl"
                            >
                                <MissionSection />
                            </Motion.div>
                        </div>

                        {/* Mission Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <Motion.div 
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="rounded-[3rem] overflow-hidden shadow-2xl"
                            >
                                <MissionSection2 />
                            </Motion.div>
                            <div>
                                <SectionHeader 
                                    align="left"
                                    title={data.mission.title}
                                    highlight={data.mission.highlight}
                                    subtitle={data.mission.subtitle}
                                />
                                <div className="mt-8 p-6 bg-primary/5 rounded-3xl border border-primary/10">
                                    <p className="text-slate-600 font-medium italic leading-relaxed">
                                        "Our plant-forward menu means that we're already on average 30% less carbon intensive than the average American meal."
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Process Section */}
                        <div className="pt-16 border-t border-slate-100">
                            <div className="text-center mb-16">
                                <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                                    The Craft
                                </span>
                                <h2 className="text-4xl md:text-5xl font-black text-slate-800 mt-6">How We Make <span className="text-primary">Magic</span></h2>
                            </div>
                            <FoodProcessSection />
                        </div>
                    </Container>
                </div>
            )}
        </AboutUsOrchestrator>
    );
};

export default AboutUs;