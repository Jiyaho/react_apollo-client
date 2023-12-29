import { useQuery } from '@apollo/client';
import { GET_COUNTRY_QUERY } from '../graphql';

function UseQuery() {
  const { loading, error, data, refetch } = useQuery(GET_COUNTRY_QUERY, {
    variables: { code: 'KR' },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const country = data.country;

  return (
    <div>
      <h1>useQuery Components</h1>
      <h2>{country.name} Information</h2>
      <ul>
        <li>Native: {country.native}</li>
        <li>Capital: {country.capital}</li>
        <li>National flag: {country.emoji}</li>
        <li>Currency: {country.currency}</li>
        <li>Languages code: {country.languages[0].code}</li>
        <li>Languages name: {country.languages[0].name}</li>
      </ul>
      <button onClick={() => refetch({ code: 'US' })}>Refetch with USA Code</button>
      <button onClick={() => refetch({ code: 'KR' })}>Refetch with Korea Code</button>
      <button onClick={() => refetch()}>Refetch without Changing Country Code</button>
    </div>
  );
}

export default UseQuery;
