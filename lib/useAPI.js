import useSWR from 'swr';
export function useAPI(path,...args){
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const abspath=`${process.env["NEXT_PUBLIC_PROTOCOL"]}://${process.env["NEXT_PUBLIC_HOSTNAME"]}:${process.env["NEXT_PUBLIC_PORT"]}/${path}`
    const {data, error, isLoading} = useSWR([abspath,...args],fetcher);
    return {
        data,
        error,
        isLoading
    }
}