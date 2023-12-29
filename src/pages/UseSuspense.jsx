import { useSuspenseQuery } from '@apollo/client';
import { Suspense } from 'react';
import { GET_COUNTRY_QUERY } from '../graphql';

function SuspenseComponent({ code }) {
  const { data } = useSuspenseQuery(GET_COUNTRY_QUERY, {
    variables: { code },
  });
  const country = data.country;

  return (
    <div>
      <h1>useSuspense Components</h1>
      <h2>{country.name} Information</h2>
      <ul>
        <li>Country name: {country.name}</li>
        <li>Native: {country.native}</li>
        <li>Capital: {country.capital}</li>
        <li>National flag: {country.emoji}</li>
        <li>Currency: {country.currency}</li>
        <li>Languages code: {country.languages[0].code}</li>
        <li>Languages name: {country.languages[0].name}</li>
      </ul>
    </div>
  );
}

function UseSuspense() {
  return (
    <Suspense fallback={<div>Loading...Use Suspense</div>}>
      <SuspenseComponent code="KR" />
    </Suspense>
  );
}

export default UseSuspense;
