
import { useAppSelector } from "../../hooks/typed-react-redux-hooks";
import { RootState } from "../store";

export const useCountriesSelector = () => useAppSelector((state:RootState) => state.countries.list)