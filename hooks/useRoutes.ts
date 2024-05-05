import { RoutesResponse } from '@/types/Route';
import useSWR from 'swr'

const fetcher = (arg: any, ...args: any) => fetch(arg, ...args).then(res => res.json());

export function useRoutes(gym: string) {
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_URL}/routes?gym=${gym}`, fetcher)
 
  return {
    routes: data as RoutesResponse,
    isLoading,
    isError: error
  }
}