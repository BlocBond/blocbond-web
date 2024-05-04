import React from 'react';
import GymCard from './GymCard';

type Gym = {
    id: number;
    name: string;
    logoImageUrl?: string;
    featureImageUrl?: string;
};

type GymRowProps = {
    gyms: Gym[];
};

export default function GymRow({ gyms }: GymRowProps) {
    return (
        <div className="flex flex-row items-start gap-8">
            {gyms.map((gym) => (
                <GymCard key={gym.name} id={gym.id} imageUrl={gym.logoImageUrl ?? ''} name={gym.name} />
            ))}
        </div>
    );
}