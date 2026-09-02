/**
 * Asynchronous lifecycle status states.
 */
export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error'

/**
 * Generic reactive state tracking asynchronous data lifecycles.
 */
export interface AsyncDataState<T> {
  status: AsyncStatus
  data: T | null
  error: string | null
}
