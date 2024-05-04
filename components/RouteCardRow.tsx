import React from 'react';
import RouteCard from '@/components/RouteCard';

type Route = {
    id: number;
    name: string;
    imageUrl?: string;
};

type RouteRowProps = {
    routes: Route[];
};

export default function RouteCardRow({ routes }: RouteRowProps) {
    return (
        <div className="flex flex-row items-start gap-8">
            {routes.map((route) => (
                <RouteCard key={route.id} id={route.id} imageUrl={route.imageUrl ?? ''} name={route.name} />
            ))}
        </div>
    );
}