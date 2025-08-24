import { useAppSelector } from '../../hooks/typed-react-redux-hooks';
import { RootState } from '../store';

export const useFormDataSelector = () =>
  useAppSelector((state: RootState) => state.formData.records);

export const useLastAddedIdSelector = () =>
  useAppSelector((state: RootState) => state.formData.lastAddedId);
