import { options } from '../../constants/filtration';

export default function FiltrationSkeleton() {
  return (
    <div className="filtration-section">
      <span>Choose a year</span>
      <select>
        <option value="" disabled>
          Sort
        </option>
        <>
          {options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </>
      </select>
      <div>
        <label htmlFor="search">Search</label>
        <input id="search" type="text" placeholder="" />
      </div>
      <span>Choose a year</span>
      <select value="year">
        <option value="" disabled>
          year
        </option>
        <option></option>
      </select>
    </div>
  );
}
