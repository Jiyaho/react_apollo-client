import { useLazyQuery } from '@apollo/client';
import { GET_COUNTRY_QUERY } from '../graphql';

function UseLazyQuery() {
  const [fetchCountryData, { loading, data, error }] = useLazyQuery(GET_COUNTRY_QUERY);

  const handleButtonClick = () => {
    // 쿼리를 수동으로 실행
    fetchCountryData({ variables: { code: 'KR' } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const country = data?.country;

  return (
    <div style={{ marginTop: '30px' }}>
      <h1>useLazyQuery Components</h1>
      <button onClick={handleButtonClick}>Fetch Country Data</button>
      {data && (
        <>
          <h2>{country.name} Information</h2>
          <ul>
            <li>Native: {country.native}</li>
            <li>Capital: {country.capital}</li>
            <li>National flag: {country.emoji}</li>
            <li>Currency: {country.currency}</li>
            <li>Languages code: {country.languages[0].code}</li>
            <li>Languages name: {country.languages[0].name}</li>
          </ul>
        </>
      )}
    </div>
  );
}
export default UseLazyQuery;
