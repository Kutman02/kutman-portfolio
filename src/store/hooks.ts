/**
 * @fileoverview Типизированные Redux хуки
 */

import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * Типизированный хук для dispatch
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Типизированный хук для selector
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
