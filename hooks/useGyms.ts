import { GymsResponse } from '@/types/Gym';
import useSWR from 'swr'

const fetcher = (arg: any, ...args: any) => fetch(arg, ...args).then(res => res.json());

export function useGyms() {
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_URL}/gyms`, fetcher)
 
  return {
    gyms: data as GymsResponse,
    isLoading,
    isError: error
  }
}