export type RoutesResponse = {
    [key: string]: Route[];
};

export type Route = {
    climb_image_url: string;
    climb_name: string;
    climb_type: string;
    description: string;
    gym_name: string;
    hold_type: string;
    id: number;
    v_rating: string;
};