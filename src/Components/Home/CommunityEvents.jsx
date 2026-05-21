import React from 'react';

const CommunityEvents = () => {
    const events = [
        {
            id: 1,
            month: "OCT",
            day: "12",
            title: "Artisanal Pizza Workshop",
            location: "Vito's Pantry",
            time: "6:00 PM",
            colorClass: "bg-primary-fixed",
            onColorClass: "text-on-primary-fixed-variant",
            dateColorClass: "text-on-primary-fixed"
        },
        {
            id: 2,
            month: "OCT",
            day: "15",
            title: "Farm-to-Table Pop-up",
            location: "Green Valley Farm",
            time: "1:00 PM",
            colorClass: "bg-secondary-fixed",
            onColorClass: "text-on-secondary-fixed-variant",
            dateColorClass: "text-on-secondary-fixed"
        },
        {
            id: 3,
            month: "OCT",
            day: "21",
            title: "Seasonal Fermenting",
            location: "Community Center",
            time: "10:30 AM",
            colorClass: "bg-tertiary-fixed",
            onColorClass: "text-on-tertiary-fixed",
            dateColorClass: "text-on-tertiary-fixed"
        }
    ];

    return (
        <section className="py-stack-lg bg-surface max-w-7xl mx-auto px-container-padding">
            <div className="text-center mb-16">
                <h2 className="font-headline-lg text-headline-lg mb-4">Community Events</h2>
                <p className="font-body-lg text-on-surface-variant max-w-xl mx-auto">Join fellow food lovers for hands-on workshops and exclusive local dining experiences.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {events.map((event) => (
                    <div key={event.id} className="bg-surface rounded-xl border border-outline-variant p-6 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`w-16 h-16 ${event.colorClass} rounded-lg flex flex-col items-center justify-center`}>
                                <span className={`text-xs font-label-sm ${event.onColorClass}`}>{event.month}</span>
                                <span className={`text-xl font-bold ${event.dateColorClass}`}>{event.day}</span>
                            </div>
                            <div>
                                <h3 className="font-label-lg text-lg">{event.title}</h3>
                                <p className="text-sm text-on-surface-variant flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">location_on</span> {event.location}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                            <span className="text-on-surface-variant text-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">schedule</span> {event.time}
                            </span>
                            <button className="text-primary font-label-lg hover:underline active:scale-95">Book Spot</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CommunityEvents;
