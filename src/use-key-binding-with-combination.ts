import {useEffect} from 'react';

const NO_DEP: ReadonlyArray<unknown> = [];

/**
 * In key binding usage of 99.9% should be called with Ctrl or Meta key.
 *
 * useKeyBindingCombination('s', (e) => {
 *   e.preventDefault();
 *   console.log('hogeee');
 * });
 */
export function useKeyBindingCombination(key: string, cb: (e: KeyboardEvent) => void, deps: ReadonlyArray<unknown> = NO_DEP) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isCombi = e.metaKey || e.ctrlKey;
      if (isCombi === false) {
        return;
      }
      if (e.key === key) {
        cb(e);
      }
    };
    document.body.addEventListener('keydown', handler);
    return () => {
      document.body.removeEventListener('keydown', handler);
    };
  }, [key, ...deps]);
}
