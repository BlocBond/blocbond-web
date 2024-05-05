export type GymsResponse = {
    [key: string]: Gym;
};

export type Gym = {
    gym_name: string;
    id: number;
    indoor_map_url: string;
    lat: number;
    lng: number;
    logo_image_url: string;
    url_custom_gym_header: string;
};