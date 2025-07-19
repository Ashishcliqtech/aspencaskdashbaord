import { useState, useEffect, useCallback } from 'react';
import { ApiResponse, LoadingState } from '../types';

interface UseApiOptions<T> {
  initialData?: T;
  immediate?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

export function useApi<T>(
  apiFunction: () => Promise<ApiResponse<T>>,
  options: UseApiOptions<T> = {}
) {
  const { initialData, immediate = true, onSuccess, onError } = options;
  
  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<string | undefined>();

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(undefined);
      
      const response = await apiFunction();
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      setData(response.data);
      onSuccess?.(response.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [apiFunction, onSuccess, onError]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  const retry = useCallback(() => {
    execute();
  }, [execute]);

  return {
    data,
    loading,
    error,
    execute,
    retry,
    setData,
  };
}

export function useMutation<T, P = any>(
  mutationFunction: (params: P) => Promise<ApiResponse<T>>,
  options: UseApiOptions<T> = {}
) {
  const { onSuccess, onError } = options;
  
  const [data, setData] = useState<T | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const mutate = useCallback(async (params: P) => {
    try {
      setLoading(true);
      setError(undefined);
      
      const response = await mutationFunction(params);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      setData(response.data);
      onSuccess?.(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      onError?.(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [mutationFunction, onSuccess, onError]);

  const reset = useCallback(() => {
    setData(undefined);
    setError(undefined);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    mutate,
    reset,
  };
}

export function useLoadingState(): [LoadingState, (loading: boolean, error?: string) => void] {
  const [state, setState] = useState<LoadingState>({ isLoading: false });

  const setLoadingState = useCallback((isLoading: boolean, error?: string) => {
    setState({ isLoading, error });
  }, []);

  return [state, setLoadingState];
}