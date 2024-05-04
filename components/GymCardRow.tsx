import React from 'react';
import GymCard from './GymCard';

type Gym = {
    name: string;
    imageUrl: string;
};

type GymRowProps = {
    gyms: Gym[];
};

export default function GymRow({ gyms }: GymRowProps) {
    return (
        <div className="flex flex-row items-start gap-8">
            {gyms.map((gym) => (
                <GymCard key={gym.name} imageUrl={gym.imageUrl} name={gym.name} />
            ))}
        </div>
    );
}