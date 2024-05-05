import useSWR from 'swr'

const fetcher = (arg: any, ...args: any) => fetch(arg, ...args).then(res => res.json());

function useGyms() {
  const { data, error, isLoading } = useSWR(`/api/gyms/`, fetcher)
 
  return {
    gyms: data,
    isLoading,
    isError: error
  }
}